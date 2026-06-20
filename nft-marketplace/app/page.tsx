'use client'
import { ConnectButton, useNFT } from '@awarizon/react'
import { NFT_ADDRESS, TOKEN_IDS } from '@/lib/contracts'
import { NftCard } from '@/components/NftCard'
import { MintButton } from '@/components/MintButton'

export default function GalleryPage() {
  const { name, symbol, isLoading } = useNFT(NFT_ADDRESS)

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isLoading ? '—' : (name ?? 'NFT Collection')}
          </h1>
          {symbol && <p className="text-sm text-[#666] mt-0.5">{symbol}</p>}
        </div>
        <div className="flex items-center gap-3">
          <MintButton />
          <ConnectButton />
        </div>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {TOKEN_IDS.map(id => (
          <NftCard key={String(id)} collection={NFT_ADDRESS} tokenId={id} />
        ))}
      </div>
    </main>
  )
}
