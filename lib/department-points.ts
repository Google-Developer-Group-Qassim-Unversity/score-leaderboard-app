import type { ApiDepartmentPoints, ApiDepartmentsPointsResponse } from "@/lib/api/types"
import { isBoardDepartment } from "@/lib/club-structure"

function isRankedDepartment(department: ApiDepartmentPoints): boolean {
  return !isBoardDepartment({
    name: department.department_name,
    ar_name: department.ar_department_name,
  })
}

// Keep the Board in Club Structure, but out of the department points competition.
// Filter before consumers calculate ranks, counts, or homepage preview slices.
export function filterDepartmentPoints(response: ApiDepartmentsPointsResponse): ApiDepartmentsPointsResponse {
  return {
    ...response,
    administrative: response.administrative.filter(isRankedDepartment),
    practical: response.practical.filter(isRankedDepartment),
  }
}
