import { LucideIcon } from 'lucide-react'

interface SectionHeaderProps {
  icon: LucideIcon
  title: string
  color: 'blue' | 'pink' | 'green'
}

const colorClasses = {
  blue: {
    badge: 'bg-gradient-to-br from-blue-500 to-blue-600',
    text: 'text-blue-700',
    line: 'bg-gradient-to-r from-blue-300 to-transparent'
  },
  pink: {
    badge: 'bg-gradient-to-br from-pink-500 to-pink-600',
    text: 'text-pink-700',
    line: 'bg-gradient-to-r from-pink-300 to-transparent'
  },
  green: {
    badge: 'bg-gradient-to-br from-green-500 to-green-600',
    text: 'text-green-700',
    line: 'bg-gradient-to-r from-green-300 to-transparent'
  }
}

export function SectionHeader({ icon: Icon, title, color }: SectionHeaderProps) {
  const classes = colorClasses[color]
  
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-1.5 ${classes.badge} rounded-lg shadow-sm`}>
        <Icon className="h-4 w-4 text-white" />
      </div>
      <h3 className={`text-sm font-bold ${classes.text} uppercase tracking-wider`}>
        {title}
      </h3>
      <div className={`flex-1 h-px ${classes.line}`}></div>
    </div>
  )
}
