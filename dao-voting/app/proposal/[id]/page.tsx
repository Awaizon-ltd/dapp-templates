'use client'
import { ConnectButton, useReadContract, useWallet } from '@awarizon/react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { formatUnits } from 'viem'
import { GOVERNOR_ADDRESS, PROPOSALS, GOV_TOKEN_ADDRESS } from '@/lib/contracts'
import { GOVERNOR_ABI, VOTES_ABI, PROPOSAL_STATES } from '@/lib/abi'
import { VoteButtons } from '@/components/VoteButtons'

const STATE_STYLES_MAP: Record<string, string> = {
  Active:    'bg-green-950/50 text-green-400 border-green-900/40',
  Pending:   'bg-yellow-950/50 text-yellow-400 border-yellow-900/40',
  Succeeded: 'bg-blue-950/50 text-blue-400 border-blue-900/40',
  Defeated:  'bg-red-950/50 text-red-400 border-red-900/40',
  Executed:  'bg-[#1e1e1e] text-[#666] border-[#2a2a2a]',
  Canceled:  'bg-[#1e1e1e] text-[#666] border-[#2a2a2a]',
}

export default function ProposalDetailPage() {
  const { id } = useParams<{ id: string }>()
  const proposalId = BigInt(id)
  const { address } = useWallet()

  const proposal = PROPOSALS.find(p => p.id === proposalId)

  const { data: stateRaw } = useReadContract<number>({
    address: GOVERNOR_ADDRESS,
    abi: GOVERNOR_ABI,
    method: 'state',
    args: [proposalId],
    pollingInterval: 30_000,
  })

  const { data: votes } = useReadContract<[bigint, bigint, bigint]>({
    address: GOVERNOR_ADDRESS,
    abi: GOVERNOR_ABI,
    method: 'proposalVotes',
    args: [proposalId],
    pollingInterval: 15_000,
  })

  const { data: votingPower } = useReadContract<bigint>({
    address: GOV_TOKEN_ADDRESS,
    abi: VOTES_ABI,
    method: 'getVotes',
    args: [address ?? '0x0000000000000000000000000000000000000000'],
  })

  const stateLabel = stateRaw !== null && stateRaw !== undefined
    ? (PROPOSAL_STATES[stateRaw] ?? 'Unknown')
    : '…'

  const stateStyle = STATE_STYLES_MAP[stateLabel] ?? 'bg-[#1e1e1e] text-[#666] border-[#2a2a2a]'

  const [againstVotes, forVotes, abstainVotes] = votes ?? [0n, 0n, 0n]
  const totalVotes = forVotes + againstVotes + abstainVotes
  const forPct     = totalVotes > 0n ? Number((forVotes * 100n) / totalVotes) : 0
  const againstPct = totalVotes > 0n ? Number((againstVotes * 100n) / totalVotes) : 0

  return (
    <main className="max-w-2xl mx-auto px-6 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-sm text-[#555] hover:text-[#ededed] transition-colors">
          ← Proposals
        </Link>
        <ConnectButton />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className={`text-xs px-2 py-0.5 rounded-full border ${stateStyle}`}>
            {stateLabel}
          </span>
          <span className="text-xs text-[#444]">Proposal #{id}</span>
        </div>
        <h1 className="text-xl font-bold leading-snug">
          {proposal?.title ?? `Proposal #${id}`}
        </h1>
        {proposal?.description && (
          <p className="text-sm text-[#777] leading-relaxed">{proposal.description}</p>
        )}
      </div>

      <div className="rounded-2xl border border-[#1e1e1e] bg-[#111] p-6 space-y-4">
        <p className="text-xs text-[#555] uppercase tracking-widest">Vote Tally</p>

        <div className="space-y-3">
          {[
            { label: 'For',     value: forVotes,     pct: forPct,     color: 'bg-green-500' },
            { label: 'Against', value: againstVotes, pct: againstPct, color: 'bg-red-500'   },
          ].map(row => (
            <div key={row.label} className="space-y-1">
              <div className="flex justify-between text-xs text-[#666]">
                <span>{row.label}</span>
                <span>{Number(formatUnits(row.value, 18)).toLocaleString()} ({row.pct}%)</span>
              </div>
              <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        {address && votingPower !== null && (
          <p className="text-xs text-[#555]">
            Your voting power:{' '}
            <span className="text-[#888]">
              {Number(formatUnits(votingPower ?? 0n, 18)).toLocaleString()} votes
            </span>
          </p>
        )}
      </div>

      <VoteButtons proposalId={proposalId} />
    </main>
  )
}
