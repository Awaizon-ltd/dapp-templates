'use client'
import { useRouter } from 'next/navigation'

export function SignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    await fetch('/api/auth/signout', { method: 'POST' })
    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-sm text-[#666] hover:text-[#ededed] transition-colors px-3 py-1.5
                 rounded-lg border border-[#1e1e1e] hover:border-[#333]"
    >
      Sign out
    </button>
  )
}
