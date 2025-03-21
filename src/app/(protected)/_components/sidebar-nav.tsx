"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Code, 
  FolderOpen, 
  Palette, 
  Settings 
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Components",
    href: "/components",
    icon: Code,
  },
  {
    title: "Collections",
    href: "/collections",
    icon: FolderOpen,
  },
  {
    title: "Styles",
    href: "/styles",
    icon: Palette,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <div className="space-y-1 px-2 py-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center rounded-md px-3 py-2.5 text-sm font-medium",
              "transition-colors hover:bg-accent hover:text-accent-foreground",
              isActive ? "bg-accent/50 text-accent-foreground" : "transparent text-muted-foreground"
            )}
          >
            <item.icon className={cn("mr-2 h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
            <span>{item.title}</span>
          </Link>
        )
      })}
    </div>
  )
}