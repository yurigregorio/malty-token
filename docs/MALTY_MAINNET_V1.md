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
| Metadata mutable | Yes, during the final verification window |

## Project metadata

- Description: `MALTY is a Solana memecoin inspired by Charlotte, a Maltese with big community energy.`
- Slogan: `Small Dog. Big Community.`
- Image URI: `https://arweave.net/w-TXbk_hQOw1mC5vA9YrVmClKzz_Avjfiq5coE1AYec`
- Metadata URI: `https://turbo-gateway.com/rLzUMFUoqgYI04MijeVjLDriWACUApJo2BKK6ycB5MU`

## Verified deployment stages

### Stage 1 — Mint creation

Created the Mainnet SPL mint with 6 decimals and no freeze authority.

Transaction:
`mqj2s3CCADZmSrKNmLNVXxfHydjVsv6Zesxevc3BDqa5Rec3xfYxkmKPd8ritR61LLtaYuYg7RxWfWPnBV6v2bU`

Post-stage verification:
- supply = 0
- decimals = 6

### Stage 2 — Fixed supply issuance

Issued exactly 1,000,000,000 MALTY to the project wallet.

Transaction:
`3W5o17RoPe6x3MYfEp7bmpPCfYaF5e9QWGNaoEn1KjPsh3AauqcWG7pbMyQLx9kzPmPBQTtmVuzvDP2Jt2Z4Wdsj`

Post-stage verification:
- supply = `1000000000000000` base units
- decimals = 6
- UI supply = `1000000000`

### Stage 3 — Metaplex metadata

Created the Metaplex metadata account for the production mint.

Verified in Solana Explorer:
- name = Malty
- symbol = MALTY
- Charlotte logo is displayed
- metadata transaction completed successfully

The metadata Update Authority remains separate from the SPL Mint Authority and is intentionally retained during the final verification window.

### Stage 4 — Permanent Mint Authority revocation

Revoked the SPL Mint Authority by setting the `MintTokens` authority to `None`.

Transaction:
`4Kh8PZgV4N93EXVGpJyLjC4LU2aVFobMjAkjvjxPdRPA4ZA3LmVN2pUYejCwHajiR89YCpBbxEJwcaCXxjmnTpqt`

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

The application records the Mainnet deployment as completed and locks all token-creation and authority-changing actions:

- Create Mint: locked
- Mint additional supply: locked
- Create metadata again: locked
- Change Mint Authority: locked
- Freeze Authority: does not exist

Normal token transfers remain independent of these deployment locks.

## Source-of-truth files

- `app/lib/malty-token.ts` — immutable token identity and metadata URIs
- `app/lib/malty-config.ts` — network deployment state and action guards
- `tests/malty-safety.test.ts` — production invariants

## Mainnet v1 checkpoint

The deployment is considered complete when all of the following are true:

- [x] Mainnet mint created
- [x] 6 decimals verified
- [x] Exactly 1,000,000,000 MALTY issued
- [x] Metaplex metadata created and visually verified
- [x] No Freeze Authority
- [x] Mint Authority permanently revoked
- [x] Mainnet creation/authority actions locked in the application
- [x] CI typecheck, tests, and production build passing

Status: **MALTY Mainnet v1 complete**.
