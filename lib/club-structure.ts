import type { PublicClubDepartment } from "@/lib/api/types"

export function isBoardDepartment(department: Pick<PublicClubDepartment, "name" | "ar_name">): boolean {
  const englishName = department.name.trim().toLowerCase()
  const arabicName = department.ar_name.trim().replaceAll("إ", "ا")

  return englishName.includes("board") || arabicName.includes("مجلس الادارة")
}
