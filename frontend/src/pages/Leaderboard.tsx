import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, TrendingUp, DollarSign } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Leaderboard = () => {
  const topBettors = [
    {
      rank: 1,
      address: "0x742d...8f3a",
      totalWon: "45,892 USDC",
      winRate: "78.5%",
      totalBets: 234,
      profit: "+38,234 USDC",
    },
    {
      rank: 2,
      address: "0x8a2c...4d91",
      totalWon: "38,450 USDC",
      winRate: "72.3%",
      totalBets: 198,
      profit: "+32,190 USDC",
    },
    {
      rank: 3,
      address: "0x5f19...2bc7",
      totalWon: "32,678 USDC",
      winRate: "69.8%",
      totalBets: 176,
      profit: "+28,450 USDC",
    },
    {
      rank: 4,
      address: "0x3b47...9e2d",
      totalWon: "28,921 USDC",
      winRate: "65.4%",
      totalBets: 152,
      profit: "+24,180 USDC",
    },
    {
      rank: 5,
      address: "0x9d14...6a8f",
      totalWon: "25,543 USDC",
      winRate: "63.2%",
      totalBets: 143,
      profit: "+21,330 USDC",
    },
    {
      rank: 6,
      address: "0x1e89...3c4b",
      totalWon: "22,109 USDC",
      winRate: "61.8%",
      totalBets: 128,
      profit: "+18,920 USDC",
    },
    {
      rank: 7,
      address: "0x6c24...7f15",
      totalWon: "19,876 USDC",
      winRate: "59.3%",
      totalBets: 115,
      profit: "+16,780 USDC",
    },
    {
      rank: 8,
      address: "0x4a93...2d8c",
      totalWon: "17,432 USDC",
      winRate: "57.1%",
      totalBets: 107,
      profit: "+14,560 USDC",
    },
    {
      rank: 9,
      address: "0x7f58...1b9e",
      totalWon: "15,298 USDC",
      winRate: "55.9%",
      totalBets: 98,
      profit: "+12,430 USDC",
    },
    {
      rank: 10,
      address: "0x2b66...5a3f",
      totalWon: "13,120 USDC",
      winRate: "54.2%",
      totalBets: 89,
      profit: "+10,890 USDC",
    },
  ];

  const recentWinners = [
    {
      address: "0x8c15...4d2a",
      event: "Lakers vs Celtics - NBA Finals",
      won: "2,850 USDC",
      time: "2 hours ago",
    },
    {
      address: "0x3f92...8b7c",
      event: "Bitcoin Price at End of Month",
      won: "4,120 USDC",
      time: "5 hours ago",
    },
    {
      address: "0x7a48...1e9d",
      event: "League of Legends World Championship",
      won: "1,950 USDC",
      time: "8 hours ago",
    },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1)
      return <Trophy className="w-6 h-6 text-yellow-500 animate-pulse-glow" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-700" />;
    return <span className="text-lg font-bold text-muted-foreground">{rank}</span>;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-500 to-orange-500 glow-accent";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500";
    if (rank === 3) return "bg-gradient-to-r from-amber-600 to-amber-800";
    return "bg-card";
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Top Performers</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
          <p className="text-xl text-muted-foreground">
            See who's dominating the betting arena
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            <Card className="p-6 border-border/50">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Top Bettors
              </h2>

              <div className="space-y-3">
                {topBettors.map((bettor, index) => (
                  <div
                    key={bettor.address}
                    className={`p-4 rounded-lg border transition-all hover:scale-[1.02] ${
                      getRankBadge(bettor.rank)
                    } ${
                      bettor.rank <= 3
                        ? "border-primary/50"
                        : "border-border/50 hover:border-primary/30"
                    }`}
                    style={{
                      animationDelay: `${index * 0.05}s`,
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-card/80">
                        {getRankIcon(bettor.rank)}
                      </div>

                      {/* Address */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-primary/20 text-primary text-xs">
                              {bettor.address.slice(2, 4).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-mono font-semibold">{bettor.address}</span>
                          {bettor.rank <= 3 && (
                            <Badge variant="secondary" className="text-xs">
                              Elite
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {bettor.totalBets} total bets
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="hidden md:flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Win Rate</div>
                          <div className="font-bold text-accent">{bettor.winRate}</div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Total Won</div>
                          <div className="font-bold text-foreground">{bettor.totalWon}</div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Profit</div>
                          <div className="font-bold text-success">{bettor.profit}</div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Stats */}
                    <div className="md:hidden mt-3 pt-3 border-t border-border/50 grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Win Rate</div>
                        <div className="text-sm font-bold text-accent">{bettor.winRate}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Won</div>
                        <div className="text-sm font-bold">{bettor.totalWon}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Profit</div>
                        <div className="text-sm font-bold text-success">{bettor.profit}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Winners Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 border-border/50">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-accent" />
                Recent Winners
              </h2>

              <div className="space-y-4">
                {recentWinners.map((winner, index) => (
                  <div
                    key={winner.address}
                    className="p-4 rounded-lg bg-success/5 border border-success/20 hover:bg-success/10 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10 mt-1">
                        <AvatarFallback className="bg-success/20 text-success text-sm">
                          {winner.address.slice(2, 4).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-sm font-semibold mb-1">
                          {winner.address}
                        </div>
                        <div className="text-sm text-muted-foreground mb-2 line-clamp-1">
                          {winner.event}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-success font-bold">{winner.won}</span>
                          <span className="text-xs text-muted-foreground">{winner.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* CTA Card */}
            <Card className="p-6 gradient-card border-primary/20 text-center">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-accent animate-float" />
              <h3 className="text-xl font-bold mb-2">Join the Ranks</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start betting and climb your way to the top of the leaderboard
              </p>
              <Badge className="bg-gradient-to-r from-primary to-accent">
                Win Big, Rise Fast
              </Badge>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
