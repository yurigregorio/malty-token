# MALTY Reserve Reconciliation

This document records planned versus actual reserve balances at the current project checkpoint. It is a documentation and control record only; it does not execute token transfers.

## Current Checkpoint

The canonical tokenomics include six reserve categories. Four 1-MALTY destination tests were completed for Liquidity, Ecosystem, Community and MALTY Impact before the final top-ups. The reserve distribution has now been completed and verified against the Solscan Holders view for the official MALTY mint.

| Category | Public address | Canonical allocation | Verified balance |
| --- | --- | ---: | ---: |
| Liquidity Reserve | `8zMNiAh2uH1MoKh9eRjewSrgRjU4WQAYVV2u4SKSiRfU` | 500,000,000 MALTY | 500,000,000 MALTY |
| Ecosystem Reserve | `44Ha31Tj911xtFcNv5e4RTD7f3NxhULtcUygBJm8on1g` | 150,000,000 MALTY | 150,000,000 MALTY |
| Community Reserve | `BFYWFeqf8uJ4BvD6dfySCkdMVdtDPvxFe5hmSzuCCbhg` | 150,000,000 MALTY | 150,000,000 MALTY |
| MALTY Impact Reserve | `DmPEyGFwy972wcdcA7UzxtDiSdrtU3Y4UJned7AJJyik` | 50,000,000 MALTY | 50,000,000 MALTY |
| Treasury Reserve | `6gkNMy3342qVUKSatW27zUAK22ops5Fu7G5J148MQZK6` | 75,000,000 MALTY | 75,000,000 MALTY |
| Team & Core Contributors Reserve | `CvASopxtFapEhJ8r75UcHiisPVCfxv5ApGAqbwNagXmw` | 75,000,000 MALTY | 75,000,000 MALTY |
| **Reserve total** | | **1,000,000,000 MALTY** | **1,000,000,000 MALTY** |

The Solscan Holders view showed six holders collectively holding 100% of the fixed 1,000,000,000 MALTY supply, matching the canonical allocation above. The operational distribution wallet was also confirmed to hold 0 MALTY after distribution.

## Interpretation

Funding a reserve wallet according to tokenomics does not automatically make the full reserve circulating. Planned initial availability remains a policy limit and should only be treated as circulating when tokens are actually deployed, distributed or otherwise made available for their documented purpose.

The 50,000,000 MALTY in the MALTY Impact Reserve is a dedicated project reserve. Funding the wallet is not itself a charitable contribution; future use remains subject to the public impact policy and reporting requirements.

## Distribution Status

| Reserve | Target | Verified balance | Remaining top-up |
| --- | ---: | ---: | ---: |
| Liquidity | 500,000,000 | 500,000,000 | 0 |
| Ecosystem | 150,000,000 | 150,000,000 | 0 |
| Community | 150,000,000 | 150,000,000 | 0 |
| MALTY Impact | 50,000,000 | 50,000,000 | 0 |
| Treasury | 75,000,000 | 75,000,000 | 0 |
| Team | 75,000,000 | 75,000,000 | 0 |
| **Total** | **1,000,000,000** | **1,000,000,000** | **0** |

## Verification Note

On 2026-09-13, the completed reserve distribution was independently checked in the Solscan Holders view for the official MALTY mint `6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz`. The six holder balances and percentages matched the canonical tokenomics exactly: 50%, 15%, 15%, 7.5%, 7.5% and 5%, totaling 100% of supply.

Future material movements must be reconciled again from on-chain state before public balance claims are updated.

## Reconciliation Rule

For each future material movement, record the category, balance before movement, amount moved, purpose, destination or transaction signature where appropriate, resulting balance, and whether the movement changes reported circulating supply.

No private keys, seed phrases, signing secrets or recovery codes belong in this document or repository.

## Status

- Six reserve categories: fully funded and verified against the Solscan Holders view.
- Liquidity Reserve: 500,000,000 MALTY.
- Ecosystem Reserve: 150,000,000 MALTY.
- Community Reserve: 150,000,000 MALTY.
- MALTY Impact Reserve: 50,000,000 MALTY.
- Treasury Reserve: 75,000,000 MALTY.
- Team & Core Contributors Reserve: 75,000,000 MALTY.
- Operational distribution wallet: 0 MALTY.
- Remaining reserve top-up: 0 MALTY.
- Planned initial availability: 100,000,000 MALTY; this is not automatically circulating supply.
- Multisig custody: not yet implemented; current custody remains single-controller.
