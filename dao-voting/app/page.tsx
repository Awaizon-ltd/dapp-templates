'use client'
import { ConnectButton } from '@awarizon/react'
import { ProposalCard } from '@/components/ProposalCard'
import { PROPOSALS } from '@/lib/contracts'

export default function ProposalsPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-10 space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Governance</h1>
          <p className="text-sm text-[#555] mt-0.5">Vote on proposals to shape the protocol.</p>
        </div>
        <ConnectButton />
      </header>

      <div className="space-y-3">
        {PROPOSALS.map(p => (
          <ProposalCard key={String(p.id)} proposal={p} />
        ))}
      </div>
    </main>
  )
}
