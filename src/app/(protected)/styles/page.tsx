"use client"

import React, { useState } from 'react';
import { DashboardHeader } from '@/app/(protected)/_components/dashboard-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Palette, Search, Copy, Type, Ruler, Grid } from 'lucide-react';

// Define proper typography property types
interface TypographyProperties {
  fontWeight: 'normal' | 'medium' | 'semibold' | 'bold';
  fontSize: string;
  lineHeight: string;
  fontFamily?: string;
}

type FontWeightValue = 'normal' | 'medium' | 'semibold' | 'bold';

export default function EnhancedStylesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [styleType, setStyleType] = useState('color');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for design tokens
  const colorTokens = [
    { id: 'color-1', name: 'primary', value: '#0066CC', description: 'Primary brand color' },
    { id: 'color-2', name: 'secondary', value: '#6E56CF', description: 'Secondary brand color' },
    { id: 'color-3', name: 'accent', value: '#00CC88', description: 'Accent color for highlights' },
    { id: 'color-4', name: 'destructive', value: '#FF3333', description: 'Error and destructive actions' },
    { id: 'color-5', name: 'warning', value: '#FFCC00', description: 'Warning notifications' },
    { id: 'color-6', name: 'success', value: '#00AA55', description: 'Success states' },
    { id: 'color-7', name: 'background', value: '#FFFFFF', description: 'Main background' },
    { id: 'color-8', name: 'foreground', value: '#222222', description: 'Main text color' },
    { id: 'color-9', name: 'muted', value: '#F5F5F5', description: 'Muted background' },
    { id: 'color-10', name: 'muted-foreground', value: '#737373', description: 'Muted text color' },
  ];
  
  const typographyTokens = [
    { id: 'type-1', name: 'heading-xl', value: '2.5rem/1.2', description: 'Extra large heading (h1)', properties: { fontWeight: 'bold', fontSize: '2.5rem', lineHeight: '1.2' } as TypographyProperties },
    { id: 'type-2', name: 'heading-lg', value: '2rem/1.3', description: 'Large heading (h2)', properties: { fontWeight: 'bold', fontSize: '2rem', lineHeight: '1.3' } as TypographyProperties },
    { id: 'type-3', name: 'heading-md', value: '1.5rem/1.4', description: 'Medium heading (h3)', properties: { fontWeight: 'semibold', fontSize: '1.5rem', lineHeight: '1.4' } as TypographyProperties },
    { id: 'type-4', name: 'heading-sm', value: '1.25rem/1.5', description: 'Small heading (h4)', properties: { fontWeight: 'semibold', fontSize: '1.25rem', lineHeight: '1.5' } as TypographyProperties },
    { id: 'type-5', name: 'body-lg', value: '1.125rem/1.6', description: 'Large body text', properties: { fontWeight: 'normal', fontSize: '1.125rem', lineHeight: '1.6' } as TypographyProperties },
    { id: 'type-6', name: 'body', value: '1rem/1.6', description: 'Regular body text', properties: { fontWeight: 'normal', fontSize: '1rem', lineHeight: '1.6' } as TypographyProperties },
    { id: 'type-7', name: 'body-sm', value: '0.875rem/1.5', description: 'Small body text', properties: { fontWeight: 'normal', fontSize: '0.875rem', lineHeight: '1.5' } as TypographyProperties },
    { id: 'type-8', name: 'code', value: '0.9rem/1.5', description: 'Code and monospace text', properties: { fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.5' } as TypographyProperties },
  ];
  
  const spacingTokens = [
    { id: 'space-1', name: 'space-1', value: '0.25rem', description: '4px - Extra small spacing' },
    { id: 'space-2', name: 'space-2', value: '0.5rem', description: '8px - Small spacing' },
    { id: 'space-3', name: 'space-3', value: '0.75rem', description: '12px - Medium-small spacing' },
    { id: 'space-4', name: 'space-4', value: '1rem', description: '16px - Base spacing unit' },
    { id: 'space-5', name: 'space-5', value: '1.5rem', description: '24px - Medium spacing' },
    { id: 'space-6', name: 'space-6', value: '2rem', description: '32px - Medium-large spacing' },
    { id: 'space-7', name: 'space-7', value: '2.5rem', description: '40px - Large spacing' },
    { id: 'space-8', name: 'space-8', value: '3rem', description: '48px - Extra large spacing' },
    { id: 'space-9', name: 'space-9', value: '4rem', description: '64px - 2x large spacing' },
    { id: 'space-10', name: 'space-10', value: '6rem', description: '96px - 3x large spacing' },
  ];
  
  const gridTokens = [
    { id: 'grid-1', name: 'container-sm', value: '640px', description: 'Small container width' },
    { id: 'grid-2', name: 'container-md', value: '768px', description: 'Medium container width' },
    { id: 'grid-3', name: 'container-lg', value: '1024px', description: 'Large container width' },
    { id: 'grid-4', name: 'container-xl', value: '1280px', description: 'Extra large container width' },
    { id: 'grid-5', name: 'container-2xl', value: '1536px', description: 'Double extra large container width' },
    { id: 'grid-6', name: 'grid-cols-1', value: '1', description: 'Single column grid' },
    { id: 'grid-7', name: 'grid-cols-2', value: '2', description: 'Two column grid' },
    { id: 'grid-8', name: 'grid-cols-3', value: '3', description: 'Three column grid' },
    { id: 'grid-9', name: 'grid-cols-4', value: '4', description: 'Four column grid' },
    { id: 'grid-10', name: 'grid-cols-12', value: '12', description: 'Twelve column grid' },
  ];

  const filteredColorTokens = colorTokens.filter(token =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredTypographyTokens = typographyTokens.filter(token =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredSpacingTokens = spacingTokens.filter(token =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredGridTokens = gridTokens.filter(token =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to copy token value
  const copyTokenValue = (value: string) => {
    navigator.clipboard.writeText(value);
    // Could add a toast notification here
  };

  return (
    <>
      <DashboardHeader 
        heading="Design Tokens" 
        text="Manage your design system and style tokens"
      >
        <Button 
          className="flex items-center gap-1"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Token</span>
        </Button>
      </DashboardHeader>
      
      <div className="flex mt-6 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tokens..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="colors" className="flex items-center gap-1">
            <Palette className="h-4 w-4" />
            <span>Colors</span>
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-1">
            <Type className="h-4 w-4" />
            <span>Typography</span>
          </TabsTrigger>
          <TabsTrigger value="spacing" className="flex items-center gap-1">
            <Ruler className="h-4 w-4" />
            <span>Spacing</span>
          </TabsTrigger>
          <TabsTrigger value="grid" className="flex items-center gap-1">
            <Grid className="h-4 w-4" />
            <span>Grid</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="colors" className="mt-0">
          {filteredColorTokens.length === 0 ? (
            <div className="rounded-xl border bg-card shadow-sm p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">No color tokens found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? "Try adjusting your search." : "Add color tokens to your design system."}
              </p>
              <Button 
                className="flex items-center gap-1"
                onClick={() => {
                  setStyleType('color');
                  setIsCreateModalOpen(true);
                }}
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add Color Token</span>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredColorTokens.map((token) => (
                <Card key={token.id} className="overflow-hidden">
                  <div 
                    className="h-16" 
                    style={{ backgroundColor: token.value }}
                  ></div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{token.name}</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => copyTokenValue(token.value)}
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy value</span>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{token.description}</p>
                    <div className="text-sm font-mono bg-muted/50 py-1 px-2 rounded">
                      {token.value}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="typography" className="mt-0">
          {filteredTypographyTokens.length === 0 ? (
            <div className="rounded-xl border bg-card shadow-sm p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">No typography tokens found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? "Try adjusting your search." : "Add typography tokens to your design system."}
              </p>
              <Button 
                className="flex items-center gap-1"
                onClick={() => {
                  setStyleType('typography');
                  setIsCreateModalOpen(true);
                }}
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add Typography Token</span>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTypographyTokens.map((token) => (
                <Card key={token.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium">{token.name}</h3>
                        <p className="text-sm text-muted-foreground">{token.description}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => copyTokenValue(`${token.properties.fontSize}/${token.properties.lineHeight}`)}
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy value</span>
                      </Button>
                    </div>
                    <div
                      style={{ 
                        fontSize: token.properties.fontSize, 
                        lineHeight: token.properties.lineHeight,
                        fontWeight: token.properties.fontWeight as FontWeightValue,
                        fontFamily: token.properties.fontFamily
                      }}
                    >
                      The quick brown fox jumps over the lazy dog
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4 text-xs">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5">
                        Size: {token.properties.fontSize}
                      </span>
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5">
                        Line height: {token.properties.lineHeight}
                      </span>
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5">
                        Weight: {token.properties.fontWeight}
                      </span>
                      {token.properties.fontFamily && (
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5">
                          Family: {token.properties.fontFamily}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="spacing" className="mt-0">
          {filteredSpacingTokens.length === 0 ? (
            <div className="rounded-xl border bg-card shadow-sm p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">No spacing tokens found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? "Try adjusting your search." : "Add spacing tokens to your design system."}
              </p>
              <Button 
                className="flex items-center gap-1"
                onClick={() => {
                  setStyleType('spacing');
                  setIsCreateModalOpen(true);
                }}
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add Spacing Token</span>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSpacingTokens.map((token) => (
                <Card key={token.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{token.name}</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => copyTokenValue(token.value)}
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy value</span>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{token.description}</p>
                    <div 
                      className="h-8 w-full bg-primary/10 flex items-center"
                    >
                      <div className="h-full bg-primary" style={{ width: token.value }}></div>
                    </div>
                    <p className="text-sm font-mono mt-2 text-center">{token.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="grid" className="mt-0">
          {filteredGridTokens.length === 0 ? (
            <div className="rounded-xl border bg-card shadow-sm p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">No grid tokens found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? "Try adjusting your search." : "Add grid tokens to your design system."}
              </p>
              <Button 
                className="flex items-center gap-1"
                onClick={() => {
                  setStyleType('grid');
                  setIsCreateModalOpen(true);
                }}
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add Grid Token</span>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGridTokens.map((token) => (
                <Card key={token.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{token.name}</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => copyTokenValue(token.value)}
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy value</span>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{token.description}</p>
                    {token.name.includes('container') ? (
                      <div className="relative h-8 w-full bg-muted/50 flex items-center justify-center">
                        <div className="absolute top-0 left-0 h-full bg-primary/20" style={{ width: `min(100%, ${token.value})` }}></div>
                        <span className="relative text-xs z-10 font-mono">{token.value}</span>
                      </div>
                    ) : (
                      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${token.value}, 1fr)` }}>
                        {Array.from({ length: parseInt(token.value) }).map((_, i) => (
                          <div key={i} className="h-8 bg-primary/20 flex items-center justify-center">
                            <span className="text-xs">{i + 1}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Create Token Dialog */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Design Token</DialogTitle>
            <DialogDescription>
              Create a new design token for your system.
            </DialogDescription>
          </DialogHeader>
          
          <form className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tokenType">Token Type</Label>
              <Select defaultValue={styleType} onValueChange={setStyleType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select token type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="color">Color</SelectItem>
                  <SelectItem value="typography">Typography</SelectItem>
                  <SelectItem value="spacing">Spacing</SelectItem>
                  <SelectItem value="grid">Grid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Token Name</Label>
              <Input id="name" placeholder="e.g., primary, heading-lg, space-4" />
            </div>
            
            {styleType === 'color' && (
              <div className="space-y-2">
                <Label htmlFor="colorValue">Color Value</Label>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 border rounded-md overflow-hidden">
                    <input 
                      type="color" 
                      id="colorValue"
                      className="h-10 w-10 border-0 cursor-pointer"
                      defaultValue="#0066CC"
                    />
                  </div>
                  <Input defaultValue="#0066CC" className="flex-1" />
                </div>
              </div>
            )}
            
            {styleType === 'typography' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fontSize">Font Size</Label>
                  <Input id="fontSize" placeholder="e.g., 1rem, 16px" defaultValue="1rem" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lineHeight">Line Height</Label>
                  <Input id="lineHeight" placeholder="e.g., 1.5, 24px" defaultValue="1.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fontWeight">Font Weight</Label>
                  <Select defaultValue="normal">
                    <SelectTrigger id="fontWeight">
                      <SelectValue placeholder="Select weight" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal (400)</SelectItem>
                      <SelectItem value="medium">Medium (500)</SelectItem>
                      <SelectItem value="semibold">Semibold (600)</SelectItem>
                      <SelectItem value="bold">Bold (700)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            
            {styleType === 'spacing' && (
              <div className="space-y-2">
                <Label htmlFor="spacingValue">Spacing Value</Label>
                <Input id="spacingValue" placeholder="e.g., 1rem, 16px" defaultValue="1rem" />
              </div>
            )}
            
            {styleType === 'grid' && (
              <div className="space-y-2">
                <Label htmlFor="gridValue">Grid Value</Label>
                <Input id="gridValue" placeholder="e.g., 1024px, 12" defaultValue="1024px" />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="What is this token used for?" />
            </div>
          </form>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Create Token
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}