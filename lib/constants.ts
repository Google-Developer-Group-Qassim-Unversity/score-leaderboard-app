export const CURRENT_SEMESTER = 472
export const AVAILABLE_SEMESTERS = [471, 472] as const
export type Semester = typeof AVAILABLE_SEMESTERS[number]

export const EVENTS_SEMESTER_OPTIONS = [
  { value: null, labelKey: "semester.all" },
  { value: 472, labelKey: "472" },
  { value: 471, labelKey: "471" },
] as const
export type EventsSemesterOption = typeof EVENTS_SEMESTER_OPTIONS[number]
