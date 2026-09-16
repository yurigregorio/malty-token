# MALTY Token

Production tooling, transparency material and deployment record for **Malty (MALTY)**, an SPL token on Solana inspired by Charlotte.

> **Mainnet v1 status: complete.** The exact 1,000,000,000 MALTY supply has been issued, the Metaplex metadata is present, Freeze Authority is absent, and Mint Authority has been permanently revoked.

## Mainnet v1

- **Name:** Malty
- **Symbol:** MALTY
- **Mint:** `6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz`
- **Decimals:** 6
- **Supply:** 1,000,000,000 MALTY
- **Mint Authority:** revoked / none
- **Freeze Authority:** none
- **Transfer tax:** 0%
- **Slogan:** Small Dog. Big Community.

The complete verified deployment record is in [`docs/MALTY_MAINNET_V1.md`](docs/MALTY_MAINNET_V1.md).

## Trading

MALTY is live and tradeable through the official MALTY/SOL pool on Raydium.

- **DEX:** Raydium (Standard AMM / CPMM)
- **Pool ID:** `DGK42Xe3BMXTJeUVjVNSZL1FmwXVQxUaV88qp6hAdp9W`
- **Pair:** MALTY/SOL
- **Fee tier:** 0.25%
- **Initial pool liquidity:** 5,000,000 MALTY + 0.5 SOL

This was funded from the 500,000,000 MALTY Liquidity Reserve; the remaining 495,000,000 MALTY stays directly in the Liquidity Reserve wallet for future market-making. LP tokens remain under the project's custody wallet — they are not locked or burned. Always verify the mint and pool ID above before trading.

## Canonical tokenomics

| Reserve | Allocation | Share |
| --- | ---: | ---: |
| Liquidity | 500,000,000 MALTY | 50% |
| Ecosystem | 150,000,000 MALTY | 15% |
| Community | 150,000,000 MALTY | 15% |
| MALTY Impact | 50,000,000 MALTY | 5% |
| Treasury | 75,000,000 MALTY | 7.5% |
| Team & Core Contributors | 75,000,000 MALTY | 7.5% |
| **Total** | **1,000,000,000 MALTY** | **100%** |

The MALTY Impact allocation was created by reducing the previous Ecosystem allocation from 20% to 15%. Total supply remains fixed and unchanged.

Planned initial availability remains **100,000,000 MALTY (10%)**. The 50M MALTY Impact reserve has **0 planned initial availability** and is intended to remain reserved for future documented animal-welfare initiatives.

## MALTY Impact

MALTY Impact is the project's dedicated animal-welfare token reserve supporting the planned MALTY Gives initiative.

- **Public wallet:** `DmPEyGFwy972wcdcA7UzxtDiSdrtU3Y4UJned7AJJyik`
- **Canonical allocation:** 50,000,000 MALTY (5%)
- **Program status:** planned / not active
- **Initial circulating availability:** 0 MALTY

Funding the MALTY Impact reserve wallet is not itself a donation. Future completed initiatives must be documented with beneficiary, purpose, evidence and public transaction references where applicable.

## Public transparency

The public landing page and documentation publish the verified mint, fixed supply, authorities, canonical token allocation, wallet architecture and reserve policies without presenting planned allocations as already-circulating tokens.

Public documentation:

- [`docs/TRANSPARENCY.md`](docs/TRANSPARENCY.md) — concise public transparency reference
- [`docs/FAQ.md`](docs/FAQ.md) — public project FAQ
- [`docs/LAUNCH_READINESS.md`](docs/LAUNCH_READINESS.md) — non-transactional launch-readiness record
- [`docs/TOKENOMICS.md`](docs/TOKENOMICS.md) — canonical tokenomics
- [`docs/WALLET_ARCHITECTURE.md`](docs/WALLET_ARCHITECTURE.md) — reserve and custody architecture
- [`docs/MALTY_GIVES_POLICY.md`](docs/MALTY_GIVES_POLICY.md) — MALTY Impact / animal-welfare policy
- [`docs/RECONCILIATION.md`](docs/RECONCILIATION.md) — balance/circulation reconciliation rules and checkpoints
- [`docs/SECURITY_AUDIT.md`](docs/SECURITY_AUDIT.md) — repository security review

## Production safeguards

The application records the completed Mainnet deployment and keeps all token-creation and authority-changing actions locked. The Mainnet actions UI is intentionally read-only, so the app does not expose transfer or other signing actions on Mainnet.

