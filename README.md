# awarizon-templates

Polished, production-ready starter apps built with the [Awarizon Web3 SDK](https://awarizon.com/docs). Each template is a full Next.js 14 App Router application you can deploy to Vercel in one click.

## Templates

| Directory | Use case | Key SDK features |
|-----------|----------|-----------------|
| [`siwe-auth-app/`](./siwe-auth-app) | Sign-In with Ethereum | `useSiwe`, `@awarizon/auth`, server-side sessions via `iron-session` |
| [`nft-marketplace/`](./nft-marketplace) | Browse + mint an NFT collection | `useNFT`, `useWriteContract`, IPFS metadata |
| [`token-gating/`](./token-gating) | Gate content behind NFT ownership | `useNFT.balanceOf`, `ConnectButton` |
| [`defi-dashboard/`](./defi-dashboard) | Live portfolio across EVM chains | `useNativeBalance`, `useToken`, `useChain` chain switcher |
| [`dao-voting/`](./dao-voting) | Read proposals + cast on-chain votes | `useReadContract`, `useWriteContract`, OZ Governor ABI |

## Quick start

```bash
# Pick a template
cd siwe-auth-app   # or nft-marketplace / token-gating / defi-dashboard / dao-voting

# Install dependencies
npm install        # or pnpm / yarn

# Set up environment
cp .env.example .env.local
# Fill in the required variables (see .env.example for descriptions)

# Run
npm run dev
```

## SDK packages used

| Package | Version | Role |
|---------|---------|------|
| `@awarizon/web3` | ^1.3.0 | Core SDK — chain connection, contract reads/writes |
| `@awarizon/react` | ^1.4.0 | React hooks + UI components |
| `@awarizon/auth` | ^1.0.1 | SIWE message building + server-side verification |

## Template details

### `siwe-auth-app`
Full Sign-In with Ethereum flow with server-side session storage.

- `/` — connect wallet + sign SIWE message
- `/dashboard` — protected page (redirects to `/` if not authenticated)
- `/api/auth/nonce` — generate + store one-time nonce
- `/api/auth/verify` — verify SIWE signature, set session cookie
- `/api/auth/signout` — destroy session
- `middleware.ts` — protects all `/dashboard/*` routes

### `nft-marketplace`
Browse an ERC-721 collection and mint tokens.

- `/` — gallery grid of token IDs 1–N (configurable via `NEXT_PUBLIC_TOTAL_SUPPLY`)
- `/nft/[tokenId]` — token detail page with traits
- Set `NEXT_PUBLIC_NFT_ADDRESS` to your collection contract

### `token-gating`
Gate a members-only page behind NFT ownership.

- `/` — public landing, checks `balanceOf` after wallet connects
- `/members` — shows gated content only if holder balance > 0
- Set `NEXT_PUBLIC_GATE_NFT_ADDRESS` to any ERC-721 contract

### `defi-dashboard`
Live portfolio view across 5 EVM chains.

- Switches `AwarizonWeb3` chain via `useChain().switchChain(alias)`
- Shows native balance (ETH/MATIC/etc.) with 15 s auto-refresh
- Shows ERC-20 balances for USDC, USDT, DAI, WETH per chain
- Extend `lib/tokens.ts` to add more tokens or chains

### `dao-voting`
On-chain governance powered by an OpenZeppelin Governor contract.

- `/` — list of proposals with live state badges
- `/proposal/[id]` — vote tally bars + FOR / AGAINST / ABSTAIN buttons
- Set `NEXT_PUBLIC_GOVERNOR_ADDRESS` and `NEXT_PUBLIC_GOV_TOKEN_ADDRESS`
- Add proposals to `lib/contracts.ts` (or fetch them from events in production)

## Links

- [Docs](https://awarizon.com/docs)
- [API key dashboard](https://awarizon.com/dashboard/api-keys)
- [WalletConnect project ID](https://cloud.walletconnect.com)
- [Boilerplates repo](https://github.com/Awaizon-ltd/boilerplates)
