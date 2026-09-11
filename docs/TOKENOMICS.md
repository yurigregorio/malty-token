# MALTY Tokenomics

This document defines the working token allocation, transparency principles and governance rules for MALTY after completion of the Mainnet v1 deployment.

## Supply

- **Token:** Malty (MALTY)
- **Network:** Solana Mainnet
- **Mint:** `6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz`
- **Decimals:** 6
- **Fixed total supply:** **1,000,000,000 MALTY**
- **Mint Authority:** revoked
- **Freeze Authority:** none

Because the Mint Authority has been revoked, no additional MALTY can be created.

## Token Properties & Safety Summary

| Property | Status |
| --- | --- |
| Token standard | Traditional SPL Token (not Token-2022) |
| Total supply | 1,000,000,000 MALTY |
| Decimals | 6 |
| Transfer tax | 0% |
| Mint Authority | Revoked / none |
| Freeze Authority | None |
| Metadata | Present |
| Metadata Update Authority | Retained |
| Metadata mutability | Mutable while the Metadata Update Authority is retained |

The Metadata Update Authority is separate from the SPL Mint Authority. Retaining it does **not** allow additional MALTY to be minted. It allows token metadata to be corrected or updated while that authority remains active. Any future decision to revoke or otherwise change the Metadata Update Authority should be documented separately before execution.

## Allocation

| Allocation | Percentage | MALTY |
| --- | ---: | ---: |
| Liquidity Reserve | 50% | 500,000,000 |
| Launch & Ecosystem Reserve | 20% | 200,000,000 |
| Community | 15% | 150,000,000 |
| Treasury | 7.5% | 75,000,000 |
| Team & Core Contributors | 7.5% | 75,000,000 |
| **Total** | **100%** | **1,000,000,000** |

## Initial Circulating Supply

**Initial circulating supply: TBD before launch.**

The full 1,000,000,000 MALTY supply has been minted, but minted supply is not the same as circulating supply. Tokens assigned to reserves remain reserved until they are actually released for their documented purpose.

The Team & Core Contributors policy defines an initial release eligibility of 7,500,000 MALTY. This does **not** by itself mean that all 7,500,000 MALTY must be counted as circulating at launch; circulating supply should reflect tokens that have actually been distributed and are genuinely available.

Before any public launch, the project should document the initial circulating supply and the categories from which those circulating tokens originate.

## Allocation Rules

These rules are intended to make the allocation understandable and auditable. They describe how each allocation should be treated before and after distribution.

### 1. Liquidity Reserve — 50%

Purpose: reserve MALTY for future market liquidity and launch-related liquidity needs.

The 500,000,000 MALTY allocation is a **maximum reserve allocation**, not a commitment to place all 500,000,000 MALTY into liquidity at launch or at any single point in time. Any amount not actually deployed remains part of the Liquidity Reserve.

Rules:

- Keep this allocation separate from Team, Treasury and Community allocations.
- Do not use this allocation for personal compensation or unrelated project expenses.
- Any use should be documented with the amount, purpose, destination and transaction signature.
- A transfer out of this reserve does not automatically mean that the entire transferred amount is circulating supply; actual circulation should be described based on how the tokens are used.
- The amount initially deployed to liquidity should be documented separately before launch.

### 2. Launch & Ecosystem Reserve — 20%

Purpose: support the MALTY ecosystem, integrations, partnerships, campaigns and future project initiatives.

Rules:

- Use only for activities connected to MALTY's launch or ecosystem development.
- Significant allocations to partners, campaigns or initiatives should be documented before distribution.
- Unused tokens remain part of the reserve and should not be silently reclassified.
- Any reallocation to another tokenomics category should be recorded in this document's change history before implementation.

### 3. Community — 15%

Purpose: community incentives, campaigns, participation programs and other community-focused initiatives.

Rules:

- Community distributions should have a stated purpose and eligibility rule.
- Avoid undisclosed insider distributions from the Community allocation.
- Document material distributions or campaigns, including the amount reserved or distributed.
- Tokens not yet distributed remain in the Community Reserve.

### 4. Treasury — 7.5%

Purpose: long-term project operations and strategic reserves.

Rules:

- Keep Treasury tokens in a wallet or account clearly separated from Team allocations.
- Treasury spending should have a project-related purpose.
- Record material Treasury movements with destination, reason and transaction signature.
- Treasury tokens should not be presented publicly as circulating until they are actually released from reserve for their intended use.

### 5. Team & Core Contributors — 7.5%

Purpose: allocation for people who actively contribute to the MALTY project.

#### Internal allocation

The 75,000,000 MALTY Team & Core Contributors allocation is planned for 11 people:

| Role | People | MALTY per person | Total MALTY | % of total supply |
| --- | ---: | ---: | ---: | ---: |
| Team Lead | 1 | 20,000,000 | 20,000,000 | 2.0% |
| Core Contributors | 10 | 5,500,000 | 55,000,000 | 5.5% |
| **Total** | **11** | — | **75,000,000** | **7.5%** |

Each allocation is intended for a distinct person contributing to the project. Individual names do not need to be published in this document.

#### Release policy

The approved Team & Core Contributors release policy is:

