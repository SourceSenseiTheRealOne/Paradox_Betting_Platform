# Local development

Use a disposable environment without wallets, credentials, `.env` files or user data. Node.js 22 and npm are the frontend verification toolchain. Run commands from the stated directory; there is no root package-install command.

## Presentation checks (repository root)

```sh
node --test scripts/test-presentation.mjs
```

These dependency-free Node source-copy checks inspect specific UI sections and documentation. They do not execute React, test contracts, submit bets or establish integrated feature correctness. UTF-8 reads remove only a leading BOM.

## Frontend (`frontend/`)

```sh
npm ci --ignore-scripts --no-fund --no-audit
npm run build
npm run lint
npm exec -- tsc --noEmit -p tsconfig.app.json
```

Run each gate separately. Vite's build does not typecheck the app. The known baseline has 28 lint errors / 11 warnings and a TS2345 signer mismatch in `src/contexts/PushContext.tsx`; these failures are not fixed here. `--no-audit` separates installation from security review, not a declaration that dependencies are safe.

For development:

```sh
npm run dev -- --host 127.0.0.1 --port 4361 --strictPort
```

Or, after stopping development and completing the build:

```sh
npm run preview -- --host 127.0.0.1 --port 4361 --strictPort
```

Open `http://127.0.0.1:4361`. Explicit loopback binding overrides the existing development config's all-interface default. Use an unoccupied port and stop only the server you started. The disconnected screens need no environment values. Adding a contract-address variable does not implement betting integration.

Use sample text only. Create Bet and Contact reset without persistence; a simulation toast is not a bet or delivery receipt. Keep the wallet disconnected, do not request permissions and do not click external legacy contact/provider links during local checks.

## Contract tests (`backend/contracts/`)

```sh
npm ci --ignore-scripts --no-fund --no-audit
npm run test:pushbet
```

This selects the in-process Hardhat network with mocks. Solidity 0.8.20 can require a compiler download. No mnemonic or live-network credentials are needed. The retained original suite result and its coverage limits are in [evidence](evidence.md); this slice does not rerun unchanged contract tests.

Do not run `deploy`, `deploy:all` or live-network deploy/verify scripts as part of presentation checks. The deployment scripts are unverified and the escrow is unsafe for real funds. See the [contract notes](../backend/contracts/PUSHBET_ESCROW_README.md).
