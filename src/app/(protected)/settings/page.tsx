import { DashboardHeader } from '@/app/(protected)/_components/dashboard-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SettingsPage() {
  return (
    <>
      <DashboardHeader 
        heading="Settings" 
        text="Manage your account and preferences"
      />
      
      <div className="mt-4 space-y-4">
        {/* Account Information */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Update your account details and email preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            <div className="grid gap-4">
              <div>
                <h3 className="text-sm font-medium">Email Address</h3>
                <p className="text-sm text-muted-foreground mt-1">your.email@example.com</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Account Created</h3>
                <p className="text-sm text-muted-foreground mt-1">March 2, 2025</p>
              </div>
                              <div className="flex flex-col space-y-1">
                <h3 className="text-sm font-medium">Password</h3>
                <Button variant="outline" size="sm" className="w-auto md:w-48">
                  Change Password
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Manage your public profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
                          <div className="grid gap-3">
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm font-medium">Profile Picture</h3>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-primary/10 border border-border flex items-center justify-center text-lg font-semibold">
                    BT
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="w-auto">
                      Upload New Picture
                    </Button>
                    <Button variant="ghost" size="sm" className="w-auto text-muted-foreground">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-3">
                <div>
                  <h3 className="text-sm font-medium">Display Name</h3>
                  <p className="text-sm text-muted-foreground mt-1">Bob Thompson</p>
                  <Button variant="link" className="h-auto p-0 text-xs">Edit</Button>
                </div>
                <div>
                  <h3 className="text-sm font-medium">About</h3>
                  <p className="text-sm text-muted-foreground mt-1">No information provided</p>
                  <Button variant="link" className="h-auto p-0 text-xs">Edit</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Choose how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <div>
              <h3 className="text-sm font-medium mb-2">Email Notifications</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between max-w-md">
                  <label className="text-sm">Product updates</label>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-[state=checked]:bg-primary">
                    <span className="inline-block h-4 w-4 translate-x-1 rounded-full bg-background transition-transform data-[state=checked]:translate-x-6"></span>
                  </div>
                </div>
                <div className="flex items-center justify-between max-w-md">
                  <label className="text-sm">Security alerts</label>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 bg-primary">
                    <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-background transition-transform"></span>
                  </div>
                </div>
                <div className="flex items-center justify-between max-w-md">
                  <label className="text-sm">New feature announcements</label>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-[state=checked]:bg-primary">
                    <span className="inline-block h-4 w-4 translate-x-1 rounded-full bg-background transition-transform data-[state=checked]:translate-x-6"></span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">In-App Notifications</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between max-w-md">
                  <label className="text-sm">Component updates</label>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 bg-primary">
                    <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-background transition-transform"></span>
                  </div>
                </div>
                <div className="flex items-center justify-between max-w-md">
                  <label className="text-sm">Collection updates</label>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 bg-primary">
                    <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-background transition-transform"></span>
                  </div>
                </div>
                <div className="flex items-center justify-between max-w-md">
                  <label className="text-sm">New shares</label>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 bg-primary">
                    <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-background transition-transform"></span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Subscription Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>Manage your subscription and billing information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-primary/10 border border-primary/20 p-3">
              <div className="flex items-center justify-between max-w-md">
                <div>
                  <h3 className="font-semibold">Free Plan</h3>
                  <p className="text-sm text-muted-foreground mt-1">You&apos;re currently on the free plan</p>
                </div>
                <Button className="bg-primary">Upgrade</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Plan Features</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="h-4 w-4 text-primary"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Up to 50 components</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="h-4 w-4 text-primary"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Basic styling options</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="h-4 w-4 text-primary"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Community support</span>
                </li>
              </ul>
            </div>
            
            <div className="pt-2">
              <h3 className="text-sm font-medium mb-2">Available Plans</h3>
              <div className="space-y-3 pt-1">
                <div className="rounded-md border border-border p-3 hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between max-w-md">
                    <div>
                      <h4 className="font-medium">Pro Plan</h4>
                      <p className="text-sm text-muted-foreground mt-1">$15/month</p>
                    </div>
                    <Button variant="outline">Select</Button>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Includes unlimited components, team sharing, and priority support
                  </div>
                </div>
                
                <div className="rounded-md border border-border p-3 hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between max-w-md">
                    <div>
                      <h4 className="font-medium">Enterprise Plan</h4>
                      <p className="text-sm text-muted-foreground mt-1">Custom pricing</p>
                    </div>
                    <Button variant="outline">Contact Sales</Button>
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