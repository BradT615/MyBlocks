import React from 'react';
import Link from 'next/link';
import { DashboardHeader } from '@/app/(protected)/_components/dashboard-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Clock, Star, Activity, Code, FileSymlink } from 'lucide-react';

export default function EnhancedDashboard() {
  // This would typically come from API/database
  const recentComponents = [
    { id: 'button-1', name: 'Primary Button', updatedAt: '2 days ago', tags: ['ui', 'button'] },
    { id: 'dropdown-1', name: 'Dropdown Menu', updatedAt: '5 days ago', tags: ['ui', 'menu'] },
    { id: 'card-1', name: 'Gradient Card', updatedAt: '1 week ago', tags: ['ui', 'card'] },
  ];
  
  const favoriteComponents = [
    { id: 'nav-1', name: 'Responsive Navbar', updatedAt: '1 month ago', tags: ['layout', 'navigation'] },
    { id: 'form-1', name: 'Sign Up Form', updatedAt: '2 weeks ago', tags: ['ui', 'form'] },
  ];
  
  return (
    <>
      <DashboardHeader 
        heading="Dashboard" 
        text="Welcome to your MyBlocks dashboard" 
      />
      
      <div className="grid gap-4 md:gap-8 lg:grid-cols-3 mt-6">
        <Card className="rounded-xl border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">My Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-1">
              3 public, 2 private
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              asChild 
              className="mt-3 p-0 h-auto font-normal text-primary"
            >
              <Link href="/components">View all components →</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="rounded-xl border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">
              UI Elements, Layouts
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              asChild 
              className="mt-3 p-0 h-auto font-normal text-primary"
            >
              <Link href="/collections">Manage collections →</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="rounded-xl border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex text-muted-foreground">
                <Activity className="h-4 w-4 mr-2 mt-0.5" />
                <span>New component added <span className="font-medium text-foreground">2 days ago</span></span>
              </li>
              <li className="flex text-muted-foreground">
                <Star className="h-4 w-4 mr-2 mt-0.5" />
                <span>Component favorited <span className="font-medium text-foreground">1 week ago</span></span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Components</h2>
          <Button 
            asChild
            size="sm"
            className="flex items-center gap-1"
          >
            <Link href="/components?new=true">
              <PlusCircle className="h-4 w-4" />
              <span>Add Component</span>
            </Link>
          </Button>
        </div>
        
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-xs">
            <TabsTrigger value="recent" className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>Recent</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5" />
              <span>Favorites</span>
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-1">
              <Code className="h-3.5 w-3.5" />
              <span>All</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recentComponents.map(component => (
                <Link 
                  key={component.id} 
                  href={`/components/${component.id}`}
                  className="block"
                >
                  <Card className="h-full rounded-xl border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/20 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{component.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">Updated {component.updatedAt}</p>
                        </div>
                        <FileSymlink className="h-4 w-4 text-muted-foreground" />
                      </div>
                      
                      <div className="flex mt-4 gap-2">
                        {component.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              <Link 
                href="/components"
                className="flex items-center justify-center h-full min-h-40 rounded-xl border border-dashed bg-muted/50 p-6 text-center transition-colors hover:border-primary/30 hover:bg-muted"
              >
                <div className="flex flex-col items-center gap-1">
                  <PlusCircle className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm font-medium">View all components</span>
                </div>
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="favorites" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {favoriteComponents.map(component => (
                <Link 
                  key={component.id} 
                  href={`/components/${component.id}`}
                  className="block"
                >
                  <Card className="h-full rounded-xl border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/20 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{component.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">Updated {component.updatedAt}</p>
                        </div>
                        <Star className="h-4 w-4 text-amber-500" fill="currentColor" />
                      </div>
                      
                      <div className="flex mt-4 gap-2">
                        {component.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="all" className="mt-4">
            <div className="rounded-xl border bg-card p-6 shadow-sm text-center">
              <div className="mx-auto max-w-sm">
                <h3 className="text-lg font-semibold mb-2">All your components</h3>
                <p className="text-muted-foreground mb-4">
                  View all your components with advanced filtering and sorting options
                </p>
                <Button 
                  asChild
                  className="mt-2"
                >
                  <Link href="/components">
                    Browse All Components
                  </Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}