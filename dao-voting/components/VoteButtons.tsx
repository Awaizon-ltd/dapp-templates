'use client'
import { useWriteContract, useReadContract, useWallet } from '@awarizon/react'
import { GOVERNOR_ADDRESS } from '@/lib/contracts'
import { GOVERNOR_ABI, VOTE_SUPPORT } from '@/lib/abi'

export function VoteButtons({ proposalId }: { proposalId: bigint }) {
  const { address, isConnected } = useWallet()

  const { data: hasVoted, refetch: refetchVoted } = useReadContract<boolean>({
    address: GOVERNOR_ADDRESS,
    abi: GOVERNOR_ABI,
    method: 'hasVoted',
    args: [proposalId, address ?? '0x0000000000000000000000000000000000000000'],
  })

  const { data: stateRaw } = useReadContract<number>({
    address: GOVERNOR_ADDRESS,
    abi: GOVERNOR_ABI,
    method: 'state',
    args: [proposalId],
  })

  const { write, isLoading, isSuccess, error, reset } = useWriteContract({
    address: GOVERNOR_ADDRESS,
    abi: GOVERNOR_ABI,
    method: 'castVote',
  })

  const isActive = stateRaw === 1

  async function vote(support: number) {
    await write(proposalId, support)
    refetchVoted()
  }

  if (!isConnected) {
    return <p className="text-sm text-[#555]">Connect your wallet to vote.</p>
  }

  if (!isActive) {
    return <p className="text-sm text-[#555]">Voting is not active for this proposal.</p>
  }

  if (hasVoted) {
    return (
      <div className="rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] px-4 py-3 text-sm text-[#666]">
        You have already voted on this proposal.
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="rounded-xl bg-green-950/40 border border-green-900/40 px-4 py-3 text-sm text-green-400">
        Vote cast successfully!{' '}
        <button onClick={reset} className="underline text-green-500">Reset</button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-[#555] uppercase tracking-widest">Cast Your Vote</p>
      <div className="flex gap-3">
        <button
          onClick={() => vote(VOTE_SUPPORT.FOR)}
          disabled={isLoading}
          className="flex-1 py-3 rounded-xl bg-green-950/40 border border-green-900/40 text-green-400
                     text-sm font-semibold hover:bg-green-950/60 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '…' : '✓ For'}
        </button>
        <button
          onClick={() => vote(VOTE_SUPPORT.AGAINST)}
          disabled={isLoading}
          className="flex-1 py-3 rounded-xl bg-red-950/40 border border-red-900/40 text-red-400
                     text-sm font-semibold hover:bg-red-950/60 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '…' : '✗ Against'}
        </button>
        <button
          onClick={() => vote(VOTE_SUPPORT.ABSTAIN)}
          disabled={isLoading}
          className="flex-1 py-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-[#666]
                     text-sm font-semibold hover:text-[#888] hover:border-[#333] transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '…' : '— Abstain'}
        </button>
      </div>
      {error && <p className="text-xs text-red-400">{error.message}</p>}
    </div>
  )
}
