import type { Metadata } from "next"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { getQueryClient } from "@/lib/query-client"
import { departmentsQuery } from "@/lib/queries"
import { DepartmentsContent } from "./departments-content"
import { getLanguageFromCookies, getTranslation, isRTL } from "@/lib/server-i18n"
import { PageBreadcrumb } from "@/components/page-breadcrumb"

export const metadata: Metadata = {
  title: "Departments",
  description: "See how each GDG on Campus department is ranking by points across specialized and administrative teams.",
  alternates: {
    canonical: "/departments",
  },
}

export default async function DepartmentsLeaderboard() {
  const lang = await getLanguageFromCookies()
  const rtl = isRTL(lang)
  const t = (key: string) => getTranslation(lang, key)

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(departmentsQuery())

  return (
    <div className={`min-h-screen bg-white text-slate-800 ${rtl ? 'rtl' : 'ltr'}`}>
      {/* Content */}
      <div className="">
        <div className="container max-w-6xl mx-auto px-4 py-8">
        <PageBreadcrumb
          className="mb-6"
          items={[
            { label: t('nav.home'), href: '/' },
            { label: t('nav.departments') },
          ]}
        />

        <HydrationBoundary state={dehydrate(queryClient)}>
          <DepartmentsContent
            lang={lang}
            heading={t('departments.heading')}
            subHeadingLabel={t('departments.subHeading')}
            specialized={t('departments.specialized')}
            specializedDesc={t('departments.specializedDesc')}
            administrative={t('departments.administrative')}
            administrativeDesc={t('departments.administrativeDesc')}
          />
        </HydrationBoundary>
        </div>
      </div>
    </div>
  )
}
