import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@awarizon/react', '@awarizon/web3', '@awarizon/auth'],
}

export default nextConfig
