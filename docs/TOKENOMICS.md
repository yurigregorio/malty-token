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

Rules:

- This category should represent actual Team and Core Contributor participation.
- Do not use the Team label to conceal allocations that do not correspond to project contribution.
- Individual recipient identities do not need to be published, but the aggregate allocation and release policy should remain transparent.
- Prefer staged release or vesting rather than making the entire allocation immediately available.
- A final Team release / vesting policy remains **TBD** and should be documented before Team tokens are distributed.

## Wallet Separation

Before executing the allocation, MALTY should use separate wallets or clearly separated token accounts for major categories whenever practical. The goal is to make movements easier to audit and reduce accidental mixing between Liquidity, Ecosystem, Community, Treasury and Team allocations.

Public documentation may identify category wallets once they are created. Private keys, seed phrases and other wallet credentials must never be committed to this repository or published.

## Material Movement Policy

For the purpose of this document, a movement is considered **material** when either of the following is true:

- a single transaction, or a set of directly related transactions, moves **5% or more of the original allocation of a category**; or
- tokens are reallocated from one tokenomics category to another, regardless of amount.

Material movements should be documented with the category, amount, purpose and transaction signature. This threshold is a documentation rule; it does not prevent smaller movements from also being disclosed when useful.

## Vesting and Lockups

No final vesting or lockup schedule is defined by this document yet.

Before Team & Core Contributors tokens are distributed, a release policy should be selected and documented. The same principle can be applied to Treasury or Ecosystem allocations when long-term restrictions are useful.

Possible policy structures include:

- a waiting period before the first release;
- gradual releases over a defined period;
- milestone-based releases;
- a combination of waiting period and gradual release.

The selected policy should be simple enough to explain publicly and should not be described as technically locked unless an actual on-chain or custody mechanism enforces the restriction.

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
- Team vesting / release policy remains **TBD**;
- category-level distribution has **not** been executed as part of this document.

## Change History

- **v1:** Initial tokenomics structure: 50% Liquidity Reserve, 20% Launch & Ecosystem Reserve, 15% Community, 7.5% Treasury, and 7.5% Team & Core Contributors.
- **v2:** Team & Core Contributors allocation defined for 11 people: 1 Team Lead with 20,000,000 MALTY and 10 Core Contributors with 5,500,000 MALTY each.
- **v3:** Added token safety summary, Metadata Update Authority disclosure, initial circulating supply status, Liquidity Reserve clarification, objective material-movement threshold, change governance and tokenomics disclaimer. Team vesting remains TBD.
