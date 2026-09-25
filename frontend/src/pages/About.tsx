import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Globe, Users, TrendingUp, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Separate contract prototype",
      description: "The UI is not connected to the escrow. It has known payout and refund defects.",
    },
    {
      icon: Globe,
      title: "Intended platform",
      description: "Push Chain is the intended platform, not a verified deployment.",
    },
    {
      icon: Zap,
      title: "Local contract tests",
      description: "Basic Hardhat tests exist; they do not establish settlement correctness.",
    },
    {
      icon: Lock,
      title: "Custody risks",
      description: "The separate contract holds deposits and gives its owner withdrawal authority. Do not fund it.",
    },
    {
      icon: Users,
      title: "Demo form",
      description: "The create form validates inputs, shows a demo toast and resets. Nothing is saved.",
    },
    {
      icon: TrendingUp,
      title: "Fixed sample odds",
      description: "Odds and pool values are static fixtures, not market data.",
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
              Paradox
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Paradox is a betting escrow prototype with a mock React interface and separate Solidity contracts.
            It was hackathon work, not submitted. PushBet remains the legacy package and contract identity.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="p-8 md:p-12 mb-12 border-border/50 gradient-card">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Scope and limits</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This prototype explores betting screens and escrow state transitions. It does not provide
              working betting, safe custody or verified settlement. Browse without a wallet and do not use real funds.
            </p>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What exists in the source</h2>
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
          <h2 className="text-3xl font-bold text-center mb-12">How to inspect the prototype</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 text-center border-border/50">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Stay disconnected</h3>
              <p className="text-muted-foreground">
                Browse sample screens without connecting a wallet. Wallet integration is not verified.
              </p>
            </Card>

            <Card className="p-6 text-center border-border/50">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse sample bets</h3>
              <p className="text-muted-foreground">
                Explore categories and fixed odds. Bet controls do not submit transactions.
              </p>
            </Card>

            <Card className="p-6 text-center border-border/50">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Review the contract</h3>
              <p className="text-muted-foreground">
                Read the separate escrow source and its known accounting defects before considering any further work.
              </p>
            </Card>
          </div>
        </div>

        {/* Technology Section */}
        <Card className="p-8 md:p-12 mb-12 border-primary/20 glow-primary">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Intended for Push Chain</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Source documentation targets Push Chain. No contract deployment has been verified,
              and there is no UI-to-escrow transaction path.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The frontend contains wallet and Push staging SDK code. That code is separate from
              the mock betting data and does not prove a connected betting lifecycle.
            </p>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Explore the sample screens</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Simulated data only; no live bets or payouts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button variant="hero" size="lg">
                Explore sample bets
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Demo contact form
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
