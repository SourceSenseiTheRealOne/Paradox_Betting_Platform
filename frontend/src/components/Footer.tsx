import { Link } from "react-router-dom";
import { Twitter, Github, MessageCircle, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center font-bold text-xl">
                P
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                PushBet
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Next-generation cross-chain betting platform powered by PushChain technology.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/my-bets" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  My Bets
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all hover:scale-110"
              >
                <Twitter className="w-5 h-5 text-primary" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all hover:scale-110"
              >
                <Github className="w-5 h-5 text-primary" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all hover:scale-110"
              >
                <MessageCircle className="w-5 h-5 text-primary" />
              </a>
              <a
                href="mailto:hello@pushbet.io"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all hover:scale-110"
              >
                <Mail className="w-5 h-5 text-primary" />
              </a>
            </div>
            <div className="mt-6 space-y-2">
              <p className="text-xs text-muted-foreground">Powered by</p>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-semibold text-primary">PushChain</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm font-semibold text-accent">SourceSensei</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PushBet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
