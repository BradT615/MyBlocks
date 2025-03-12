"use client"

import { useState, useRef, useTransition } from 'react'
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
  CheckCircle2
} from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  updateProfileEmail, 
  updateProfileName, 
  updateProfileAvatar, 
  removeProfileAvatar 
} from '../actions'

interface SettingsClientProps {
  profile: {
    id: string
    email: string
    fullName: string
    avatarUrl: string | null
  }
}

export function SettingsClient({ profile }: SettingsClientProps) {
  const [isPending, startTransition] = useTransition()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // State for editable fields
  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const [isEditingName, setIsEditingName] = useState(false)
  const [email, setEmail] = useState(profile.email || '')
  const [fullName, setFullName] = useState(profile.fullName || '')
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl || '')
  
  // Track changes to determine if we need to save
  const [emailChanged, setEmailChanged] = useState(false)
  const [nameChanged, setNameChanged] = useState(false)
  
  // Status for UI feedback
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const [isRemovingAvatar, setIsRemovingAvatar] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error',
    message: string
  } | null>(null)
  
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
    if (e.target.value !== profile.fullName) {
      setNameChanged(true)
    } else {
      setNameChanged(false)
    }
  }

  // State for OTP verification
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false)
  const [otpValue, setOtpValue] = useState("")
  const [emailToVerify, setEmailToVerify] = useState("")

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
        // Instead of immediately updating, send OTP verification
        const result = await updateProfileEmail(email, true) // true means send OTP only
        if (result.error) {
          setStatusMessage({
            type: 'error',
            message: result.error
          })
        } else {
          // Show OTP verification interface
          setIsVerifyingEmail(true)
          setEmailToVerify(email)
          setStatusMessage({
            type: 'success',
            message: 'Verification code sent to your email'
          })
        }
      } catch (error) {
        setStatusMessage({
          type: 'error',
          message: 'An unexpected error occurred'
        })
      }
    })
  }
  
  // Handle OTP verification for email change
  const handleVerifyOtp = () => {
    if (otpValue.length !== 6) {
      setStatusMessage({
        type: 'error',
        message: 'Please enter the 6-digit verification code'
      })
      return
    }
    
    setStatusMessage(null)
    startTransition(async () => {
      try {
        // Complete email update with OTP
        const result = await updateProfileEmail(emailToVerify, false, otpValue)
        if (result.error) {
          setStatusMessage({
            type: 'error',
            message: result.error
          })
        } else {
          setStatusMessage({
            type: 'success',
            message: 'Email updated successfully'
          })
          setIsVerifyingEmail(false)
          setIsEditingEmail(false)
          setEmailChanged(false)
          setOtpValue("")
        }
      } catch (error) {
        setStatusMessage({
          type: 'error',
          message: 'An unexpected error occurred'
        })
      }
    })
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
      } catch (error) {
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
      } catch (error) {
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
      } catch (error) {
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
            {/* Email OTP Verification Modal */}
            {isVerifyingEmail && (
              <div className="border rounded-lg p-4 mb-6 bg-muted/10">
                <h3 className="font-medium mb-2">Email Verification</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Enter the 6-digit verification code sent to {emailToVerify}
                </p>
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="w-full md:flex-1">
                    <Input
                      type="text"
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      value={otpValue}
                      onChange={(e) => setOtpValue(e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </div>
                  <Button
                    onClick={handleVerifyOtp}
                    disabled={otpValue.length !== 6 || isPending}
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Verifying...
                      </span>
                    ) : (
                      "Verify"
                    )}
                  </Button>
                </div>
              </div>
            )}
            
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
                      <img 
                        src={avatarUrl} 
                        alt={fullName || 'Profile'} 
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
      </div>
    </div>
  )
}