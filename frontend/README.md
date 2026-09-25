# Paradox frontend prototype

The React/TypeScript/Vite frontend uses Tailwind CSS, shadcn/ui and React Router. The package name remains `pushbet-frontend`; PushBet is the legacy UI identity.

## Runtime boundary

Betting screens use hardcoded fixtures and are not connected to the escrow. Category filters and local form state work in the browser. Create Bet and Contact validate inputs, show demo toasts and clear their fields without persistence or message delivery. Pricing controls do not create subscriptions. Historical sample dates can produce negative countdowns.

Wallet/provider and Push Protocol staging SDK code exist, but connected-wallet behavior is unverified. They are not a completed betting integration. Do not connect a funded wallet or enter personal information for this preview.

## Local commands

From this directory, with Node.js 22 and npm:

```sh
npm ci --ignore-scripts --no-fund --no-audit
npm run dev -- --host 127.0.0.1 --port 4361 --strictPort
```

For a production-build preview, stop the development server first:

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4361 --strictPort
```

No `.env` file is needed for disconnected browsing. The previously documented `VITE_CONTRACT_ADDRESS` does not wire the UI to an escrow consumer. See [local development](../docs/local-development.md) for gates and their known failures.

## Deployment and licensing

Historical Vercel deployment records do not prove anonymous app access or contract deployment. Earlier `vercel` and Netlify upload instructions are unverified and outside portfolio verification; no hosting setup is required here.

There is no repository-wide LICENSE file. Existing file-level notices are unchanged; the prior README's MIT statement is not a substitute for a confirmed repository-wide license. See the [root README](../README.md) and [evidence](../docs/evidence.md).
