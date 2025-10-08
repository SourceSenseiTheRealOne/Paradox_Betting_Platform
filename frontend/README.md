# PushBet Frontend

A next-generation cross-chain betting platform built with React, TypeScript, and Tailwind CSS.

## Features

- **Cross-Chain Betting**: Place bets across multiple blockchains
- **Push Protocol Integration**: Real-time notifications for betting activities
- **Web3 Wallet Support**: Connect with MetaMask and other Web3 wallets
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Web3**: Ethers.js, Push Protocol
- **State Management**: React Query, React Context
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pushbet-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Layout.tsx      # Main layout component
│   ├── Navbar.tsx      # Navigation bar
│   └── ...
├── contexts/           # React contexts
│   └── PushContext.tsx # Push Protocol context
├── hooks/              # Custom React hooks
│   └── useWallet.ts    # Wallet connection hook
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── CreateBet.tsx   # Create bet page
│   └── ...
├── providers/          # Context providers
│   └── Web3Provider.tsx # Web3 context provider
└── types/              # TypeScript type definitions
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_PUSH_CHAIN_RPC_URL=https://evm.rpc-testnet-donut-node1.push.org/
VITE_PUSH_CHAIN_CHAIN_ID=1001
VITE_CONTRACT_ADDRESS=0x...
```

## Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/` folder to Netlify.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.