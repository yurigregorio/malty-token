# MALTY Mainnet Readiness Status

## Completed

- Devnet token created and validated.
- Devnet fixed supply: 1,000,000,000 MALTY.
- Devnet decimals: 6.
- Devnet freeze authority: none.
- Devnet metadata validated in Phantom.
- Devnet transfer validated to a second wallet.
- Devnet mint authority revoked.
- Stable Devnet checkpoint committed and tagged.
- GitHub repository is private.
- Devnet and Mainnet configuration are separated.
- Mainnet mutation flags are locked by default.
- Final token identity and production authority policy are centralized.
- Token UI consumes centralized production parameters.
- Automated safety tests were added.
- Mainnet staged runbook was added.
- GitHub CI definition was added for typecheck, tests and build.

## Mainnet production status

Mainnet mint: not created.

Current Mainnet mutation state:

- Create mint: locked
- Mint supply: locked
- Create metadata: locked
- Revoke mint authority: locked

## Remaining on-chain stages

1. Create the Mainnet mint with 6 decimals and no freeze authority.
2. Record and independently verify the Mainnet mint address.
3. Mint exactly 1,000,000,000 MALTY.
4. Verify the exact on-chain supply.
5. Create and verify Metaplex metadata.
6. Revoke SPL mint authority.
7. Verify fixed supply and both SPL authorities.
8. Decide separately whether metadata update authority should remain or be revoked.

Each Mainnet stage requires a wallet signature. Those signatures cannot be performed by repository automation and should be completed only after reviewing the Phantom transaction details for the correct network and wallet.
