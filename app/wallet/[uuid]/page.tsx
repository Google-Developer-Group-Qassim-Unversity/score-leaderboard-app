import { redirect } from "next/navigation"

export default function WalletProfileRedirect({ params }: { params: { uuid: string } }) {
  redirect(`/p/${params.uuid}`)
}
