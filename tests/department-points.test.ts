// Run with: npx tsx --test tests/department-points.test.ts
import assert from "node:assert/strict"
import { test } from "node:test"
import { filterDepartmentPoints } from "../lib/department-points"
import type { ApiDepartmentPoints, ApiDepartmentsPointsResponse } from "../lib/api/types"

function department(
  id: number,
  name: string,
  arabicName: string,
  totalPoints = 0,
  type = "administrative",
): ApiDepartmentPoints {
  return {
    department_id: id,
    department_name: name,
    ar_department_name: arabicName,
    department_type: type,
    total_points: totalPoints,
  }
}

test("excludes the Board by its English or Arabic name, not a database ID or points total", () => {
  for (const [name, arabicName] of [
    ["Board of Directors", "مجلس الإدارة"],
    ["BOARD OF DIRECTORS", ""],
    ["Club Council", "مجلس الإدارة"],
    ["Club Council", "مجلس الادارة"],
  ]) {
    const board = department(982, name, arabicName, 500)
    const input = { administrative: [board], practical: [board] }
    assert.deepEqual(filterDepartmentPoints(input), { administrative: [], practical: [] })
  }
})

test("keeps Operations and other zero-point departments, preserving their order and scores", () => {
  const operations = department(5, "Operations", "إدارة التشغيل", 0)
  const media = department(9, "Media", "الإعلام", 30)
  const design = department(10, "Design", "التصميم", 0, "practical")
  const board = department(12, "Board", "مجلس الإدارة", 100)
  assert.deepEqual(
    filterDepartmentPoints({ administrative: [board, media, operations], practical: [design] }),
    { administrative: [media, operations], practical: [design] },
  )
})

test("removes the Board before ranking, counting, and choosing homepage leaders", () => {
  const board = department(100, "Board", "مجلس الإدارة", 100)
  const teams = [
    department(1, "Media", "الإعلام", 90),
    department(2, "Operations", "التشغيل", 80),
    department(3, "Events", "الفعاليات", 70),
  ]
  const ranked = filterDepartmentPoints({ administrative: [board, ...teams], practical: [] })
  assert.deepEqual(ranked.administrative.slice(0, 3), teams)
  assert.equal(ranked.administrative.length + ranked.practical.length, 3)
  assert.deepEqual(
    ranked.administrative.map((item, index) => [item.department_id, index + 1]),
    [[1, 1], [2, 2], [3, 3]],
  )
})

test("does not mutate API data, and handles empty categories", () => {
  const input: ApiDepartmentsPointsResponse = {
    administrative: [department(25, "Board", "مجلس الإدارة"), department(5, "Operations", "التشغيل")],
    practical: [],
  }
  const original = structuredClone(input)
  Object.freeze(input.administrative)
  Object.freeze(input.practical)
  Object.freeze(input)
  filterDepartmentPoints(input)
  assert.deepEqual(input, original)
  assert.deepEqual(filterDepartmentPoints({ administrative: [], practical: [] }), { administrative: [], practical: [] })
})
