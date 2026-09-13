# MALTY Transparency

This document is the public transparency reference for the MALTY Mainnet v1 token.

## Verified token facts

- Name: Malty
- Symbol: MALTY
- Network: Solana Mainnet
- Mint: `6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz`
- Decimals: 6
- Fixed total supply: 1,000,000,000 MALTY
- Mint Authority: revoked / none
- Freeze Authority: none
- Transfer tax: 0%
- Metaplex metadata: present
- Metadata Update Authority: intentionally retained for metadata maintenance; it cannot mint additional MALTY

## Canonical allocation

| Allocation | Public address | MALTY | Share |
| --- | --- | ---: | ---: |
| Liquidity | `8zMNiAh2uH1MoKh9eRjewSrgRjU4WQAYVV2u4SKSiRfU` | 500,000,000 | 50% |
| Ecosystem | `44Ha31Tj911xtFcNv5e4RTD7f3NxhULtcUygBJm8on1g` | 150,000,000 | 15% |
| Community | `BFYWFeqf8uJ4BvD6dfySCkdMVdtDPvxFe5hmSzuCCbhg` | 150,000,000 | 15% |
| MALTY Impact | `DmPEyGFwy972wcdcA7UzxtDiSdrtU3Y4UJned7AJJyik` | 50,000,000 | 5% |
| Treasury | `6gkNMy3342qVUKSatW27zUAK22ops5Fu7G5J148MQZK6` | 75,000,000 | 7.5% |
| Team | `CvASopxtFapEhJ8r75UcHiisPVCfxv5ApGAqbwNagXmw` | 75,000,000 | 7.5% |
| **Total** | | **1,000,000,000** | **100%** |

On 2026-09-13, before market liquidity was deployed, the Solscan Holders view for the official MALTY mint showed six holders collectively holding 100% of the fixed supply, with balances matching the canonical allocation above. The operational distribution wallet was also confirmed at 0 MALTY after distribution. That six-holder state is a historical checkpoint and changed when liquidity was deployed to the public pool. See `docs/RECONCILIATION.md`.

The 5% MALTY Impact allocation was created by reducing the previous Ecosystem allocation from 20% to 15%. The fixed total supply did not change.

## Active MALTY/SOL market

On 2026-09-13, the project created its first MALTY/SOL liquidity pool on Raydium using the CPMM / Standard AMM model.

| Field | Value |
| --- | --- |
| DEX | Raydium |
| Pair | MALTY / SOL |
| Pool type | CPMM / Standard AMM |
| Pool / AMM ID | `DGK42Xe3BMXTJeUVjVNSZL1FmwXVQxUaV88qp6hAdp9W` |
| Initial MALTY liquidity | 5,000,000 MALTY |
| Initial SOL liquidity | 0.50 SOL |
| Initial ratio | 10,000,000 MALTY per 1 SOL |
| Initial implied price | 0.0000001 SOL per MALTY |
| Fee tier | 0.25% |

Pool creation transaction:

`4zaDUJpvZ2s3ePQZ5bEhen8EAzCX8Ramufwjjo4sWB1MXmKisK6PyDgAD4bvCwpejk9T2s2Gy2iF2eezMTK68hrX`

A two-way trading check was completed after creation:

- buy test: 0.002 SOL -> approximately 15,672.72727 MALTY, successful;
- buy transaction: `4HyrCpxTRB5cP3yMFY4kucMpvMqzDoM7twfy8z41uk75Fe9bWNKZ7hx3F2NDSRvjcWBqc9xRHzgboV13QA4rFZf5`;
- sell test: 10,000 MALTY -> approximately 0.00109 SOL, successful.

Pool balances change with every swap, so the initial liquidity figures are launch values rather than permanent current balances. See `docs/LIQUIDITY.md` for the dedicated liquidity record.

## Planned initial availability

The project plan allows up to **100,000,000 MALTY (10%)** of initial availability:

- Liquidity: up to 50,000,000
- Ecosystem: up to 17,500,000
- Community: up to 25,000,000
- MALTY Impact: 0
- Treasury: 0
- Team: up to 7,500,000

Of the Liquidity allowance, 5,000,000 MALTY were initially deployed into the active MALTY/SOL pool. This remains below the documented maximum initial Liquidity availability of 50,000,000 MALTY.

The entire 50M MALTY Impact allocation is intended to remain reserved at launch. Funding the MALTY Impact reserve wallet is not itself a donation and does not automatically make those tokens circulating.

Planned availability is not automatically circulating supply. MALTY actually deployed into an active public pool is market-available, while untouched reserve balances remain subject to their documented reserve purposes.

## MALTY Impact disclosure

MALTY Impact / MALTY Gives remains a planned animal-welfare initiative. The dedicated 50M reserve provides a transparent token allocation for future initiatives, but the existence or funding of the reserve must not be presented as evidence that a donation has already occurred.

Completed initiatives should publish the beneficiary, purpose, date, contribution amount or goods, evidence and blockchain transaction where applicable.

## Custody boundary

The six reserve addresses are separate public accounts but currently remain within a temporary single-controller custody security boundary. This separation helps accounting and transparency, but it must not be represented as independent custody or multisignature security.

## Liquidity disclosure

The LP position created for the MALTY/SOL pool remains under the MALTY Liquidity wallet's custody at the current checkpoint. It is not documented as burned or locked.

The project therefore does not claim that liquidity is locked, permanent, guaranteed or non-removable. Such a claim may only be made if a separate verifiable mechanism is implemented and publicly documented.

## Reconciliation rule

Public balance claims should be based on on-chain observation. Whenever a material reserve or liquidity movement occurs, project documentation should be reconciled against actual balances and transaction records before public status numbers are updated.

## No performance promise

MALTY is a memecoin. Token allocation, market liquidity, documentation, MALTY Impact and transparency practices are not promises of price, liquidity, returns or future value.
