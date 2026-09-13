# MALTY Reserve Reconciliation

This document records planned versus actual reserve balances at the current project checkpoint. It is a documentation and control record only; it does not execute token transfers.

## Historical allocation checkpoint

On 2026-09-13, before market liquidity was deployed, the completed reserve distribution was independently checked in the Solscan Holders view for the official MALTY mint `6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz`.

At that checkpoint, six holders collectively held 100% of the fixed 1,000,000,000 MALTY supply and matched the canonical allocation exactly: 50%, 15%, 15%, 7.5%, 7.5% and 5%. The operational distribution wallet was also confirmed at 0 MALTY.

That six-holder state is a historical checkpoint. It changed when part of the Liquidity Reserve was deployed into the public MALTY/SOL pool.

## Current documented reserve state

On 2026-09-13, 5,000,000 MALTY from the Liquidity Reserve were used as the initial MALTY side of a Raydium CPMM pool together with 0.50 SOL.

| Category | Public reserve address | Canonical allocation | Direct reserve-wallet balance at current checkpoint | Initial amount deployed to active pool |
| --- | --- | ---: | ---: | ---: |
| Liquidity Reserve | `8zMNiAh2uH1MoKh9eRjewSrgRjU4WQAYVV2u4SKSiRfU` | 500,000,000 MALTY | 495,000,000 MALTY | 5,000,000 MALTY |
| Ecosystem Reserve | `44Ha31Tj911xtFcNv5e4RTD7f3NxhULtcUygBJm8on1g` | 150,000,000 MALTY | 150,000,000 MALTY | 0 |
| Community Reserve | `BFYWFeqf8uJ4BvD6dfySCkdMVdtDPvxFe5hmSzuCCbhg` | 150,000,000 MALTY | 150,000,000 MALTY | 0 |
| MALTY Impact Reserve | `DmPEyGFwy972wcdcA7UzxtDiSdrtU3Y4UJned7AJJyik` | 50,000,000 MALTY | 50,000,000 MALTY | 0 |
| Treasury Reserve | `6gkNMy3342qVUKSatW27zUAK22ops5Fu7G5J148MQZK6` | 75,000,000 MALTY | 75,000,000 MALTY | 0 |
| Team & Core Contributors Reserve | `CvASopxtFapEhJ8r75UcHiisPVCfxv5ApGAqbwNagXmw` | 75,000,000 MALTY | 75,000,000 MALTY | 0 |
| **Total** | | **1,000,000,000 MALTY** | **995,000,000 MALTY** | **5,000,000 MALTY initially** |

The active pool inventory changes whenever users buy or sell, so the 5,000,000 MALTY figure above is the **initial pool deposit**, not a claim about the pool's permanent current balance.

## Active liquidity checkpoint

- DEX: Raydium
- Pool type: CPMM / Standard AMM
- Pair: MALTY / SOL
- Pool / AMM ID: `DGK42Xe3BMXTJeUVjVNSZL1FmwXVQxUaV88qp6hAdp9W`
- Initial liquidity: 5,000,000 MALTY + 0.50 SOL
- Fee tier: 0.25%
- Pool creation transaction: `4zaDUJpvZ2s3ePQZ5bEhen8EAzCX8Ramufwjjo4sWB1MXmKisK6PyDgAD4bvCwpejk9T2s2Gy2iF2eezMTK68hrX`
- Buy test: successful; 0.002 SOL -> approximately 15,672.72727 MALTY
- Buy test transaction: `4HyrCpxTRB5cP3yMFY4kucMpvMqzDoM7twfy8z41uk75Fe9bWNKZ7hx3F2NDSRvjcWBqc9xRHzgboV13QA4rFZf5`
- Sell test: successful; 10,000 MALTY -> approximately 0.00109 SOL

See `docs/LIQUIDITY.md` for the dedicated liquidity record.

## Interpretation

Funding a reserve wallet according to tokenomics does not automatically make the full reserve circulating. Conversely, MALTY deployed into an active public liquidity pool is market-available and must no longer be described as merely sitting in the reserve wallet.

The canonical Liquidity allocation remains 500,000,000 MALTY, but 5,000,000 MALTY were moved from the reserve wallet into the active pool at launch. Subsequent swaps redistribute MALTY and SOL inside that pool.

The LP position is currently controlled by the MALTY Liquidity wallet and is not documented as burned or locked. The project therefore must not claim permanent or non-removable liquidity.

The 50,000,000 MALTY in the MALTY Impact Reserve remains a dedicated project reserve. Funding that wallet is not itself a charitable contribution; future use remains subject to the public impact policy and reporting requirements.

## Reconciliation Rule

For each future material movement, record the category, balance before movement, amount moved, purpose, destination or transaction signature where appropriate, resulting balance, LP custody state where applicable, and whether the movement changes market availability.

No private keys, seed phrases, signing secrets or recovery codes belong in this document or repository.

## Status

- Six canonical reserve categories: documented.
- Historical full-allocation checkpoint: verified against Solscan before liquidity deployment.
- Liquidity Reserve canonical allocation: 500,000,000 MALTY.
- Liquidity Reserve direct wallet balance after initial pool deposit: 495,000,000 MALTY.
- Initial MALTY deployed to Raydium pool: 5,000,000 MALTY.
- Initial paired liquidity: 0.50 SOL.
- MALTY/SOL buy test: successful.
- MALTY/SOL sell test: successful.
- Ecosystem Reserve: 150,000,000 MALTY.
- Community Reserve: 150,000,000 MALTY.
- MALTY Impact Reserve: 50,000,000 MALTY.
- Treasury Reserve: 75,000,000 MALTY.
- Team & Core Contributors Reserve: 75,000,000 MALTY.
- Operational distribution wallet: 0 MALTY at the completed-distribution checkpoint.
- Multisig custody: not yet implemented; current reserve custody remains single-controller.
