# MALTY Wallet Architecture

This document defines the planned wallet and custody separation for MALTY before any category-level token distribution is executed.

It complements `docs/TOKENOMICS.md`. It is a documentation and control model only; it does not itself create wallets, move tokens, or enforce a lock on-chain.

## Objectives

The wallet architecture is intended to:

- keep each tokenomics category clearly separated by public address;
- make reserve balances and movements easier to reconcile and audit;
- avoid mixing Team, Treasury, Community, Ecosystem and Liquidity purposes;
- support the approved initial circulating-supply plan;
- support the Team release schedule without treating unreleased Team tokens as circulating;
- keep private keys, seed phrases and other credentials outside the repository.

## Current Reserve Custody

MALTY currently uses five dedicated Solana accounts for the five project reserve categories.

| Reserve | Label | Public address |
| --- | --- | --- |
| Liquidity Reserve | `MALTY Liquidity` | `8zMNiAh2uH1MoKh9eRjewSrgRjU4WQAYVV2u4SKSiRfU` |
| Launch & Ecosystem Reserve | `MALTY Ecosystem` | `44Ha31Tj911xtFcNv5e4RTD7f3NxhULtcUygBJm8on1g` |
| Community Reserve | `MALTY Community` | `BFYWFeqf8uJ4BvD6dfySCkdMVdtDPvxFe5hmSzuCCbhg` |
| Treasury Reserve | `MALTY Treasury` | `6gkNMy3342qVUKSatW27zUAK22ops5Fu7G5J148MQZK6` |
| Team & Core Contributors Reserve | `MALTY Team` | `CvASopxtFapEhJ8r75UcHiisPVCfxv5ApGAqbwNagXmw` |

These addresses provide category-level on-chain separation once MALTY is actually held in the respective accounts. They remain under the current temporary single-controller custody model and are not multisig-protected.

The public addresses are safe to disclose for transparency. No seed phrase, private key, wallet-export file, signing secret or recovery code may be committed to this repository.

## Project Reserve Structure

| Reserve | Original allocation | Planned initial availability | Planned remaining reserve after launch |
| --- | ---: | ---: | ---: |
| Liquidity Reserve | 500,000,000 MALTY | 50,000,000 MALTY | 450,000,000 MALTY |
| Launch & Ecosystem Reserve | 200,000,000 MALTY | 17,500,000 MALTY | 182,500,000 MALTY |
| Community Reserve | 150,000,000 MALTY | 25,000,000 MALTY | 125,000,000 MALTY |
| Treasury Reserve | 75,000,000 MALTY | 0 MALTY | 75,000,000 MALTY |
| Team & Core Contributors Reserve | 75,000,000 MALTY | up to 7,500,000 MALTY | 67,500,000 MALTY subject to the release schedule |
| **Total** | **1,000,000,000 MALTY** | **100,000,000 MALTY** | **900,000,000 MALTY** |

The initial-availability column represents the approved launch plan. An amount becomes actual circulating supply only when it has genuinely been deployed or distributed for its documented purpose and is available accordingly.

The allocations above remain planned figures until the corresponding on-chain balances and movements actually exist.

## 1. Liquidity Reserve

Purpose: MALTY reserved for market-liquidity needs.

- Address: `8zMNiAh2uH1MoKh9eRjewSrgRjU4WQAYVV2u4SKSiRfU`.
- Original category allocation: 500,000,000 MALTY.
- Planned launch allocation: up to 50,000,000 MALTY.
- Planned reserve after launch: 450,000,000 MALTY, subject to reconciliation with actual launch execution.
- This allocation must not be used for Team compensation, Treasury expenses or Community distributions.

## 2. Launch & Ecosystem Reserve

Purpose: MALTY reserved for integrations, partnerships, launch initiatives, campaigns and ecosystem development.

- Address: `44Ha31Tj911xtFcNv5e4RTD7f3NxhULtcUygBJm8on1g`.
- Original category allocation: 200,000,000 MALTY.
- Planned initial availability: up to 17,500,000 MALTY.
- Planned reserve after launch: 182,500,000 MALTY, subject to reconciliation with actual launch execution.
- Cross-category reallocation must follow the tokenomics Change Governance policy.

## 3. Community Reserve

Purpose: MALTY reserved for documented Community programs and distributions.

