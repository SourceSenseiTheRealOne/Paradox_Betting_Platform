import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Globe, Users, TrendingUp, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Trustless & Secure",
      description: "All bets are powered by smart contracts, ensuring transparency and fairness.",
    },
    {
      icon: Globe,
      title: "Cross-Chain Compatible",
      description: "Bet with your favorite tokens across multiple blockchains seamlessly.",
    },
    {
      icon: Zap,
      title: "Instant Settlements",
      description: "Lightning-fast payouts powered by PushChain's shared-state technology.",
    },
    {
      icon: Lock,
      title: "Non-Custodial",
      description: "Your funds stay in your wallet until the bet is settled. No intermediaries.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Create custom bets and invite others to participate in shared events.",
    },
    {
      icon: TrendingUp,
      title: "Competitive Odds",
      description: "Dynamic odds that adjust based on market demand and liquidity.",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PushBet
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            PushBet is a next-generation decentralized betting platform built on PushChain technology. 
            We're revolutionizing the betting industry by combining the transparency of blockchain 
            with the speed and efficiency of shared-state infrastructure.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="p-8 md:p-12 mb-12 border-border/50 gradient-card">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To create a fair, transparent, and accessible betting platform that empowers users 
              to bet on anything, anywhere, with complete confidence. We believe in the power of 
              decentralization to eliminate middlemen and give users full control over their funds 
              and betting experience.
            </p>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose PushBet?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="p-6 border-border/50 hover:scale-105 transition-all animate-scale-in"
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

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How PushBet Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 text-center border-border/50">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect Wallet</h3>
              <p className="text-muted-foreground">
                Connect your MetaMask, Phantom, or any web3 wallet to get started.
              </p>
            </Card>

            <Card className="p-6 text-center border-border/50">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose & Bet</h3>
              <p className="text-muted-foreground">
                Browse events, analyze odds, and place your bet with your preferred token.
              </p>
            </Card>

            <Card className="p-6 text-center border-border/50">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Win & Collect</h3>
              <p className="text-muted-foreground">
                Smart contracts automatically settle bets and send winnings to your wallet.
              </p>
            </Card>
          </div>
        </div>

        {/* Technology Section */}
        <Card className="p-8 md:p-12 mb-12 border-primary/20 glow-primary">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Powered by PushChain</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              PushChain is a revolutionary blockchain infrastructure that enables shared-state applications. 
              This means bets can be settled instantly across multiple chains without the need for bridges 
              or complicated cross-chain transactions.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              By leveraging PushChain's technology, PushBet offers faster settlements, lower fees, and 
              a seamless multi-chain experience that traditional betting platforms simply can't match.
            </p>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of bettors already using PushBet
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button variant="hero" size="lg">
                Explore Bets
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