The Metadata Update Authority remains separate from Mint Authority and is intentionally retained for metadata maintenance. It cannot mint additional MALTY.

The six reserve addresses currently remain within a temporary single-controller custody boundary. They are **not multisig-protected** at this stage; multisig remains a recommended future custody upgrade.

## Development

Requires Node.js 24 or newer.

```shell
npm install
npm run dev
```

The public landing page is available at `http://localhost:3000`. Development wallet tooling is separated under `http://localhost:3000/dev`. Transaction testing should use Devnet or local test infrastructure. Mainnet is retained for read-only inspection and verification in this application.

## Technical stack

This project started from the Solana Kit Next.js template and uses:

- `@solana/kit` v7
- `@solana/kit-plugin-wallet`
- `@solana/kit-plugin-rpc`
- `@solana-program/token`
- Metaplex Token Metadata / Umi
- Next.js
- TypeScript
- Vitest

Wallet signing is delegated to the connected wallet for supported non-Mainnet development actions; private keys and seed phrases are never stored in the application.

## Validation

Run the project checks with:

```shell
npm run security:check
npm run typecheck
npm run test
npm run build
```

## Network notes

- **Devnet:** completed MALTY test deployment; deployment actions locked, with development tooling available where applicable.
- **Mainnet:** MALTY Mainnet v1 completed; the `/dev` sandbox's mint-creation and authority actions stay read-only/disabled. The one exception is **Malty Swap** (`/swap`): a non-custodial swap that only ever executes a transaction the connected wallet signs itself — see below.

## Malty Swap

`/swap` lets a visitor trade SOL or USDC for MALTY (and back) against the real MALTY/SOL Raydium pool, straight from their own wallet. It is non-custodial end to end: the app never holds funds, never sees a private key, and never signs on the user's behalf — every transaction is built from a live Raydium quote and handed to the connected wallet for the user to review and approve.

It is also built as reusable infrastructure for the planned MALTY game, not a one-off page — see "Reusing `<MaltySwap />`" below.

### Architecture

```
app/lib/swap/
  tokens.ts                 Closed allowlist: SOL, USDC, MALTY (mint, decimals) — never a mint from a URL
  amount.ts                 Decimal <-> base-unit conversion, display formatting
  slippage.ts                Presets, bounds, validation
  price-impact.ts            normal / attention / high classification (conservative — MALTY liquidity is thin)
  url-params.ts               Validates every /swap query param; returnTo is checked against an internal allowlist
  raydium.ts                  Official Raydium Trade API client (quote + build-transaction), hardcoded endpoint
  use-swap-quote.ts           Debounced, cancellable, auto-refreshing quote hook
  swap-transaction.ts         Decode -> sign -> send -> confirm helpers
  use-malty-swap-engine.ts    The state machine wiring the above into <MaltySwap />
  types.ts                    SwapStep, SwapQuote, SwapResult, MaltySwapProps
  swap-errors.ts               Maps any failure into a friendly, non-technical message
  analytics.ts                 Internal event seam (swap_opened, swap_confirmed, ...) — no third-party sink wired up

app/lib/hooks/use-token-balance.ts   SPL balance via the deterministic ATA (SOL uses the existing use-balance.ts)

app/components/swap/
  malty-swap.tsx               Wallet-ready / Mainnet / connect gating, then renders ConnectedMaltySwap
  connected-malty-swap.tsx     Wires the engine hook to the UI below
  token-amount-panel.tsx, slippage-selector.tsx, swap-details.tsx,
  review-swap.tsx, swap-status.tsx, price-impact-badge.tsx, trust-footer.tsx

app/swap/page.tsx + swap-content.tsx   The public page: parses & validates query params, renders <MaltySwap mode="full" />
```

**Wallet:** reused, not reimplemented. `/swap` connects through the same app-wide `AppClientProvider` / `WalletButton` wallet-standard connection already used by the rest of the site (Phantom, Solflare, Backpack, and other Wallet Standard wallets) — the same connected account will carry over to the future game, shop, inventory and rewards.

