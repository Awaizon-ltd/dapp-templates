import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'SIWE Auth App',
  description: 'Sign-In with Ethereum — powered by the Awarizon SDK',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0a] text-[#ededed] antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
