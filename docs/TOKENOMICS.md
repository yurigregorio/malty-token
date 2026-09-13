# MALTY Tokenomics

## Overview

MALTY is a Solana memecoin inspired by Charlotte, a Maltese with big community energy. Slogan: **“Small Dog. Big Community.”**

This document is the canonical reference for MALTY's fixed supply allocation, reserve structure and planned initial circulation.

## Token Parameters

| Parameter | Value |
|---|---|
| Name | MALTY |
| Symbol | MALTY |
| Network | Solana Mainnet |
| Standard | Traditional SPL Token |
| Mint | `6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz` |
| Decimals | 6 |
| Total Supply | 1,000,000,000 MALTY |
| Transfer Tax | 0% |
| Mint Authority | Revoked |
| Freeze Authority | None |
| Metadata Update Authority | Retained / mutable |

The Mint Authority has been revoked, so no additional MALTY can be created through that authority. Metadata Update Authority is separate from Mint Authority and does not provide minting capability.

## Canonical Supply Allocation

| Allocation | Amount | % of Total Supply |
|---|---:|---:|
| Liquidity Reserve | 500,000,000 | 50% |
| Ecosystem Reserve | 150,000,000 | 15% |
| Community Reserve | 150,000,000 | 15% |
| MALTY Impact Reserve | 50,000,000 | 5% |
| Treasury Reserve | 75,000,000 | 7.5% |
| Team & Core Contributors Reserve | 75,000,000 | 7.5% |
| **Total** | **1,000,000,000** | **100%** |

These are allocation categories, not guarantees of current wallet balances or circulating supply.

The MALTY Impact allocation is funded by reducing the previous Ecosystem allocation from 200,000,000 MALTY to 150,000,000 MALTY. Total supply remains unchanged.

## Planned Initial Availability

The approved planned initial availability remains **100,000,000 MALTY (10% of total supply)**.

| Source | Planned Initial Availability | % of Total Supply | Planned Remaining Reserve |
|---|---:|---:|---:|
| Liquidity Reserve | 50,000,000 | 5.00% | 450,000,000 |
| Ecosystem Reserve | 17,500,000 | 1.75% | 132,500,000 |
| Community Reserve | 25,000,000 | 2.50% | 125,000,000 |
| MALTY Impact Reserve | 0 | 0.00% | 50,000,000 |
| Treasury Reserve | 0 | 0.00% | 75,000,000 |
| Team & Core Contributors Reserve | 7,500,000 | 0.75% | 67,500,000 |
| **Total** | **100,000,000** | **10.00%** | **900,000,000** |

The 100M figure is a planned availability figure. It becomes actual circulating supply only when the corresponding tokens are verifiably deployed or distributed and available for their documented purpose.

## Reserve Policies

### Liquidity Reserve — 500M

Intended for market-liquidity needs. Up to **50M MALTY** is planned for initial launch availability, while **450M MALTY** remains reserved unless a documented allocation change occurs.

The project must not claim that liquidity is permanently locked, guaranteed or irrevocable unless a verifiable mechanism exists.

### Ecosystem Reserve — 150M

Intended for partnerships, integrations, launch initiatives, campaigns, development, infrastructure and other documented ecosystem purposes.

Up to **17.5M MALTY** is planned for initial availability, leaving **132.5M MALTY** reserved.

### Community Reserve — 150M

Intended for documented community programs, participation initiatives, educational activities, events and transparent rewards.

Up to **25M MALTY** is planned for initial availability, leaving **125M MALTY** reserved.

### MALTY Impact Reserve — 50M

Intended exclusively as the token reserve for documented animal-welfare initiatives under the MALTY Impact / MALTY Gives program.

- Allocation: **50,000,000 MALTY (5%)**.
- Planned initial availability: **0 MALTY**.
- The full **50M MALTY** remains reserved at launch.
- Funding the reserve wallet does not itself represent a donation or make the tokens circulating.
- Any future use must follow the published impact policy and be supported by beneficiary, purpose and evidence records.
- MALTY Impact must not be presented as a reason to expect token price appreciation, returns or guaranteed demand.

### Treasury Reserve — 75M

Intended as a long-term operational and strategic project reserve.

No Treasury tokens are included in the planned initial circulation. The full **75M MALTY** remains reserved at launch unless a documented tokenomics change is approved.

### Team & Core Contributors Reserve — 75M

