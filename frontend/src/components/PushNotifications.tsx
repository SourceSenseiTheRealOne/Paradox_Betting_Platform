import React, { useState, useEffect } from 'react';
import { usePush } from '@/contexts/PushContext';
import { useWallet } from '@/hooks/useWallet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Send, Users, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export const PushNotifications: React.FC = () => {
  const { pushUser, isPushInitialized, pushError } = usePush();
  const { isConnected } = useWallet();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sendMessage, setSendMessage] = useState('');

  // Fetch notifications when Push is initialized
  useEffect(() => {
    if (isPushInitialized && pushUser) {
      fetchNotifications();
    }
  }, [isPushInitialized, pushUser]);

  const fetchNotifications = async () => {
    if (!pushUser) return;

    try {
      setIsLoading(true);
      // Fetch user's notifications
      const userNotifications = await pushUser.notification.list('SPAM');
      console.log('Notifications:', userNotifications);
      
      // Transform to our notification format
      const formattedNotifications: Notification[] = userNotifications.map((notif: any) => ({
        id: notif.payloadId || notif.notificationId || Math.random().toString(),
        title: notif.title || 'Push Notification',
        message: notif.message || notif.body || 'No message content',
        timestamp: notif.timestamp || Date.now(),
        read: notif.read || false,
      }));

      setNotifications(formattedNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendTestNotification = async () => {
    if (!pushUser || !sendMessage.trim()) return;

    try {
      setIsLoading(true);
      // Send a test notification to yourself
      await pushUser.channel.send(['*'], {
        notification: {
          title: 'Test Notification',
          body: sendMessage,
        },
      });
      
      setSendMessage('');
      // Refresh notifications
      await fetchNotifications();
    } catch (error) {
      console.error('Error sending notification:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Push Notifications
          </CardTitle>
          <CardDescription>
            Connect your wallet to access Push Protocol notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              Please connect your wallet to use Push Protocol features.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (pushError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Push Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>
              Error initializing Push Protocol: {pushError}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Push Notifications
          {isPushInitialized && (
            <Badge variant="secondary" className="ml-2">
              <CheckCircle className="h-3 w-3 mr-1" />
              Connected
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Send and receive notifications using Push Protocol
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Send Notification */}
        <div className="space-y-2">
          <h4 className="font-medium">Send Test Notification</h4>
          <div className="flex gap-2">
            <input
              type="text"
              value={sendMessage}
              onChange={(e) => setSendMessage(e.target.value)}
              placeholder="Enter your message..."
              className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-sm"
            />
            <Button 
              onClick={sendTestNotification} 
              disabled={!sendMessage.trim() || isLoading}
              size="sm"
            >
              <Send className="h-4 w-4 mr-1" />
              Send
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          <h4 className="font-medium">Recent Notifications</h4>
          {isLoading ? (
            <div className="text-sm text-muted-foreground">Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div className="text-sm text-muted-foreground">No notifications yet</div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border ${
                    notification.read 
                      ? 'bg-muted/50 border-muted' 
                      : 'bg-background border-border'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-sm">{notification.title}</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                    </div>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {new Date(notification.timestamp).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Refresh Button */}
        <Button 
          variant="outline" 
          onClick={fetchNotifications} 
          disabled={isLoading}
          className="w-full"
        >
          <Users className="h-4 w-4 mr-2" />
          Refresh Notifications
        </Button>
      </CardContent>
    </Card>
  );
};

export default PushNotifications;
