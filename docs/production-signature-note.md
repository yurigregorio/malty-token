# Production Wallet-Signature Boundary

Repository changes can prepare and gate the MALTY production flow, but Solana Mainnet transactions are signed by the connected wallet. The repository cannot sign them on behalf of the wallet owner.

For every production transaction:

- confirm Solana Mainnet;
- confirm the connected project wallet;
- review the transaction before approving it in Phantom;
- stop immediately if the network, wallet or requested action is unexpected.

The production sequence is intentionally split into separate stages so a later irreversible action cannot be executed accidentally together with an earlier one.
