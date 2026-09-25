# Engineering notes

## Source boundaries

[App.tsx](../frontend/src/App.tsx) composes React Router, React Query, wallet and Push contexts. [Dashboard](../frontend/src/pages/Dashboard.tsx), [MyBets](../frontend/src/pages/MyBets.tsx) and [Leaderboard](../frontend/src/pages/Leaderboard.tsx) render local fixtures. React Query being mounted does not imply a backend data service.

[CreateBet](../frontend/src/pages/CreateBet.tsx) checks required fields, emits a toast and resets state. It makes no escrow call and stores no bet. Dashboard's bet button has no action handler. [Contact](../frontend/src/pages/Contact.tsx) similarly toasts and resets without delivering a message. Pricing, legal and support screens include illustrative or placeholder content; their presence does not establish a service.

[Web3Provider](../frontend/src/providers/Web3Provider.tsx) includes injected-wallet account requests and signer handling. [PushContext](../frontend/src/contexts/PushContext.tsx) initializes the SDK in staging, and [PushNotifications](../frontend/src/components/PushNotifications.tsx) contains notification calls. These paths were not exercised with a wallet. They remain separate from betting fixtures.

The `backend/contracts` directory contains Hardhat, Solidity, mocks and tests, not an HTTP API. There is no UI-to-escrow transaction path, verified contract deployment or demonstrated cross-chain settlement.

## Known escrow defects

The unchanged [PushBetEscrow.sol](../backend/contracts/contracts/PushBetEscrow.sol) is unsafe for real funds:

| Area | Source behavior | Consequence |
| --- | --- | --- |
| Winner selection | `_getOption1Winner` and `_getOption2Winner` both return `bet.creator`. | Option2 participants do not receive a calculated winning share. |
| Payout accounting | `completeBet` and `resolveDispute` both transfer winnings and retain `userWinnings` credit. `withdrawWinnings` transfers that credit again. | Another withdrawal can consume deposits backing other bets. |
| Draw refunds | `_refundBet` refunds the option1 aggregate to the creator; option2 refund logic is missing. | Participant stakes cannot be correctly returned. |
| Outcome authority | The creator may complete before expiry; any caller may select the result after expiry. | There is no oracle-backed result guarantee. |
| Custody authority | Owner assigns arbitrators and can withdraw the entire payment-token balance. | Users rely on owner authority, not trustless custody. |

`ReentrancyGuard` does not prevent a second permitted withdrawal in a separate transaction. Best-effort notifications do not prove delivered messages. The constructor is not an upgradeable proxy pattern. These findings are source-confirmed, not claims about a deployed exploit, and are not an exhaustive audit.

## What the tests miss

The original [Hardhat suite](../backend/contracts/test/PushBetEscrow.test.ts) exercises basic deposits, totals, state/events, cancellation and administrative settings. Its join-after-end test has the time change and rejection assertion commented out. The completion test checks state/result/event instead of recipient balances. The retained 15-pass result therefore cannot establish accounting correctness.

Future corrective work would need per-participant stake accounting, a single payout/withdrawal model, complete refunds and explicit result/owner authority. Those changes and adversarial balance tests are outside this presentation slice.

## Preserved limitations

Fixture values and historical dates are unchanged. Negative countdowns, no-op buttons, placeholder links, existing styling/accessibility limitations, the Push signer type error and lint failures are not repaired. Package/lockfile, ABI, contract, provider, storage and deployment identities remain unchanged. Dependency findings need a separate repair decision.
