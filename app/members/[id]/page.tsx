import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Award, TrendingUp, Users, BookOpen } from "lucide-react"
import { fetchMemberById } from "@/lib/api"
import { notFound } from "next/navigation"
import { getLanguageFromCookies, getTranslation, isRTL } from "@/lib/server-i18n"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function MemberDetailPage({ params }: PageProps) {
  const { id } = await params
  const memberData = await fetchMemberById(id)
  const lang = await getLanguageFromCookies()
  const t = (key: string) => getTranslation(lang, key)
  const rtl = isRTL(lang)

  if (!memberData) {
    notFound()
  }

  return (
    <div className={`min-h-screen bg-white text-slate-800 ${rtl ? 'rtl' : 'ltr'}`}>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{memberData.member.member_name}</h1>
              <p className="text-gray-600 dark:text-gray-300">{t("memberDetail.detailedLog")}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Member Info */}
          <div className="lg:col-span-1">
            <Card className="bg-white/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  {t("memberDetail.memberProfile")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{memberData.member.member_name}</h2>
                  <p className="text-gray-500">{t("memberDetail.member")}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{t("memberDetail.totalPoints")}</span>
                    <span className="font-bold text-blue-600 text-lg">{memberData.member.total_points ?? 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Points History */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  {t("memberDetail.pointsHistory")}
                </CardTitle>
                <CardDescription>{t("memberDetail.detailedLog")}</CardDescription>
              </CardHeader>
              <CardContent>
                {memberData.events.length > 0 ? (
                  <div className="space-y-3">
                    {memberData.events.map((event, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{event.event_name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {lang === 'ar' && event.ar_action_name ? event.ar_action_name : event.action_name}
                            </p>
                            <p className="text-sm text-gray-500">{new Date(event.start_datetime).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600 text-lg">+{event.points}</p>
                          <p className="text-xs text-gray-500">{t("memberDetail.points")}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">{t("memberDetail.noHistory")}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
