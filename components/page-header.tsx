import Image from "next/image"
import { LucideIcon } from "lucide-react"

interface PageHeaderProps {
  icon?: string | LucideIcon
  iconColor?: string
  heading: string
  subHeading: string
}

const colorMap = {
  blue: "from-blue-500 to-blue-600 shadow-blue-500/30",
  green: "from-green-500 to-emerald-600 shadow-green-500/30",
  white: "from-white to-gray-50 shadow-gray-200/50 border border-gray-200",
}

export function PageHeader({ icon, iconColor = "blue", heading, subHeading }: PageHeaderProps) {
  const gradientClasses = colorMap[iconColor as keyof typeof colorMap] || colorMap.blue
  
  // Determine icon type upfront
  let iconElement;
  if (typeof icon === "string") {
    // It's an image path
    iconElement = (
      <Image
        src={icon}
        alt="Logo"
        width={16}
        height={16}
        className="w-full h-full object-contain"
      />
    );
  } else if (icon) {
    // It's a Lucide icon component
    const IconComponent = icon;
    iconElement = <IconComponent className="h-8 w-8 text-white" />;
  }

  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center flex-col md:flex-row gap-4 mb-6">
        <div className="relative">
          <div className={`w-16 h-16 bg-gradient-to-br ${gradientClasses} rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200`}>
            {iconElement}
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">
          {heading}
        </h1>
      </div>
      <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-medium">
        {subHeading}
      </p>
    </div>
  )
}
