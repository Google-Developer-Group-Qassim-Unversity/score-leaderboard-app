import { redirect } from "next/navigation"

export default function ShortProfileRedirect({ params }: { params: { uuid: string } }) {
  redirect(`/wallet/${params.uuid}`)
}
