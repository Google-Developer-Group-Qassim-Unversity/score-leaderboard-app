import type { PublicClubDepartment } from "@/lib/api/types"

export function isBoardDepartment(department: Pick<PublicClubDepartment, "name" | "ar_name">): boolean {
  const englishName = department.name.trim().toLowerCase()
  const arabicName = department.ar_name.trim().replaceAll("إ", "ا")

  return englishName.includes("board") || arabicName.includes("مجلس الادارة")
}

const legacyStyles: { terms: string[]; icon: string; color: string }[] = [
  { terms: ["technical development", "التطوير التقني"], icon: "cog", color: "#3b82f6" },
  { terms: ["programs", "البرامج"], icon: "calendar", color: "#f97316" },
  { terms: ["media", "الاعلام"], icon: "megaphone", color: "#a855f7" },
  { terms: ["design", "التصميم"], icon: "palette", color: "#22c55e" },
  { terms: ["robotics", "الروبوتات"], icon: "bot", color: "#eab308" },
  { terms: ["artificial intelligence", "الذكاء الاصطناعي"], icon: "lightbulb", color: "#ef4444" },
  { terms: ["entrepreneurship", "ريادة الاعمال"], icon: "trophy", color: "#3b82f6" },
  { terms: ["esports", "الرياضات الالكترونية"], icon: "gamepad2", color: "#ef4444" },
  { terms: ["innovation", "الابتكار"], icon: "lightbulb", color: "#ef4444" },
  { terms: ["operations", "التشغيل"], icon: "shield", color: "#ef4444" },
  { terms: ["general activities", "الانشطة العامة"], icon: "users", color: "#22c55e" },
]

function getLegacyStyle(department: PublicClubDepartment) {
  const names = `${department.name} ${department.ar_name}`
    .toLowerCase()
    .replaceAll("إ", "ا")
    .replaceAll("أ", "ا")
  return legacyStyles.find(({ terms }) => terms.some((term) => names.includes(term)))
}

export function getPublicDepartmentIcon(department: PublicClubDepartment): string {
  if (department.icon.toLowerCase() !== "users") return department.icon

  return getLegacyStyle(department)?.icon ?? department.icon
}

export function getPublicDepartmentColor(department: PublicClubDepartment): string {
  if (department.color.toLowerCase() !== "#4285f4") return department.color
  return getLegacyStyle(department)?.color ?? department.color
}
