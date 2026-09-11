# MALTY Launch Readiness

This checklist records the non-transactional preparation required before public presentation of MALTY. It does not authorize or execute token transfers, liquidity actions or other financial transactions.

## Technical state

- [x] Solana Mainnet mint created
- [x] Exact fixed supply of 1,000,000,000 MALTY recorded
- [x] 6 decimals verified
- [x] Metaplex metadata present
- [x] Freeze Authority absent
- [x] Mint Authority permanently revoked
- [x] Mainnet creation and authority-changing actions locked in the application
- [x] Mainnet transaction UI made read-only
- [x] CI security invariants added
- [x] Dependency audit included in CI
- [x] Repository security audit documented

## Public transparency

- [x] Canonical tokenomics documented
- [x] Five reserve addresses published
- [x] Latest documented reserve balances stated as 0 MALTY
- [x] Planned initial availability distinguished from circulating supply
- [x] Temporary single-controller custody boundary disclosed
- [x] Liquidity lock/permanence is not claimed without verifiable evidence
- [x] Team release policy documented
- [x] Public FAQ added
- [x] Public transparency reference added
- [x] Public landing page converted from starter/demo content to MALTY project information

## Current allocation model

- Liquidity: 500,000,000 MALTY
- Ecosystem: 200,000,000 MALTY
- Community: 150,000,000 MALTY
- Treasury: 75,000,000 MALTY
- Team: 75,000,000 MALTY

Planned initial availability: up to 100,000,000 MALTY, consisting of up to 50,000,000 Liquidity, 17,500,000 Ecosystem, 25,000,000 Community, 0 Treasury and 7,500,000 Team.

## Before any future real-asset operation

The following are deliberately outside this checklist and remain pending until separately authorized and documented:

- reserve transfers;
- liquidity provisioning;
- token distribution;
- team payments or releases;
- treasury expenditure;
- exchange or market-listing actions that require asset movement;
- any claim that depends on a transaction that has not yet occurred.

After any such operation, update `docs/RECONCILIATION.md` and `docs/TRANSPARENCY.md` from observed on-chain data before publishing new balance or circulation figures.

## Public presentation status

The repository is technically prepared for public project presentation. This status means the token facts, policies, security controls and transparency material are documented; it does not mean distribution or liquidity deployment has occurred.
