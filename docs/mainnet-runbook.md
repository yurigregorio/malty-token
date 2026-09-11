# MALTY Mainnet Runbook — Completed Deployment Record

This runbook is retained as the historical sequence used for MALTY Mainnet v1. Token creation is complete; the stages below describe the completed deployment rather than pending actions.

## Production identity

- Name: Malty
- Symbol: MALTY
- Mainnet mint: `6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz`
- Decimals: 6
- Supply: 1,000,000,000 MALTY
- Freeze Authority: none
- Mint Authority: revoked / none
- Transfer tax: 0%
- Metaplex metadata: present

## Completed stages

### Stage 0 — Preflight

Completed before production deployment. Identity, metadata, project wallet, network configuration, tests and build were reviewed before Mainnet operations.

### Stage 1 — Mainnet mint creation

Completed. The production SPL mint was created with 6 decimals and no Freeze Authority.

### Stage 2 — Fixed supply issuance

Completed. Exactly 1,000,000,000 MALTY were issued. The fixed supply was verified before proceeding.

### Stage 3 — Metadata creation

Completed. Metaplex metadata was created and the MALTY name, symbol, metadata URI and Charlotte image were verified.

The Metadata Update Authority remains intentionally retained. It is separate from the SPL Mint Authority and cannot mint additional MALTY.

### Stage 4 — SPL Mint Authority revocation

Completed. The Mint Authority was permanently set to `None` after supply and metadata verification. No additional MALTY can be minted.

### Stage 5 — Metadata finalization

Current policy: Metadata Update Authority remains retained for metadata maintenance. Any future change to that authority is a separate governance/security decision and does not affect the fixed token supply.

### Stage 6 — Distribution and reserves

Not part of token creation. Distribution, liquidity, treasury, ecosystem, community and team allocations are governed by the tokenomics, wallet architecture and policy documents.

The planned reserve structure is:

- Liquidity: 500,000,000 MALTY
- Ecosystem: 200,000,000 MALTY
- Community: 150,000,000 MALTY
- Treasury: 75,000,000 MALTY
- Team: 75,000,000 MALTY

Planned initial availability totals 100,000,000 MALTY: 50,000,000 Liquidity, 17,500,000 Ecosystem, 25,000,000 Community, 0 Treasury and 7,500,000 Team eligibility.

These figures are allocation policy, not proof of current wallet balances or circulating supply. Actual movements must be reconciled against on-chain balances. The reserve wallets currently remain documented with 0 MALTY until an actual transfer occurs.

## Source of truth

For current production state use:

- `docs/MALTY_MAINNET_V1.md`
- `docs/mainnet-status.md`
- `docs/TOKENOMICS.md`
- `docs/WALLET_ARCHITECTURE.md`
- `docs/RECONCILIATION.md`

Status: **MALTY Mainnet v1 deployment complete**.
