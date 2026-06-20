'use client'
import { useChain } from '@awarizon/react'
import { SUPPORTED_CHAINS } from '@/lib/tokens'

export function ChainSwitcher() {
  const { chainId, isSwitching, switchChain } = useChain()

  return (
    <div className="flex flex-wrap gap-2">
      {SUPPORTED_CHAINS.map(chain => {
        const active = chainId === chain.id
        return (
          <button
            key={chain.id}
            onClick={() => !active && switchChain(chain.alias)}
            disabled={isSwitching}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${active
                ? 'bg-white text-black'
                : 'bg-[#111] border border-[#1e1e1e] text-[#888] hover:text-[#ededed] hover:border-[#333]'
              }
              disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSwitching && active ? 'Switching…' : chain.name}
          </button>
        )
      })}
    </div>
  )
}
