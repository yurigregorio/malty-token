# MALTY Reserve Reconciliation

This document records planned versus actual reserve balances at the current project checkpoint. It is a documentation and control record only; it does not execute token transfers.

## Current Checkpoint

The canonical tokenomics include six reserve categories. Four 1-MALTY destination tests have been completed for Liquidity, Ecosystem, Community and MALTY Impact before the full reserve distribution.

| Category | Public address | Canonical allocation | Planned initial availability | Current documented balance |
| --- | --- | ---: | ---: | ---: |
| Liquidity Reserve | `8zMNiAh2uH1MoKh9eRjewSrgRjU4WQAYVV2u4SKSiRfU` | 500,000,000 MALTY | 50,000,000 MALTY | 1 MALTY |
| Ecosystem Reserve | `44Ha31Tj911xtFcNv5e4RTD7f3NxhULtcUygBJm8on1g` | 150,000,000 MALTY | 17,500,000 MALTY | 1 MALTY |
| Community Reserve | `BFYWFeqf8uJ4BvD6dfySCkdMVdtDPvxFe5hmSzuCCbhg` | 150,000,000 MALTY | 25,000,000 MALTY | 1 MALTY |
| MALTY Impact Reserve | `DmPEyGFwy972wcdcA7UzxtDiSdrtU3Y4UJned7AJJyik` | 50,000,000 MALTY | 0 MALTY | 1 MALTY |
| Treasury Reserve | `6gkNMy3342qVUKSatW27zUAK22ops5Fu7G5J148MQZK6` | 75,000,000 MALTY | 0 MALTY | 0 MALTY |
| Team & Core Contributors Reserve | `CvASopxtFapEhJ8r75UcHiisPVCfxv5ApGAqbwNagXmw` | 75,000,000 MALTY | up to 7,500,000 MALTY | 0 MALTY |
| **Reserve total** | | **1,000,000,000 MALTY** | **100,000,000 MALTY** | **4 MALTY** |

At this checkpoint, the remaining **999,999,996 MALTY** are still outside the reserve wallets pending the full allocation transfers.

## Interpretation

The four 1-MALTY movements are destination-validation tests. They count toward each reserve's final canonical balance, so the later top-up amounts must account for them rather than sending the full allocation again.

Funding a reserve wallet according to tokenomics does not automatically make those tokens circulating. In particular, the 50M MALTY Impact allocation remains a reserve and is not a charitable contribution by itself.

## Required Top-Up Amounts From This Checkpoint

To reach the canonical reserve balances from this checkpoint:

| Reserve | Additional MALTY required |
| --- | ---: |
| Liquidity | 499,999,999 |
| Ecosystem | 149,999,999 |
| Community | 149,999,999 |
| MALTY Impact | 49,999,999 |
| Treasury | 75,000,000 |
| Team | 75,000,000 |
| **Total** | **999,999,996** |

These values should only be used while the checkpoint balances above remain unchanged. Before each large transfer, verify the destination address and current balance in the wallet or explorer.

## Reconciliation Rule

For each future material movement, record the category, balance before movement, amount moved, purpose, destination or transaction signature where appropriate, resulting balance, and whether the movement changes reported circulating supply.

No private keys, seed phrases, signing secrets or recovery codes belong in this document or repository.

## Status

- Six reserve categories: documented.
- MALTY Impact allocation: 50M / 5%.
- Destination tests: Liquidity, Ecosystem, Community and MALTY Impact completed with 1 MALTY each.
- Full reserve distribution: pending.
- Planned initial availability: 100,000,000 MALTY.
- Multisig custody: not yet implemented; current custody remains single-controller.
