# MALTY Tokenomics

This document defines the working token allocation and governance rules for MALTY after completion of the Mainnet v1 deployment.

## Supply

- **Token:** Malty (MALTY)
- **Network:** Solana Mainnet
- **Mint:** `6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz`
- **Decimals:** 6
- **Fixed total supply:** **1,000,000,000 MALTY**
- **Mint Authority:** revoked
- **Freeze Authority:** none

Because the Mint Authority has been revoked, no additional MALTY can be created.

## Allocation

| Allocation | Percentage | MALTY |
| --- | ---: | ---: |
| Liquidity Reserve | 50% | 500,000,000 |
| Launch & Ecosystem Reserve | 20% | 200,000,000 |
| Community | 15% | 150,000,000 |
| Treasury | 7.5% | 75,000,000 |
| Team & Core Contributors | 7.5% | 75,000,000 |
| **Total** | **100%** | **1,000,000,000** |

## Allocation Rules

These rules are intended to make the allocation understandable and auditable. They describe how each allocation should be treated before any distribution is executed.

### 1. Liquidity Reserve — 50%

Purpose: reserve MALTY for future market liquidity and launch-related liquidity needs.

Rules:

- Keep this allocation separate from Team, Treasury and Community allocations.
- Do not use this allocation for personal compensation or unrelated project expenses.
- Any use should be documented with the amount, purpose, destination and transaction signature.
- A transfer out of this reserve does not automatically mean that the entire transferred amount is circulating supply; actual circulation should be described based on how the tokens are used.

### 2. Launch & Ecosystem Reserve — 20%

Purpose: support the MALTY ecosystem, integrations, partnerships, campaigns and future project initiatives.

Rules:

- Use only for activities connected to MALTY's launch or ecosystem development.
- Significant allocations to partners, campaigns or initiatives should be documented before distribution.
- Unused tokens remain part of the reserve and should not be silently reclassified.
- Any reallocation to another tokenomics category should be recorded in this document's change history.

### 3. Community — 15%

Purpose: community incentives, campaigns, participation programs and other community-focused initiatives.

Rules:

- Community distributions should have a stated purpose and eligibility rule.
- Avoid undisclosed insider distributions from the Community allocation.
- Document material distributions or campaigns, including the amount reserved or distributed.
- Tokens not yet distributed remain in the Community reserve.

### 4. Treasury — 7.5%

Purpose: long-term project operations and strategic reserves.

Rules:

- Keep Treasury tokens in a wallet or account clearly separated from Team allocations.
- Treasury spending should have a project-related purpose.
- Record material Treasury movements with destination, reason and transaction signature.
- Treasury tokens should not be presented publicly as circulating until they are actually released from reserve for their intended use.

### 5. Team & Core Contributors — 7.5%

Purpose: allocation for people who actively contribute to the MALTY project.

Rules:

- This category should represent actual Team and Core Contributor participation.
- Do not use the Team label to conceal allocations that do not correspond to project contribution.
- Individual recipient identities do not need to be published, but the aggregate allocation and release policy should remain transparent.
- Prefer staged release or vesting rather than making the entire allocation immediately available.
- Any future vesting schedule should be documented before the Team allocation is distributed.

## Wallet Separation

Before executing the allocation, MALTY should use separate wallets or clearly separated token accounts for major categories whenever practical. The goal is to make movements easier to audit and reduce accidental mixing between Liquidity, Ecosystem, Community, Treasury and Team allocations.

Public documentation may identify category wallets once they are created. Private keys, seed phrases and other wallet credentials must never be committed to this repository or published.

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

Material changes to the allocation percentages, category purposes or release policies should be documented in GitHub before or alongside implementation.

## Current Status

As of the Mainnet v1 checkpoint:

- the full 1,000,000,000 MALTY supply has been minted;
- Mint Authority has been permanently revoked;
- Freeze Authority is absent;
- metadata is present;
- the allocation above is the approved working tokenomics plan;
- category-level distribution has **not** been executed as part of this document.

## Change History

- **v1:** Initial tokenomics structure: 50% Liquidity Reserve, 20% Launch & Ecosystem Reserve, 15% Community, 7.5% Treasury, and 7.5% Team & Core Contributors.
