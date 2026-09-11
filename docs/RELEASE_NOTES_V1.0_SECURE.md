# MALTY v1.0 Secure — Release Notes

## Status

This release snapshot represents the completed MALTY Mainnet v1 technical deployment plus the repository security, transparency and public-presentation hardening completed afterward.

## Mainnet token

- Name: Malty
- Symbol: MALTY
- Mint: `6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz`
- Decimals: 6
- Fixed supply: 1,000,000,000 MALTY
- Mint Authority: revoked / none
- Freeze Authority: none
- Transfer tax: 0%
- Metadata: present

## Security posture

- Mainnet creation, minting, metadata-creation and Mint Authority mutation controls are disabled in project configuration.
- Mainnet transaction tooling is read-only in the UI.
- Component-level defenses prevent development transaction components from being used on Mainnet.
- `.env` files and private-key-style files are excluded from source control.
- Public RPC configuration is treated as browser-visible configuration, not secret storage.
- CI validates project invariants and runs dependency auditing.
- `docs/SECURITY_AUDIT.md` records the repository security review.

## Transparency posture

Canonical allocation:

- 500,000,000 MALTY — Liquidity
- 200,000,000 MALTY — Ecosystem
- 150,000,000 MALTY — Community
- 75,000,000 MALTY — Treasury
- 75,000,000 MALTY — Team

The five reserve addresses are published. At the latest documented reconciliation, each reserve address held 0 MALTY because no reserve transfer had been executed.

Planned initial availability is up to 100,000,000 MALTY. This plan must not be represented as actual circulating supply until corresponding on-chain movements occur.

## Public presentation

The default application home page has been converted from the Solana starter demo into a MALTY public-information landing page. Developer wallet tooling is separated under `/dev`, while Mainnet remains read-only.

Public references:

- `docs/TRANSPARENCY.md`
- `docs/FAQ.md`
- `docs/LAUNCH_READINESS.md`
- `docs/TOKENOMICS.md`
- `docs/WALLET_ARCHITECTURE.md`
- `docs/RECONCILIATION.md`
- `docs/SECURITY_AUDIT.md`

## Scope boundary

This release does not represent execution of reserve distribution, liquidity provisioning, treasury spending or team token releases. Those operations, if performed later, require separate authorization, on-chain execution and post-transaction reconciliation.
