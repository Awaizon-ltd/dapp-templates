'use client'
import { useNFT, useWallet } from '@awarizon/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { GATE_NFT_ADDRESS, GATE_NFT_NAME } from '@/lib/contracts'

type Status = 'checking' | 'granted' | 'denied'

export function GateGuard() {
  const { address } = useWallet()
  const { balanceOf } = useNFT(GATE_NFT_ADDRESS)
  const [status, setStatus] = useState<Status>('checking')

  useEffect(() => {
    if (!address) return
    setStatus('checking')

    balanceOf(address)
      .then(bal => setStatus(bal > 0n ? 'granted' : 'denied'))
      .catch(() => setStatus('denied'))
  }, [address, balanceOf])

  if (status === 'checking') {
    return (
      <div className="flex flex-col items-center gap-3 text-[#555]">
        <div className="w-5 h-5 border-2 border-[#333] border-t-[#666] rounded-full animate-spin" />
        <p className="text-sm">Checking your wallet…</p>
      </div>
    )
  }

  if (status === 'denied') {
    return (
      <div className="rounded-2xl border border-red-900/40 bg-red-950/20 p-6 space-y-3 text-center">
        <p className="text-2xl">🚫</p>
        <p className="font-semibold">Access Denied</p>
        <p className="text-sm text-[#666]">
          Your wallet doesn&apos;t hold a{' '}
          <span className="text-[#ededed]">{GATE_NFT_NAME}</span> NFT.
        </p>
        <a
          href="#"
          className="inline-block mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          Get one on a marketplace →
        </a>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-green-900/40 bg-green-950/20 p-6 space-y-4 text-center">
      <p className="text-2xl">✅</p>
      <p className="font-semibold">Access Granted</p>
      <p className="text-sm text-[#666]">
        Your wallet holds a <span className="text-[#ededed]">{GATE_NFT_NAME}</span> NFT.
      </p>
      <Link
        href="/members"
        className="inline-block px-6 py-2.5 rounded-xl bg-white text-black text-sm
                   font-semibold hover:bg-[#ededed] active:scale-95 transition-all"
      >
        Enter Members Area →
      </Link>
    </div>
  )
}
