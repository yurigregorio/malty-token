# MALTY Wallet Architecture

This document defines the planned wallet and custody separation for MALTY before any category-level token distribution is executed.

It complements `docs/TOKENOMICS.md`. It is a documentation and control model only; it does not itself create wallets, move tokens, or enforce a lock on-chain.

## Objectives

The wallet architecture is intended to:

- keep each tokenomics category operationally separate;
- make reserve balances and movements easier to reconcile and audit;
- avoid mixing Team, Treasury, Community, Ecosystem and Liquidity allocations;
- support the approved initial circulating-supply plan;
- support the Team release schedule without treating unreleased Team tokens as circulating;
- keep private keys, seed phrases and other credentials outside the repository.

## Project Reserve Structure

MALTY should use five clearly separated project-controlled reserve wallets or custody accounts, one for each tokenomics category.

| Reserve | Original allocation | Planned initial availability | Planned remaining reserve after launch |
| --- | ---: | ---: | ---: |
| Liquidity Reserve | 500,000,000 MALTY | 50,000,000 MALTY | 450,000,000 MALTY |
| Launch & Ecosystem Reserve | 200,000,000 MALTY | 17,500,000 MALTY | 182,500,000 MALTY |
| Community Reserve | 150,000,000 MALTY | 25,000,000 MALTY | 125,000,000 MALTY |
| Treasury Reserve | 75,000,000 MALTY | 0 MALTY | 75,000,000 MALTY |
| Team & Core Contributors Reserve | 75,000,000 MALTY | up to 7,500,000 MALTY | 67,500,000 MALTY subject to the release schedule |
| **Total** | **1,000,000,000 MALTY** | **100,000,000 MALTY** | **900,000,000 MALTY** |

The initial-availability column represents the approved launch plan. An amount becomes actual circulating supply only when it has genuinely been deployed or distributed for its documented purpose and is available accordingly.

## 1. Liquidity Reserve

Purpose: custody of MALTY reserved for market-liquidity needs.

- Original category allocation: 500,000,000 MALTY.
- Planned launch allocation: up to 50,000,000 MALTY.
- Planned reserve after launch: 450,000,000 MALTY, subject to reconciliation with actual launch execution.
- This wallet must not be used for Team compensation, Treasury expenses or Community distributions.

## 2. Launch & Ecosystem Reserve

Purpose: custody of MALTY reserved for integrations, partnerships, launch initiatives, campaigns and ecosystem development.

- Original category allocation: 200,000,000 MALTY.
- Planned initial availability: up to 17,500,000 MALTY.
- Planned reserve after launch: 182,500,000 MALTY, subject to reconciliation with actual launch execution.
- Cross-category reallocation must follow the tokenomics Change Governance policy.

## 3. Community Reserve

Purpose: custody of MALTY reserved for documented Community programs and distributions.

- Original category allocation: 150,000,000 MALTY.
- Planned initial availability: up to 25,000,000 MALTY.
- Planned reserve after launch: 125,000,000 MALTY, subject to reconciliation with actual launch execution.
- Community distributions should retain a stated purpose and eligibility rule.

## 4. Treasury Reserve

Purpose: long-term operational and strategic project reserve.

- Original category allocation: 75,000,000 MALTY.
- Planned initial availability: 0 MALTY.
- Planned reserve at launch: 75,000,000 MALTY.
- Treasury remains outside the planned initial circulating supply.
- Treasury must remain operationally separate from Team allocations.

## 5. Team & Core Contributors Reserve

Purpose: hold the Team allocation that has not yet become eligible under the approved release policy.

- Original category allocation: 75,000,000 MALTY.
- Initial release eligibility: up to 7,500,000 MALTY in total.
- Remaining scheduled allocation: 67,500,000 MALTY.
- The remaining allocation follows 12 equal monthly release tranches under `docs/TOKENOMICS.md`.

The Team Reserve is distinct from the 11 recipient wallets. The recipient structure is:

| Recipient class | People | Total allocation | Initial eligibility | Remaining scheduled allocation |
| --- | ---: | ---: | ---: | ---: |
| Team Lead | 1 | 20,000,000 MALTY | 2,000,000 MALTY | 18,000,000 MALTY |
| Core Contributors | 10 | 55,000,000 MALTY | 5,500,000 MALTY total | 49,500,000 MALTY total |
| **Total** | **11** | **75,000,000 MALTY** | **7,500,000 MALTY** | **67,500,000 MALTY** |

Individual recipient addresses do not need to be committed to this repository. If a public transparency record is later created, recipients may be represented with neutral labels such as `Team Lead`, `Contributor 01` through `Contributor 10`, while the project separately verifies the real recipient mapping.

## Operational / Fee-Payer Wallet

A separate operational wallet may be used solely for network fees and administrative transaction execution. It is not a tokenomics category and should not be assigned a MALTY allocation merely because it pays transaction fees.

Separating fee payment from reserve custody reduces accidental mixing of project reserves with operational SOL balances.

## Custody and Authorization Model

The final custody mechanism for project reserves is still to be selected before execution.

For material reserve custody, the project should prefer a control model that reduces dependence on a single credential, such as an appropriately configured multisig or another verifiable custody arrangement. The Team release mechanism should also be selected before the release policy is represented as technically enforced.

Until such a mechanism is implemented, the repository must describe the structure as a planned control policy rather than an on-chain lock.

## Address Publication Policy

Once category wallets or custody accounts exist, public addresses may be recorded in project documentation to improve transparency and allow independent balance verification.

The repository must never contain:

- seed phrases;
- private keys;
- wallet-export files containing credentials;
- signing secrets;
- recovery codes.

Public addresses and transaction signatures are safe to document when needed for transparency.

## Reconciliation Standard

After any launch or material reserve movement, the project should reconcile planned versus actual balances.

A reconciliation record should identify:

- tokenomics category;
- amount before the movement;
- amount moved;
- documented purpose;
- destination or public transaction reference where appropriate;
- resulting category balance;
- whether the movement changes reported circulating supply.

A movement between tokenomics categories is a reallocation and must follow the Change Governance policy in `docs/TOKENOMICS.md`.

## Current Status

At the time this document was created:

- the five-category reserve architecture is approved as the planned separation model;
- the planned initial circulating supply remains 100,000,000 MALTY;
- the Team release schedule remains 10% initial eligibility plus 90% over 12 monthly tranches;
- no category wallet addresses are recorded in this document yet;
- the technical custody / multisig / vesting mechanism remains to be selected;
- this document does not execute any on-chain transfer or token distribution.

## Change History

- **v1:** Defined the five project reserve categories, Team recipient separation, optional fee-payer wallet, custody principles, address-publication policy and reconciliation standard.
