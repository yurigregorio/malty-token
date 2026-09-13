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

## MALTY Impact

MALTY Impact is the project's planned animal-welfare transparency initiative.

- **Public wallet:** `DmPEyGFwy972wcdcA7UzxtDiSdrtU3Y4UJned7AJJyik`
- **Status:** planned / not active
- **Purpose:** provide a dedicated public reference for future documented animal-welfare initiatives and their evidence.

The public address is documented for transparency. Its publication does not by itself indicate that an initiative has been funded or completed.

## Public transparency

The default home page is the MALTY public-information landing page. It publishes the verified mint, fixed supply, authorities, canonical token allocation and the latest documented reserve status without presenting planned allocations as already-circulating tokens.

Public documentation:

- [`docs/TRANSPARENCY.md`](docs/TRANSPARENCY.md) — concise public transparency reference
- [`docs/FAQ.md`](docs/FAQ.md) — public project FAQ
- [`docs/LAUNCH_READINESS.md`](docs/LAUNCH_READINESS.md) — non-transactional launch-readiness record
- [`docs/RELEASE_NOTES_V1.0_SECURE.md`](docs/RELEASE_NOTES_V1.0_SECURE.md) — secure v1 release snapshot notes
- [`docs/TOKENOMICS.md`](docs/TOKENOMICS.md) — canonical tokenomics
- [`docs/WALLET_ARCHITECTURE.md`](docs/WALLET_ARCHITECTURE.md) — reserve and custody architecture
- [`docs/MALTY_GIVES_POLICY.md`](docs/MALTY_GIVES_POLICY.md) — planned animal-welfare initiative policy
- [`docs/RECONCILIATION.md`](docs/RECONCILIATION.md) — balance/circulation reconciliation rules
- [`docs/SECURITY_AUDIT.md`](docs/SECURITY_AUDIT.md) — repository security review

## Production safeguards

The application records the completed Mainnet deployment and keeps all token-creation and authority-changing actions locked. The Mainnet actions UI is intentionally read-only, so the app does not expose transfer or other signing actions on Mainnet.

The Metadata Update Authority remains separate from Mint Authority and is intentionally retained for metadata maintenance. It cannot mint additional MALTY.

## Development

Requires Node.js 24 or newer.

```shell
npm install
npm run dev
```

The public landing page is available at `http://localhost:3000`. Development wallet tooling is separated under `http://localhost:3000/dev`. Transaction testing should use Devnet or local test infrastructure. Mainnet is retained for read-only inspection and verification in this application.

## Project structure

- `app/page.tsx` — public MALTY transparency landing page
- `app/dev/page.tsx` — development-network wallet tooling
- `app/lib/malty-token.ts` — MALTY identity, supply and metadata constants
- `app/lib/malty-config.ts` — per-network deployment state and action guards
- `app/components/actions/actions-panel.tsx` — network-level action boundary; Mainnet is read-only
- `app/components/actions/token-card.tsx` — token tooling for non-Mainnet development flows
- `tests/malty-safety.test.ts` — MALTY production invariants
- `scripts/security-check.mjs` — repository security invariants
- `docs/MALTY_MAINNET_V1.md` — verified Mainnet deployment record

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

The app builds one Solana client per selected cluster in `app/lib/solana-client.ts` and provides it through the project client provider. Wallet signing is delegated to the connected wallet for supported non-Mainnet development actions; private keys and seed phrases are never stored in the application.

## Validation

Run the project checks with:

```shell
npm run security:check
npm run typecheck
npm run test
npm run build
```

The CI pipeline also performs a high-severity dependency audit and runs these checks for release and safety changes.

## Network notes

- **Devnet:** completed MALTY test deployment; deployment actions locked, with development tooling available where applicable.
- **Mainnet:** MALTY Mainnet v1 completed; application transaction actions are read-only/disabled.
- **Other networks:** not part of the MALTY production deployment.

## Token metadata

- Image: `https://arweave.net/w-TXbk_hQOw1mC5vA9YrVmClKzz_Avjfiq5coE1AYec`
- Metadata: `https://turbo-gateway.com/rLzUMFUoqgYI04MijeVjLDriWACUApJo2BKK6ycB5MU`

For exact on-chain verification values and deployment transaction signatures, see [`docs/MALTY_MAINNET_V1.md`](docs/MALTY_MAINNET_V1.md).
