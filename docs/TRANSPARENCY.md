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

| Allocation | MALTY | Share |
| --- | ---: | ---: |
| Liquidity | 500,000,000 | 50% |
| Ecosystem | 150,000,000 | 15% |
| Community | 150,000,000 | 15% |
| MALTY Impact | 50,000,000 | 5% |
| Treasury | 75,000,000 | 7.5% |
| Team | 75,000,000 | 7.5% |
| **Total** | **1,000,000,000** | **100%** |

The 5% MALTY Impact allocation was created by reducing the previous Ecosystem allocation from 20% to 15%. The fixed total supply did not change.

## Reserve addresses

| Reserve | Public address | Canonical allocation |
| --- | --- | ---: |
| Liquidity | `8zMNiAh2uH1MoKh9eRjewSrgRjU4WQAYVV2u4SKSiRfU` | 500,000,000 |
| Ecosystem | `44Ha31Tj911xtFcNv5e4RTD7f3NxhULtcUygBJm8on1g` | 150,000,000 |
| Community | `BFYWFeqf8uJ4BvD6dfySCkdMVdtDPvxFe5hmSzuCCbhg` | 150,000,000 |
| MALTY Impact | `DmPEyGFwy972wcdcA7UzxtDiSdrtU3Y4UJned7AJJyik` | 50,000,000 |
| Treasury | `6gkNMy3342qVUKSatW27zUAK22ops5Fu7G5J148MQZK6` | 75,000,000 |
| Team | `CvASopxtFapEhJ8r75UcHiisPVCfxv5ApGAqbwNagXmw` | 75,000,000 |

Canonical allocations are policy targets, not a claim that every reserve wallet already contains the full allocated amount. Current balances must be read from on-chain state and reconciled in `docs/RECONCILIATION.md`.

## Planned initial availability

The project plan still allows up to **100,000,000 MALTY (10%)** of initial availability:

- Liquidity: up to 50,000,000
- Ecosystem: up to 17,500,000
- Community: up to 25,000,000
- MALTY Impact: 0
- Treasury: 0
- Team: up to 7,500,000

The entire 50M MALTY Impact allocation is intended to remain reserved at launch. Funding the MALTY Impact reserve wallet is not itself a donation and does not automatically make those tokens circulating.

Planned availability is not automatically circulating supply. Circulating supply should only be updated when tokens are actually transferred, distributed or otherwise made available according to the documented policy.

## MALTY Impact disclosure

MALTY Impact / MALTY Gives remains a planned animal-welfare initiative. The dedicated 50M reserve provides a transparent token allocation for future initiatives, but the existence or funding of the reserve must not be presented as evidence that a donation has already occurred.

Completed initiatives should publish the beneficiary, purpose, date, contribution amount or goods, evidence and blockchain transaction where applicable.

## Custody boundary

The six reserve addresses are separate public accounts but currently remain within a temporary single-controller custody security boundary. This separation helps accounting and transparency, but it must not be represented as independent custody or multisignature security.

## Liquidity disclosure

The project does not claim that liquidity is locked, permanent, guaranteed or non-removable unless a separate verifiable mechanism is implemented and publicly documented.

## Reconciliation rule

Public balance claims should be based on on-chain observation. Whenever a material reserve movement occurs, project documentation should be reconciled against actual balances and transaction records before public status numbers are updated.

## No performance promise

MALTY is a memecoin. Token allocation, documentation, MALTY Impact and transparency practices are not promises of price, liquidity, returns or future value.
