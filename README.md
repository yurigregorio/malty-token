# MALTY Token

Production tooling and deployment record for **Malty (MALTY)**, an SPL token on Solana inspired by Charlotte.

> **Mainnet v1 status: complete.** The exact 1,000,000,000 MALTY supply has been issued, the Metaplex metadata is present, Freeze Authority is absent, and Mint Authority has been permanently revoked.

## Mainnet v1

- **Name:** Malty
- **Symbol:** MALTY
- **Mint:** `6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz`
- **Decimals:** 6
- **Supply:** 1,000,000,000 MALTY
- **Mint Authority:** revoked / none
- **Freeze Authority:** none
- **Slogan:** Small Dog. Big Community.

The complete verified deployment record is in [`docs/MALTY_MAINNET_V1.md`](docs/MALTY_MAINNET_V1.md).

### Production safeguards

The application records the completed Mainnet deployment and keeps all token-creation and authority-changing actions locked. The Mainnet actions UI is also intentionally read-only, so the app does not expose transfer or other signing actions on Mainnet.

The Metadata Update Authority remains separate from Mint Authority and is intentionally retained for metadata maintenance. It cannot mint additional MALTY.

## Development

Requires Node.js 24 or newer.

```shell
npm install
npm run dev
```

Open `http://localhost:3000` and connect a compatible browser wallet. Development and transaction testing should use Devnet or local test infrastructure. Mainnet is retained for read-only inspection and verification in this application.

## Project structure

- `app/lib/malty-token.ts` — MALTY identity, supply and metadata constants
- `app/lib/malty-config.ts` — per-network deployment state and action guards
- `app/components/actions/actions-panel.tsx` — network-level action boundary; Mainnet is read-only
- `app/components/actions/token-card.tsx` — token tooling for non-Mainnet development flows
- `tests/malty-safety.test.ts` — MALTY production invariants
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
npm run typecheck
npm run test
npm run build
```

The CI pipeline runs these checks for release and safety changes.

## Network notes

- **Devnet:** completed MALTY test deployment; deployment actions locked, with development tooling available where applicable.
- **Mainnet:** MALTY Mainnet v1 completed; application transaction actions are read-only/disabled.
- **Other networks:** not part of the MALTY production deployment.

## Token metadata

- Image: `https://arweave.net/w-TXbk_hQOw1mC5vA9YrVmClKzz_Avjfiq5coE1AYec`
- Metadata: `https://turbo-gateway.com/rLzUMFUoqgYI04MijeVjLDriWACUApJo2BKK6ycB5MU`

For exact on-chain verification values and deployment transaction signatures, see [`docs/MALTY_MAINNET_V1.md`](docs/MALTY_MAINNET_V1.md).
