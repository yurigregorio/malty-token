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
- **Mainnet:** MALTY Mainnet v1 completed; application transaction actions are read-only/disabled.

## Token metadata

- Image: `https://arweave.net/w-TXbk_hQOw1mC5vA9YrVmClKzz_Avjfiq5coE1AYec`
- Metadata: `https://turbo-gateway.com/rLzUMFUoqgYI04MijeVjLDriWACUApJo2BKK6ycB5MU`

For exact on-chain verification values and deployment transaction signatures, see [`docs/MALTY_MAINNET_V1.md`](docs/MALTY_MAINNET_V1.md).
