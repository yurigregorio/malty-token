# MALTY Mainnet Runbook

This runbook is intentionally staged. Only one irreversible Mainnet capability should be enabled at a time.

## Stage 0 — Preflight

Status: ready for local validation, Mainnet mutations locked.

Required checks:

1. `git pull origin main`
2. `npm run typecheck`
3. `npm test`
4. `npm run build`
5. Confirm Phantom is connected to the intended project wallet.
6. Confirm the application and Phantom both show Solana Mainnet before any production signature.
7. Confirm the final identity in `app/lib/malty-token.ts`.
8. Confirm the metadata JSON and image are reachable and display correctly.

Expected production identity:

- Name: Malty
- Symbol: MALTY
- Decimals: 6
- Supply: 1,000,000,000 MALTY
- Freeze authority: none
- Transfer tax: 0%

## Stage 1 — Create Mainnet mint

Enable only `MALTY_CONFIG.mainnet.allowCreateMint`.

Keep all other Mainnet mutation flags false.

After the transaction is confirmed:

- Record the new Mainnet mint address.
- Verify decimals = 6.
- Verify freeze authority = none.
- Commit the verified mint address into `MALTY_CONFIG.mainnet.mint`.
- Disable `allowCreateMint` again before moving forward.

Do not continue if the mint address or authorities do not match expectations.

## Stage 2 — Mint the fixed supply

Enable only `allowMintSupply` after the verified Mainnet mint address is committed.

Mint exactly 1,000,000,000 MALTY to the intended project wallet.

After confirmation:

- Verify current supply = 1,000,000,000 MALTY.
- Verify decimals = 6.
- Verify the destination wallet balance.
- Disable `allowMintSupply` before moving forward.

## Stage 3 — Create metadata

Enable only `allowMetadata` after supply verification.

Create metadata using the values from `app/lib/malty-token.ts`.

After confirmation:

- Verify name = Malty.
- Verify symbol = MALTY.
- Verify the Charlotte image displays correctly.
- Verify the metadata URI resolves correctly.
- Verify wallet and explorer presentation.
- Disable `allowMetadata` before moving forward.

The metadata update authority stays available during this verification window so a metadata-only mistake can still be corrected.

## Stage 4 — Revoke SPL mint authority

This is irreversible.

Enable only `allowRevokeMintAuthority` after the exact supply and metadata have been independently verified.

After confirmation:

- Verify Mint Authority = none.
- Verify Freeze Authority = none.
- Verify supply remains exactly 1,000,000,000 MALTY.
- Disable `allowRevokeMintAuthority`.

At this point no additional MALTY can be minted.

## Stage 5 — Metadata finalization

Decide separately whether to keep or revoke the metadata update authority.

Do not confuse metadata update authority with SPL mint authority: they control different things.

If metadata is made immutable, that action should happen only after final wallet/explorer verification because correcting the metadata afterward may no longer be possible.

## Stage 6 — Distribution and liquidity

Treat distribution, treasury/team wallets, vesting and any DEX liquidity plan as a separate release from token creation.

Do not combine those operations with mint creation or authority revocation. Keep an auditable record of allocations and disclose insider/team allocations accurately.
