import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield } from "lucide-react"

export const metadata = {
  title: "Privacy Policy",
}

export default function PrivacyPolicyPage() {
  return (
    <div dir="ltr" className="min-h-screen bg-white text-slate-800">
      <div className="container max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Privacy Policy</h1>
        </div>
        <p className="text-sm text-slate-500 mb-8">Last updated: August 21, 2026</p>

        <Card className="border-slate-200">
          <CardContent className="prose prose-slate max-w-none pt-6 space-y-6 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Who we are</h2>
              <p>
                This site is run by GDG on Campus Qassim University, a community chapter of Google
                Developer Groups. This policy explains what information we collect through the
                leaderboard platform and how we use it.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">What we collect</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Account information from sign-in: your email address, and if you sign in with Google, your name and Google account email.</li>
                <li>Profile information you provide: your name, university ID, college, academic level, gender, and optionally a phone number.</li>
                <li>Activity data: points earned, event attendance, and form submissions related to club activities.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">How we use it</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>To operate the points leaderboard and track your participation.</li>
                <li>To verify eligibility for university-affiliated activities.</li>
                <li>To contact you about events, points, or issues with your account.</li>
                <li>To display your name, department, and points on the public leaderboard.</li>
              </ul>
              <p className="mt-2">
                Your points, rank, and name may be visible to other users on the public leaderboard.
                Your email, phone number, and university ID are never shown publicly.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Third parties</h2>
              <p>
                We use <strong>Clerk</strong> to handle authentication (including Google sign-in), and
                standard hosting/analytics providers to run the site. We don&apos;t sell your data or
                share it with advertisers.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Data retention and deletion</h2>
              <p>
                We keep your account and activity data for as long as your account is active. You can
                request that your account and associated data be deleted at any time by emailing us
                below.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Changes to this policy</h2>
              <p>
                We may update this policy as the platform changes. Material changes will be reflected
                by updating the date at the top of this page.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Contact</h2>
              <p>
                Questions or deletion requests:{" "}
                <a href="mailto:GDG_QU1@gmail.com" className="text-blue-600 hover:underline">
                  GDG_QU1@gmail.com
                </a>
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
