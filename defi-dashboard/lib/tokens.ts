import type { Address } from 'viem'

export interface TokenConfig {
  symbol: string
  address: Address
  decimals: number
}

export const TOKENS_BY_CHAIN: Record<number, TokenConfig[]> = {
  1: [
    { symbol: 'USDC',  address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals: 6  },
    { symbol: 'USDT',  address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6  },
    { symbol: 'DAI',   address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', decimals: 18 },
    { symbol: 'WETH',  address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', decimals: 18 },
  ],
  8453: [
    { symbol: 'USDC',  address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', decimals: 6  },
    { symbol: 'DAI',   address: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb', decimals: 18 },
    { symbol: 'WETH',  address: '0x4200000000000000000000000000000000000006', decimals: 18 },
  ],
  137: [
    { symbol: 'USDC',  address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', decimals: 6  },
    { symbol: 'USDT',  address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', decimals: 6  },
    { symbol: 'WMATIC', address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', decimals: 18 },
  ],
  42161: [
    { symbol: 'USDC',  address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', decimals: 6  },
    { symbol: 'USDT',  address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', decimals: 6  },
    { symbol: 'WETH',  address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', decimals: 18 },
  ],
  10: [
    { symbol: 'USDC',  address: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85', decimals: 6  },
    { symbol: 'USDT',  address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58', decimals: 6  },
    { symbol: 'WETH',  address: '0x4200000000000000000000000000000000000006', decimals: 18 },
  ],
}

export const SUPPORTED_CHAINS = [
  { id: 1,     name: 'Ethereum', alias: 'ethereum', symbol: 'ETH'   },
  { id: 8453,  name: 'Base',     alias: 'base',     symbol: 'ETH'   },
  { id: 137,   name: 'Polygon',  alias: 'polygon',  symbol: 'MATIC' },
  { id: 42161, name: 'Arbitrum', alias: 'arbitrum', symbol: 'ETH'   },
  { id: 10,    name: 'Optimism', alias: 'optimism', symbol: 'ETH'   },
]
