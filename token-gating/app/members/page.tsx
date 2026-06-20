'use client'
import { ConnectButton, useNFT, useWallet } from '@awarizon/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GATE_NFT_ADDRESS, GATE_NFT_NAME } from '@/lib/contracts'

export default function MembersPage() {
  const router = useRouter()
  const { address, isConnected } = useWallet()
  const { balanceOf } = useNFT(GATE_NFT_ADDRESS)
  const [status, setStatus] = useState<'checking' | 'ok' | 'denied'>('checking')

  useEffect(() => {
    if (!isConnected || !address) {
      setStatus('denied')
      return
    }
    balanceOf(address)
      .then(bal => setStatus(bal > 0n ? 'ok' : 'denied'))
      .catch(() => setStatus('denied'))
  }, [address, isConnected, balanceOf])

  if (!isConnected) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-[#666]">Connect your wallet to view this page.</p>
          <ConnectButton />
        </div>
      </main>
    )
  }

  if (status === 'checking') {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-[#333] border-t-[#666] rounded-full animate-spin" />
      </main>
    )
  }

  if (status === 'denied') {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-sm">
          <p className="text-2xl">🚫</p>
          <p className="font-semibold">Access Denied</p>
          <p className="text-sm text-[#666]">
            You need a <span className="text-[#ededed]">{GATE_NFT_NAME}</span> NFT.
          </p>
          <button
            onClick={() => router.push('/')}
            className="text-sm text-[#555] hover:text-[#ededed] transition-colors"
          >
            ← Go back
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 space-y-10">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs text-[#555] uppercase tracking-widest mb-1">Members Area</p>
          <h1 className="text-2xl font-bold">Welcome back</h1>
        </div>
        <ConnectButton />
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { emoji: '📄', title: 'Exclusive Guides', desc: 'In-depth resources available only to NFT holders.' },
          { emoji: '🎙️', title: 'Private Drops', desc: 'Early access to new releases before anyone else.' },
          { emoji: '💬', title: 'Discord Role', desc: 'Auto-verified role for the holders-only channel.' },
          { emoji: '🗳️', title: 'Governance', desc: 'Vote on community decisions and roadmap priorities.' },
        ].map(card => (
          <div
            key={card.title}
            className="rounded-2xl border border-[#1e1e1e] bg-[#111] p-6 space-y-2"
          >
            <p className="text-2xl">{card.emoji}</p>
            <p className="font-semibold">{card.title}</p>
            <p className="text-sm text-[#666]">{card.desc}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
