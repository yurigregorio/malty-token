# Mainnet Stage 1 Handoff

The repository is prepared for the first production transaction, but `main` intentionally remains locked.

The next production operation is only:

- Create the SPL Mint on Solana Mainnet.
- Decimals: 6.
- Mint authority: connected project wallet.
- Freeze authority: none.

No supply minting, metadata creation or authority revocation should be enabled in the same release.

After the mint creation transaction, record the Mainnet mint address and stop. The verified address must be committed to `MALTY_CONFIG.mainnet.mint` before supply issuance is enabled.
