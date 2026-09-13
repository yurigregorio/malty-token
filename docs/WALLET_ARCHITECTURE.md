# MALTY Wallet Architecture

This document defines the planned wallet and custody separation for MALTY. It complements `docs/TOKENOMICS.md` and does not by itself move tokens or enforce a lock on-chain.

## Objectives

The wallet architecture is intended to:

- keep each tokenomics category separated by public address;
- make reserve balances and movements easier to reconcile and audit;
- avoid mixing Team, Treasury, Community, Ecosystem, MALTY Impact and Liquidity purposes;
- support the approved initial-availability plan;
- keep private keys, seed phrases and signing credentials outside the repository.

## Reserve Custody

MALTY uses six dedicated Solana addresses for its six reserve categories.

| Reserve | Label | Public address | Canonical allocation |
| --- | --- | --- | ---: |
| Liquidity Reserve | `MALTY Liquidity` | `8zMNiAh2uH1MoKh9eRjewSrgRjU4WQAYVV2u4SKSiRfU` | 500,000,000 MALTY |
| Launch & Ecosystem Reserve | `MALTY Ecosystem` | `44Ha31Tj911xtFcNv5e4RTD7f3NxhULtcUygBJm8on1g` | 150,000,000 MALTY |
| Community Reserve | `MALTY Community` | `BFYWFeqf8uJ4BvD6dfySCkdMVdtDPvxFe5hmSzuCCbhg` | 150,000,000 MALTY |
| MALTY Impact Reserve | `MALTY Impact` | `DmPEyGFwy972wcdcA7UzxtDiSdrtU3Y4UJned7AJJyik` | 50,000,000 MALTY |
| Treasury Reserve | `MALTY Treasury` | `6gkNMy3342qVUKSatW27zUAK22ops5Fu7G5J148MQZK6` | 75,000,000 MALTY |
| Team & Core Contributors Reserve | `MALTY Team` | `CvASopxtFapEhJ8r75UcHiisPVCfxv5ApGAqbwNagXmw` | 75,000,000 MALTY |
| **Total** | | | **1,000,000,000 MALTY** |

These addresses provide category-level separation once MALTY is held in the respective accounts. They remain under the current temporary single-controller custody model and are not multisig-protected.

## Initial Availability Plan

| Reserve | Allocation | Planned initial availability | Planned remaining reserve |
| --- | ---: | ---: | ---: |
| Liquidity | 500,000,000 | 50,000,000 | 450,000,000 |
| Ecosystem | 150,000,000 | 17,500,000 | 132,500,000 |
| Community | 150,000,000 | 25,000,000 | 125,000,000 |
| MALTY Impact | 50,000,000 | 0 | 50,000,000 |
| Treasury | 75,000,000 | 0 | 75,000,000 |
| Team | 75,000,000 | 7,500,000 | 67,500,000 |
| **Total** | **1,000,000,000** | **100,000,000** | **900,000,000** |

Planned availability is not the same as actual circulating supply. Actual balances and movements must be reconciled from on-chain state.

## Reserve Purposes

### MALTY Liquidity
Market-liquidity needs. It must not be described as locked or permanent unless a verifiable mechanism exists.

### MALTY Ecosystem
Partnerships, integrations, launch initiatives, development, infrastructure and other documented ecosystem purposes.

### MALTY Community
Documented community programs, participation initiatives, educational activities, events and transparent rewards.

### MALTY Impact
Dedicated reserve for future documented animal-welfare initiatives under MALTY Impact / MALTY Gives. Funding this wallet is a reserve allocation, not a donation by itself. The program remains planned until its operating criteria and first initiative are published.

### MALTY Treasury
Long-term operational and strategic project reserve, separate from Team compensation.

### MALTY Team
Contributor incentives and Team allocation. Up to 7.5M MALTY is initially eligible; the remaining 67.5M follows the documented 12-tranche release policy. This must not be described as technically locked until a verifiable enforcement mechanism exists.

## Operational / Fee-Payer Wallet

The operational/deployer wallet remains separate from the six reserves.

- Label: `MALTY Ops` / operational-deployer
- Public address: `2bSPJckP1YfGbiHTYm2Ftuj4JSsmUsuX24VhYKwTaBSa`
- Purpose: network fees and administrative transaction execution

The operational wallet is not a tokenomics category.

## Custody and Authorization Model

The six reserve addresses currently remain within a temporary single-controller security boundary. This improves accounting separation but does not provide multisig protection.

A future migration to multisig or another verifiable custody arrangement remains recommended, especially for long-term Treasury, Team, Impact and Liquidity reserves. Until implemented, the project must not describe these reserves as multisig-protected.

## Address Publication Policy

Public project addresses and transaction signatures may be published for transparency. The repository must never contain seed phrases, private keys, wallet-export files, signing secrets or recovery codes.

## Reconciliation Standard

After any material reserve movement, record:

- category;
- balance before movement;
- amount moved;
- documented purpose;
- destination or public transaction reference where appropriate;
- resulting balance;
- whether the movement changes reported circulating supply.

A movement that merely funds a reserve wallet according to the canonical allocation does not automatically make those tokens circulating.

## Current Status

- six reserve categories and public addresses are documented;
- MALTY Impact is a canonical 50M / 5% reserve;
- Ecosystem is now 150M / 15%;
- planned initial availability remains 100M / 10%;
- reserve custody is currently single-controller, not multisig;
- actual balances are tracked in `docs/RECONCILIATION.md`.