**Quote & transaction flow (Raydium Trade API):**
1. `raydium.ts` fetches a real quote from `/compute/swap-base-in` (or `swap-base-out` for exact-output) — never a hardcoded or estimated price.
2. The quote is normalized and validated; a missing/malformed field fails loudly instead of guessing.
3. On "Confirm Swap", `/transaction/swap-base-in` (or `-out`) builds the unsigned transaction(s) from that exact quote.
4. Raydium may return more than one transaction (e.g. wrapped-SOL / ATA setup ahead of the swap itself) — all of them are decoded, sanity-checked, and signed/sent **in order** through the connected wallet via `@solana/react`'s `useSignAndSendTransactions`.
5. Signatures are polled via `getSignatureStatuses` until confirmed, then balances refresh and `onSuccess` fires with a typed `SwapResult`.

The Raydium endpoint (`transaction-v1.raydium.io`) is a hardcoded constant in `raydium.ts` — never read from an environment variable or a query parameter, so a malicious link can't redirect swap traffic elsewhere.

### Environment variables

None are required specifically for the swap — it reuses `NEXT_PUBLIC_SOLANA_MAINNET_RPC_URL` / `NEXT_PUBLIC_SOLANA_MAINNET_WS_URL` from `.env.example` for the Mainnet RPC connection used to read balances and confirm transactions.

### Reusing `<MaltySwap />`

```tsx
// Full page (today's /swap):
<MaltySwap mode="full" />

// Future in-game "Get MALTY" panel, fixed to a specific output token:
<MaltySwap mode="compact" lockOutputToken defaultOutputMint="MALTY" source="game" />

// Exact-output ("the Shop needs exactly 760 more MALTY"):
<MaltySwap
  mode="compact"
  lockOutputToken
  defaultOutputMint="MALTY"
  exactOutputAmount="760"
  source="shop"
  returnTo="/game/shop"
  onSuccess={(result) => continueShopPurchase(result)}
/>
```

`/swap` itself accepts the same intent as validated query parameters, so the game can also just deep-link instead of embedding the component directly:

```
/swap?output=MALTY&exactOutput=760&returnTo=/game/shop&source=shop
```

`returnTo` is checked against a fixed internal-path allowlist (`url-params.ts`) — an external or protocol-relative URL is always dropped, never followed.

### `SwapResult` (the Game integration contract)

```ts
type SwapResult = {
  signatures: string[];
  inputMint: "SOL" | "USDC" | "MALTY";
  outputMint: "SOL" | "USDC" | "MALTY";
  inputAmount: bigint;   // base units
  outputAmount: bigint;  // base units
  confirmed: boolean;
  timestamp: number;
  source: "website" | "game" | "shop";
};
```

Game-ready flow: `Player needs +760 MALTY → "Get MALTY" → /swap?output=MALTY&exactOutput=760&returnTo=/game/shop → player reviews & signs → onSuccess(SwapResult) → balance refreshed → Return to Game`.

### Known limitations

- Only SOL⇄MALTY and USDC⇄MALTY are routed today (no direct SOL⇄USDC leg).
- No fee/referral is charged by the app today. The Raydium Trade API supports an optional referrer fee (`referrerBps` / `referrerWallet`); `raydium.ts` deliberately does not send them yet — wiring one in later is a small, isolated change, but any such fee must be explicitly disclosed to the user before it ships.
- Balance polling (not a live subscription) is used for SPL balances; it refreshes every 15s and immediately after a confirmed swap.
- The in-game embed (`mode="compact"`) is wired and ready but has no game UI to mount into yet.
- `defaultInputMint` / `defaultOutputMint` / `exactOutputAmount` / `initialAmount` seed the widget's internal state once, like any other uncontrolled-by-default React component. If the Shop reuses one mounted `<MaltySwap />` across different purchases (a different item, a different `exactOutputAmount`), pass a `key` (e.g. `key={itemId}`) so it remounts with the new intent instead of keeping the first one.

### Testing

`npm run test` covers (with mocked network calls — no real SOL/MALTY is ever spent by the test suite): base/decimal amount conversion, the token allowlist, slippage bounds, price-impact classification, quote parsing/validation (including malformed API responses), the debounced/cancellable quote hook, `returnTo`/URL-param validation, transaction decoding, signature confirmation, and error-message mapping.

## Token metadata

- Image: `https://arweave.net/w-TXbk_hQOw1mC5vA9YrVmClKzz_Avjfiq5coE1AYec`
- Metadata: `https://turbo-gateway.com/rLzUMFUoqgYI04MijeVjLDriWACUApJo2BKK6ycB5MU`

For exact on-chain verification values and deployment transaction signatures, see [`docs/MALTY_MAINNET_V1.md`](docs/MALTY_MAINNET_V1.md).
