"use client"

import { useState } from 'react'
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
  PencilLine
} from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function SettingsPage() {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [email, setEmail] = useState('your.email@example.com');
  const [emailChanged, setEmailChanged] = useState(false);
  const [displayName, setDisplayName] = useState('Bob Thompson');
  const [nameChanged, setNameChanged] = useState(false);
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value !== 'your.email@example.com') {
      setEmailChanged(true);
    } else {
      setEmailChanged(false);
    }
  };
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
    if (e.target.value !== 'Bob Thompson') {
      setNameChanged(true);
    } else {
      setNameChanged(false);
    }
  };

  const handleSave = () => {
    setIsEditingEmail(false);
    setIsEditingName(false);
    setEmailChanged(false);
    setNameChanged(false);
    // Save logic would go here
  };

  return (
    <div className="w-full">
      <DashboardHeader 
        heading="Settings" 
        text="Manage your account and preferences"
      />
      
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
          
          <CardContent className="p-6 space-y-6 relative">
            {(emailChanged || nameChanged) && (
              <Button 
                className="absolute bottom-0 right-6 bg-green-600 hover:bg-green-700 text-white"
                onClick={handleSave}
              >
                Save Changes
              </Button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                {isEditingEmail ? (
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
                  <div className="flex h-11 w-full items-center">
                    <div className="flex-1 flex items-center rounded-lg bg-muted/80 px-4 py-2 border border-primary/30">
                      <User className="mr-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="displayName"
                        value={displayName}
                        onChange={handleNameChange}
                        className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm h-7"
                        autoFocus
                      />
                    </div>
                  </div>
                ) : (
                  <div 
                    className="flex h-11 w-full items-center justify-between rounded-lg bg-muted/50 px-4 py-2 group relative hover:bg-muted/80 transition-colors cursor-pointer"
                    onClick={() => setIsEditingName(true)}
                  >
                    <div className="flex items-center">
                      <User className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{displayName}</span>
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
                    BT
                    <div className="absolute inset-0 rounded-full bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Edit className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="absolute inset-0" onClick={() => {}} aria-label="Change profile picture" />
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" className="h-10 rounded-lg hover:bg-primary/10 flex items-center justify-center gap-2 font-medium transition-all">
                    <Upload className="h-4 w-4" /> Upload New Picture
                  </Button>
                  <Button variant="ghost" size="sm" className="h-10 text-muted-foreground hover:text-destructive flex items-center gap-2">
                    <Trash2 className="h-4 w-4" /> Remove
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