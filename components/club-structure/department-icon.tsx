import {
  Bot,
  Calendar,
  Cog,
  Gamepad2,
  Lightbulb,
  Megaphone,
  Palette,
  Shield,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

const icons: Record<string, LucideIcon> = {
  bot: Bot,
  calendar: Calendar,
  cog: Cog,
  gamepad2: Gamepad2,
  lightbulb: Lightbulb,
  megaphone: Megaphone,
  palette: Palette,
  shield: Shield,
  sparkles: Sparkles,
  trophy: Trophy,
  users: Users,
}

export function DepartmentIcon({
  icon,
  className = "h-5 w-5 text-white",
}: {
  icon: string
  className?: string
}) {
  const Icon = icons[icon.toLowerCase()]
  if (Icon) return <Icon className={className} aria-hidden="true" />

  return (
    <span className="max-w-full truncate text-lg leading-none text-white" aria-hidden="true">
      {icon}
    </span>
  )
}