Intended for documented contributor incentives, development, maintenance and other project-related team purposes.

Up to **7.5M MALTY** is initially eligible under the release policy. The remaining **67.5M MALTY** is scheduled for release over 12 equal monthly tranches.

## Team Release Policy

The Team & Core Contributors Reserve has a **75,000,000 MALTY** allocation.

The current release policy is:

- up to **10% (7.5M MALTY)** may initially be eligible for distribution;
- the remaining **90% (67.5M MALTY)** is intended to be released in **12 equal monthly tranches**;
- eligibility does not itself make tokens circulating;
- actual distributions must be documented and reconciled;
- the technical enforcement mechanism is **TBD** until a verifiable on-chain or custody mechanism is selected.

The Team Reserve must not be represented as an on-chain lock or vesting contract until such a mechanism actually exists.

### Team Recipient Structure

The 75M Team allocation is planned across 11 eventual recipient roles:

| Recipient class | People | Total Allocation | Initial Eligibility | Remaining Scheduled Allocation |
|---|---:|---:|---:|---:|
| Team Lead | 1 | 20,000,000 | 2,000,000 | 18,000,000 |
| Core Contributors | 10 | 55,000,000 | 5,500,000 total | 49,500,000 total |
| **Total** | **11** | **75,000,000** | **7,500,000** | **67,500,000** |

Individual recipient addresses are intentionally not stored in this repository.

## Wallet Architecture

The six reserve accounts are:

| Account | Public Address | Planned Allocation |
|---|---|---:|
| MALTY Liquidity | `8zMNiAh2uH1MoKh9eRjewSrgRjU4WQAYVV2u4SKSiRfU` | 500,000,000 |
| MALTY Ecosystem | `44Ha31Tj911xtFcNv5e4RTD7f3NxhULtcUygBJm8on1g` | 150,000,000 |
| MALTY Community | `BFYWFeqf8uJ4BvD6dfySCkdMVdtDPvxFe5hmSzuCCbhg` | 150,000,000 |
| MALTY Impact | `DmPEyGFwy972wcdcA7UzxtDiSdrtU3Y4UJned7AJJyik` | 50,000,000 |
| MALTY Treasury | `6gkNMy3342qVUKSatW27zUAK22ops5Fu7G5J148MQZK6` | 75,000,000 |
| MALTY Team | `CvASopxtFapEhJ8r75UcHiisPVCfxv5ApGAqbwNagXmw` | 75,000,000 |

Actual balances and movement history are maintained in `docs/RECONCILIATION.md` and must be based on observed on-chain state.

The operational/deployer wallet remains separate from these tokenomics categories and is used for network fees and administrative transaction execution.

## Reconciliation Rules

1. Total supply remains fixed at **1,000,000,000 MALTY**.
2. Planned allocations are not the same as actual balances.
3. Planned initial availability remains **100,000,000 MALTY**; actual circulation must be determined from verifiable on-chain state.
4. Material movements should be documented with date, amount, destination, purpose and transaction signature when applicable.
5. Reallocations between categories require documented approval and reconciliation against the fixed supply.
6. The project must not describe tokens as locked, burned, permanently reserved or deployed to liquidity unless the relevant mechanism can be verified.
7. Funding the MALTY Impact reserve is not itself a charitable contribution.
8. Private keys, seed phrases, recovery phrases and signing credentials must never be stored in GitHub.

## Current Mainnet Status

- Mainnet mint: `6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz`
- Total supply: **1,000,000,000 MALTY**
- Mint Authority: **revoked**
- Freeze Authority: **none**
- Metadata: present
- Metadata Update Authority: retained / mutable
- Six reserve addresses: created and documented
- Actual balances: tracked separately through reconciliation
- No reserve transfer should be represented as completed until verified on-chain

## Transparency Disclaimer

Token allocations describe intended use of the fixed supply. They are not a promise of price appreciation, liquidity, yield, profit or financial return. The project should clearly distinguish between allocated, reserved, eligible, distributed and circulating supply.

## Related Policies

- `docs/LIQUIDITY_POLICY.md`
- `docs/ECOSYSTEM_POLICY.md`
- `docs/COMMUNITY_POLICY.md`
- `docs/MALTY_GIVES_POLICY.md`
- `docs/TEAM_POLICY.md`
- `docs/RECONCILIATION.md`
- `docs/WALLET_ARCHITECTURE.md`
