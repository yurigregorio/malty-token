# MALTY Wallet Architecture

This document defines the planned wallet and custody separation for MALTY before any category-level token distribution is executed.

It complements `docs/TOKENOMICS.md`. It is a documentation and control model only; it does not itself create wallets, move tokens, or enforce a lock on-chain.

## Objectives

The wallet architecture is intended to:

- keep each tokenomics category clearly accounted for;
- make reserve balances and movements easier to reconcile and audit;
- avoid mixing Team, Treasury, Community, Ecosystem and Liquidity purposes;
- support the approved initial circulating-supply plan;
- support the Team release schedule without treating unreleased Team tokens as circulating;
- keep private keys, seed phrases and other credentials outside the repository.

## Current Interim Custody

During the single-controller phase, MALTY uses one dedicated project reserve wallet as the custody address for project reserves.

- **Label:** `MALTY - Project Reserve`
- **Public address:** `8zMNiAh2uH1MoKh9eRjewSrgRjU4WQAYVV2u4SKSiRfU`
- **Purpose:** Custody of MALTY project reserves
- **Controller:** Team Lead / project custody
- **Model:** temporary single-controller custody

This public address is safe to disclose for transparency. No seed phrase, private key, wallet-export file, signing secret or recovery code may be committed to this repository.

The five tokenomics categories remain separate in the project's accounting even while they share this interim custody address. A shared custody address does **not** merge or reallocate the categories.

The long-term target remains category-level separation and stronger authorization, such as separate custody accounts and/or an appropriately configured multisig, before material public distribution where practical.

## Project Reserve Structure

The approved accounting structure contains five reserve categories.

| Reserve | Original allocation | Planned initial availability | Planned remaining reserve after launch |
| --- | ---: | ---: | ---: |
| Liquidity Reserve | 500,000,000 MALTY | 50,000,000 MALTY | 450,000,000 MALTY |
| Launch & Ecosystem Reserve | 200,000,000 MALTY | 17,500,000 MALTY | 182,500,000 MALTY |
| Community Reserve | 150,000,000 MALTY | 25,000,000 MALTY | 125,000,000 MALTY |
| Treasury Reserve | 75,000,000 MALTY | 0 MALTY | 75,000,000 MALTY |
| Team & Core Contributors Reserve | 75,000,000 MALTY | up to 7,500,000 MALTY | 67,500,000 MALTY subject to the release schedule |
| **Total** | **1,000,000,000 MALTY** | **100,000,000 MALTY** | **900,000,000 MALTY** |

The initial-availability column represents the approved launch plan. An amount becomes actual circulating supply only when it has genuinely been deployed or distributed for its documented purpose and is available accordingly.

While the interim Project Reserve wallet is used, the category figures above are accounting allocations rather than separate on-chain wallet balances. Each movement must therefore identify which category it belongs to.

## 1. Liquidity Reserve

Purpose: MALTY reserved for market-liquidity needs.

- Original category allocation: 500,000,000 MALTY.
- Planned launch allocation: up to 50,000,000 MALTY.
- Planned reserve after launch: 450,000,000 MALTY, subject to reconciliation with actual launch execution.
- This allocation must not be used for Team compensation, Treasury expenses or Community distributions.

## 2. Launch & Ecosystem Reserve

Purpose: MALTY reserved for integrations, partnerships, launch initiatives, campaigns and ecosystem development.

- Original category allocation: 200,000,000 MALTY.
- Planned initial availability: up to 17,500,000 MALTY.
- Planned reserve after launch: 182,500,000 MALTY, subject to reconciliation with actual launch execution.
- Cross-category reallocation must follow the tokenomics Change Governance policy.

## 3. Community Reserve

Purpose: MALTY reserved for documented Community programs and distributions.

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
- Treasury must remain logically and operationally distinct from Team allocations.

## 5. Team & Core Contributors Reserve

Purpose: hold the Team allocation that has not yet become eligible under the approved release policy.

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

A separate operational wallet may be used for network fees and administrative transaction execution. It is not a tokenomics category and should not be assigned a MALTY allocation merely because it pays transaction fees.

Separating fee payment from reserve custody reduces accidental mixing of project reserves with operational SOL balances.

## Custody and Authorization Model

The current Project Reserve address is a temporary single-controller custody model.

This provides address separation from the operational/deployer wallet, but it does not provide multisig protection. Compromise of the controlling credential could therefore compromise the reserve wallet.

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

Because the interim Project Reserve wallet can hold multiple categories at the same address, every outgoing reserve movement should be assigned to exactly one tokenomics category in the project's ledger unless a documented cross-category reallocation is being performed.

A movement between tokenomics categories is a reallocation and must follow the Change Governance policy in `docs/TOKENOMICS.md`.

## Current Status

- the five-category reserve accounting architecture is approved;
- the interim `MALTY - Project Reserve` public address is `8zMNiAh2uH1MoKh9eRjewSrgRjU4WQAYVV2u4SKSiRfU`;
- the current reserve model is temporary single-controller custody;
- the planned initial circulating supply remains 100,000,000 MALTY;
- the Team release schedule remains 10% initial eligibility plus 90% over 12 monthly tranches;
- stronger category-level custody / multisig separation remains a future control improvement;
- the technical Team vesting mechanism remains to be selected;
- documenting this address does not itself execute any on-chain transfer or token distribution.

## Change History

- **v1:** Defined the five project reserve categories, Team recipient separation, optional fee-payer wallet, custody principles, address-publication policy and reconciliation standard.
- **v2:** Registered the interim `MALTY - Project Reserve` public address and documented the temporary single-controller custody model while preserving the five tokenomics categories as separate accounting allocations.
