'use client'
import { useWriteContract, useWallet } from '@awarizon/react'
import { NFT_ADDRESS, MINT_PRICE } from '@/lib/contracts'
import { MINT_ABI } from '@/lib/abi'

export function MintButton() {
  const { address, isConnected } = useWallet()
  const { write, isLoading, isSuccess, error, reset } = useWriteContract({
    address: NFT_ADDRESS,
    abi: MINT_ABI,
    method: 'mint',
  })

  if (!isConnected) return null

  if (isSuccess) {
    return (
      <button
        onClick={reset}
        className="px-4 py-2 rounded-xl text-sm font-medium bg-green-950/40 text-green-400
                   border border-green-900/50 hover:bg-green-950/60 transition-colors"
      >
        Minted! Mint another
      </button>
    )
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={() => write(address, { value: MINT_PRICE })}
        disabled={isLoading}
        className="px-4 py-2 rounded-xl text-sm font-semibold bg-white text-black
                   hover:bg-[#ededed] active:scale-95 transition-all disabled:opacity-50
                   disabled:cursor-not-allowed"
      >
        {isLoading ? 'Minting…' : `Mint (${Number(MINT_PRICE) / 1e18} ETH)`}
      </button>
      {error && <p className="text-xs text-red-400">{error.message}</p>}
    </div>
  )
}
