# MALTY Mainnet Status

## Production Status

MALTY Mainnet deployment is **complete**.

The production token was created on Solana Mainnet, the fixed supply was minted, metadata was created and verified, and the SPL Mint Authority was revoked.

## Mainnet Token

- **Mint:** `6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz`
- **Network:** Solana Mainnet
- **Standard:** Traditional SPL Token
- **Decimals:** 6
- **Total Supply:** 1,000,000,000 MALTY
- **Mint Authority:** revoked
- **Freeze Authority:** none
- **Metadata:** present and verified
- **Metadata Update Authority:** retained / mutable

The retained Metadata Update Authority is separate from the Mint Authority and does not provide the ability to create additional MALTY.

## Mainnet Transactions

- **Create mint:** `mqj2s3CCADZmSrKNmLNVXxfHydjVsv6Zesxevc3BDqa5Rec3xfYxkmKPd8ritR61LLtaYuYg7RxWfWPnBV6v2bU`
- **Mint 1B supply:** `3W5o17RoPe6x3MYfEp7bmpPCfYaF5e9QWGNaoEn1KjPsh3AauqcWG7pbMyQLx9kzPmPBQTtmVuzvDP2Jt2Z4Wdsj`
- **Create/verify metadata:** completed successfully on Mainnet
- **Revoke Mint Authority:** `4Kh8PZgV4N93EXVGpJyLjC4LU2aVFobMjAkjvjxPdRPA4ZA3LmVN2pUYejCwHajiR89YCpBbxEJwcaCXxjmnTpqt`

## Verification

The latest read-only verification confirmed:

- decimals = 6;
- raw supply = `1000000000000000` base units = 1,000,000,000 MALTY;
- Mint Authority = `null`;
- Freeze Authority = `null`;
- mint account initialized.

## Reserve Architecture

The canonical tokenomics were later updated to add a dedicated MALTY Impact reserve, funded by reducing Ecosystem from 20% to 15% (total supply unchanged). The six project reserve accounts are:

- MALTY Liquidity — 500M allocation
- MALTY Ecosystem — 150M allocation
- MALTY Community — 150M allocation
- MALTY Impact — 50M allocation
- MALTY Treasury — 75M allocation
- MALTY Team — 75M allocation

All six reserves were subsequently funded to their full canonical allocation, independently verified against the Solscan Holders view for the official mint. See `docs/RECONCILIATION.md` for the checkpoint and `docs/TRANSPARENCY.md` for the current public figures — those documents are the current source of truth for reserve balances, not this historical snapshot.

The operational/deployer wallet remains separate from the six reserve categories.

## Current Circulation Plan

The approved planned initial availability is **100,000,000 MALTY (10% of total supply)**:

- Liquidity: 50M
- Ecosystem: 17.5M
- Community: 25M
- MALTY Impact: 0
- Treasury: 0
- Team: 7.5M

These amounts describe the original availability plan. The Liquidity Reserve has since supplied 5,000,000 MALTY as the initial deposit for the live MALTY/SOL pool on Raydium — see `docs/LIQUIDITY.md` for the current, authoritative trading-liquidity record.

## Controls

- Mainnet mutation stages are complete.
- Mint Authority is permanently revoked at the SPL mint level.
- Freeze Authority is absent.
- Metadata Update Authority remains mutable by design and should be disclosed publicly.
- Reserve custody is currently under the documented temporary single-controller model.
- Stronger multisig custody remains a future control improvement.
- Team technical vesting/enforcement remains to be selected.

## Documentation Rule

Any material future token movement should be documented with:

1. date;
2. tokenomics category;
3. amount;
4. destination public address or transaction reference;
5. purpose;
6. resulting balance;
7. whether the movement changes reported circulating supply.

Private keys, seed phrases, recovery phrases and signing credentials must never be stored in GitHub.
