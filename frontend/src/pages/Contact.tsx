import { useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Twitter, Github, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Message sent successfully!", {
      description: "We'll get back to you as soon as possible",
    });

    // Reset form
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "hello@pushbet.io",
      link: "mailto:hello@pushbet.io",
    },
    {
      icon: Twitter,
      title: "Twitter",
      description: "@pushbet",
      link: "https://twitter.com/pushbet",
    },
    {
      icon: MessageCircle,
      title: "Discord",
      description: "Join our community",
      link: "https://discord.com/invite/pushbet",
    },
    {
      icon: Github,
      title: "GitHub",
      description: "View our code",
      link: "https://github.com/pushbet",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="p-8 border-border/50">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="What's this about?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more..."
                  className="min-h-32"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full gap-2">
                <Send className="w-4 h-4" />
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Other Ways to Reach Us</h2>
              <div className="space-y-4">
                {contactMethods.map((method) => (
                  <a
                    key={method.title}
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card className="p-6 border-border/50 hover:border-primary/50 transition-all hover:scale-105 cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center glow-primary">
                          <method.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{method.title}</h3>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                    </Card>
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ Card */}
            <Card className="p-8 gradient-card border-primary/20">
              <h3 className="text-xl font-bold mb-4">Looking for Support?</h3>
              <p className="text-muted-foreground mb-6">
                Check out our FAQ section for quick answers to common questions about betting, withdrawals, and more.
              </p>
              <Button variant="outline" className="w-full">
                View FAQ
              </Button>
            </Card>

            {/* Business Hours */}
            <Card className="p-6 border-border/50">
              <h3 className="text-lg font-semibold mb-4">Support Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday - Sunday</span>
                  <span className="font-semibold">10:00 AM - 4:00 PM EST</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