- Address: `BFYWFeqf8uJ4BvD6dfySCkdMVdtDPvxFe5hmSzuCCbhg`.
- Original category allocation: 150,000,000 MALTY.
- Planned initial availability: up to 25,000,000 MALTY.
- Planned reserve after launch: 125,000,000 MALTY, subject to reconciliation with actual launch execution.
- Community distributions should retain a stated purpose and eligibility rule.

## 4. Treasury Reserve

Purpose: long-term operational and strategic project reserve.

- Address: `6gkNMy3342qVUKSatW27zUAK22ops5Fu7G5J148MQZK6`.
- Original category allocation: 75,000,000 MALTY.
- Planned initial availability: 0 MALTY.
- Planned reserve at launch: 75,000,000 MALTY.
- Treasury remains outside the planned initial circulating supply.
- Treasury must remain logically and operationally distinct from Team allocations.

## 5. Team & Core Contributors Reserve

Purpose: hold the Team allocation that has not yet become eligible under the approved release policy.

- Address: `CvASopxtFapEhJ8r75UcHiisPVCfxv5ApGAqbwNagXmw`.
- Original category allocation: 75,000,000 MALTY.
- Initial release eligibility: up to 7,500,000 MALTY in total.
- Remaining scheduled allocation: 67,500,000 MALTY.
- The remaining allocation follows 12 equal monthly release tranches under `docs/TOKENOMICS.md`.

The Team Reserve is distinct from the 11 eventual recipient wallets. The recipient structure is:

| Recipient class | People | Total allocation | Initial eligibility | Remaining scheduled allocation |
| --- | ---: | ---: | ---: | ---: |
| Team Lead | 1 | 20,000,000 MALTY | 2,000,000 MALTY | 18,000,000 MALTY |
| Core Contributors | 10 | 55,000,000 MALTY | 5,500,000 MALTY total | 49,500,000 MALTY total |
| **Total** | **11** | **75,000,000 MALTY** | **7,500,000 MALTY** | **67,500,000 MALTY** |

Individual recipient addresses do not need to be committed to this repository. Recipients may later be represented with neutral labels such as `Team Lead`, `Contributor 01` through `Contributor 10`, while the project separately verifies the real recipient mapping.

## Operational / Fee-Payer Wallet

The existing operational/deployer wallet remains separate from the five reserves.

- Label: `MALTY Ops` / operational-deployer.
- Public address: `2bSPJckP1YfGbiHTYm2Ftuj4JSsmUsuX24VhYKwTaBSa`.
- Purpose: network fees and administrative transaction execution.

The operational wallet is not a tokenomics category and should not receive a MALTY allocation merely because it pays transaction fees.

## Custody and Authorization Model

The five reserve addresses currently provide category-level account separation but remain under a temporary single-controller custody model.

This improves auditability and reduces accidental category mixing, but it does not provide multisig protection. Compromise of the controlling credential could therefore affect the reserve accounts under that credential.

Before material public distribution, the project should review whether to migrate reserve custody to a control model that reduces dependence on a single credential, such as an appropriately configured multisig or another verifiable custody arrangement. The Team release mechanism should also be selected before the release policy is represented as technically enforced.

Until such a mechanism is implemented, the repository must not describe project reserves as multisig-protected or Team tokens as technically locked on-chain.

## Address Publication Policy

Public project wallet addresses may be recorded in project documentation to improve transparency and allow independent balance verification.

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

- the five-category reserve architecture now has one dedicated public address per category;
- the reserve accounts are currently under temporary single-controller custody;
- the operational/deployer wallet remains separate from the reserve accounts;
- the planned initial circulating supply remains 100,000,000 MALTY;
- the Team release schedule remains 10% initial eligibility plus 90% over 12 monthly tranches;
- stronger multisig custody remains a future control improvement;
- the technical Team vesting mechanism remains to be selected;
- registering these addresses does not itself execute any on-chain transfer or token distribution.

## Change History

- **v1:** Defined the five project reserve categories, Team recipient separation, optional fee-payer wallet, custody principles, address-publication policy and reconciliation standard.
- **v2:** Registered the interim `MALTY - Project Reserve` public address and documented the temporary single-controller custody model while preserving the five tokenomics categories as separate accounting allocations.
- **v3:** Replaced the shared interim reserve address model with five dedicated reserve addresses and documented the operational/deployer wallet separately.