- **10% initial release eligibility at the official launch**;
- **90% released in 12 equal monthly tranches**;
- the first monthly tranche becomes eligible one month after the official launch;
- the same proportional policy applies to the Team Lead and all 10 Core Contributors.

| Role | Initial 10% | Remaining 90% | Monthly release x 12 | Total |
| --- | ---: | ---: | ---: | ---: |
| Team Lead | 2,000,000 | 18,000,000 | 1,500,000 | 20,000,000 |
| Each Core Contributor | 550,000 | 4,950,000 | 412,500 | 5,500,000 |
| 10 Core Contributors total | 5,500,000 | 49,500,000 | 4,125,000 | 55,000,000 |
| **Team total** | **7,500,000** | **67,500,000** | **5,625,000** | **75,000,000** |

After the initial release, 12 monthly releases complete the Team allocation over the following 12 months.

Release rules:

- The initial 10% is the maximum amount eligible for initial Team distribution under this policy; eligibility does not automatically mean the tokens are circulating until actually distributed and available.
- No unreleased allocation should be accelerated without a documented change to this policy.
- If a Core Contributor permanently stops contributing before their allocation is fully released, the unreleased portion returns to the Team & Core Contributors Reserve unless a documented project decision states otherwise.
- Material changes to the schedule must be recorded in the Change History before, or at the same time as, implementation.
- The technical enforcement mechanism remains to be selected before execution. Until an actual on-chain, multisig or custody mechanism enforces the schedule, this section describes the project's release policy and must not be represented as a technical on-chain lock.

## Wallet Separation

Before executing the allocation, MALTY should use separate wallets or clearly separated token accounts for major categories whenever practical. The goal is to make movements easier to audit and reduce accidental mixing between Liquidity, Ecosystem, Community, Treasury and Team allocations.

Public documentation may identify category wallets once they are created. Private keys, seed phrases and other wallet credentials must never be committed to this repository or published.

## Material Movement Policy

For the purpose of this document, a movement is considered **material** when either of the following is true:

- a single transaction, or a set of directly related transactions, moves **5% or more of the original allocation of a category**; or
- tokens are reallocated from one tokenomics category to another, regardless of amount.

Material movements should be documented with the category, amount, purpose and transaction signature. This threshold is a documentation rule; it does not prevent smaller movements from also being disclosed when useful.

## Vesting and Lockups

The Team & Core Contributors release schedule is now defined: 10% initial release eligibility followed by 90% in 12 equal monthly tranches.

The **technical enforcement mechanism is still TBD**. Before executing the Team allocation, the project should select a verifiable release mechanism appropriate for the schedule.

The release policy and the enforcement mechanism are separate concepts. The project should only describe Team tokens as technically locked or vested on-chain if an actual mechanism enforces that restriction.

The same principle can be applied to Treasury or Ecosystem allocations when long-term restrictions are useful.

## Transparency Policy

MALTY should distinguish clearly between:

- **allocated supply** — tokens assigned to a tokenomics category;
- **reserved supply** — tokens still held for future use;
- **distributed supply** — tokens transferred to their intended recipients or use;
- **circulating supply** — tokens that are genuinely available in the market or community.

These terms should not be treated as interchangeable.

The project should avoid presenting reserved or merely allocated tokens as circulating supply.

## Change Governance

The allocation percentages, category purposes and release policies should not be changed silently after publication.

Any material tokenomics change should:

1. be documented in this file;
2. include a new entry in the Change History;
3. explain what changed and why; and
4. be documented before, or at the same time as, the corresponding implementation.

A documentation change does not itself create an on-chain restriction. Where the project describes tokens as technically locked, that statement should only be used when an actual on-chain or custody mechanism enforces the restriction.

## Tokenomics Disclaimer

This document describes the intended allocation and governance of the MALTY token supply. It is not a promise or guarantee of token price, market liquidity, appreciation, yield, profit or financial return.

Token allocations describe intended use of supply and should not be interpreted as a commitment that every reserved token will be distributed or enter circulation.

## Current Status

As of the current Mainnet v1 tokenomics checkpoint:

- the full 1,000,000,000 MALTY supply has been minted;
- Mint Authority has been permanently revoked;
- Freeze Authority is absent;
- Metaplex metadata is present;
- Metadata Update Authority is retained and remains separate from the revoked Mint Authority;
- the allocation above is the approved working tokenomics plan;
- initial circulating supply remains **TBD before launch**;
- Team release policy is defined as **10% initial + 90% over 12 monthly tranches**;
- technical enforcement of the Team release policy remains **TBD before execution**;
- category-level distribution has **not** been executed as part of this document.

## Change History

- **v1:** Initial tokenomics structure: 50% Liquidity Reserve, 20% Launch & Ecosystem Reserve, 15% Community, 7.5% Treasury, and 7.5% Team & Core Contributors.
- **v2:** Team & Core Contributors allocation defined for 11 people: 1 Team Lead with 20,000,000 MALTY and 10 Core Contributors with 5,500,000 MALTY each.
- **v3:** Added token safety summary, Metadata Update Authority disclosure, initial circulating supply status, Liquidity Reserve clarification, objective material-movement threshold, change governance and tokenomics disclaimer.
- **v4:** Defined Team & Core Contributors release policy: 10% initial release eligibility and the remaining 90% in 12 equal monthly tranches. Technical enforcement mechanism remains TBD before execution.
