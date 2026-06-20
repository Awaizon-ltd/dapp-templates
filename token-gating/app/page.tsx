'use client'
import { ConnectButton, useWallet } from '@awarizon/react'
import { GateGuard } from '@/components/GateGuard'
import { GATE_NFT_NAME } from '@/lib/contracts'

export default function HomePage() {
  const { isConnected } = useWallet()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <div className="text-4xl mb-4">🔒</div>
          <h1 className="text-3xl font-bold tracking-tight">Members Only</h1>
          <p className="text-sm text-[#666]">
            Hold a{' '}
            <span className="text-[#ededed] font-medium">{GATE_NFT_NAME}</span>{' '}
            NFT to access exclusive content.
          </p>
        </div>

        {!isConnected ? (
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-[#555]">Connect your wallet to check access.</p>
            <ConnectButton />
          </div>
        ) : (
          <GateGuard />
        )}
      </div>
    </main>
  )
}
