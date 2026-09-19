import type { Metadata } from "next"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { currentUser } from "@clerk/nextjs/server"
import { getQueryClient } from "@/lib/query-client"
import { membersQuery } from "@/lib/queries"
import { MembersContent } from "./members-content"
import { getLanguageFromCookies, getTranslation, isRTL } from "@/lib/server-i18n"
import { PageBreadcrumb } from "@/components/page-breadcrumb"

export const metadata: Metadata = {
  title: "Members Leaderboard",
  description: "See the GDG on Campus members leaderboard, ranked by points earned across events and activities.",
  alternates: {
    canonical: "/members",
  },
}

export default async function MembersLeaderboard() {
  const lang = await getLanguageFromCookies()
  const rtl = isRTL(lang)
  const t = (key: string) => getTranslation(lang, key)

  const queryClient = getQueryClient()

  // Prefetch on the server so the HTML ships with real rows (good for SEO and
  // first paint), then hand the same cache to the client.
  const [user] = await Promise.all([
    currentUser(),
    queryClient.prefetchQuery(membersQuery()),
  ])

  const uniId = user?.publicMetadata?.uni_id as string | undefined
  const fullArabicName = user?.publicMetadata?.fullArabicName as string | undefined

  return (
    <div className={`min-h-screen bg-white text-slate-800 ${rtl ? 'rtl' : 'ltr'}`}>
      {/* Content */}
      <div className="">
        <div className="container max-w-6xl mx-auto px-4 py-8 pb-32">
          <PageBreadcrumb
            className="mb-6"
            items={[
              { label: t('nav.home'), href: '/' },
              { label: t('nav.members') },
            ]}
          />

          <HydrationBoundary state={dehydrate(queryClient)}>
            <MembersContent
              heading={t('members.heading')}
              subHeadingLabel={t('members.subHeading')}
              currentUniId={uniId}
              currentUserName={fullArabicName}
            />
          </HydrationBoundary>
        </div>
      </div>
    </div>
  )
}
