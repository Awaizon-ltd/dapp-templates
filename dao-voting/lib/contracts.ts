import type { Address } from 'viem'

export const GOVERNOR_ADDRESS = (
  process.env.NEXT_PUBLIC_GOVERNOR_ADDRESS ?? '0x0000000000000000000000000000000000000000'
) as Address

export const GOV_TOKEN_ADDRESS = (
  process.env.NEXT_PUBLIC_GOV_TOKEN_ADDRESS ?? '0x0000000000000000000000000000000000000000'
) as Address

export interface Proposal {
  id: bigint
  title: string
  description: string
}

export const PROPOSALS: Proposal[] = [
  {
    id: 1n,
    title: 'Proposal #1 — Increase treasury allocation',
    description: 'Allocate 10% of protocol revenue to the community treasury for grants and development.',
  },
  {
    id: 2n,
    title: 'Proposal #2 — Reduce voting period',
    description: 'Reduce the voting period from 7 days to 3 days to allow faster governance decisions.',
  },
  {
    id: 3n,
    title: 'Proposal #3 — Add USDC as collateral',
    description: 'Enable USDC as an approved collateral asset with a 90% loan-to-value ratio.',
  },
]
