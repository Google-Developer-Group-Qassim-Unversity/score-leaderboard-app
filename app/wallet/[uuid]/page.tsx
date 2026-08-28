import { permanentRedirect } from "next/navigation"

export default function WalletProfileRedirect({ params }: { params: { uuid: string } }) {
  permanentRedirect(`/p/${params.uuid}`)
}
