import { DEPARTMENT_ICON_COMPONENTS } from "@/lib/department-icons"

export function DepartmentIcon({ icon, className = "h-5 w-5 text-white" }: { icon: string; className?: string }) {
  const Icon = Object.hasOwn(DEPARTMENT_ICON_COMPONENTS, icon.toLowerCase())
    ? DEPARTMENT_ICON_COMPONENTS[icon.toLowerCase()]
    : DEPARTMENT_ICON_COMPONENTS.users
  return <Icon className={className} aria-hidden="true" />
}
