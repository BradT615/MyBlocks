// src/app/(protected)/_components/sidebar-nav.tsx
import Link from "next/link"
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

interface SidebarNavProps {
  isCollapsed?: boolean
}

export function SidebarNav({ isCollapsed = false }: SidebarNavProps) {
  return (
    <div className="space-y-1 px-2 py-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center rounded-md text-sm font-medium",
            "transition-colors hover:bg-accent hover:text-accent-foreground",
            isCollapsed 
              ? "justify-center h-10 w-10 p-0 mx-auto" 
              : "px-3 py-2.5",
            "text-muted-foreground"
          )}
          title={isCollapsed ? item.title : undefined}
        >
          <item.icon className={cn(
            "h-5 w-5", 
            isCollapsed ? "" : "mr-2",
          )} />
          {!isCollapsed && <span>{item.title}</span>}
        </Link>
      ))}
    </div>
  )
}