'use client'
import { useNFT } from '@awarizon/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Address } from 'viem'
import { resolveIpfs } from '@/lib/ipfs'

interface NftMeta {
  name?: string
  description?: string
  image?: string
}

export function NftCard({
  collection,
  tokenId,
}: {
  collection: Address
  tokenId: bigint
}) {
  const { tokenURI, ownerOf } = useNFT(collection)
  const [meta, setMeta]   = useState<NftMeta | null>(null)
  const [owner, setOwner] = useState<string | null>(null)

  useEffect(() => {
    tokenURI(tokenId)
      .then(uri => fetch(resolveIpfs(uri)).then(r => r.json()))
      .then(setMeta)
      .catch(() => {})

    ownerOf(tokenId)
      .then(addr => setOwner(`${addr.slice(0, 6)}…${addr.slice(-4)}`))
      .catch(() => {})
  }, [tokenId, tokenURI, ownerOf])

  return (
    <Link
      href={`/nft/${tokenId}`}
      className="group rounded-2xl border border-[#1e1e1e] bg-[#111] overflow-hidden
                 hover:border-[#333] transition-colors"
    >
      <div className="aspect-square bg-[#0a0a0a] overflow-hidden">
        {meta?.image ? (
          <img
            src={resolveIpfs(meta.image)}
            alt={meta.name ?? `#${tokenId}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[#333] text-3xl font-bold">#{String(tokenId)}</span>
          </div>
        )}
      </div>

      <div className="p-3 space-y-0.5">
        <p className="text-sm font-medium truncate">
          {meta?.name ?? `#${tokenId}`}
        </p>
        <p className="text-xs text-[#555] truncate">{owner ?? '…'}</p>
      </div>
    </Link>
  )
}
