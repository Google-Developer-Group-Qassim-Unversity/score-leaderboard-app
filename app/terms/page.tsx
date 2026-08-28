import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, FileText } from "lucide-react"

export const metadata = {
  title: "Terms of Service",
  description: "Read the GDG on Campus terms of service governing use of this site and its features.",
  alternates: {
    canonical: "/terms",
  },
}

export default function TermsOfServicePage() {
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
            <FileText className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Terms of Service</h1>
        </div>
        <p className="text-sm text-slate-500 mb-8">Last updated: August 21, 2026</p>

        <Card className="border-slate-200">
          <CardContent className="prose prose-slate max-w-none pt-6 space-y-6 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Acceptance</h2>
              <p>
                By creating an account or using this site, you agree to these terms. This platform is
                run by GDG on Campus Qassim University as a community, non-commercial leaderboard for
                tracking member participation and points.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Accounts</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>You must provide accurate information when signing up.</li>
                <li>Each person may hold one account. Creating multiple accounts to inflate points is not allowed.</li>
                <li>You&apos;re responsible for keeping your sign-in credentials secure.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Points and the leaderboard</h2>
              <p>
                Points are awarded for participation according to the program&apos;s rules, which may
                change over time. Points have no cash value and cannot be exchanged, transferred, or
                redeemed for money. We may correct, adjust, or remove points in cases of error, fraud,
                or rule violations.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Prohibited conduct</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Submitting false attendance, forms, or activity records.</li>
                <li>Impersonating another member or using someone else&apos;s university ID or email.</li>
                <li>Attempting to disrupt, abuse, or gain unauthorized access to the platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Suspension and termination</h2>
              <p>
                We may suspend or remove an account that violates these terms, including adjusting or
                zeroing out points obtained through prohibited conduct.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Disclaimer</h2>
              <p>
                This platform is provided as-is, run by student volunteers, with no warranty of
                uninterrupted or error-free operation. We aren&apos;t liable for any damages arising
                from your use of the site.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Changes to these terms</h2>
              <p>
                We may update these terms as the platform evolves. Continued use of the site after a
                change means you accept the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Contact</h2>
              <p>
                Questions about these terms:{" "}
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
