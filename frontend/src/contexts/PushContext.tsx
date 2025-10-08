import React, { createContext, useContext, useEffect, useState } from 'react';
import { useWeb3 } from '@/providers/Web3Provider';
import { PushAPI } from '@pushprotocol/restapi';

interface PushContextType {
  pushUser: PushAPI | null;
  isPushInitialized: boolean;
  pushError: string | null;
  initializePush: () => Promise<void>;
}

const PushContext = createContext<PushContextType | undefined>(undefined);

export const usePush = () => {
  const context = useContext(PushContext);
  if (context === undefined) {
    throw new Error('usePush must be used within a PushProvider');
  }
  return context;
};

interface PushProviderProps {
  children: React.ReactNode;
}

export const PushProvider: React.FC<PushProviderProps> = ({ children }) => {
  const { account, isConnected, signer } = useWeb3();
  const [pushUser, setPushUser] = useState<PushAPI | null>(null);
  const [isPushInitialized, setIsPushInitialized] = useState(false);
  const [pushError, setPushError] = useState<string | null>(null);

  const initializePush = async () => {
    if (!account || !isConnected) {
      setPushError('Wallet not connected');
      return;
    }

    try {
      setPushError(null);
      setIsPushInitialized(false);

      // Ensure polyfills are loaded
      if (typeof window !== 'undefined') {
        if (!(window as any).global) {
          (window as any).global = window;
        }
        if (!(window as any).process) {
          (window as any).process = { env: {} };
        }
      }

      // Use the signer from our Web3Provider
      if (!signer) {
        setPushError('No signer available');
        return;
      }

      // Initialize Push API with error handling
      const user = await PushAPI.initialize(signer, {
        env: 'staging', // Change to 'prod' for production
      });

      setPushUser(user);
      setIsPushInitialized(true);
    } catch (error: any) {
      console.error('Error initializing Push:', error);
      setPushError(error.message || 'Failed to initialize Push Protocol');
    }
  };

  // Initialize Push when wallet connects
  useEffect(() => {
    if (isConnected && account && !pushUser) {
      initializePush();
    } else if (!isConnected) {
      setPushUser(null);
      setIsPushInitialized(false);
      setPushError(null);
    }
  }, [isConnected, account]);

  const value: PushContextType = {
    pushUser,
    isPushInitialized,
    pushError,
    initializePush,
  };

  return (
    <PushContext.Provider value={value}>
      {children}
    </PushContext.Provider>
  );
};

export default PushProvider;
