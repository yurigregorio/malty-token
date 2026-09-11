# MALTY Repository Security Audit

Date: 2026-09-12

## Scope

This audit reviews repository-level safeguards around secrets, RPC configuration, wallet signing, Mainnet action exposure, deployment-state controls and dependency/update hygiene. It does not replace an external smart-contract, wallet-provider or infrastructure audit.

## Current security posture

### Mainnet transaction surface

- Mainnet token creation, supply minting, metadata creation and Mint Authority changes are locked in `MALTY_CONFIG`.
- The Mainnet UI is read-only in `ActionsPanel`.
- Generic SOL-transfer and memo components also contain their own Mainnet guards so a future refactor that renders them directly does not silently re-enable Mainnet transactions.
- Token creation controls remain disabled for the completed Mainnet deployment.

### Token authorities

- Mainnet Mint Authority is revoked.
- Freeze Authority is absent.
- Total supply is fixed at 1,000,000,000 MALTY.
- Metadata Update Authority remains intentionally retained and is separate from the SPL Mint Authority.

### Secret handling

- `.env*` files are ignored, except `.env.example`.
- No private key, seed phrase, mnemonic or obvious provider API key was found in the current default-branch source review.
- Wallet signing is delegated to the connected browser wallet; the application does not store wallet private keys.

### RPC configuration

`NEXT_PUBLIC_SOLANA_MAINNET_RPC_URL` and `NEXT_PUBLIC_SOLANA_MAINNET_WS_URL` are browser-visible by design. Values assigned to them must therefore be treated as public.

Do not use an unrestricted secret provider key in a `NEXT_PUBLIC_` variable. If a paid provider URL contains a credential, use a credential intended for browser use and restrict it with provider-supported controls such as origin/domain restrictions, rate limits and minimum permissions. For read-only Mainnet inspection, a public endpoint is also acceptable when its reliability is sufficient.

### Repository hygiene

- Local environment files are excluded from Git.
- Mainnet deployment state and immutable token identity are covered by tests.
- CI runs typecheck, lint, formatting checks, tests and production build.

## Findings

### SEC-001 — Browser-visible RPC credentials

Severity: Medium if an unrestricted provider key is used; Low when a public or restricted browser credential is used.

The application reads Mainnet RPC configuration through `NEXT_PUBLIC_` variables. Next.js includes these values in client-side output, so they are not secrets.

Mitigation applied:

- `.env.example` now explicitly warns that these values are browser-exposed.
- Documentation requires public or provider-restricted credentials rather than unrestricted secret keys.

Recommended operational control:

- Rotate any credential that was previously assumed to be private after being placed in a `NEXT_PUBLIC_` variable.
- Use provider-side origin/domain restrictions and rate limits where supported.

### SEC-002 — UI-only Mainnet action blocking

Severity before hardening: Low to Medium.

A read-only `ActionsPanel` already prevented Mainnet transaction controls from being rendered, but generic transaction components did not independently reject Mainnet when invoked directly.

Mitigation applied:

- `TransferSolCard` now blocks Mainnet in the handler and disables its button on Mainnet.
- `MemoCard` now blocks Mainnet in the handler and disables its button on Mainnet.
- Mainnet remains read-only at the parent UI layer as well.

This provides defense in depth against accidental re-exposure during future UI refactors.

### SEC-003 — Dependency vulnerability state

Severity: Unknown until package-manager advisory scanning is executed against the exact lockfile.

The repository pins dependency resolution through `package-lock.json` and CI validates build/test quality, but source inspection alone does not establish that every transitive dependency is free from published advisories.

Recommended control:

- Run an automated dependency advisory scan in CI (for example the package manager's audit mechanism or GitHub Dependabot/security updates).
- Review and remediate high/critical findings before deployment updates.

## Residual risks

- Browser wallets and browser extensions are outside this repository's trust boundary.
- A compromised RPC endpoint can return misleading read data even though it cannot recreate MALTY supply after Mint Authority revocation.
- Metadata can still be changed by whoever controls the retained Metadata Update Authority.
- The five documented reserve accounts currently share one broader custody boundary if they derive from the same recovery secret; separate addresses do not equal separate cryptographic custody.
- Mainnet read-only behavior in this app does not prevent an authorized wallet controller from using another wallet application or tool outside this repository.

## Security rules for future changes

1. Never commit seed phrases, private keys, keypair files, provider secrets or `.env.local`.
2. Treat every `NEXT_PUBLIC_` value as public information.
3. Keep Mainnet transaction actions disabled in this application unless a separately reviewed requirement explicitly changes that policy.
4. Preserve tests that assert the Mainnet mint address, fixed supply, revoked Mint Authority and disabled creation flags.
5. Require review for changes affecting wallet signing, RPC endpoints, token authorities, token distribution or custody architecture.
6. Keep token allocation documentation distinct from actual on-chain balances and reconcile movements after they occur.

## Audit result

Repository posture after the applied hardening: no critical repository-level issue identified in the reviewed default-branch code. The most important operational item is ensuring that any browser-visible RPC credential is treated as public/restricted, not as a secret.
