export const MINT_ABI = [
  {
    name: 'mint',
    type: 'function' as const,
    stateMutability: 'payable' as const,
    inputs: [{ name: 'to', type: 'address' }],
    outputs: [],
  },
] as const
