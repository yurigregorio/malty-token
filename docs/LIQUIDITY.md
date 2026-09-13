# MALTY Liquidity

This document records the active MALTY market-liquidity deployment and its verification checkpoints. It is a transparency record only and does not guarantee liquidity depth, permanence, price, returns or future availability.

## Active pool

On 2026-09-13, the first MALTY/SOL liquidity pool was created on Raydium using the Standard AMM / CPMM model.

| Field | Value |
| --- | --- |
| Network | Solana Mainnet |
| DEX | Raydium |
| Pool type | CPMM / Standard AMM |
| Pair | MALTY / SOL |
| MALTY mint | `6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz` |
| Pool / AMM ID | `DGK42Xe3BMXTJeUVjVNSZL1FmwXVQxUaV88qp6hAdp9W` |
| Fee tier | 0.25% |
| Initial MALTY deposit | 5,000,000 MALTY |
| Initial SOL deposit | 0.50 SOL |
| Initial ratio | 10,000,000 MALTY per 1 SOL |
| Initial implied MALTY price | 0.0000001 SOL per MALTY |
| Start mode | Start Now |

Pool creation transaction:

`4zaDUJpvZ2s3ePQZ5bEhen8EAzCX8Ramufwjjo4sWB1MXmKisK6PyDgAD4bvCwpejk9T2s2Gy2iF2eezMTK68hrX`

The initial liquidity was supplied from the public MALTY Liquidity reserve address:

`8zMNiAh2uH1MoKh9eRjewSrgRjU4WQAYVV2u4SKSiRfU`

After the initial 5,000,000 MALTY deposit, 495,000,000 MALTY remained directly in that reserve wallet. Pool inventories change dynamically as swaps occur, so the initial 5,000,000 MALTY deposit must not be presented as the pool's permanent current token balance.

## Swap verification

A small buy and sell were performed after pool creation to verify two-way trading.

### Buy test

- Direction: SOL -> MALTY
- Input: 0.002 SOL
- Wallet UI output: approximately 15,672.72727 MALTY
- Result: successful
- Transaction: `4HyrCpxTRB5cP3yMFY4kucMpvMqzDoM7twfy8z41uk75Fe9bWNKZ7hx3F2NDSRvjcWBqc9xRHzgboV13QA4rFZf5`

### Sell test

- Direction: MALTY -> SOL
- Input: 10,000 MALTY
- Wallet UI output: approximately 0.00109 SOL
- Result: successful
- Transaction signature: not yet recorded in this document

The successful buy and sell establish that the pool was operational in both directions at this checkpoint. They do not guarantee future execution quality, price, liquidity depth or slippage.

## LP position custody

The pool creation produced LP tokens representing the liquidity position. The LP tokens remain under the MALTY Liquidity wallet's custody at this checkpoint.

The LP position is **not documented as burned or locked**. Therefore, the project must not claim that liquidity is permanently locked, burned, non-removable or guaranteed. Any future lock, burn, migration or material LP movement must be independently verifiable and documented before such a claim is made.

## Reserve accounting

The canonical Liquidity allocation remains 500,000,000 MALTY. Creating the pool changed where part of that allocation is held:

- 495,000,000 MALTY remained directly in the MALTY Liquidity reserve wallet immediately after the initial pool deposit;
- 5,000,000 MALTY were initially deployed into the MALTY/SOL pool;
- subsequent swaps change the pool's MALTY and SOL inventories dynamically.

Tokens deployed into an active public pool are market-available. Reserve-wallet balance, pool inventory and circulating/market-available supply therefore must not be treated as interchangeable concepts.

## Reconciliation rule

For every material liquidity event, record the pool, transaction signature, amount of MALTY and paired asset moved, resulting reserve-wallet balance, LP custody state and whether the movement changes market availability.

Never place seed phrases, private keys, signing secrets or recovery codes in this repository.
