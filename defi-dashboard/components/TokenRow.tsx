'use client'
import { useToken, useWallet } from '@awarizon/react'
import { useEffect, useState } from 'react'
import { formatUnits } from 'viem'
import type { Address } from 'viem'
import type { TokenConfig } from '@/lib/tokens'

export function TokenRow({ token }: { token: TokenConfig }) {
  const { address } = useWallet()
  const { symbol, decimals, balanceOf, isLoading: metaLoading } = useToken(token.address)
  const [balance, setBalance] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!address || metaLoading) return
    setLoading(true)

    balanceOf(address as Address)
      .then(raw => {
        const dec = decimals ?? token.decimals
        const fmt = formatUnits(raw, dec)
        setBalance(Number(fmt).toLocaleString(undefined, { maximumFractionDigits: 4 }))
      })
      .catch(() => setBalance(null))
      .finally(() => setLoading(false))
  }, [address, balanceOf, decimals, metaLoading, token.decimals])

  return (
    <div className="flex items-center justify-between py-3 border-b border-[#1a1a1a] last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#1e1e1e] flex items-center justify-center
                        text-xs font-bold text-[#666]">
          {(symbol ?? token.symbol).slice(0, 2)}
        </div>
        <div>
          <p className="text-sm font-medium">{symbol ?? token.symbol}</p>
          <p className="text-xs text-[#555] font-mono">
            {token.address.slice(0, 6)}…{token.address.slice(-4)}
          </p>
        </div>
      </div>

      <div className="text-right">
        {loading ? (
          <div className="h-4 w-16 bg-[#1e1e1e] rounded animate-pulse" />
        ) : (
          <p className="text-sm font-mono">{balance ?? '—'}</p>
        )}
      </div>
    </div>
  )
}
