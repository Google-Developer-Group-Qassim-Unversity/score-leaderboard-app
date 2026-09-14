"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Cog, Crown, Lightbulb, Sparkles, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DepartmentIcon } from "@/components/club-structure/department-icon"
import type { PublicClubDepartment, PublicClubStructure } from "@/lib/api/types"
import { useClubStructure } from "@/hooks/queries/use-club-structure"
import { getPublicDepartmentColor, getPublicDepartmentIcon, isBoardDepartment } from "@/lib/club-structure"
import "@/lib/i18n-client"

function PeopleList({
  people,
  emptyText,
  prominent = false,
}: {
  people: string[]
  emptyText: string
  prominent?: boolean
}) {
  if (!people.length) return <p className="py-2 text-center text-sm text-slate-500">{emptyText}</p>

  return people.map((person, index) => (
    <div key={`${person}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2">
      <p
        className={`text-center ${prominent ? "text-lg font-bold text-slate-950" : "text-sm font-medium text-slate-700"}`}
      >
        {person}
      </p>
    </div>
  ))
}

function DepartmentCard({
  department,
  cardId,
  highlighted,
  title,
  emptyText,
  leaderLabel,
  deputyLabel,
  membersLabel,
}: {
  department: PublicClubDepartment
  cardId: string
  highlighted: boolean
  title: string
  emptyText: string
  leaderLabel: string
  deputyLabel: string
  membersLabel: string
}) {
  return (
    <Card id={cardId} className="scroll-mt-20 rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg font-bold text-slate-900">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${highlighted ? "animate-[scale_0.6s_ease-in-out]" : ""}`}
            style={{ backgroundColor: getPublicDepartmentColor(department) }}
          >
            <DepartmentIcon icon={getPublicDepartmentIcon(department)} />
          </div>
          {title}
        </CardTitle>
        {(department.leader || department.deputy) && (
          <div className="mt-3 space-y-2">
            {department.leader && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-center text-sm font-medium text-slate-600">{leaderLabel}</p>
                <p className="mt-1 text-center text-lg font-bold text-slate-950">{department.leader}</p>
              </div>
            )}
            {department.deputy && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-center text-sm font-medium text-slate-600">{deputyLabel}</p>
                <p className="mt-1 text-center text-lg font-bold text-slate-950">{department.deputy}</p>
              </div>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-2 pb-6">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Users className="h-4 w-4" />
          {membersLabel}
        </p>
        <PeopleList people={department.members} emptyText={emptyText} />
      </CardContent>
    </Card>
  )
}

export function ClubStructureContent({ data: initialData, loadFailed = false }: { data: PublicClubStructure; loadFailed?: boolean }) {
  const query = useClubStructure(loadFailed ? undefined : initialData)
  const data = query.data ?? initialData
  const { t, i18n } = useTranslation()
  const rtl = i18n.language === "ar"
  const [highlightedCard, setHighlightedCard] = useState<string | null>(null)

  useEffect(() => {
    if (!window.location.hash) return
    const hash = window.location.hash.substring(1)
    let highlightTimer: number | undefined
    const scrollTimer = window.setTimeout(() => {
      const element = document.getElementById(hash)
      if (!element) return
      element.scrollIntoView({ behavior: "smooth", block: "center" })
      setHighlightedCard(hash)
      highlightTimer = window.setTimeout(() => setHighlightedCard(null), 600)
    }, 100)
    return () => {
      window.clearTimeout(scrollTimer)
      if (highlightTimer !== undefined) window.clearTimeout(highlightTimer)
    }
  }, [])

  const boardMembers = data.departments
    .filter(isBoardDepartment)
    .flatMap((department) => department.members)
  const specialized = data.departments.filter(
    (department) => !isBoardDepartment(department) && department.type === "practical",
  )
  const administrative = data.departments.filter(
    (department) => !isBoardDepartment(department) && department.type === "administrative",
  )
  const departmentName = (department: PublicClubDepartment) => (rtl ? department.ar_name : department.name)

  return (
    <div className={`min-h-screen bg-white text-slate-800 ${rtl ? "rtl" : "ltr"}`}>
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-12 text-center">
          <div className="mb-6 flex flex-col items-center justify-center gap-4 md:flex-row">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-500">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{t("clubStructurePage.title")}</h1>
          </div>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">{t("clubStructurePage.subtitle")}</p>
        </div>

        {(query.isError || (loadFailed && !query.data)) && (
          <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-5 text-center">
            <p className="text-sm font-medium text-red-800">{t("clubStructurePage.loadError")}</p>
            <Button className="mt-3" variant="outline" disabled={query.isFetching} onClick={() => void query.refetch()}>
              {t("clubStructurePage.tryAgain")}
            </Button>
          </div>
        )}

        <div className="mt-12 space-y-12">
          <div className="rounded-lg border border-slate-200 bg-white p-8">
            <div className="mb-8 text-center">
              <h2 className="inline-flex items-center gap-3 text-2xl font-bold text-slate-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
                  <Crown className="h-5 w-5 text-white" />
                </span>
                {t("clubStructurePage.leadership")}
              </h2>
            </div>
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
              <Card className="rounded-lg border border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-center gap-3 text-lg font-bold text-slate-900">
                    <Crown className="h-5 w-5 text-blue-600" />
                    {t("clubStructurePage.presidents")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pb-6">
                  <PeopleList
                    people={data.presidents}
                    emptyText={t("clubStructurePage.noAssignments")}
                    prominent
                  />
                </CardContent>
              </Card>
              <Card className="rounded-lg border border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-center gap-3 text-lg font-bold text-slate-900">
                    <span className="flex h-8 w-8 items-center justify-center">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                    </span>
                    {t("clubStructurePage.boardDirectors")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pb-6">
                  <PeopleList people={boardMembers} emptyText={t("clubStructurePage.noAssignments")} prominent />
                </CardContent>
              </Card>
            </div>
          </div>

          <DepartmentSection
            id="specialized-departments"
            icon={<Lightbulb className="h-5 w-5 text-white" />}
            iconColor="bg-purple-500"
            title={t("clubStructurePage.specializedDepts")}
            description={t("clubStructurePage.specializedDesc")}
            departments={specialized}
            idPrefix="dept"
            highlightedCard={highlightedCard}
            departmentName={departmentName}
            t={t}
          />
          <DepartmentSection
            id="administrative-departments"
            icon={<Cog className="h-5 w-5 text-white" />}
            iconColor="bg-emerald-500"
            title={t("clubStructurePage.administrativeDepts")}
            description={t("clubStructurePage.administrativeDesc")}
            departments={administrative}
            idPrefix="admin-dept"
            highlightedCard={highlightedCard}
            departmentName={departmentName}
            t={t}
          />
        </div>
      </div>
    </div>
  )
}

function DepartmentSection({
  id,
  icon,
  iconColor,
  title,
  description,
  departments,
  idPrefix,
  highlightedCard,
  departmentName,
  t,
}: {
  id: string
  icon: React.ReactNode
  iconColor: string
  title: string
  description: string
  departments: PublicClubDepartment[]
  idPrefix: string
  highlightedCard: string | null
  departmentName: (department: PublicClubDepartment) => string
  t: (key: string) => string
}) {
  return (
    <div id={id} className="rounded-lg border border-slate-200 bg-white p-8">
      <div className="mb-8 text-center">
        <h2 className="inline-flex items-center gap-3 text-2xl font-bold text-slate-900">
          <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconColor}`}>{icon}</span>
          {title}
        </h2>
        <p className="mt-2 text-slate-600">{description}</p>
      </div>
      {departments.length ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {departments.map((department, index) => {
            const cardId = `${idPrefix}-${index}`
            return (
              <DepartmentCard
                key={department.id}
                department={department}
                cardId={cardId}
                highlighted={highlightedCard === cardId}
                title={departmentName(department)}
                emptyText={t("clubStructurePage.noMembers")}
                leaderLabel={t("clubStructurePage.deptLeader")}
                deputyLabel={t("clubStructurePage.deptVice")}
                membersLabel={t("clubStructurePage.deptMembers")}
              />
            )
          })}
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-slate-500">{t("clubStructurePage.noDepartments")}</p>
      )}
    </div>
  )
}
