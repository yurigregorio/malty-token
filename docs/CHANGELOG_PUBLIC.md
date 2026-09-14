# MALTY Public Change History

This record highlights material project changes that are useful for public transparency. It is not a substitute for the Git commit history or on-chain records.

## Mainnet foundation

- MALTY SPL Token mint created on Solana Mainnet with 6 decimals and no Freeze Authority.
- Fixed supply of 1,000,000,000 MALTY issued.
- Metaplex metadata created for the official token.
- Mint Authority permanently revoked, preventing additional MALTY from being minted.

## Transparency and allocation

- Original allocation model documented as Liquidity 50%, Ecosystem 20%, Community 15%, Treasury 7.5%, Team 7.5%.
- Tokenomics subsequently updated to establish a dedicated **MALTY Impact Reserve of 50,000,000 MALTY (5%)**.
- The MALTY Impact allocation was created by reducing Ecosystem from 200,000,000 MALTY (20%) to 150,000,000 MALTY (15%). The fixed 1B total supply did not change.
- Current canonical allocation: Liquidity 50%, Ecosystem 15%, Community 15%, MALTY Impact 5%, Treasury 7.5%, Team 7.5%.
- Six reserve addresses are documented for accounting and public reconciliation.
- Planned initial availability remains 100,000,000 MALTY (10%); MALTY Impact has 0 planned initial availability.
- All six reserve wallets were funded to their full canonical allocation, independently verified against the Solscan Holders view for the official mint (100% of the fixed 1B supply matched across Liquidity, Ecosystem, Community, MALTY Impact, Treasury and Team).
- That fully-reserved state was a checkpoint prior to market liquidity: 5,000,000 MALTY was subsequently moved from the Liquidity Reserve to fund the initial Raydium pool deposit (see Trading launch below), leaving 495,000,000 MALTY directly in the Liquidity Reserve wallet.
- Liquidity, Community, Ecosystem, Team and MALTY Impact policies are published.

## Security and application

- Mainnet token-creation and authority-changing actions locked in application configuration.
- Public Mainnet interface kept read-only for deployment actions.
- Repository security checks and dependency audit added to CI.
- Public landing page separated from development tooling.
- Reserve custody remains single-controller at the current checkpoint; multisig has not yet been implemented and is not claimed.

## Brand and mission

- MALTY established as the sole public project, token and brand identity.
- MALTY Gives introduced as a planned animal-welfare initiative.
- `MALTY Impact` is now the dedicated 5% token reserve for future documented animal-welfare initiatives.
- Funding the MALTY Impact reserve wallet is not itself a donation or proof that an initiative has been completed.
- MALTY Impact public wallet: `DmPEyGFwy972wcdcA7UzxtDiSdrtU3Y4UJned7AJJyik`.

## Trading launch

- MALTY is live and tradeable: the official MALTY/SOL pool (Standard AMM / CPMM) was created on Raydium. Pool ID: `DGK42Xe3BMXTJeUVjVNSZL1FmwXVQxUaV88qp6hAdp9W`.
- Initial pool liquidity: 5,000,000 MALTY + 0.5 SOL, funded from the 500,000,000 MALTY Liquidity Reserve. The remaining 495,000,000 MALTY stays directly in the Liquidity Reserve wallet for future market-making.
- Fee tier: 0.25%. Initial configured price: 0.0000001 SOL per MALTY.
- A test buy and a test sell against the official pool were both confirmed successful.
- LP tokens for the pool remain under the project's custody wallet; they are not locked or burned.
- The landing page was updated to make live-trading status, the official contract, and the official pool clearly visible, with an explicit warning to verify the contract before trading.
- MALTY became tradeable through Jupiter (which routes to the official Raydium pool) and trackable on Birdeye.
- Listing requests were submitted to CoinGecko and CoinMarketCap (CMC ticket 1456919), and a Jupiter token verification request was also submitted. None of these listings is confirmed yet — the project does not claim a listing exists until it is actually live on the respective platform.

## Community

- Public MALTY community channel launched (X: [@MaltyCoin](https://x.com/MaltyCoin)).
- Official Telegram channel and community group launched: [MaltyCoinOfficial](https://t.me/MaltyCoinOfficial) (announcements) and [MaltyCoinCommunity](https://t.me/MaltyCoinCommunity) (community chat).

## Reporting rule

Future material changes to token state, reserve movements, custody, allocation policy or MALTY Gives activation should be added to this record only after the underlying change is completed and verifiable.
