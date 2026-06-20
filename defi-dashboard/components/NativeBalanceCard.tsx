'use client'
import { useNativeBalance, useChain, useWallet } from '@awarizon/react'
import { SUPPORTED_CHAINS } from '@/lib/tokens'
import type { Address } from 'viem'

export function NativeBalanceCard() {
  const { address } = useWallet()
  const { chainId } = useChain()
  const { formatted, isLoading, refetch } = useNativeBalance(address as Address | undefined, 15_000)

  const chain = SUPPORTED_CHAINS.find(c => c.id === chainId)

  return (
    <div className="rounded-2xl border border-[#1e1e1e] bg-[#111] p-6 space-y-1">
      <p className="text-xs text-[#555] uppercase tracking-widest">Native Balance</p>
      <div className="flex items-end gap-2 mt-2">
        {isLoading ? (
          <div className="h-8 w-24 bg-[#1e1e1e] rounded animate-pulse" />
        ) : (
          <p className="text-3xl font-bold tracking-tight">
            {formatted ? Number(formatted).toFixed(4) : '0.0000'}
          </p>
        )}
        <p className="text-sm text-[#666] mb-1">{chain?.symbol ?? 'ETH'}</p>
      </div>
      <button
        onClick={refetch}
        className="text-xs text-[#444] hover:text-[#888] transition-colors mt-2"
      >
        Refresh
      </button>
    </div>
  )
}
