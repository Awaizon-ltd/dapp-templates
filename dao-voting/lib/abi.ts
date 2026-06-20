export const GOVERNOR_ABI = [
  {
    name: 'state',
    type: 'function' as const,
    stateMutability: 'view' as const,
    inputs: [{ name: 'proposalId', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint8' }],
  },
  {
    name: 'proposalSnapshot',
    type: 'function' as const,
    stateMutability: 'view' as const,
    inputs: [{ name: 'proposalId', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'proposalDeadline',
    type: 'function' as const,
    stateMutability: 'view' as const,
    inputs: [{ name: 'proposalId', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'proposalVotes',
    type: 'function' as const,
    stateMutability: 'view' as const,
    inputs: [{ name: 'proposalId', type: 'uint256' }],
    outputs: [
      { name: 'againstVotes', type: 'uint256' },
      { name: 'forVotes',     type: 'uint256' },
      { name: 'abstainVotes', type: 'uint256' },
    ],
  },
  {
    name: 'hasVoted',
    type: 'function' as const,
    stateMutability: 'view' as const,
    inputs: [
      { name: 'proposalId', type: 'uint256' },
      { name: 'account',    type: 'address'  },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    name: 'castVote',
    type: 'function' as const,
    stateMutability: 'nonpayable' as const,
    inputs: [
      { name: 'proposalId', type: 'uint256' },
      { name: 'support',    type: 'uint8'   },
    ],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const

export const VOTES_ABI = [
  {
    name: 'getVotes',
    type: 'function' as const,
    stateMutability: 'view' as const,
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'decimals',
    type: 'function' as const,
    stateMutability: 'view' as const,
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }],
  },
] as const

export const PROPOSAL_STATES: Record<number, string> = {
  0: 'Pending',
  1: 'Active',
  2: 'Canceled',
  3: 'Defeated',
  4: 'Succeeded',
  5: 'Queued',
  6: 'Expired',
  7: 'Executed',
}

export const VOTE_SUPPORT = { FOR: 1, AGAINST: 0, ABSTAIN: 2 } as const
