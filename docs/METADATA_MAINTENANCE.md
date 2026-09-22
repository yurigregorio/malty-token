# MALTY metadata maintenance

The official MALTY Metaplex metadata remains mutable so the project can maintain
branding and public project information without changing token supply.

## Official metadata endpoints

- Image: `https://malty-token.vercel.app/malty-official.png`
- Metadata JSON: `https://malty-token.vercel.app/metadata.json`
- Mint: `6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz`

## Updating the on-chain URI

1. Deploy the current `main` branch and verify both URLs above return the new
   asset and JSON.
2. Temporarily set
   `NEXT_PUBLIC_ENABLE_MALTY_METADATA_MAINTENANCE=true` in the deployment.
3. Open `/dev`, select Mainnet, connect the Phantom wallet that is the current
   Metaplex Metadata Update Authority, and click **Update official MALTY metadata**.
4. Confirm the transaction in Phantom and verify the metadata on Solscan.
5. Remove the environment flag and redeploy so Mainnet returns to read-only mode.

This flow does not restore or modify the revoked SPL Mint Authority and cannot
increase the MALTY supply.
