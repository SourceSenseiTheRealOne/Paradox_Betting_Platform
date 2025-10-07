import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Shield, TrendingUp, Users, Wallet, Trophy } from "lucide-react";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Place bets and receive payouts instantly across multiple chains",
    },
    {
      icon: Shield,
      title: "Secure & Trustless",
      description: "Smart contract-powered betting with transparent odds",
    },
    {
      icon: TrendingUp,
      title: "Best Odds",
      description: "Competitive odds on sports, crypto, e-sports, and custom events",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of bettors and climb the leaderboard",
    },
  ];

  const categories = [
    { name: "Sports", emoji: "⚽", color: "from-blue-500 to-cyan-500" },
    { name: "Crypto", emoji: "₿", color: "from-orange-500 to-yellow-500" },
    { name: "E-Sports", emoji: "🎮", color: "from-purple-500 to-pink-500" },
    { name: "Events", emoji: "🎭", color: "from-green-500 to-emerald-500" },
  ];

  const stats = [
    { value: "$2.5M+", label: "Total Volume" },
    { value: "10K+", label: "Active Users" },
    { value: "50K+", label: "Bets Placed" },
    { value: "99.9%", label: "Uptime" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-sm font-semibold text-primary">🚀 Now Live on Multiple Chains</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Bet Across Chains.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-pulse-glow">
                Instantly.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              The next-generation betting platform powered by PushChain. Place bets on sports, crypto, e-sports, and more with your favorite tokens.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button variant="hero" size="lg" className="gap-2 text-lg px-8 py-6">
                <Wallet className="w-5 h-5" />
                Connect Wallet
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Explore Bets
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Animated Elements */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </section>

      {/* Categories Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Bet on What You Love</h2>
            <p className="text-xl text-muted-foreground">Multiple betting categories, one seamless platform</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {categories.map((category, index) => (
              <Card
                key={category.name}
                className="p-6 text-center hover:scale-105 transition-all cursor-pointer group animate-scale-in border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`text-6xl mb-4 group-hover:scale-110 transition-transform`}>
                  {category.emoji}
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <div className={`h-1 w-12 mx-auto rounded-full bg-gradient-to-r ${category.color}`} />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose PushBet?</h2>
            <p className="text-xl text-muted-foreground">Built for the future of decentralized betting</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="p-6 hover:scale-105 transition-all animate-scale-in border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center mb-4 glow-primary">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-12 text-center gradient-card border-primary/20 glow-primary">
            <Trophy className="w-16 h-16 mx-auto mb-6 text-accent animate-float" />
            <h2 className="text-4xl font-bold mb-4">Ready to Start Winning?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of bettors already using PushBet. Connect your wallet and place your first bet in seconds.
            </p>
            <Button variant="hero" size="lg" className="gap-2 text-lg px-8 py-6">
              <Wallet className="w-5 h-5" />
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
