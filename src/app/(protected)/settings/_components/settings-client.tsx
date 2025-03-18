"use client"

import React, { useState, useRef, useTransition } from 'react'
import Image from 'next/image'
import { DashboardHeader } from '@/app/(protected)/_components/dashboard-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Mail, 
  User, 
  CreditCard,
  Check,
  Upload,
  Trash2,
  Edit,
  ChevronRight,
  PencilLine,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  RefreshCw
} from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { deleteUserAccount } from '../actions'
import { OTPInput } from '@/components/ui/input-otp'
import { 
  updateProfileEmail, 
  updateProfileName, 
  updateProfileAvatar, 
  removeProfileAvatar,
  resendEmailVerification
} from '../actions'

interface SettingsClientProps {
  profile: {
    id: string
    email: string
    full_name: string | null
    avatar_url: string | null
  }
}

export function SettingsClient({ profile }: SettingsClientProps) {
  const [isPending, startTransition] = useTransition()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // State for editable fields
  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const [isEditingName, setIsEditingName] = useState(false)
  const [email, setEmail] = useState(profile.email || '')
  const [fullName, setFullName] = useState(profile.full_name || '')
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || '')
  
  // Track changes to determine if we need to save
  const [emailChanged, setEmailChanged] = useState(false)
  const [nameChanged, setNameChanged] = useState(false)
  
  // Status for UI feedback
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const [isRemovingAvatar, setIsRemovingAvatar] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error',
    message: string
  } | null>(null)
  
  // OTP verification modal state
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false)
  const [otpValue, setOtpValue] = useState("")
  const [emailToVerify, setEmailToVerify] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  
  // Handle countdown for resend button
  React.useEffect(() => {
    if (!isOtpModalOpen) return
    
    if (countdown <= 0) {
      setCanResend(true)
      return
    }
    
    const timer = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [countdown, isOtpModalOpen])
  
  // Handle email change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (e.target.value !== profile.email) {
      setEmailChanged(true)
    } else {
      setEmailChanged(false)
    }
  }
  
  // Handle name change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value)
    if (e.target.value !== profile.full_name) {
      setNameChanged(true)
    } else {
      setNameChanged(false)
    }
  }

  // Handle initiating email change
  const handleSaveEmail = () => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatusMessage({
        type: 'error',
        message: 'Please enter a valid email address'
      })
      return
    }
    
    setStatusMessage(null)
    startTransition(async () => {
      try {
        // Send OTP verification
        const result = await updateProfileEmail(email)
        if (result.error) {
          setStatusMessage({
            type: 'error',
            message: result.error
          })
        } else {
          // Show OTP verification modal
          setIsOtpModalOpen(true)
          setEmailToVerify(email)
          setCountdown(60)
          setCanResend(false)
          // Reset status message as we're showing the modal now
          setStatusMessage(null)
        }
      } catch {
        setStatusMessage({
          type: 'error',
          message: 'An unexpected error occurred'
        })
      }
    })
  }
  
  // Handle OTP verification for email change
  const handleVerifyOtp = () => {
    if (otpValue.length !== 6) return
    
    setIsVerifying(true)
    startTransition(async () => {
      try {
        // Verify OTP to complete email update
        const result = await updateProfileEmail(emailToVerify, otpValue)
        if (result.error) {
          setStatusMessage({
            type: 'error',
            message: result.error
          })
          setIsVerifying(false)
        } else {
          // Success! Close modal and update UI
          setStatusMessage({
            type: 'success',
            message: 'Email updated successfully'
          })
          setIsOtpModalOpen(false)
          setIsEditingEmail(false)
          setEmailChanged(false)
          setOtpValue("")
          setIsVerifying(false)
          // Update the displayed email
          setEmail(emailToVerify)
        }
      } catch {
        setStatusMessage({
          type: 'error',
          message: 'An unexpected error occurred'
        })
        setIsVerifying(false)
      }
    })
  }
  
  // Handle resending verification code
  const handleResendCode = () => {
    if (!canResend) return
    
    setIsResending(true)
    startTransition(async () => {
      try {
        const result = await resendEmailVerification(emailToVerify)
        if (result.error) {
          setStatusMessage({
            type: 'error',
            message: result.error
          })
        } else {
          // Reset countdown
          setCountdown(60)
          setCanResend(false)
          setStatusMessage({
            type: 'success',
            message: 'Verification code resent'
          })
        }
      } catch {
        setStatusMessage({
          type: 'error',
          message: 'Failed to resend verification code'
        })
      } finally {
        setIsResending(false)
      }
    })
  }
  
  // Handle closing OTP modal
  const handleCloseOtpModal = () => {
    setIsOtpModalOpen(false)
    setOtpValue("")
    // Keep email in editing state
  }
  
  // Handle saving name change
  const handleSaveName = () => {
    if (!fullName.trim()) {
      setStatusMessage({
        type: 'error',
        message: 'Display name cannot be empty'
      })
      return
    }
    
    setStatusMessage(null)
    startTransition(async () => {
      try {
        const result = await updateProfileName(fullName)
        if (result.error) {
          setStatusMessage({
            type: 'error',
            message: result.error
          })
        } else {
          setStatusMessage({
            type: 'success',
            message: 'Name updated successfully'
          })
          setIsEditingName(false)
          setNameChanged(false)
        }
      } catch {
        setStatusMessage({
          type: 'error',
          message: 'An unexpected error occurred'
        })
      }
    })
  }
  
  // Handle avatar upload
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    
    const file = e.target.files[0]
    
    // Validate file size (2MB limit) and type
    if (file.size > 2 * 1024 * 1024) {
      setStatusMessage({
        type: 'error',
        message: 'Avatar image must be less than 2MB'
      })
      return
    }
    
    if (!file.type.startsWith('image/')) {
      setStatusMessage({
        type: 'error',
        message: 'File must be an image'
      })
      return
    }
    
    setStatusMessage(null)
    setIsUploadingAvatar(true)
    
    const formData = new FormData()
    formData.append('avatar', file)
    
    startTransition(async () => {
      try {
        const result = await updateProfileAvatar(formData)
        if (result.error) {
          setStatusMessage({
            type: 'error',
            message: result.error
          })
        } else {
          setStatusMessage({
            type: 'success',
            message: 'Avatar updated successfully'
          })
          // Update local state with new avatar URL
          setAvatarUrl(result.avatarUrl || '')
        }
      } catch {
        setStatusMessage({
          type: 'error',
          message: 'An unexpected error occurred'
        })
      } finally {
        setIsUploadingAvatar(false)
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    })
  }
  
  // Handle avatar removal
  const handleRemoveAvatar = () => {
    setStatusMessage(null)
    setIsRemovingAvatar(true)
    
    startTransition(async () => {
      try {
        const result = await removeProfileAvatar()
        if (result.error) {
          setStatusMessage({
            type: 'error',
            message: result.error
          })
        } else {
          setStatusMessage({
            type: 'success',
            message: 'Avatar removed successfully'
          })
          // Update local state
          setAvatarUrl('')
        }
      } catch {
        setStatusMessage({
          type: 'error',
          message: 'An unexpected error occurred'
        })
      } finally {
        setIsRemovingAvatar(false)
      }
    })
  }
  
  // Generate user initials for avatar fallback
  const getUserInitials = () => {
    if (!fullName) return 'U'
    
    const names = fullName.split(' ')
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    }
    return fullName.charAt(0).toUpperCase()
  }

  const handleDeleteAccount = () => {
    setIsDeletingAccount(true)
    
    startTransition(async () => {
      try {
        const result = await deleteUserAccount()
        if (result.error) {
          setStatusMessage({
            type: 'error',
            message: result.error
          })
          setIsDeletingAccount(false)
          setIsDeleteDialogOpen(false)
        } else {
          // Account deleted successfully, redirect happens server-side
          // We don't need to do anything here as the page will redirect
        }
      } catch {
        setStatusMessage({
          type: 'error',
          message: 'An unexpected error occurred while deleting your account'
        })
        setIsDeletingAccount(false)
        setIsDeleteDialogOpen(false)
      }
    })
  }
  
  return (
    <div className="w-full">
      <DashboardHeader 
        heading="Settings" 
        text="Manage your account and preferences"
      />
      
      {/* Status Message */}
      {statusMessage && (
        <Alert 
          className={`mt-4 ${statusMessage.type === 'success' ? 'border-green-500/20 bg-green-500/5 text-green-600' : 'border-red-500/20 bg-red-500/5 text-red-600'}`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertDescription>{statusMessage.message}</AlertDescription>
          </div>
        </Alert>
      )}
      
      <div className="mt-8 max-w-3xl mx-auto p-6">
        {/* Account Information */}
        <Card className="mb-8 border rounded-xl shadow-sm overflow-hidden">
          <div className="bg-muted/30 p-6 border-b">
            <div className="flex items-center gap-2 text-primary mb-2">
              <User className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Profile Information</h2>
            </div>
            <p className="text-sm text-muted-foreground">Manage your personal information and preferences</p>
          </div>
          
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                {isEditingEmail ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex h-11 w-full items-center">
                      <div className="flex-1 flex items-center rounded-lg bg-muted/80 px-4 py-2 border border-primary/30">
                        <Mail className="mr-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          value={email}
                          onChange={handleEmailChange}
                          className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm h-7"
                          autoFocus
                        />
                      </div>
                    </div>
                    {emailChanged && (
                      <Button
                        size="sm"
                        className="self-end bg-green-600 hover:bg-green-700 text-white"
                        onClick={handleSaveEmail}
                        disabled={isPending}
                      >
                        {isPending ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Saving...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Check className="h-3 w-3" />
                            Update Email
                          </span>
                        )}
                      </Button>
                    )}
                  </div>
                ) : (
                  <div 
                    className="flex h-11 w-full items-center justify-between rounded-lg bg-muted/50 px-4 py-2 group relative hover:bg-muted/80 transition-colors cursor-pointer"
                    onClick={() => setIsEditingEmail(true)}
                  >
                    <div className="flex items-center">
                      <Mail className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{email}</span>
                    </div>
                    <PencilLine className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Label htmlFor="displayName" className="text-sm font-medium">
                  Display Name
                </Label>
                {isEditingName ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex h-11 w-full items-center">
                      <div className="flex-1 flex items-center rounded-lg bg-muted/80 px-4 py-2 border border-primary/30">
                        <User className="mr-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="displayName"
                          value={fullName}
                          onChange={handleNameChange}
                          className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm h-7"
                          autoFocus
                        />
                      </div>
                    </div>
                    {nameChanged && (
                      <Button
                        size="sm"
                        className="self-end bg-green-600 hover:bg-green-700 text-white"
                        onClick={handleSaveName}
                        disabled={isPending}
                      >
                        {isPending ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Saving...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Check className="h-3 w-3" />
                            Update Name
                          </span>
                        )}
                      </Button>
                    )}
                  </div>
                ) : (
                  <div 
                    className="flex h-11 w-full items-center justify-between rounded-lg bg-muted/50 px-4 py-2 group relative hover:bg-muted/80 transition-colors cursor-pointer"
                    onClick={() => setIsEditingName(true)}
                  >
                    <div className="flex items-center">
                      <User className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{fullName || 'Set your display name'}</span>
                    </div>
                    <PencilLine className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-2">
              <Label className="text-sm font-medium mb-3 block">
                Profile Picture
              </Label>
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="relative group cursor-pointer">
                  <div className="h-20 w-20 rounded-full bg-muted/50 border flex items-center justify-center text-lg font-semibold overflow-hidden">
                    {avatarUrl ? (
                      <Image 
                        src={avatarUrl} 
                        alt={fullName || 'Profile'} 
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      getUserInitials()
                    )}
                    <div className="absolute inset-0 rounded-full bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Edit className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*"
                    className="hidden" 
                    onChange={handleAvatarUpload}
                  />
                  <div 
                    className="absolute inset-0" 
                    onClick={() => fileInputRef.current?.click()} 
                    aria-label="Change profile picture" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-10 rounded-lg hover:bg-primary/10 flex items-center justify-center gap-2 font-medium transition-all"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingAvatar}
                  >
                    {isUploadingAvatar ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" /> 
                        Upload New Picture
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-10 text-muted-foreground hover:text-destructive flex items-center gap-2"
                    onClick={handleRemoveAvatar}
                    disabled={!avatarUrl || isRemovingAvatar}
                  >
                    {isRemovingAvatar ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Removing...
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4" /> 
                        Remove
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Subscription Plan */}
        <Card className="rounded-xl shadow-sm overflow-hidden">
          <div className="bg-muted/30 p-6 border-b">
            <div className="flex items-center gap-2 text-primary mb-2">
              <CreditCard className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Subscription Plan</h2>
            </div>
            <p className="text-sm text-muted-foreground">Manage your subscription and billing information</p>
          </div>
          
          <CardContent className="p-6 space-y-6">
            <div className="rounded-lg bg-muted/40 border p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-medium text-lg">Free Plan</h3>
                  <p className="text-sm text-muted-foreground mt-1">You&apos;re currently on the free plan</p>
                </div>
                <Button className="mt-4 sm:mt-0 w-full sm:w-auto h-10 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all">
                  Upgrade Plan
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Plan Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm">Up to 50 components</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm">Basic styling options</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm">Community support</span>
                </li>
              </ul>
            </div>
            
            <div className="pt-2">
              <h3 className="text-sm font-medium mb-3">Available Plans</h3>
              <div className="space-y-4">
                <div className="rounded-xl border bg-muted/30 p-5 hover:border-primary/50 transition-colors cursor-pointer shadow-sm group">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium">Pro Plan</h4>
                        <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          Popular
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">$15/month</p>
                    </div>
                    <Button variant="outline" className="mt-3 sm:mt-0 h-10 rounded-lg bg-background hover:bg-primary/10 group-hover:border-primary/50 transition-all flex items-center gap-1">
                      Select <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground">
                    Includes unlimited components, team sharing, and priority support
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone - Account Deletion */}
        <Card className="mt-8 border-destructive/20 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-destructive/5 p-6 border-b border-destructive/20">
            <div className="flex items-center gap-2 text-destructive mb-2">
              <AlertCircle className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Danger Zone</h2>
            </div>
            <p className="text-sm text-muted-foreground">Permanently delete your account and all of your content</p>
          </div>
          
          <CardContent className="p-6 space-y-4">
            <div className="text-sm text-muted-foreground">
              <p>Once you delete your account, there is no going back. This action is permanent and cannot be undone.</p>
              <p className="mt-2">All of your data will be permanently removed, including:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Your profile information</li>
                <li>Your uploaded components</li>
                <li>Your collections</li>
                <li>Any other data associated with your account</li>
              </ul>
            </div>
            
            <Button 
              variant="destructive" 
              className="mt-4"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialog for Account Deletion */}
      <Dialog 
        open={isDeleteDialogOpen} 
        onOpenChange={setIsDeleteDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove all of your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeletingAccount}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={isDeletingAccount}
            >
              {isDeletingAccount ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </span>
              ) : (
                "Yes, delete my account"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* OTP Verification Modal */}
      <Dialog open={isOtpModalOpen} onOpenChange={setIsOtpModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Verify Email Change</DialogTitle>
          </DialogHeader>
          
          <div className="text-center mb-6">
            <div className="mb-4 flex justify-center">
              <Mail className="h-10 w-10 m-2 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Check your email</h3>
            <p className="text-sm text-muted-foreground">
              We&apos;ve sent a 6-digit code to <strong>{emailToVerify}</strong>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Enter the code below to verify your new email
            </p>
          </div>
          
          <div className="flex justify-center" onKeyDown={(e) => {
            if (e.key === "Enter" && otpValue.length === 6 && !isVerifying) {
              handleVerifyOtp();
            }
          }}>
            <OTPInput
              value={otpValue}
              onChange={setOtpValue}
              disabled={isVerifying}
              length={6}
            />
          </div>
          
          {statusMessage && (
            <div className={`rounded-lg p-3 text-sm ${
              statusMessage.type === 'error' 
                ? 'bg-red-500/5 border border-red-500/20 text-red-500' 
                : 'bg-green-500/5 border border-green-500/20 text-green-500'
            }`}>
              <div className="flex items-center gap-2">
                {statusMessage.type === 'error' ? (
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                )}
                <span>{statusMessage.message}</span>
              </div>
            </div>
          )}
          
          <Button 
            onClick={handleVerifyOtp}
            className="w-full h-12"
            disabled={otpValue.length !== 6 || isVerifying}
          >
            {isVerifying ? (
              <span className="flex items-center gap-2 justify-center">
                <Loader2 className="h-4 w-4 animate-spin" />
                Verifying...
              </span>
            ) : (
              "Verify Email Change"
            )}
          </Button>
          
          <div className="flex flex-col gap-4 mt-2">
            <button 
              type="button"
              onClick={handleResendCode}
              disabled={!canResend || isResending}
              className={`text-sm flex items-center justify-center mx-auto gap-1
                ${canResend 
                  ? 'text-primary hover:underline cursor-pointer' 
                  : 'text-muted-foreground cursor-not-allowed'}`}
            >
              {isResending ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>Sending new code...</span>
                </>
              ) : canResend ? (
                <>
                  <RefreshCw className="h-3 w-3" />
                  <span>Resend verification code</span>
                </>
              ) : (
                <span>Resend code in {countdown}s</span>
              )}
            </button>
            
            <button
              type="button"
              onClick={handleCloseOtpModal}
              className="text-sm flex items-center justify-center mx-auto gap-1 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Cancel email change</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}