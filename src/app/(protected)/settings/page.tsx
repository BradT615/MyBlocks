import { DashboardHeader } from '@/app/(protected)/_components/dashboard-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Mail, 
  User, 
  Calendar, 
  Lock, 
  Bell, 
  CreditCard
} from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export default function SettingsPage() {
  return (
    <>
      <DashboardHeader 
        heading="Settings" 
        text="Manage your account and preferences"
      />
      
      <div className="mt-6 space-y-6 max-w-3xl mx-auto">
        {/* Account Information */}
        <Card className="border-border/50 bg-card shadow-sm rounded-xl">
          <CardHeader className="px-6">
            <div className="flex items-center gap-2 text-primary mb-1">
              <User className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wide">Account</span>
            </div>
            <CardTitle className="text-xl font-semibold">Profile Information</CardTitle>
            <CardDescription>Manage your personal information and preferences</CardDescription>
          </CardHeader>
          
          <CardContent className="px-6 pb-6 space-y-5">
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="flex-1 space-y-1">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="flex h-12 w-full items-center rounded-lg border border-border/50 bg-background/70 px-3 py-2">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">your.email@example.com</span>
                </div>
              </div>
              
              <div className="flex-1 space-y-1">
                <Label htmlFor="created" className="text-sm font-medium">
                  Account Created
                </Label>
                <div className="flex h-12 w-full items-center rounded-lg border border-border/50 bg-background/70 px-3 py-2">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">March 2, 2025</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="h-10 rounded-lg border-border/50 bg-background/70 hover:bg-accent/50 flex items-center justify-center gap-2 font-medium transition-all">
                    <Lock className="h-4 w-4" />
                    <span>Change Password</span>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Profile Picture
              </Label>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 border border-border flex items-center justify-center text-lg font-semibold">
                  BT
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" className="h-10 rounded-lg border-border/50 bg-background/70 hover:bg-accent/50 flex items-center justify-center gap-2 font-medium transition-all">
                    Upload New Picture
                  </Button>
                  <Button variant="ghost" size="sm" className="h-10 text-muted-foreground hover:text-foreground">
                    Remove
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-sm font-medium">
                Display Name
              </Label>
              <div className="flex h-12 w-full items-center rounded-lg border border-border/50 bg-background/70 px-3 py-2">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Bob Thompson</span>
              </div>
              <Button variant="link" className="h-auto p-0 text-xs">Edit</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Notification Preferences */}
        <Card className="border-border/50 bg-card shadow-sm rounded-xl">
          <CardHeader className="px-6">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Bell className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wide">Notifications</span>
            </div>
            <CardTitle className="text-xl font-semibold">Notification Preferences</CardTitle>
            <CardDescription>Choose how you receive notifications</CardDescription>
          </CardHeader>
          
          <CardContent className="px-6 pb-6 space-y-5">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Email Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Product updates</Label>
                    <p className="text-xs text-muted-foreground">Receive emails about new features and improvements</p>
                  </div>
                  <Switch id="product-updates" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Security alerts</Label>
                    <p className="text-xs text-muted-foreground">Get notified about security issues and login attempts</p>
                  </div>
                  <Switch id="security-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm">New feature announcements</Label>
                    <p className="text-xs text-muted-foreground">Stay updated on new features and capabilities</p>
                  </div>
                  <Switch id="feature-announcements" />
                </div>
              </div>
            </div>
            
            <div className="pt-2 space-y-4">
              <h3 className="text-sm font-medium">In-App Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Component updates</Label>
                    <p className="text-xs text-muted-foreground">Get notified when components are updated</p>
                  </div>
                  <Switch id="component-updates" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Collection updates</Label>
                    <p className="text-xs text-muted-foreground">Get notified when your collections are modified</p>
                  </div>
                  <Switch id="collection-updates" defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Subscription Plan */}
        <Card className="border-border/50 bg-card shadow-sm rounded-xl">
          <CardHeader className="px-6">
            <div className="flex items-center gap-2 text-primary mb-1">
              <CreditCard className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wide">Subscription</span>
            </div>
            <CardTitle className="text-xl font-semibold">Subscription Plan</CardTitle>
            <CardDescription>Manage your subscription and billing information</CardDescription>
          </CardHeader>
          
          <CardContent className="px-6 pb-6 space-y-5">
            <div className="rounded-lg bg-primary/10 border border-primary/20 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-medium text-lg">Free Plan</h3>
                  <p className="text-sm text-muted-foreground mt-1">You&apos;re currently on the free plan</p>
                </div>
                <Button className="mt-3 sm:mt-0 w-full sm:w-auto h-10 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-all">
                  Upgrade
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Plan Features</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="h-4 w-4 text-primary mt-0.5"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="text-sm">Up to 50 components</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="h-4 w-4 text-primary mt-0.5"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="text-sm">Basic styling options</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="h-4 w-4 text-primary mt-0.5"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="text-sm">Community support</span>
                </li>
              </ul>
            </div>
            
            <div className="pt-2">
              <h3 className="text-sm font-medium mb-3">Available Plans</h3>
              <div className="space-y-4">
                <div className="rounded-lg border border-border p-4 hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="font-medium">Pro Plan</h4>
                      <p className="text-sm text-muted-foreground mt-1">$15/month</p>
                    </div>
                    <Button variant="outline" className="mt-3 sm:mt-0 h-10 rounded-lg border-border/50 bg-background/70 hover:bg-accent/50 transition-all">
                      Select
                    </Button>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Includes unlimited components, team sharing, and priority support
                  </div>
                </div>
                
                <div className="rounded-lg border border-border p-4 hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="font-medium">Enterprise Plan</h4>
                      <p className="text-sm text-muted-foreground mt-1">Custom pricing</p>
                    </div>
                    <Button variant="outline" className="mt-3 sm:mt-0 h-10 rounded-lg border-border/50 bg-background/70 hover:bg-accent/50 transition-all">
                      Contact Sales
                    </Button>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Includes custom integrations, SSO, dedicated support, and more
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}