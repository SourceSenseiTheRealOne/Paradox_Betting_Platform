import { useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Clock, Trophy, Filter } from "lucide-react";
import PushNotifications from "@/components/PushNotifications";
import WalletStatus from "@/components/WalletStatus";

const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Bets", icon: "🎯" },
    { id: "sports", name: "Sports", icon: "⚽" },
    { id: "crypto", name: "Crypto", icon: "₿" },
    { id: "esports", name: "E-Sports", icon: "🎮" },
    { id: "events", name: "Events", icon: "🎭" },
  ];

  const bets = [
    {
      id: 1,
      category: "sports",
      title: "Lakers vs Celtics - NBA Finals",
      description: "Who will win the championship?",
      option1: { name: "Lakers", odds: 1.85, amount: "125,000 USDC" },
      option2: { name: "Celtics", odds: 2.10, amount: "98,000 USDC" },
      endTime: "2024-06-15T20:00:00",
      totalPool: "223,000 USDC",
      participants: 1250,
      trending: true,
    },
    {
      id: 2,
      category: "crypto",
      title: "Bitcoin Price at End of Month",
      description: "Will BTC be above $70,000?",
      option1: { name: "Yes", odds: 1.65, amount: "450,000 USDC" },
      option2: { name: "No", odds: 2.35, amount: "280,000 USDC" },
      endTime: "2024-05-31T23:59:00",
      totalPool: "730,000 USDC",
      participants: 3420,
      trending: true,
    },
    {
      id: 3,
      category: "esports",
      title: "League of Legends World Championship",
      description: "T1 vs Gen.G - Grand Finals",
      option1: { name: "T1", odds: 1.92, amount: "89,000 USDC" },
      option2: { name: "Gen.G", odds: 1.95, amount: "87,500 USDC" },
      endTime: "2024-11-02T18:00:00",
      totalPool: "176,500 USDC",
      participants: 890,
      trending: false,
    },
    {
      id: 4,
      category: "events",
      title: "2024 US Presidential Election",
      description: "Who will win the election?",
      option1: { name: "Candidate A", odds: 1.75, amount: "1,200,000 USDC" },
      option2: { name: "Candidate B", odds: 2.20, amount: "850,000 USDC" },
      endTime: "2024-11-05T23:59:00",
      totalPool: "2,050,000 USDC",
      participants: 8750,
      trending: true,
    },
    {
      id: 5,
      category: "crypto",
      title: "ETH Gas Fees This Week",
      description: "Will average gas fees exceed 50 GWEI?",
      option1: { name: "Yes", odds: 2.15, amount: "67,000 USDC" },
      option2: { name: "No", odds: 1.80, amount: "95,000 USDC" },
      endTime: "2024-05-19T23:59:00",
      totalPool: "162,000 USDC",
      participants: 650,
      trending: false,
    },
    {
      id: 6,
      category: "sports",
      title: "UEFA Champions League Final",
      description: "Real Madrid vs Manchester City",
      option1: { name: "Real Madrid", odds: 2.05, amount: "210,000 USDC" },
      option2: { name: "Man City", odds: 1.85, amount: "245,000 USDC" },
      endTime: "2024-06-01T20:00:00",
      totalPool: "455,000 USDC",
      participants: 2100,
      trending: true,
    },
  ];

  const filteredBets = activeCategory === "all"
    ? bets
    : bets.filter((bet) => bet.category === activeCategory);

  const formatTimeRemaining = (endTime: string) => {
    const end = new Date(endTime);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Simulated betting dashboard</h1>
          <p className="text-xl text-muted-foreground">
            Sample bets, odds, pools and participants; not live. Dates are historical fixtures. Stay disconnected.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "hero" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className="gap-2 whitespace-nowrap"
            >
              <span>{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>

        {/* Wallet and Push Notifications Section */}
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <WalletStatus />
          <PushNotifications />
        </div>

        {/* Bets Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBets.map((bet, index) => (
            <Card
              key={bet.id}
              className="p-6 hover:scale-105 transition-all cursor-pointer border-border/50 hover:border-primary/50 animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={bet.trending ? "default" : "secondary"}>
                      {bet.trending ? (
                        <>
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Sample trend
                        </>
                      ) : (
                        categories.find((c) => c.id === bet.category)?.icon
                      )}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold mb-1">{bet.title}</h3>
                  <p className="text-sm text-muted-foreground">{bet.description}</p>
                </div>
              </div>

              {/* Betting Options */}
              <div className="space-y-3 mb-4">
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">{bet.option1.name}</span>
                    <span className="text-lg font-bold text-primary">{bet.option1.odds}x</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{bet.option1.amount}</div>
                </div>

                <div className="p-3 rounded-lg bg-accent/5 border border-accent/20 hover:bg-accent/10 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">{bet.option2.name}</span>
                    <span className="text-lg font-bold text-accent">{bet.option2.odds}x</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{bet.option2.amount}</div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm mb-4 pt-4 border-t border-border">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Trophy className="w-4 h-4" />
                  <span>{bet.participants} simulated bettors</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{formatTimeRemaining(bet.endTime)}</span>
                </div>
              </div>

              {/* Total Pool */}
              <div className="text-center py-3 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                <div className="text-xs text-muted-foreground mb-1">Simulated pool</div>
                <div className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {bet.totalPool}
                </div>
              </div>

              {/* Place Bet Button */}
              <Button variant="hero" className="w-full mt-4">
                Betting unavailable
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
