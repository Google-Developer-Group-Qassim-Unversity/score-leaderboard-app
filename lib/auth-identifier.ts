export function asUniversityEmail(value: string): string | null {
  const universityId = value.trim()
  return /^\d{9}$/.test(universityId) ? `${universityId}@qu.edu.sa` : null
}
