'use client'
import { AwarizonProvider } from '@awarizon/react'
import { AwarizonWeb3 } from '@awarizon/web3'

const awarizon = new AwarizonWeb3({
  chain: 'ethereum',
  apiKey: process.env.NEXT_PUBLIC_AWARIZON_API_KEY!,
  walletConnectProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
})

export function Providers({ children }: { children: React.ReactNode }) {
  return <AwarizonProvider awarizon={awarizon}>{children}</AwarizonProvider>
}
