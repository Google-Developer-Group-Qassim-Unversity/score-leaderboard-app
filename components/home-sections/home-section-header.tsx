import type { LucideIcon } from "lucide-react"

interface HomeSectionHeaderProps {
  icon: LucideIcon
  title: string
  subtitle: string
}

export function HomeSectionHeader({ icon: Icon, title, subtitle }: HomeSectionHeaderProps) {
  return (
    <div className="text-center mb-8 space-y-3">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-xl border border-slate-200">
        <Icon className="w-6 h-6 text-slate-700" />
      </div>
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  )
}
