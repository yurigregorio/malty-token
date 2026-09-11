# MALTY Mainnet Checklist — Completed Record

This checklist is retained as the historical pre-deployment checklist for MALTY Mainnet v1. The deployment has now been completed.

## Final token identity

- Name: Malty
- Symbol: MALTY
- Network: Solana Mainnet
- Token program: SPL Token (traditional)
- Mint: `6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz`
- Decimals: 6
- Total supply: 1,000,000,000 MALTY
- Description: MALTY is a Solana memecoin inspired by Charlotte, a Maltese with big community energy.
- Slogan: Small Dog. Big Community.
- Transfer tax: 0%

## Metadata

- Image URI: https://arweave.net/w-TXbk_hQOw1mC5vA9YrVmClKzz_Avjfiq5coE1AYec
- Metadata URI: https://turbo-gateway.com/rLzUMFUoqgYI04MijeVjLDriWACUApJo2BKK6ycB5MU
- sellerFeeBasisPoints: 0
- creators: null
- collection: null
- uses: null

## Authority state

- Freeze Authority: none.
- Mint Authority: permanently revoked after the fixed supply was verified.
- Metadata Update Authority: intentionally retained and separate from the SPL Mint Authority.

## Completed production gates

- [x] Mainnet mint created and verified.
- [x] Exactly 1,000,000,000 MALTY issued.
- [x] Metadata created and verified.
- [x] Mint Authority revoked.
- [x] Freeze Authority confirmed absent.
- [x] Token-creation and authority-changing actions locked in the application.
- [x] Mainnet deployment recorded in `docs/MALTY_MAINNET_V1.md` and `docs/mainnet-status.md`.

## Current status

Mainnet token creation is complete. Distribution, reserve allocation, liquidity, treasury, community, ecosystem and team movements are separate post-deployment activities and must be reconciled against the documented policies and actual on-chain balances.
