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
            "flex items-center rounded-md text-sm font-medium h-10",
            "hover:bg-accent hover:text-accent-foreground", // No transition on hover
            "text-muted-foreground relative px-3 w-full overflow-hidden", // Prevent overflow
          )}
          title={isCollapsed ? item.title : undefined}
        >
          <item.icon className="h-5 w-5 flex-shrink-0" /> {/* Fixed position with inline style */}
          <span 
            className={cn(
              "ml-3 whitespace-nowrap", // Prevent wrapping
              { "opacity-0": isCollapsed, "opacity-100": !isCollapsed }
            )}
            style={{ transition: "opacity 300ms ease" }}
          >
            {item.title}
          </span>
        </Link>
      ))}
    </div>
  )
}