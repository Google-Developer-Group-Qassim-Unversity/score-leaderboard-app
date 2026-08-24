import type { MetadataRoute } from "next"
import { config } from "@/lib/config"
import { fetchEvents, fetchMembers, fetchDepartments } from "@/lib/api/api"
import { getAllMagazines } from "@/lib/magazines"

const baseUrl = config.thisAppUrl

const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${baseUrl}/`, changeFrequency: "daily", priority: 1 },
  { url: `${baseUrl}/events`, changeFrequency: "daily", priority: 0.9 },
  { url: `${baseUrl}/members`, changeFrequency: "daily", priority: 0.8 },
  { url: `${baseUrl}/departments`, changeFrequency: "daily", priority: 0.8 },
  { url: `${baseUrl}/magazines`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${baseUrl}/club-structure`, changeFrequency: "monthly", priority: 0.5 },
  { url: `${baseUrl}/how`, changeFrequency: "monthly", priority: 0.5 },
  { url: `${baseUrl}/stats`, changeFrequency: "monthly", priority: 0.5 },
  { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [eventsResult, membersResult, departmentsResult] = await Promise.allSettled([
    fetchEvents(),
    fetchMembers(),
    fetchDepartments(),
  ])

  const eventRoutes: MetadataRoute.Sitemap =
    eventsResult.status === "fulfilled"
      ? eventsResult.value
          .filter((e) => e.status !== "draft" && e.location_type !== "none")
          .map((e) => ({
            url: `${baseUrl}/events/${e.id}`,
            lastModified: e.created_at ?? undefined,
            changeFrequency: "weekly",
            priority: 0.6,
          }))
      : []

  const memberRoutes: MetadataRoute.Sitemap =
    membersResult.status === "fulfilled"
      ? membersResult.value.map((m) => ({
          url: `${baseUrl}/members/${m.member_id}`,
          changeFrequency: "weekly",
          priority: 0.4,
        }))
      : []

  const departmentRoutes: MetadataRoute.Sitemap =
    departmentsResult.status === "fulfilled"
      ? [
          ...departmentsResult.value.administrative,
          ...departmentsResult.value.practical,
        ].map((d) => ({
          url: `${baseUrl}/departments/${d.department_id}`,
          changeFrequency: "weekly",
          priority: 0.5,
        }))
      : []

  const magazineRoutes: MetadataRoute.Sitemap = getAllMagazines().map((m) => ({
    url: `${baseUrl}/magazines/${m.id}`,
    lastModified: m.publishDate,
    changeFrequency: "yearly",
    priority: 0.4,
  }))

  return [
    ...staticRoutes,
    ...eventRoutes,
    ...memberRoutes,
    ...departmentRoutes,
    ...magazineRoutes,
  ]
}
