import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: '0.8.20',
};

module.exports = {
  solidity: {
    version: '0.8.20',
    evmVersion: 'paris',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  mocha: {
    timeout: 180000,
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // Push Chain Networks
    push_testnet: {
      url: process.env.PUSH_TESTNET_URL ?? 'https://evm.rpc-testnet-donut-node1.push.org/',
      accounts: {
        mnemonic: process.env.MNEMONIC ?? '',
        count: 10,
        path: "m/44'/60'/0'/0",
      },
      gas: 10000000,
      gasPrice: 20000000000, // 20 gwei
      timeout: 60000,
    },
    push_testnet_alt: {
      url: process.env.PUSH_TESTNET_ALT_URL ?? 'https://evm.rpc-testnet-donut-node2.push.org/',
      accounts: {
        mnemonic: process.env.MNEMONIC ?? '',
        count: 10,
        path: "m/44'/60'/0'/0",
      },
      gas: 10000000,
      gasPrice: 20000000000, // 20 gwei
      timeout: 60000,
    },
    push_mainnet: {
      url: process.env.PUSH_MAINNET_URL ?? 'https://evm.rpc-mainnet-donut-node1.push.org/',
      accounts: {
        mnemonic: process.env.MNEMONIC ?? '',
        count: 1,
        path: "m/44'/60'/0'/0",
      },
      gas: 10000000,
      gasPrice: 20000000000, // 20 gwei
      timeout: 60000,
    },
    // Ethereum Networks for testing
    ethereum_testnet: {
      url: process.env.ETHEREUM_TESTNET_URL ?? 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY',
      accounts: {
        mnemonic: process.env.MNEMONIC ?? '',
        count: 10,
        path: "m/44'/60'/0'/0",
      },
      gas: 10000000,
      gasPrice: 20000000000,
    },
    ethereum_mainnet: {
      url: process.env.ETHEREUM_MAINNET_URL ?? 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
      accounts: {
        mnemonic: process.env.MNEMONIC ?? '',
        count: 1,
        path: "m/44'/60'/0'/0",
      },
      gas: 10000000,
      gasPrice: 20000000000,
    },
  },
};

export default config;
