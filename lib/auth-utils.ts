import { currentUser } from "@clerk/nextjs/server"

export async function checkIsSuperAdmin() {
  const user = await currentUser()
  return !!user?.publicMetadata?.is_super_admin
}