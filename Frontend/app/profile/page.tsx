import { redirect } from 'next/navigation'

export default function ProfilePage() {
  // Redirect to home since we're using UserButton modal instead
  redirect('/')
}
