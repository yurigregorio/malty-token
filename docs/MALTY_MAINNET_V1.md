# MALTY Mainnet v1 — Deployment Record

This document records the verified production state of the MALTY SPL token deployment on Solana Mainnet.

## Token identity

| Field | Value |
| --- | --- |
| Name | Malty |
| Symbol | MALTY |
| Network | Solana Mainnet |
| Token program | SPL Token |
| Mint | `6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz` |
| Decimals | 6 |
| Total supply | 1,000,000,000 MALTY |
| Base-unit supply | `1000000000000000` |
| Freeze Authority | None |
| Mint Authority | Revoked / None |
| Metadata | Metaplex metadata present |
| Metadata Update Authority | Retained for metadata maintenance; cannot mint MALTY |

## Project metadata

- Public project identity: `MALTY`
- Slogan: `Small Dog. Big Community.`
- Image URI: `https://arweave.net/w-TXbk_hQOw1mC5vA9YrVmClKzz_Avjfiq5coE1AYec`
- Metadata URI: `https://turbo-gateway.com/rLzUMFUoqgYI04MijeVjLDriWACUApJo2BKK6ycB5MU`

The public brand uses MALTY as the sole project, token and mascot identity. The metadata URI above is the deployment URI and should be checked directly for its current externally hosted contents.

## Verified deployment stages

### Stage 1 — Mint creation

Created the Mainnet SPL mint with 6 decimals and no freeze authority.

Transaction: `mqj2s3CCADZmSrKNmLNVXxfHydjVsv6Zesxevc3BDqa5Rec3xfYxkmKPd8ritR61LLtaYuYg7RxWfWPnBV6v2bU`

Post-stage verification: supply = 0; decimals = 6.

### Stage 2 — Fixed supply issuance

Issued exactly 1,000,000,000 MALTY to the project wallet.

Transaction: `3W5o17RoPe6x3MYfEp7bmpPCfYaF5e9QWGNaoEn1KjPsh3AauqcWG7pbMyQLx9kzPmPBQTtmVuzvDP2Jt2Z4Wdsj`

Post-stage verification: supply = `1000000000000000` base units; decimals = 6; UI supply = `1000000000`.

### Stage 3 — Metaplex metadata

Created the Metaplex metadata account for the production mint. Solana Explorer verification confirmed name = Malty, symbol = MALTY, MALTY artwork present, and metadata transaction completed successfully.

The Metadata Update Authority is separate from the SPL Mint Authority and remains retained for metadata maintenance.

### Stage 4 — Permanent Mint Authority revocation

Revoked the SPL Mint Authority by setting the `MintTokens` authority to `None`.

Transaction: `4Kh8PZgV4N93EXVGpJyLjC4LU2aVFobMjAkjvjxPdRPA4ZA3LmVN2pUYejCwHajiR89YCpBbxEJwcaCXxjmnTpqt`

Final RPC verification:

```text
decimals        : 6
freezeAuthority : null
isInitialized   : true
mintAuthority   : null
supply          : 1000000000000000
```

This makes the MALTY token supply permanently fixed at 1,000,000,000 tokens.

## Production safety state

- Create Mint: locked
- Mint additional supply: locked
- Create metadata again: locked
- Change Mint Authority: locked
- Freeze Authority: does not exist

## Source-of-truth files

- `app/lib/malty-token.ts` — token identity and metadata URIs
- `app/lib/malty-config.ts` — network deployment state and action guards
- `tests/malty-safety.test.ts` — production invariants

## Mainnet v1 checkpoint

- [x] Mainnet mint created
- [x] 6 decimals verified
- [x] Exactly 1,000,000,000 MALTY issued
- [x] Metaplex metadata created and visually verified
- [x] No Freeze Authority
- [x] Mint Authority permanently revoked
- [x] Mainnet creation/authority actions locked in the application
- [x] CI typecheck, tests, and production build passing

Status: **MALTY Mainnet v1 complete**.
