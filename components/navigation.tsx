"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Building2, Home, BadgeHelpIcon, Network, Languages} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

const navigationItems = [
  {
    nameKey: "navigation.dashboard",
    href: "/",
    icon: Home,
  },
  {
    nameKey: "navigation.members",
    href: "/members",
    icon: Users,
  },
  {
    nameKey: "navigation.departments",
    href: "/departments",
    icon: Building2,
  },
  {
    nameKey: "navigation.clubStructure",
    href: "/club-structure",
    icon: Network,
  },
  {
    nameKey: "navigation.howItWorks",
    href: "/how",
    icon: BadgeHelpIcon
  }
]

export function Navigation() {
  const pathname = usePathname()
  const { t, i18n } = useTranslation()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en'
    i18n.changeLanguage(newLang)
    localStorage.setItem('i18nextLng', newLang)
    // Update document direction immediately
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLang
  }

  // Show fallback text during hydration - use language-appropriate fallbacks
  const getNavText = (key: string) => {
    if (!isMounted) {
      // Get stored language to show appropriate fallback
      const storedLang = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') || 'ar' : 'ar';
      
      if (storedLang === 'en') {
        // English fallbacks
        const englishFallbacks: Record<string, string> = {
          'navigation.dashboard': 'Dashboard',
          'navigation.members': 'Members',
          'navigation.departments': 'Departments',
          'navigation.clubStructure': 'Club Structure',
          'navigation.howItWorks': 'How it works',
          'navigation.language': 'عربية'
        }
        return englishFallbacks[key] || key;
      } else {
        // Arabic fallbacks - match exactly with translation file
        const arabicFallbacks: Record<string, string> = {
          'navigation.dashboard': 'لوحة التحكم',
          'navigation.members': 'الأعضاء',
          'navigation.departments': 'الأقسام',
          'navigation.clubStructure': 'هيكلة النادي',
          'navigation.howItWorks': 'كيف يعمل',
          'navigation.language': 'EN'
        }
        return arabicFallbacks[key] || key;
      }
    }
    return t(key)
  }

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-900/90 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Conditional layout based on language */}
        {i18n.language === 'ar' ? (
          // Arabic layout: Logo on left, Navigation on right (forced positioning)
          <div className="flex items-center h-16" style={{ direction: 'ltr' }}>
            {/* Logo on left for Arabic */}
            <div className="flex-shrink-0">
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
            </div>

            {/* Spacer */}
            <div className="flex-grow"></div>

            {/* Navigation on right for Arabic */}
            <div className="hidden md:flex items-center gap-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

                return (
                  <Link key={item.nameKey} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={cn("flex items-center gap-2", isActive && "bg-primary text-primary-foreground")}
                    >
                      <Icon className="h-4 w-4" />
                      {getNavText(item.nameKey)}
                    </Button>
                  </Link>
                )
              })}
              
              {/* Language Toggle Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center gap-2 ml-2"
              >
                <Languages className="h-4 w-4" />
                {getNavText('navigation.language')}
              </Button>
            </div>

            {/* Mobile Navigation for Arabic */}
            <div className="md:hidden flex-shrink-0">
              <div className="flex items-center gap-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

                  return (
                    <Link key={item.nameKey} href={item.href}>
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
                
                {/* Mobile Language Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="p-2 ml-1"
                >
                  <Languages className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // English layout: Logo on left, Navigation on right (same as before)
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
                  <Link key={item.nameKey} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={cn("flex items-center gap-2", isActive && "bg-primary text-primary-foreground")}
                    >
                      <Icon className="h-4 w-4" />
                      {getNavText(item.nameKey)}
                    </Button>
                  </Link>
                )
              })}
              
              {/* Language Toggle Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center gap-2 ml-2"
              >
                <Languages className="h-4 w-4" />
                {getNavText('navigation.language')}
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <div className="flex items-center gap-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

                  return (
                    <Link key={item.nameKey} href={item.href}>
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
                
                {/* Mobile Language Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="p-2 ml-1"
                >
                  <Languages className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
