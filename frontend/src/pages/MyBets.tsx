import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Clock, CheckCircle, XCircle, DollarSign } from "lucide-react";

const MyBets = () => {
  const activeBets = [
    {
      id: 1,
      title: "Lakers vs Celtics - NBA Finals",
      category: "Sports",
      myChoice: "Lakers",
      odds: 1.85,
      stake: "500 USDC",
      potentialWin: "925 USDC",
      endTime: "2024-06-15T20:00:00",
      status: "active",
      currentPool: "223,000 USDC",
    },
    {
      id: 2,
      title: "Bitcoin Price at End of Month",
      category: "Crypto",
      myChoice: "Yes (>$70,000)",
      odds: 1.65,
      stake: "1,000 USDC",
      potentialWin: "1,650 USDC",
      endTime: "2024-05-31T23:59:00",
      status: "active",
      currentPool: "730,000 USDC",
    },
  ];

  const completedBets = [
    {
      id: 3,
      title: "ETH Breaking $4,000 This Week",
      category: "Crypto",
      myChoice: "Yes",
      odds: 2.10,
      stake: "300 USDC",
      result: "won",
      payout: "630 USDC",
      profit: "+330 USDC",
      completedAt: "2024-05-10",
    },
    {
      id: 4,
      title: "Super Bowl LVIII Winner",
      category: "Sports",
      myChoice: "49ers",
      odds: 1.95,
      stake: "250 USDC",
      result: "lost",
      payout: "0 USDC",
      profit: "-250 USDC",
      completedAt: "2024-02-11",
    },
    {
      id: 5,
      title: "Dota 2 The International 2023",
      category: "E-Sports",
      myChoice: "Team Liquid",
      odds: 3.25,
      stake: "150 USDC",
      result: "won",
      payout: "487.50 USDC",
      profit: "+337.50 USDC",
      completedAt: "2023-10-29",
    },
  ];

  const stats = {
    totalBets: activeBets.length + completedBets.length,
    activeBets: activeBets.length,
    wonBets: completedBets.filter((b) => b.result === "won").length,
    lostBets: completedBets.filter((b) => b.result === "lost").length,
    totalWagered: "2,200 USDC",
    totalWon: "1,117.50 USDC",
    netProfit: "+417.50 USDC",
    winRate: "66.7%",
  };

  const formatTimeRemaining = (endTime: string) => {
    const end = new Date(endTime);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h remaining`;
    return `${hours}h remaining`;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Sample bet history</h1>
          <p className="text-xl text-muted-foreground">
            Simulated history and metrics, not your wallet activity. All dates and results are fixtures.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 text-center border-border/50">
            <div className="text-3xl font-bold text-primary mb-1">{stats.totalBets}</div>
            <div className="text-sm text-muted-foreground">Simulated bets</div>
          </Card>

          <Card className="p-6 text-center border-border/50">
            <div className="text-3xl font-bold text-accent mb-1">{stats.winRate}</div>
            <div className="text-sm text-muted-foreground">Simulated win rate</div>
          </Card>

          <Card className="p-6 text-center border-border/50">
            <div className="text-3xl font-bold text-foreground mb-1">{stats.totalWagered}</div>
            <div className="text-sm text-muted-foreground">Simulated wagers</div>
          </Card>

          <Card className="p-6 text-center border-border/50">
            <div className="text-3xl font-bold text-success mb-1">{stats.netProfit}</div>
            <div className="text-sm text-muted-foreground">Simulated profit</div>
          </Card>
        </div>

        {/* Bets Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="active">
              Sample active ({activeBets.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Sample completed ({completedBets.length})
            </TabsTrigger>
          </TabsList>

          {/* Active Bets */}
          <TabsContent value="active" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {activeBets.map((bet) => (
                <Card key={bet.id} className="p-6 border-border/50 hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge className="mb-2">{bet.category}</Badge>
                      <h3 className="text-xl font-bold">{bet.title}</h3>
                    </div>
                    <Badge variant="secondary" className="gap-1">
                      <Clock className="w-3 h-3" />
                      Sample active
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">My Choice:</span>
                      <span className="font-semibold">{bet.myChoice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Odds:</span>
                      <span className="font-semibold text-primary">{bet.odds}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stake:</span>
                      <span className="font-semibold">{bet.stake}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Potential Win:</span>
                      <span className="font-bold text-accent">{bet.potentialWin}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="text-sm text-muted-foreground mb-3">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {formatTimeRemaining(bet.endTime)}
                    </div>
                    <Button variant="outline" className="w-full">
                      Demo control only
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Completed Bets */}
          <TabsContent value="completed" className="mt-6">
            <div className="space-y-4">
              {completedBets.map((bet) => (
                <Card
                  key={bet.id}
                  className={`p-6 border-border/50 ${
                    bet.result === "won"
                      ? "hover:border-success/50"
                      : "hover:border-destructive/50"
                  } transition-colors`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{bet.category}</Badge>
                        <Badge
                          variant={bet.result === "won" ? "default" : "destructive"}
                          className="gap-1"
                        >
                          {bet.result === "won" ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              Sample win
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" />
                              Sample loss
                            </>
                          )}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold mb-1">{bet.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Choice: {bet.myChoice} • Odds: {bet.odds}x
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground mb-1">Stake</div>
                        <div className="font-semibold">{bet.stake}</div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-muted-foreground mb-1">Simulated payout</div>
                        <div className="font-semibold">{bet.payout}</div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-muted-foreground mb-1">Profit</div>
                        <div
                          className={`font-bold ${
                            bet.result === "won" ? "text-success" : "text-destructive"
                          }`}
                        >
                          {bet.profit}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MyBets;
