import { permanentRedirect } from "next/navigation"

export default async function WalletProfileRedirect({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params
  permanentRedirect(`/p/${uuid}`)
}
