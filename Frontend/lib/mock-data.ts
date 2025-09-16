import type { Member, Department, PointsHistoryEntry, LeaderboardSummary } from "./types"

// Mock departments - keeping for fallback
export const mockDepartments: Department[] = [
  { id: "dept-1", name: "Engineering", totalPoints: 324, rank: 1 },
  { id: "dept-2", name: "Marketing", totalPoints: 288, rank: 2 },
  { id: "dept-3", name: "Sales", totalPoints: 276, rank: 3 },
  { id: "dept-4", name: "HR", totalPoints: 240, rank: 4 },
  { id: "dept-5", name: "Finance", totalPoints: 216, rank: 5 },
  { id: "dept-6", name: "Operations", totalPoints: 192, rank: 6 },
  { id: "dept-7", name: "Customer Success", totalPoints: 168, rank: 7 },
  { id: "dept-8", name: "Legal", totalPoints: 144, rank: 8 },
]

// Generate mock members (100+ people) - keeping for fallback
export const mockMembers: Member[] = Array.from({ length: 120 }, (_, i) => {
  const names = [
    "Alex Anderson",
    "Blake Bennett",
    "Casey Cooper",
    "Drew Davis",
    "Emery Evans",
    "Finley Foster",
    "Gray Green",
    "Harper Hall",
    "Indigo Jackson",
    "Jordan Jones",
    "Kai Kelly",
    "Lane Lewis",
    "Morgan Miller",
    "Nova Nelson",
    "Oakley Oliver",
    "Parker Phillips",
    "Quinn Roberts",
    "River Robinson",
    "Sage Smith",
    "Taylor Turner",
    "Uma Underwood",
    "Vale Valdez",
    "Wren Walker",
    "Xander Xavier",
    "Yara Young",
    "Zara Zhang",
    "Adrian Adams",
    "Brooke Baker",
    "Cameron Clark",
    "Devin Diaz",
  ]

  const departmentIds = mockDepartments.map((d) => d.id)
  const randomDept = departmentIds[i % departmentIds.length]

  return {
    id: `member-${i + 1}`,
    name: names[i % names.length] || `Employee ${i + 1}`,
    totalPoints: Math.floor(Math.random() * 200) + 20,
    rank: i + 1,
    departmentId: randomDept,
    isManager: false, // Set all to false since we removed managers
  }
})
  .sort((a, b) => b.totalPoints - a.totalPoints)
  .map((member, index) => ({
    ...member,
    rank: index + 1,
  }))

// Mock points history - keeping for now as requested
export const mockPointsHistory: PointsHistoryEntry[] = [
  // Member entries
  {
    id: "hist-1",
    date: "2024-01-15",
    source: "attended on-site course",
    points: 6,
    entityId: "member-1",
    entityType: "member",
  },
  {
    id: "hist-2",
    date: "2024-01-20",
    source: "attended on-site course",
    points: 6,
    entityId: "member-1",
    entityType: "member",
  },
  {
    id: "hist-3",
    date: "2024-02-05",
    source: "attended on-site course",
    points: 6,
    entityId: "member-2",
    entityType: "member",
  },
  {
    id: "hist-4",
    date: "2024-02-10",
    source: "attended on-site course",
    points: 6,
    entityId: "member-3",
    entityType: "member",
  },

  // Department entries
  {
    id: "hist-5",
    date: "2024-01-15",
    source: "on-site course",
    points: 12,
    entityId: "dept-1",
    entityType: "department",
  },
  {
    id: "hist-6",
    date: "2024-01-20",
    source: "on-site course",
    points: 12,
    entityId: "dept-1",
    entityType: "department",
  },
  {
    id: "hist-7",
    date: "2024-02-05",
    source: "on-site course",
    points: 12,
    entityId: "dept-2",
    entityType: "department",
  },
]

export const getLeaderboardSummary = async (): Promise<LeaderboardSummary> => {
  // For now, return mock data - will be updated to use API data
  return {
    topMembers: mockMembers.slice(0, 5),
    topDepartments: mockDepartments.slice(0, 3),
    totalMembers: mockMembers.length,
    totalDepartments: mockDepartments.length,
  }
}

export const getPointsHistory = (entityId: string): PointsHistoryEntry[] => {
  return mockPointsHistory.filter((entry) => entry.entityId === entityId)
}
