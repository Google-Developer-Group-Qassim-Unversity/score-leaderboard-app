"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import '../lib/i18n-client'
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
  Globe,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { AuthButton } from "@/components/auth-button"

const navItems = [
  { href: "/", labelKey: "nav.home", icon: Home },
  { href: "/members", labelKey: "nav.members", icon: Users },
  { href: "/departments", labelKey: "nav.departments", icon: Building2 },
  { href: "/events", labelKey: "nav.events", icon: CalendarDays },
  { href: "/magazines", labelKey: "nav.magazines", icon: BookOpen },
  { href: "/club-structure", labelKey: "nav.structure", icon: Layout },
  { href: "/how", labelKey: "nav.howItWorks", icon: BadgeHelp },
]

function NavLink({ href, labelKey, icon: Icon, isActive }: { href: string; labelKey: string; icon: LucideIcon; isActive: boolean }) {
  const { t } = useTranslation();
  
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md font-semibold transition-colors",
        isActive ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground hover:bg-accent"
      )}
    >
      <Icon className="h-4 w-4" strokeWidth={2.5} />
      <span className="hidden lg:inline text-sm">{t(labelKey)}</span>
    </Link>
  )
}

function MobileNavLink({ href, labelKey, icon: Icon, isActive, onClick }: { href: string; labelKey: string; icon: LucideIcon; isActive: boolean; onClick: () => void }) {
  const { t } = useTranslation();
  
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-3 rounded-md font-semibold transition-colors text-base",
        isActive ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground hover:bg-accent"
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={2.5} />
      <span>{t(labelKey)}</span>
    </Link>
  )
}

// Helper to get current language from cookie
function getLanguageFromCookie(): 'en' | 'ar' {
  if (typeof document === 'undefined') return 'ar';
  const match = document.cookie.match(/(?:^|; )lang=([^;]*)/);
  const lang = match ? match[1] : null;
  return lang === 'en' ? 'en' : 'ar';
}

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { i18n } = useTranslation()
  const [currentLang, setCurrentLang] = useState<'en' | 'ar'>('ar')

  // Sync with cookie on mount
  useEffect(() => {
    const cookieLang = getLanguageFromCookie();
    setCurrentLang(cookieLang);
    // Also sync i18n for client components that still use it
    if (i18n.language !== cookieLang) {
      i18n.changeLanguage(cookieLang);
    }
  }, [i18n]);
  
  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    
    // Set cookie with 1 year expiry
    document.cookie = `lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Update i18n for client components
    i18n.changeLanguage(newLang);
    
    // Refresh the page to trigger SSR with new language
    router.refresh();
    
    // Force a full page reload to ensure SSR picks up the new cookie
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image src="/gdg.png" alt="GDG Logo" width={32} height={32} className="rounded" />
          <span className="font-bold text-lg hidden sm:block">GDG Qassim</span>
          <span className="font-bold text-lg sm:hidden">GDG</span>
        </Link>

        {/* Desktop & Tablet Navigation - hidden on mobile */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} isActive={pathname === item.href} />
          ))}
        </div>

        {/* Auth Button, Language Switcher & Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <Button
            onClick={toggleLanguage}
            variant="ghost"
            size="sm"
            className="text-foreground/70 hover:text-foreground hover:bg-accent"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline ml-2 text-sm font-medium">
              {currentLang === 'en' ? 'عربي' : 'EN'}
            </span>
          </Button>
          
          <AuthButton />
          
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
                    <span className="font-bold">GDG-Qassim</span>
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
                  
                  {/* Language Switcher in Mobile Menu */}
                  <div className="mt-4 px-3">
                    <Button
                      onClick={toggleLanguage}
                      variant="outline"
                      className="w-full justify-start gap-3 py-3"
                    >
                      <Globe className="w-5 h-5" />
                      <span className="font-semibold text-base">
                        {currentLang === 'en' ? 'العربية' : 'English'}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
