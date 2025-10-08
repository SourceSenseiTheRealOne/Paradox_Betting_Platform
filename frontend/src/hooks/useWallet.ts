import React, { useCallback, useState } from 'react';
import { useWeb3 } from '@/providers/Web3Provider';

// Supported chain IDs for Push Protocol
const SUPPORTED_CHAIN_IDS = [1, 3, 4, 5, 42, 137, 80001]; // Ethereum mainnet, testnets, and Polygon

export interface WalletState {
  account: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  chainId: number | null;
  error: string | null;
}

export const useWallet = () => {
  const { account, isConnected, isConnecting, error, connect, disconnect } = useWeb3();
  const [chainId, setChainId] = useState<number | null>(null);
  const [walletError, setWalletError] = useState<string | null>(null);

  const switchChain = useCallback(async (newChainId: number) => {
    if (!window.ethereum) {
      setWalletError('No wallet found');
      return;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${newChainId.toString(16)}` }],
      });
    } catch (error: any) {
      console.error('Error switching chain:', error);
      setWalletError(error.message || 'Failed to switch chain');
    }
  }, []);

  // Get current chain ID
  const getChainId = useCallback(async () => {
    if (window.ethereum) {
      try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(parseInt(chainId, 16));
      } catch (error) {
        console.error('Error getting chain ID:', error);
      }
    }
  }, []);

  // Update chain ID when wallet connects or chain changes
  React.useEffect(() => {
    if (isConnected) {
      getChainId();
    } else {
      setChainId(null);
    }
  }, [isConnected, getChainId]);

  return {
    account,
    isConnected,
    isConnecting,
    chainId,
    error: walletError || error,
    connect,
    disconnect,
    switchChain,
  };
};
