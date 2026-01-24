import { LucideIcon } from 'lucide-react'

interface SectionHeaderProps {
  icon: LucideIcon
  title: string
  color: 'blue' | 'pink' | 'green'
}

const colorClasses = {
  blue: {
    badge: 'bg-gradient-to-br from-blue-500 to-blue-600',
  },
  pink: {
    badge: 'bg-gradient-to-br from-pink-500 to-pink-600',
  },
  green: {
    badge: 'bg-gradient-to-br from-green-500 to-green-600',
  }
}

export function SectionHeader({ icon: Icon, title, color }: SectionHeaderProps) {
  const classes = colorClasses[color]
  
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-1.5 ${classes.badge} rounded-lg`}>
        <Icon className="h-4 w-4 text-white" />
      </div>
      <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
        {title}
      </h3>
      <div className="flex-1 h-px bg-slate-200"></div>
    </div>
  )
}
