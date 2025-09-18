"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Building2, Home, BadgeHelpIcon, Network} from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "Members",
    href: "/members",
    icon: Users,
  },
  {
    name: "Departments",
    href: "/departments",
    icon: Building2,
  },
  {
    name: "Club Structure",
    href: "/club-structure",
    icon: Network,
  },
  {
    name: "How it works",
    href: "/how",
    icon: BadgeHelpIcon
  }
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-900/90 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/favicon.png" 
              alt="Logo" 
              width={32} 
              height={32} 
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white">GDG Leaderboard</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn("flex items-center gap-2", isActive && "bg-primary text-primary-foreground")}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <div className="flex items-center gap-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={cn("p-2", isActive && "bg-primary text-primary-foreground")}
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
