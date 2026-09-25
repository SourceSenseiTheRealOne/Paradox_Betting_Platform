# Verification evidence

Source baseline: [`fc47b6fd7a0bdf8b7ad358b916bab73830631f94`](https://github.com/SourceSenseiTheRealOne/Paradox_Betting_Platform/commit/fc47b6fd7a0bdf8b7ad358b916bab73830631f94). This presentation slice changes documentation and visible copy, not betting logic, contracts, providers or dependencies. Execution logs and screenshots are maintainer-held local evidence, not published CI artifacts.

## Presentation verification

| Check | Result and boundary |
| --- | --- |
| `node --test scripts/test-presentation.mjs` | 12 passing source-copy checks for targeted headings, metrics, toasts, docs and architecture labels, after all 12 failed in the initial RED run. This is not an integrated betting test. |
| Fresh isolated frontend install/build | `npm ci --ignore-scripts --no-fund --no-audit` and `npm run build` exit 0 with Node 22.23.3 / npm 10.9.9. Vite reports stale Browserslist data, browser-externalized modules and a large bundle. |
| Fresh frontend lint | `npm run lint` exits 1: 28 errors and 11 warnings. Full diagnostics match the retained baseline exactly, not just the exit status. |
| Fresh app typecheck | `npm exec -- tsc --noEmit -p tsconfig.app.json` exits 2: `PushContext.tsx(59,45)` TS2345, `Signer` is not assignable to `SignerType`. Full diagnostics match the retained baseline exactly. |

Vite build success does not establish type safety, wallet functionality, provider availability or correct financial behavior. No wallet connection, authentication, signing, live-network transaction or deployment is part of this verification.

A fresh isolated Edge session rendered the production artifact on eight affected routes (`/`, `/dashboard`, `/create-bet`, `/about`, `/my-bets`, `/leaderboard`, `/pricing`, `/contact`) at 1440 and 390 CSS pixels: 16 route/viewport observations, all HTTP 200, with no page/console errors or document-level horizontal overflow. The browser verified the current headings/disclaimers, sample category filtering, and the Create Bet and Contact demo toasts/resets. It used no injected wallet or existing profile. Only loopback app assets and public Google Fonts requests were observed; no provider or chain request was made.

The source-architecture SVG was rendered and visually inspected, along with desktop/mobile copy. The preview listener and browser were closed after the checks. Existing styling and accessibility limitations are not certified or repaired by these observations.

## Retained contract evidence

The unchanged original Hardhat run of `npm run test:pushbet` reports **15 passing** tests on its local `hardhat` network. This result is reused, not freshly rerun for copy changes. [Engineering notes](engineering.md) explain the disabled expiry assertion and missing recipient-balance checks.

The earlier inspection reported three synthetic payout probes, but the raw probe execution log was not available for revalidation. No fresh 3/3 runtime claim is made. Wrong-recipient, double-payment and incomplete-refund mechanisms remain visible in the unchanged [contract source](../backend/contracts/contracts/PushBetEscrow.sol).

## Dependency, hosting and licensing limits

Retained dependency snapshots, not a fresh security audit: the frontend audit lists 52 affected package entries (3 critical, 21 high, 12 moderate, 16 low); the contract install summary lists 112 findings (12 critical, 27 high, 52 moderate, 21 low). These are separate dependency trees, not a deduplicated vulnerability total. No upgrade or exploitability assessment was performed in this slice.

A historical Vercel deployment at the baseline revision has a success record. Anonymous inspection redirected to Vercel login, so it is **not a working public demo**. A frontend hosting record does not prove contract deployment. No contract address/receipt or on-chain lifecycle has been verified, and deployment configuration is unchanged.

The inspection found no GitHub Actions workflows/runs for this baseline. Local checks are not remote CI evidence. There is no repository-wide LICENSE file; existing Solidity SPDX notices remain intact. This work is not a history-wide secret audit or a repository-wide license grant.

The owner confirmed hackathon work that was not submitted. No event, year, award or scale metric is inferred from the source or its fixture data.
