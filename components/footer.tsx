"use client"

import Link from "next/link"
import Image from "next/image"
import { useTranslation } from 'react-i18next'
import '../lib/i18n-client'
import {
  Home,
  Users,
  Building2,
  BookOpen,
  BadgeHelp,
  Layout,
  CalendarDays,
  UserPlus,
  Send,
  MessageCircle,
  Twitter,
  Hash,
  Music2,
  Mail,
  Globe,
  Linkedin,
  Github,
} from "lucide-react"

const navItems = [
  { href: "/", labelKey: "nav.home", icon: Home },
  { href: "/members", labelKey: "nav.members", icon: Users },
  { href: "/departments", labelKey: "nav.departments", icon: Building2 },
  { href: "/events", labelKey: "nav.events", icon: CalendarDays },
  { href: "/magazines", labelKey: "nav.magazines", icon: BookOpen },
  { href: "/club-structure", labelKey: "nav.structure", icon: Layout },
  { href: "/how", labelKey: "nav.howItWorks", icon: BadgeHelp },
]

const socialLinks = [
  {
    href: "https://forms.gle/yFwt3DZKpgzuUiQE7",
    labelKey: "footer.social.joinUs",
    icon: UserPlus,
  },
  {
    href: "https://t.me/+2UZ1nUuGh29iYjM0",
    labelKey: "footer.social.telegram",
    icon: Send,
  },
  {
    href: "https://discord.com/invite/FqX2uWJX",
    labelKey: "footer.social.discord",
    icon: MessageCircle,
  },
  {
    href: "https://x.com/gdg_qu?s=20",
    labelKey: "footer.social.twitter",
    icon: Twitter,
  },
  {
    href: "https://x.com/hashtag/GDG_QU?src=hashtag_click",
    labelKey: "footer.social.hashtag",
    icon: Hash,
  },
  {
    href: "https://www.tiktok.com/@gdg.qu",
    labelKey: "footer.social.tiktok",
    icon: Music2,
  },
  {
    href: "mailto:GDG_QU1@gmail.com",
    labelKey: "footer.social.email",
    icon: Mail,
  },
  {
    href: "https://gdg.community.dev/gdg-on-campus-qassim-university-al-mulida-saudi-arabia/",
    labelKey: "footer.social.gdgSite",
    icon: Globe,
  },
]

const developers = [
  {
    name: "Albrrk773",
    twitter: "https://x.com/albrrak773",
    twitterHandle: "@albrrk773",
    linkedin: null,
    github: "https://github.com/albrrak773",
  },
  {
    name: "Ibrahim Alsukaiti",
    twitter: "https://x.com/ibrr__q",
    twitterHandle: "@ibrr__q",
    linkedin: "https://www.linkedin.com/in/ibrahim-alsukaiti-a055a92a5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    github: "https://github.com/ENG-Sukaiti",
  },
  {
    name: "Ali Alsabir",
    twitter: "https://x.com/sbr_xi",
    twitterHandle: "@sbr_xi",
    linkedin: "https://www.linkedin.com/in/ali-s-424630221/",
    github: "https://github.com/Ctrl-X1",
  },
]

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="w-full border-t bg-muted/30 mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
         

          {/* About Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity w-fit">
              <Image src="/gdg.png" alt="GDG Logo" width={40} height={40} className="rounded" />
              <span className="font-bold text-lg">GDG Qassim</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.about.description')}
            </p>
          </div>
            {/* Developers Column - First */}
          <div className="space-y-4">
            <h3 className="font-bold text-base">{t('footer.developers.title')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('footer.developers.builtWith')}
            </p>
            <ul className="space-y-3">
              {developers.map((dev) => (
                <li key={dev.name} className="text-sm">
                  <div className="text-foreground font-medium mb-1">{dev.name}</div>
                  <div className="flex items-center gap-3">
                    {dev.twitter && (
                      <a
                        href={dev.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                        title={`Twitter: ${dev.twitterHandle}`}
                      >
                        <Twitter className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {dev.linkedin && (
                      <a
                        href={dev.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {dev.github && (
                      <a
                        href={dev.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        title="GitHub"
                      >
                        <Github className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect With Us Column */}
          <div className="space-y-4">
            <h3 className="font-bold text-base">{t('footer.connect.title')}</h3>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 w-fit"
                  >
                    <link.icon className="h-3.5 w-3.5" />
                    <span>{t(link.labelKey)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column - Last */}
          <div className="space-y-4">
            <h3 className="font-bold text-base">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 w-fit"
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    <span>{t(item.labelKey)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-muted-foreground">
            <span>{t('footer.copyright')}</span>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>{t('footer.lastUpdated')}: Jan 27, 2026</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
