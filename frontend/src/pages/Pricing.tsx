import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Rocket } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      icon: Zap,
      price: "Free",
      description: "Perfect for casual bettors",
      features: [
        "Access to all betting categories",
        "Standard odds",
        "Basic statistics",
        "Community support",
        "Standard withdrawal times",
      ],
      notIncluded: [
        "Boosted odds",
        "Priority support",
        "No-fee betting",
        "Early bet access",
      ],
      buttonText: "Current Plan",
      popular: false,
    },
    {
      name: "Pro",
      icon: Crown,
      price: "$29",
      period: "/month",
      description: "For serious bettors",
      features: [
        "Everything in Basic",
        "Boosted odds on selected events",
        "Advanced analytics & insights",
        "Priority customer support",
        "Reduced betting fees (1%)",
        "Faster withdrawals",
        "Access to exclusive events",
      ],
      notIncluded: [
        "Zero-fee betting",
        "Dedicated account manager",
      ],
      buttonText: "Upgrade to Pro",
      popular: true,
    },
    {
      name: "Elite",
      icon: Rocket,
      price: "$99",
      period: "/month",
      description: "For professional bettors",
      features: [
        "Everything in Pro",
        "Zero betting fees",
        "Maximum boosted odds",
        "Dedicated account manager",
        "Early access to new bets",
        "VIP-only events",
        "Custom betting limits",
        "Instant withdrawals",
        "Advanced API access",
      ],
      notIncluded: [],
      buttonText: "Upgrade to Elite",
      popular: false,
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Subscription Plans</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock premium features and boost your betting experience
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.name}
                className={`p-8 flex flex-col relative overflow-hidden transition-all hover:scale-105 ${
                  plan.popular
                    ? "border-primary/50 shadow-lg glow-primary"
                    : "border-border/50"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <Badge className="rounded-tl-none rounded-br-none bg-gradient-to-r from-primary to-accent">
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 ${
                  plan.popular ? "gradient-hero glow-accent" : "bg-primary/10"
                }`}>
                  <Icon className={`w-7 h-7 ${plan.popular ? "text-white" : "text-primary"}`} />
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground">{plan.period}</span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-muted-foreground">
                      <Check className="w-5 h-5 opacity-20 flex-shrink-0 mt-0.5" />
                      <span className="text-sm line-through">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <Button
                  variant={plan.popular ? "hero" : "outline"}
                  size="lg"
                  className="w-full"
                  disabled={plan.price === "Free"}
                >
                  {plan.buttonText}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <Card className="p-6 border-border/50">
              <h3 className="text-lg font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.
              </p>
            </Card>

            <Card className="p-6 border-border/50">
              <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major cryptocurrencies including USDC, ETH, BTC, and SOL.
              </p>
            </Card>

            <Card className="p-6 border-border/50">
              <h3 className="text-lg font-semibold mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-muted-foreground">
                Yes, you can change your plan at any time. Upgrades are effective immediately, while downgrades take effect at the start of your next billing cycle.
              </p>
            </Card>

            <Card className="p-6 border-border/50">
              <h3 className="text-lg font-semibold mb-2">Is there a refund policy?</h3>
              <p className="text-muted-foreground">
                We offer a 7-day money-back guarantee for new subscribers. If you're not satisfied with your plan, contact support within 7 days for a full refund.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
