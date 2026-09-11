# MALTY Tokenomics

## Overview

MALTY is a Solana memecoin inspired by Charlotte, a Maltese with big community energy. Slogan: **“Small Dog. Big Community.”**

This document consolidates the current supply allocation, reserve structure and initial circulation plan.

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
| Freeze Authority | Revoked / none |
| Metadata Update Authority | Retained / mutable |

The Mint Authority has been revoked, so no additional MALTY can be created through that authority. Metadata Update Authority is separate from Mint Authority and does not provide minting capability.

## Supply Allocation

| Allocation | Amount | % of Total Supply |
|---|---:|---:|
| Liquidity Reserve | 500,000,000 | 50% |
| Ecosystem Reserve | 200,000,000 | 20% |
| Community Reserve | 150,000,000 | 15% |
| Team Reserve | 100,000,000 | 10% |
| Initial Circulation / Operations | 50,000,000 | 5% |
| **Total** | **1,000,000,000** | **100%** |

These are allocation categories, not automatic wallet balances or guarantees of circulation.

## Initial Circulation Plan

The planned initial circulating amount is **100,000,000 MALTY (10% of total supply)**.

| Source | Planned Initial Availability | % of Total Supply | Remaining Allocation |
|---|---:|---:|---:|
| Liquidity Reserve | 50,000,000 | 5.00% | 450,000,000 |
| Community Reserve | 25,000,000 | 2.50% | 125,000,000 |
| Ecosystem Reserve | 17,500,000 | 1.75% | 182,500,000 |
| Team Reserve | 7,500,000 | 0.75% | 92,500,000 |
| Initial Circulation / Operations | 0* | 0.00% | 50,000,000 |

**Total planned initial availability: 100,000,000 MALTY.**

*The 50M Initial Circulation / Operations category is an allocation category and is not added a second time to the 100M initial circulation figure. Actual circulation must be reconciled against on-chain balances before being represented publicly as final.

## Reserve Policies

### Liquidity Reserve — 500M

Intended for liquidity-related project needs. The current policy allows up to **50M MALTY** to be initially available for launch liquidity, while **450M MALTY** remain reserved unless a documented decision changes the allocation.

The project must not claim that liquidity is permanently locked, guaranteed or irrevocable unless a verifiable mechanism exists.

### Ecosystem Reserve — 200M

Intended for partnerships, integrations, launch support, development-related initiatives, infrastructure, marketing and other documented ecosystem purposes.

Up to **17.5M MALTY** may be initially available, leaving **182.5M MALTY** reserved.

### Community Reserve — 150M

Intended for community campaigns, participation and contribution initiatives, educational activities, events and transparent rewards.

Up to **25M MALTY** may be initially available, leaving **125M MALTY** reserved.

### Team Reserve — 100M

Intended for documented contributor incentives, development, maintenance and other project-related team purposes.

The Team Reserve is subject to the project's documented release schedule. Planned allocations are not circulating until actually distributed and available.

### Initial Circulation / Operations — 50M

This category represents the project's operating allocation. It is a planning category and must not be double-counted when calculating actual circulating supply.

## Team Release Policy

The Team Reserve has a **100,000,000 MALTY** allocation.

The current release policy is:

- up to **10%** may be initially eligible for distribution;
- the remaining **90%** is intended to be released in **12 equal monthly tranches**;
- eligibility does not itself make tokens circulating;
- actual distribution must be documented and reconciled;
- the technical enforcement mechanism is **TBD** until a verifiable on-chain or custody mechanism is selected.

The policy must not be represented as an on-chain lock or vesting contract until such a mechanism actually exists.

## Wallet Architecture

The current reserve accounts are:

| Account | Public Address | Planned Allocation | Current Balance |
|---|---|---:|---:|
| MALTY Liquidity | `8zMNiAh2uH1MoKh9eRjewSrgRjU4WQAYVV2u4SKSiRfU` | 500,000,000 | 0 |
| MALTY Ecosystem | `44Ha31Tj911xtFcNv5e4RTD7f3NxhULtcUygBJm8on1g` | 200,000,000 | 0 |
| MALTY Community | `BFYWFeqf8uJ4BvD6dfySCkdMVdtDPvxFe5hmSzuCCbhg` | 150,000,000 | 0 |
| MALTY Treasury | `6gkNMy3342qVUKSatW27zUAK22ops5Fu7G5J148MQZK6` | 0* | 0 |
| MALTY Team | `CvASopxtFapEhJ8r75UcHiisPVCfxv5ApGAqbwNagXmw` | 100,000,000 | 0 |

*Treasury is currently maintained as a separate operational/reserve account. No Treasury allocation is included in the current 1B allocation table; any future Treasury allocation must be documented as a tokenomics change before implementation.

All five accounts currently have zero MALTY. Planned allocations therefore do not represent current wallet balances.

## Reconciliation Rules

1. The total token supply remains fixed at **1,000,000,000 MALTY**.
2. Planned allocations are not the same as actual balances.
3. Actual circulating supply must only be increased when tokens are verifiably distributed or made available.
4. Material movements should be documented with date, amount, destination, purpose and transaction signature when applicable.
5. Reallocations between categories must be documented and reconciled against the fixed supply.
6. The project should not describe tokens as locked, burned, permanently reserved or deployed to liquidity unless the relevant mechanism can be verified.
7. Private keys, seed phrases, recovery phrases and signing credentials must never be stored in GitHub.

## Current Mainnet Status

- Mainnet mint: `6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz`
- Total supply: **1,000,000,000 MALTY**
- Mint Authority: **revoked**
- Freeze Authority: **none**
- Metadata: present
- Metadata Update Authority: retained / mutable
- Reserve accounts: created and documented
- Reserve account balances: **0 MALTY** as of the latest reconciliation
- No reserve transfer is represented as executed by this document

## Transparency Disclaimer

Token allocations describe intended use of the fixed supply. They are not a promise of price appreciation, liquidity, yield, profit or financial return. The project should distinguish clearly between allocated, reserved, distributed and circulating supply.

## Related Policies

- `docs/LIQUIDITY_POLICY.md`
- `docs/ECOSYSTEM_POLICY.md`
- `docs/COMMUNITY_POLICY.md`
- `docs/TEAM_POLICY.md`
- `docs/RECONCILIATION.md`
- `docs/WALLET_ARCHITECTURE.md`
