import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@awarizon/react', '@awarizon/web3'],
  images: { remotePatterns: [{ protocol: 'https', hostname: 'ipfs.io' }] },
}

export default nextConfig
