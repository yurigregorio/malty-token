# MALTY Liquidity Policy

## Purpose

This policy defines how the MALTY Liquidity Reserve is intended to be managed, documented and reconciled. It is a governance and documentation policy only. It does not execute transactions, create a liquidity pool, or guarantee market liquidity.

## 1. Allocation

MALTY has a total supply of 1,000,000,000 tokens.

- Liquidity Reserve: **500,000,000 MALTY (50%)**.
- Planned initial liquidity allocation: **up to 50,000,000 MALTY (5%)**.
- Planned amount retained in the Liquidity Reserve after the initial allocation: **450,000,000 MALTY**.

The 50,000,000 MALTY figure is a maximum planned initial allocation, not an automatic transfer or a statement that all of it is currently circulating.

## 2. Liquidity Reserve Wallet

The dedicated project account is:

- Label: `MALTY Liquidity`
- Public address: `8zMNiAh2uH1MoKh9eRjewSrgRjU4WQAYVV2u4SKSiRfU`

The address is public project information. Private keys, seed phrases, recovery codes and signing secrets must never be stored in this repository.

## 3. Intended Purpose

The Liquidity Reserve exists exclusively to support documented market-liquidity needs for MALTY.

It must not be treated as a general-purpose project wallet and must not be used for:

- Team compensation;
- Treasury expenses;
- undocumented Community distributions;
- unrelated operating expenses;
- personal transfers;
- undisclosed changes to token allocation.

## 4. Initial Liquidity Policy

Before any initial liquidity deployment, the project should document the selected liquidity venue or mechanism, the amount of MALTY to be used, the corresponding non-MALTY asset requirement, the intended liquidity position, the responsible custody arrangement, and the transaction references after execution.

The project should not describe liquidity as "locked", "burned", "permanent", "guaranteed" or "risk-free" unless a specific verifiable mechanism actually provides that property.

The initial deployment should use no more than the approved **50,000,000 MALTY** allocation without a documented governance change.

## 5. Remaining Reserve

The remaining **450,000,000 MALTY** stays outside the initial liquidity deployment plan.

These tokens are not automatically circulating merely because they are assigned to the Liquidity Reserve category. Any later use must have a documented purpose and be reconciled against the reserve balance.

A later movement that changes the tokenomics allocation between categories must follow the Change Governance policy in `docs/TOKENOMICS.md`.

## 6. Liquidity and Circulating Supply

For project reporting purposes, liquidity allocation and circulating supply must be distinguished.

A token amount should only be reported as circulating when it has genuinely become available in the market or otherwise meets the project's documented circulating-supply definition.

Moving tokens to the dedicated Liquidity wallet alone does not automatically establish that the entire reserve is circulating.

## 7. Price and Market Integrity

The project must not represent that a liquidity allocation will cause MALTY to increase in price or maintain a specific market value.

The project must not use the Liquidity Reserve to create misleading impressions of demand, volume or market activity. Any public communication about liquidity should describe what was actually deployed and provide verifiable transaction information when appropriate.

## 8. Custody

The current Liquidity wallet is part of the temporary single-controller custody model documented in `docs/WALLET_ARCHITECTURE.md`.

Before material public distribution or significant liquidity deployment, the project should evaluate a stronger custody model, such as an appropriately configured multisig or another independently verifiable arrangement.

Until such a mechanism is implemented, documentation must not describe the Liquidity Reserve as multisig-protected.

## 9. Approval and Execution Controls

A liquidity deployment should be treated as a material project transaction. Before execution, the project should have:

1. documented amount and purpose;
2. documented destination or liquidity mechanism;
3. custody/authorization approval from the authorized project decision-makers;
4. a pre-transaction balance check;
5. post-transaction verification;
6. a reconciliation entry containing the relevant transaction signature(s).

This repository may contain the plan and public transaction references, but never signing credentials.

## 10. Reconciliation

After each material liquidity movement, record:

| Field | Required information |
| --- | --- |
| Category | Liquidity Reserve |
| Balance before | Verified on-chain balance |
| Amount moved | Exact MALTY amount |
| Purpose | Documented liquidity purpose |
| Destination | Public address / venue where applicable |
| Transaction | Solana transaction signature |
| Balance after | Verified on-chain balance |
| Circulating impact | Yes / No, with explanation |

The record must distinguish planned allocations from actual on-chain balances.

## 11. Transparency

When liquidity is actually deployed, the project may publish:

- the Liquidity Reserve public address;
- the amount deployed;
- the destination public address or pool identifier where appropriate;
- transaction signatures;
- the remaining reserve balance;
- the date of the movement.

The project should not publish confidential custody information.

## 12. Governance Changes

Any change to the initial 50,000,000 MALTY liquidity plan, the 500,000,000 MALTY category allocation, or the restrictions in this policy should be documented before execution.

The change record should explain:

- what changed;
- why it changed;
- which allocation is affected;
- the expected circulating-supply impact;
- the approval or governance decision;
- the effective date.

## 13. Current Status

At the current checkpoint:

- Liquidity Reserve allocation: **500,000,000 MALTY planned**;
- Initial liquidity allocation: **up to 50,000,000 MALTY planned**;
- Liquidity Reserve wallet: created and documented;
- Current Liquidity Reserve balance: **0 MALTY**;
- Initial liquidity deployment: **not executed**;
- Remaining reserve: **450,000,000 MALTY planned**;
- Multisig protection: **not yet implemented**.

The current zero balance is consistent with the project architecture: the wallet exists, but no reserve transfer has been executed.
