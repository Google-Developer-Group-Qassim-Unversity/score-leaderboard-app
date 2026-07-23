export function getSemesterQueryString(basePath: string, semester: number | undefined, currentSemester: number) {
  if (!semester || semester === currentSemester) {
    return basePath
  }
  return `${basePath}?semester=${semester}`
}
