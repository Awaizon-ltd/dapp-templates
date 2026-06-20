'use client'
import { ConnectButton, useSiwe, useWallet } from '@awarizon/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function HomePage() {
  const router = useRouter()
  const { isConnected } = useWallet()

  const { isAuthenticated, isLoading, error, signIn } = useSiwe({
    domain: process.env.NEXT_PUBLIC_APP_DOMAIN!,
    uri: process.env.NEXT_PUBLIC_APP_URL!,
    statement: 'Sign in to access your dashboard.',
    getNonce: () => fetch('/api/auth/nonce').then(r => r.text()),
    onVerify: async ({ message, signature }) => {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, signature }),
      })
      if (!res.ok) throw new Error('Verification failed')
    },
  })

  useEffect(() => {
    if (isAuthenticated) router.push('/dashboard')
  }, [isAuthenticated, router])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Sign in</h1>
          <p className="text-sm text-[#666]">
            Connect your wallet, then sign a message to authenticate.
          </p>
        </div>

        <div className="space-y-4">
          {!isConnected ? (
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          ) : (
            <button
              onClick={signIn}
              disabled={isLoading}
              className="w-full py-3 px-6 rounded-xl bg-white text-black font-semibold text-sm
                         hover:bg-[#ededed] active:scale-95 transition-all disabled:opacity-50
                         disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing…' : 'Sign in with Ethereum'}
            </button>
          )}

          {isConnected && !isLoading && (
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-950/40 border border-red-900/50 rounded-lg px-4 py-3">
            {error.message}
          </p>
        )}

        <p className="text-xs text-[#444]">
          This signs a message only — no transaction, no gas fees.
        </p>
      </div>
    </main>
  )
}
