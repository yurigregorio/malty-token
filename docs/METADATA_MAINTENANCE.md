# MALTY metadata maintenance

The official MALTY Metaplex metadata remains mutable so branding and public
project information can be maintained without changing token supply.

## Current approved endpoints

- Image: `https://malty-token.vercel.app/malty-official.png`
- Metadata: `https://malty-token.vercel.app/metadata.json`
- Mint: `6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz`

## Guarded Mainnet flow

1. Deploy the current `main` branch and verify the image and metadata URLs.
2. Temporarily set
   `NEXT_PUBLIC_ENABLE_MALTY_METADATA_MAINTENANCE=true` in Vercel and redeploy.
3. Open `/dev`, select Mainnet and connect the Phantom wallet that currently
   owns the MALTY Metaplex Metadata Update Authority.
4. Click **Verify & update MALTY on Mainnet**.
5. The page verifies the hosted MALTY image and JSON, reads the current
   Metaplex metadata account, and confirms the connected wallet matches the
   Update Authority.
6. Phantom then signs the Metaplex `updateV1` transaction that changes the
   metadata URI to the official project endpoint.
7. Verify the new URI on Solscan, then remove the environment flag and redeploy.

This flow does not restore or modify the revoked SPL Mint Authority and cannot
increase the MALTY supply.

## Why the Arweave upload step was removed

The previous browser flow called Turbo's unsigned x402 upload endpoint and
started returning HTTP 402 Payment Required. Current Turbo documentation treats
billable uploads as paid flows (for example credits, JIT payment, or x402).
Rather than silently initiate a storage payment from the maintenance page, the
Mainnet update uses the project-controlled HTTPS metadata endpoint. A later
migration can move the exact same approved image and JSON to paid permanent
Arweave storage and update the URI again.
