// Configuration example for Push Chain deployment
// Copy this to config.ts and update with your values

export const config = {
  // Push Chain Networks
  pushTestnet: {
    url: 'https://evm.rpc-testnet-donut-node1.push.org/',
    chainId: 1001, // Example chain ID - update with actual Push Chain testnet ID
  },
  pushTestnetAlt: {
    url: 'https://evm.rpc-testnet-donut-node2.push.org/',
    chainId: 1001, // Example chain ID - update with actual Push Chain testnet ID
  },
  pushMainnet: {
    url: 'https://evm.rpc-mainnet-donut-node1.push.org/',
    chainId: 1000, // Example chain ID - update with actual Push Chain mainnet ID
  },
  
  
  // Ethereum Networks (for testing)
  ethereumTestnet: {
    url: 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY',
    chainId: 11155111,
  },
  ethereumMainnet: {
    url: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
    chainId: 1,
  },
  
  // Contract Addresses (update with deployed addresses)
  contracts: {
    paymentToken: '0x0000000000000000000000000000000000000000', // USDC address
    feeRecipient: '0x0000000000000000000000000000000000000000', // Your fee recipient
    pushComm: '0x0000000000000000000000000000000000000000', // Push Communication contract
    pushChannel: '0x0000000000000000000000000000000000000000', // Your Push channel
  },
  
  // Wallet Configuration
  mnemonic: 'your twelve word mnemonic phrase here',
  
  // Gas Configuration
  gas: {
    gasLimit: 10000000,
    gasPrice: 20000000000, // 20 gwei
  },
};
