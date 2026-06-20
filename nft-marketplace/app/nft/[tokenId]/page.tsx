'use client'
import { useNFT } from '@awarizon/react'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { NFT_ADDRESS } from '@/lib/contracts'
import { resolveIpfs } from '@/lib/ipfs'

interface NftMeta {
  name?: string
  description?: string
  image?: string
  attributes?: { trait_type: string; value: string | number }[]
}

export default function NftDetailPage() {
  const { tokenId } = useParams<{ tokenId: string }>()
  const tokenIdBig  = BigInt(tokenId)

  const { name: collectionName, tokenURI, ownerOf } = useNFT(NFT_ADDRESS)
  const [meta, setMeta]   = useState<NftMeta | null>(null)
  const [owner, setOwner] = useState<string | null>(null)

  useEffect(() => {
    tokenURI(tokenIdBig)
      .then(uri => fetch(resolveIpfs(uri)).then(r => r.json()))
      .then(setMeta)
      .catch(() => {})

    ownerOf(tokenIdBig)
      .then(setOwner)
      .catch(() => {})
  }, [tokenIdBig, tokenURI, ownerOf])

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <Link
        href="/"
        className="text-sm text-[#666] hover:text-[#ededed] transition-colors mb-8 inline-block"
      >
        ← Back to collection
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mt-4">
        <div className="rounded-2xl border border-[#1e1e1e] bg-[#111] overflow-hidden aspect-square">
          {meta?.image ? (
            <img
              src={resolveIpfs(meta.image)}
              alt={meta.name ?? `#${tokenId}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-[#333] text-5xl font-bold">#{tokenId}</span>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-[#555]">{collectionName ?? 'Collection'}</p>
            <h1 className="text-2xl font-bold mt-1">
              {meta?.name ?? `#${tokenId}`}
            </h1>
          </div>

          {owner && (
            <div className="rounded-xl border border-[#1e1e1e] bg-[#111] px-4 py-3">
              <p className="text-xs text-[#555] mb-1">Owner</p>
              <p className="font-mono text-sm break-all">{owner}</p>
            </div>
          )}

          {meta?.description && (
            <p className="text-sm text-[#888] leading-relaxed">{meta.description}</p>
          )}

          {meta?.attributes && meta.attributes.length > 0 && (
            <div>
              <p className="text-xs text-[#555] uppercase tracking-widest mb-3">Traits</p>
              <div className="grid grid-cols-2 gap-2">
                {meta.attributes.map(attr => (
                  <div
                    key={attr.trait_type}
                    className="rounded-xl border border-[#1e1e1e] bg-[#111] px-3 py-2"
                  >
                    <p className="text-xs text-[#555]">{attr.trait_type}</p>
                    <p className="text-sm font-medium mt-0.5">{String(attr.value)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
