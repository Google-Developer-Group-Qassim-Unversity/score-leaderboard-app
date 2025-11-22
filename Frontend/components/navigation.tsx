"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { useState, useEffect, useRef } from "react"
import {
  Home,
  Users,
  Building2,
  BookOpen,
  User,
  BadgeHelp,
  Menu,
  X,
  LogIn,
  UserPlus,
  Layout,
  MoreHorizontal,
  CalendarDays
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

const navigationItems = [
  { href: "/", label: "Home", shortLabel: "Home", icon: Home },
  { href: "/members", label: "Members", shortLabel: "Members", icon: Users },
  { href: "/departments", label: "Departments", shortLabel: "Depts", icon: Building2 },
  { href: "/events", label: "Events", shortLabel: "Events", icon: CalendarDays },
  { href: "/magazines", label: "Magazines", shortLabel: "Mags", icon: BookOpen },
  { href: "/club-structure", label: "Club Structure", shortLabel: "Structure", icon: Layout },
  { href: "/how", label: "How It Works", shortLabel: "How", icon: BadgeHelp },
]

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [visibleItems, setVisibleItems] = useState(navigationItems.length)
  const containerRef = useRef<HTMLDivElement>(null)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  useEffect(() => {
    const calculateVisibleItems = () => {
      if (typeof window === 'undefined') return

      const width = window.innerWidth
      setWindowWidth(width)
      
      // Estimate space needed for each component
      const logoWidth = width < 640 ? 80 : 180 // Logo + text
      const authWidth = width < 1024 ? 100 : 200 // Auth buttons (compact on mobile/tablet)
      const menuButtonWidth = 48 // Hamburger/overflow button
      const padding = 32 // Container padding
      const gaps = 32 // Gaps between sections
      
      // Calculate available space for navigation
      const availableSpace = width - logoWidth - authWidth - menuButtonWidth - padding - gaps
      
      // Estimate item width based on screen size
      let itemWidth: number
      if (width >= 1024) {
        itemWidth = 110 // Icon + full text + padding
      } else if (width >= 768) {
        itemWidth = 85 // Icon + shorter text + padding
      } else if (width >= 640) {
        itemWidth = 48 // Icon only + padding
      } else {
        itemWidth = 0 // All in menu
      }
      
      // Calculate how many items fit
      if (itemWidth === 0) {
        setVisibleItems(0)
      } else {
        const maxItems = Math.floor(availableSpace / itemWidth)
        setVisibleItems(Math.min(Math.max(0, maxItems), navigationItems.length))
      }
    }

    calculateVisibleItems()
    
    // Use ResizeObserver for smooth updates
    const resizeObserver = new ResizeObserver(calculateVisibleItems)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }
    
    window.addEventListener('resize', calculateVisibleItems)
    
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', calculateVisibleItems)
    }
  }, [])

  // Don't show navigation on auth pages and user-profile page
  if (pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up") || pathname?.startsWith("/onboarding") || pathname?.startsWith("/user-profile")) {
    return null
  }

  const visibleNavItems = navigationItems.slice(0, visibleItems)
  const hiddenNavItems = navigationItems.slice(visibleItems)
  const hasHiddenItems = hiddenNavItems.length > 0

  // Determine label based on window width
  const getLabel = (item: typeof navigationItems[0]) => {
    if (windowWidth >= 1024) return item.label
    if (windowWidth >= 768) return item.shortLabel
    return item.shortLabel
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div ref={containerRef} className="container mx-auto flex h-16 items-center justify-between gap-2 sm:gap-4 px-4">
        {/* Logo and Site Name */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
          <Image
            src="/gdg-transparent.png"
            alt="GDG Logo"
            width={32}
            height={32}
            className="rounded"
          />
          <span className="font-bold text-lg hidden sm:inline-block whitespace-nowrap">GDG Leaderboard</span>
          <span className="font-bold text-lg sm:hidden">GDG</span>
        </Link>

        {/* Dynamic Navigation */}
        <div className="flex items-center gap-0.5 sm:gap-1 flex-1 justify-center min-w-0 overflow-hidden">
          {visibleNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-2 sm:px-3 py-2 rounded-md font-semibold transition-colors whitespace-nowrap",
                  isActive
                    ? "bg-foreground text-background"
                    : "text-foreground/70 hover:text-foreground hover:bg-accent"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={2.5} />
                <span className="hidden md:inline text-xs lg:text-sm">{getLabel(item)}</span>
              </Link>
            )
          })}
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-1.5 shrink-0">
          <SignedOut>
            <div className="hidden lg:flex items-center gap-1.5">
              <Button asChild variant="ghost" size="sm" className="h-9">
                <Link href="/sign-in" className="flex items-center gap-1.5 px-3">
                  <LogIn className="h-4 w-4" />
                  <span className="text-sm">Sign In</span>
                </Link>
              </Button>
              <Button asChild size="sm" className="h-9">
                <Link href="/sign-up" className="flex items-center gap-1.5 px-3">
                  <UserPlus className="h-4 w-4" />
                  <span className="text-sm">Sign Up</span>
                </Link>
              </Button>
            </div>
            <div className="flex lg:hidden items-center gap-1">
              <Button asChild variant="ghost" size="icon" className="h-9 w-9">
                <Link href="/sign-in">
                  <LogIn className="h-4 w-4" />
                  <span className="sr-only">Sign In</span>
                </Link>
              </Button>
              <Button asChild size="icon" className="h-9 w-9">
                <Link href="/sign-up">
                  <UserPlus className="h-4 w-4" />
                  <span className="sr-only">Sign Up</span>
                </Link>
              </Button>
            </div>
          </SignedOut>
          
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9"
                }
              }}
            />
          </SignedIn>

          {/* Overflow/Mobile Menu */}
          {(hasHiddenItems || visibleItems === 0) && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                  {visibleItems === 0 ? <Menu className="h-5 w-5" /> : <MoreHorizontal className="h-5 w-5" />}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0 [&>button]:hidden">
                <div className="flex flex-col h-full">
                  {/* Header with close button */}
                  <div className="flex items-center justify-between gap-3 p-4 border-b">
                    <Link href="/" className="flex items-center gap-2 min-w-0" onClick={() => setIsOpen(false)}>
                      <Image
                        src="/gdg-transparent.png"
                        alt="GDG Logo"
                        width={32}
                        height={32}
                        className="rounded shrink-0"
                      />
                      <span className="font-bold text-base truncate">GDG Leaderboard</span>
                    </Link>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-accent shrink-0">
                        <X className="h-5 w-5" strokeWidth={2.5} />
                        <span className="sr-only">Close</span>
                      </Button>
                    </SheetClose>
                  </div>
                  
                  {/* Navigation Items */}
                  <div className="flex-1 overflow-y-auto py-4 px-3">
                    <div className="flex flex-col gap-1">
                      {(visibleItems === 0 ? navigationItems : hiddenNavItems).map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors",
                              isActive
                                ? "bg-foreground text-background"
                                : "text-foreground/70 hover:text-foreground hover:bg-accent"
                            )}
                          >
                            <Icon className="h-5 w-5 shrink-0" strokeWidth={2.5} />
                            <span>{item.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>

                  {/* Auth Buttons */}
                  <SignedOut>
                    <div className="p-4 border-t bg-muted/30">
                      <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <Link href="/sign-in" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                            <LogIn className="h-4 w-4" />
                            <span>Sign In</span>
                          </Link>
                        </Button>
                        <Button asChild size="sm" className="flex-1">
                          <Link href="/sign-up" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                            <UserPlus className="h-4 w-4" />
                            <span>Sign Up</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </SignedOut>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </nav>
  )
}
