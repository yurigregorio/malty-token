# MALTY metadata maintenance

The official MALTY Metaplex metadata remains mutable so branding and public
project information can be maintained without changing token supply.

## Approved source files

- Website icon preview: `https://malty-token.vercel.app/malty-official.png`
- Website metadata preview: `https://malty-token.vercel.app/metadata.json`
- Mint: `6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz`

The Vercel URLs above are only the approved source/preview. The Mainnet update
flow publishes fresh immutable copies to Arweave and writes the permanent
Arweave metadata URI to the Metaplex metadata account.

## Guarded Mainnet flow

1. Deploy the current `main` branch and verify the approved icon is visible.
2. Temporarily set
   `NEXT_PUBLIC_ENABLE_MALTY_METADATA_MAINTENANCE=true` in Vercel and redeploy.
3. Open `/dev`, select Mainnet and connect the Phantom wallet that currently
   owns the MALTY Metaplex Metadata Update Authority.
4. Click **Publish to Arweave & update MALTY**.
5. The page verifies the Update Authority before publishing anything.
6. The approved PNG and generated metadata JSON are each checked to remain
   below the guarded 100 KiB free-upload limit and are uploaded through
   Turbo's unsigned x402 Arweave route.
7. The page shows both permanent Arweave URLs and then asks Phantom to sign the
   Metaplex `updateV1` transaction that replaces only the metadata URI.
8. Verify the new URI on Solscan, copy the permanent metadata URI back into
   `MALTY_TOKEN.metadataUri` in a follow-up commit, then remove the environment
   flag and redeploy.

The permanent upload is public and immutable. The upload route does not receive
a private key or seed phrase. The on-chain change still requires the current
Metaplex Update Authority to sign in Phantom.

This flow does not restore or modify the revoked SPL Mint Authority and cannot
increase the MALTY supply.
