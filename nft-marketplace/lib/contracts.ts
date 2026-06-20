import type { Address } from 'viem'

export const NFT_ADDRESS = (process.env.NEXT_PUBLIC_NFT_ADDRESS ?? '0x0000000000000000000000000000000000000000') as Address
export const MINT_PRICE  = BigInt(process.env.NEXT_PUBLIC_MINT_PRICE ?? '10000000000000000')
export const TOTAL_SUPPLY = Number(process.env.NEXT_PUBLIC_TOTAL_SUPPLY ?? '12')

export const TOKEN_IDS: bigint[] = Array.from(
  { length: TOTAL_SUPPLY },
  (_, i) => BigInt(i + 1),
)
