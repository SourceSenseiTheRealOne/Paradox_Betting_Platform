# PushBetEscrow contract prototype

`PushBetEscrow` is the retained contract identity for Paradox. It is Solidity source intended for Push Chain, not a verified deployment. The frontend is not connected to it.

> Do not use real funds. Known wrong recipient, double-payment and incomplete refunds defects make this escrow unsuitable for financial use. A passing local test count is not a safety guarantee.

## Implemented source

[PushBetEscrow.sol](contracts/PushBetEscrow.sol) defines bet and dispute states, ERC-20 deposits, aggregate option totals, cancellation, outcome selection, arbitrator assignment and configurable fees. Each instance uses one payment token. Notification calls are best-effort: `try/catch` allows escrow operations to continue when the external Push call fails. Delivery is not guaranteed.

The contract uses `Ownable` and `ReentrancyGuard`. Those mechanisms do not correct the accounting defects or establish trustless custody:

- `_getOption1Winner` and `_getOption2Winner` both return the creator, not a calculated winning participant.
- `completeBet` and `resolveDispute` transfer a payout while keeping withdrawable `userWinnings` credit. A later `withdrawWinnings` can pay it again from the shared token balance.
- `_refundBet` returns the option1 aggregate to the creator and leaves option2 refunds unimplemented. It lacks the participant accounting needed for distribution.
- The creator can choose a result before expiry; after expiry any caller can choose it. Arbitrators are owner-assigned. The owner can withdraw the contract's entire token balance.

See [engineering notes](../../docs/engineering.md) for source references and test gaps. This is a bounded source review, not an exhaustive security audit.

## Local tests only

From `backend/contracts`, with Node.js 22 and npm:

```sh
npm ci --ignore-scripts --no-fund --no-audit
npm run test:pushbet
```

The existing script runs `npx hardhat test test/PushBetEscrow.test.ts --network hardhat`, using a disposable local network and mock tokens. It compiles Solidity 0.8.20; the first run can download the compiler. No wallet, mnemonic, deployed token or network account is needed for this local suite.

The retained baseline log reports **15 passing** tests. The join-after-expiry assertion is commented out, and completion checks do not validate recipient balances. The suite does not prove correct payouts, refunds, dispute distribution or notification delivery. It was not rerun for this presentation-only change because contract/test bytes are unchanged.

## Deployment scripts are not deployment evidence

The following existing npm scripts are **unverified and outside this portfolio verification**: `deploy:pushbet:testnet`, `deploy:pushbet:testnet:alt`, `deploy:pushbet:mainnet`, `verify:pushbet:testnet` and `verify:pushbet:mainnet`. Do not run them to inspect this prototype. `deploy` and `deploy:all` also select a live-network path rather than the safe local test suite.

[scripts/deploy-pushbet-escrow.ts](scripts/deploy-pushbet-escrow.ts) uses environment/fallback addresses. Its deployment-info object is not a saved receipt manifest. No contract address, transaction receipt or chain lifecycle has been verified. Configured network names and historical frontend hosting do not establish on-chain execution.

The contract has a normal constructor with non-upgradeable `Ownable`; there is no proxy or upgrade mechanism in this implementation. Gas estimates and broad security/coverage claims from the earlier README are not measurements of this candidate.

Solidity SPDX notices remain unchanged. No repository-wide LICENSE file is present; this document does not add a license grant.
