import type { Address } from 'viem'

export const GATE_NFT_ADDRESS = (
  process.env.NEXT_PUBLIC_GATE_NFT_ADDRESS ?? '0x0000000000000000000000000000000000000000'
) as Address

export const GATE_NFT_NAME = process.env.NEXT_PUBLIC_GATE_NFT_NAME ?? 'NFT'
