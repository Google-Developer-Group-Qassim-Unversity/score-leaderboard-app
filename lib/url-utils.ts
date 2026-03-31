import { CURRENT_SEMESTER } from "@/lib/config"

export function getSemesterQueryString(basePath: string, semester?: number) {
  if (!semester || semester === CURRENT_SEMESTER) {
    return basePath
  }
  return `${basePath}?semester=${semester}`
}