import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { SignOutButton } from './SignOutButton'

export default async function DashboardPage() {
  const session = await getSession()

  if (!session.address) {
    redirect('/')
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <SignOutButton />
        </header>

        <div className="rounded-2xl border border-[#1e1e1e] bg-[#111] p-6 space-y-4">
          <p className="text-xs text-[#555] uppercase tracking-widest font-medium">
            Authenticated Session
          </p>

          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-xs text-[#666]">Address</p>
              <p className="font-mono text-sm break-all">{session.address}</p>
            </div>
            {session.chainId && (
              <div className="space-y-1">
                <p className="text-xs text-[#666]">Chain ID</p>
                <p className="font-mono text-sm">{session.chainId}</p>
              </div>
            )}
          </div>
        </div>

        <p className="text-sm text-[#444]">
          This page is server-rendered. The session is stored in an encrypted cookie via{' '}
          <code className="text-[#888] text-xs">iron-session</code> and verified server-side on
          every request.
        </p>
      </div>
    </main>
  )
}
