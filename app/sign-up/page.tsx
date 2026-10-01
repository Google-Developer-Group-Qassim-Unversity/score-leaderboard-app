import { redirect } from 'next/navigation'
import { getValidatedRedirectParam, withRedirectParam } from '@/lib/redirect-config'

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect_url?: string }>
}) {
  const params = await searchParams
  const redirectUrl = getValidatedRedirectParam(new URLSearchParams(params))
  redirect(withRedirectParam('/sign-in', redirectUrl))
}
