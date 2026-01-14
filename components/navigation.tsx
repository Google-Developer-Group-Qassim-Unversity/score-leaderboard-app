"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  Home,
  Users,
  Building2,
  BookOpen,
  BadgeHelp,
  Menu,
  X,
  Layout,
  CalendarDays,
  LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/members", label: "Members", icon: Users },
  { href: "/departments", label: "Departments", icon: Building2 },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/magazines", label: "Magazines", icon: BookOpen },
  { href: "/club-structure", label: "Structure", icon: Layout },
  { href: "/how", label: "How It Works", icon: BadgeHelp },
]

function NavLink({ href, label, icon: Icon, isActive }: { href: string; label: string; icon: LucideIcon; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md font-semibold transition-colors",
        isActive ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground hover:bg-accent"
      )}
    >
      <Icon className="h-4 w-4" strokeWidth={2.5} />
      <span className="hidden lg:inline text-sm">{label}</span>
    </Link>
  )
}

function MobileNavLink({ href, label, icon: Icon, isActive, onClick }: { href: string; label: string; icon: LucideIcon; isActive: boolean; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors",
        isActive ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground hover:bg-accent"
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={2.5} />
      <span>{label}</span>
    </Link>
  )
}

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image src="/gdg.png" alt="GDG Logo" width={32} height={32} className="rounded" />
          <span className="font-bold text-lg hidden sm:block">GDG Leaderboard</span>
          <span className="font-bold text-lg sm:hidden">GDG</span>
        </Link>

        {/* Desktop & Tablet Navigation - hidden on mobile */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} isActive={pathname === item.href} />
          ))}
        </div>

        {/* Mobile Menu - visible only on mobile */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] p-0 [&>button]:hidden">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <Image src="/gdg.png" alt="GDG Logo" width={32} height={32} className="rounded" />
                  <span className="font-bold">GDG Leaderboard</span>
                </Link>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <X className="h-5 w-5" strokeWidth={2.5} />
                    <span className="sr-only">Close</span>
                  </Button>
                </SheetClose>
              </div>

              {/* Nav Items */}
              <div className="flex-1 overflow-y-auto p-3">
                <div className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <MobileNavLink key={item.href} {...item} isActive={pathname === item.href} onClick={() => setIsOpen(false)} />
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
