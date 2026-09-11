# MALTY Mainnet Checklist

This checklist prepares the project for a future Mainnet deployment. It does not enable or execute Mainnet transactions.

## Final token identity

- Name: Malty
- Symbol: MALTY
- Network: Solana
- Token program: SPL Token (traditional)
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

## Authority policy

- Freeze authority: none from creation.
- Mint authority: retained only long enough to mint the exact 1,000,000,000 MALTY supply; revoke only after the supply is independently verified on Mainnet.
- Metadata update authority: keep during the final verification window so metadata mistakes can be corrected. Consider making metadata immutable only after wallet/explorer verification.

## Production safety gates

- `MALTY_CONFIG.mainnet.mint` remains `null` until a Mainnet mint actually exists.
- `allowCreateMint` remains `false` until the production review is explicitly completed.
- `allowMintSupply` remains `false` until the Mainnet mint address is verified.
- `allowMetadata` remains `false` until the minted supply is verified.
- `allowRevokeMintAuthority` remains `false` until supply and metadata are verified.

## Required checks before any Mainnet action

- Confirm the connected wallet/account is the intended project wallet.
- Confirm the app cluster and Phantom network both show Solana Mainnet.
- Confirm name, symbol, decimals, supply, metadata URI and image URI one final time.
- Confirm no private key, seed phrase, mnemonic, `.env`, keypair file or other secret is committed to Git.
- Run `npm run typecheck` and the project test/build checks.
- Keep the Devnet checkpoint/tag intact for recovery/reference.

## Mainnet remains locked

At this stage all Mainnet mutation flags are intentionally disabled. A later reviewed change must explicitly enable each production operation one at a time.
