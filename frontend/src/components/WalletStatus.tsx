import React from 'react';
import { useWallet } from '@/hooks/useWallet';
import { usePush } from '@/contexts/PushContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export const WalletStatus: React.FC = () => {
  const { account, isConnected, chainId, error } = useWallet();
  const { isPushInitialized, pushError } = usePush();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getChainName = (chainId: number | null) => {
    switch (chainId) {
      case 1: return 'Ethereum Mainnet';
      case 3: return 'Ropsten Testnet';
      case 4: return 'Rinkeby Testnet';
      case 5: return 'Goerli Testnet';
      case 42: return 'Kovan Testnet';
      case 137: return 'Polygon Mainnet';
      case 80001: return 'Polygon Mumbai';
      default: return `Chain ID: ${chainId}`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Wallet Status
        </CardTitle>
        <CardDescription>
          Current wallet and Push Protocol connection status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Wallet Connection Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Wallet Connection</span>
          <Badge variant={isConnected ? "default" : "destructive"}>
            {isConnected ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                Connected
              </>
            ) : (
              <>
                <XCircle className="h-3 w-3 mr-1" />
                Disconnected
              </>
            )}
          </Badge>
        </div>

        {/* Account Address */}
        {isConnected && account && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Account</span>
            <span className="text-sm font-mono text-muted-foreground">
              {formatAddress(account)}
            </span>
          </div>
        )}

        {/* Chain ID */}
        {isConnected && chainId && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Network</span>
            <span className="text-sm text-muted-foreground">
              {getChainName(chainId)}
            </span>
          </div>
        )}

        {/* Push Protocol Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Push Protocol</span>
          <Badge variant={isPushInitialized ? "default" : "secondary"}>
            {isPushInitialized ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                Initialized
              </>
            ) : (
              <>
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                Initializing
              </>
            )}
          </Badge>
        </div>

        {/* Error Messages */}
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive font-medium">Wallet Error:</p>
            <p className="text-sm text-destructive/80">{error}</p>
          </div>
        )}

        {pushError && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive font-medium">Push Protocol Error:</p>
            <p className="text-sm text-destructive/80">{pushError}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletStatus;
