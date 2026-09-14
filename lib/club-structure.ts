import type { PublicClubDepartment } from "@/lib/api/types"

export function isBoardDepartment(department: Pick<PublicClubDepartment, "name" | "ar_name">): boolean {
  const englishName = department.name.trim().toLowerCase()
  const arabicName = department.ar_name.trim().replaceAll("إ", "ا")

  return englishName.includes("board") || arabicName.includes("مجلس الادارة")
}

const legacyIcons: { terms: string[]; icon: string }[] = [
  { terms: ["technical development", "التطوير التقني"], icon: "cog" },
  { terms: ["programs", "البرامج"], icon: "calendar" },
  { terms: ["media", "الاعلام"], icon: "megaphone" },
  { terms: ["design", "التصميم"], icon: "palette" },
  { terms: ["robotics", "الروبوتات"], icon: "bot" },
  { terms: ["artificial intelligence", "الذكاء الاصطناعي"], icon: "lightbulb" },
  { terms: ["entrepreneurship", "ريادة الاعمال"], icon: "trophy" },
  { terms: ["esports", "الرياضات الالكترونية"], icon: "gamepad2" },
  { terms: ["innovation", "الابتكار"], icon: "lightbulb" },
  { terms: ["operations", "التشغيل"], icon: "shield" },
]

export function getPublicDepartmentIcon(department: PublicClubDepartment): string {
  if (department.icon.toLowerCase() !== "users") return department.icon

  const names = `${department.name} ${department.ar_name}`
    .toLowerCase()
    .replaceAll("إ", "ا")
    .replaceAll("أ", "ا")
  return legacyIcons.find(({ terms }) => terms.some((term) => names.includes(term)))?.icon ?? department.icon
}
