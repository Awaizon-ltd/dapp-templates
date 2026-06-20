'use client'
import { ConnectButton, useChain, useWallet } from '@awarizon/react'
import { ChainSwitcher } from '@/components/ChainSwitcher'
import { NativeBalanceCard } from '@/components/NativeBalanceCard'
import { TokenRow } from '@/components/TokenRow'
import { TOKENS_BY_CHAIN } from '@/lib/tokens'

export default function DashboardPage() {
  const { isConnected } = useWallet()
  const { chainId } = useChain()

  const tokens = TOKENS_BY_CHAIN[chainId] ?? []

  if (!isConnected) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-5">
          <div>
            <h1 className="text-2xl font-bold">DeFi Dashboard</h1>
            <p className="text-sm text-[#555] mt-1">
              Live balances across EVM chains
            </p>
          </div>
          <ConnectButton />
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-10 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Portfolio</h1>
        <ConnectButton />
      </header>

      <div className="space-y-3">
        <p className="text-xs text-[#555] uppercase tracking-widest">Network</p>
        <ChainSwitcher />
      </div>

      <NativeBalanceCard />

      {tokens.length > 0 && (
        <div className="rounded-2xl border border-[#1e1e1e] bg-[#111] px-6 py-2">
          <p className="text-xs text-[#555] uppercase tracking-widest py-3 border-b border-[#1a1a1a]">
            Token Balances
          </p>
          {tokens.map(token => (
            <TokenRow key={token.address} token={token} />
          ))}
        </div>
      )}

      {tokens.length === 0 && (
        <div className="rounded-2xl border border-[#1e1e1e] bg-[#111] p-6 text-center">
          <p className="text-sm text-[#555]">No token list configured for chain {chainId}.</p>
          <p className="text-xs text-[#333] mt-1">Add entries to <code className="text-[#555]">lib/tokens.ts</code>.</p>
        </div>
      )}
    </main>
  )
}
