'use client'
import { useReadContract } from '@awarizon/react'
import Link from 'next/link'
import { GOVERNOR_ADDRESS } from '@/lib/contracts'
import { GOVERNOR_ABI, PROPOSAL_STATES } from '@/lib/abi'
import type { Proposal } from '@/lib/contracts'

const STATE_STYLES: Record<string, string> = {
  Active:    'bg-green-950/50 text-green-400 border-green-900/40',
  Pending:   'bg-yellow-950/50 text-yellow-400 border-yellow-900/40',
  Succeeded: 'bg-blue-950/50 text-blue-400 border-blue-900/40',
  Defeated:  'bg-red-950/50 text-red-400 border-red-900/40',
  Executed:  'bg-[#1e1e1e] text-[#666] border-[#2a2a2a]',
  Canceled:  'bg-[#1e1e1e] text-[#666] border-[#2a2a2a]',
}

export function ProposalCard({ proposal }: { proposal: Proposal }) {
  const { data: stateRaw } = useReadContract<number>({
    address: GOVERNOR_ADDRESS,
    abi: GOVERNOR_ABI,
    method: 'state',
    args: [proposal.id],
    pollingInterval: 30_000,
  })

  const stateLabel = stateRaw !== null && stateRaw !== undefined
    ? (PROPOSAL_STATES[stateRaw] ?? 'Unknown')
    : '…'

  const stateStyle = STATE_STYLES[stateLabel] ?? 'bg-[#1e1e1e] text-[#666] border-[#2a2a2a]'

  return (
    <Link
      href={`/proposal/${proposal.id}`}
      className="block rounded-2xl border border-[#1e1e1e] bg-[#111] p-6 space-y-3
                 hover:border-[#333] transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-sm font-semibold leading-snug">{proposal.title}</h2>
        <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full border ${stateStyle}`}>
          {stateLabel}
        </span>
      </div>
      <p className="text-sm text-[#666] line-clamp-2">{proposal.description}</p>
      <p className="text-xs text-[#444]">Proposal #{String(proposal.id)} · View details →</p>
    </Link>
  )
}
