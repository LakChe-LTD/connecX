import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Moon, Sun, ArrowRight, Check, Users, Gift, TrendingUp } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useApp();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">KX</span>
            </div>
            <span className="text-xl font-bold text-foreground">KonnectX</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#Home" className="text-foreground/80 hover:text-foreground transition">Home</a>
            <a href="#features" className="text-foreground/80 hover:text-foreground transition">Features</a>
            <a href="#rewards" className="text-foreground/80 hover:text-foreground transition">Rewards</a>
            <a href="#contact" className="text-foreground/80 hover:text-foreground transition">Support</a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted transition"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <Button
              onClick={() => navigate("/signin")}
              variant="outline"
              className="hidden sm:inline-flex"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate("/register")}
              className="bg-primary hover:bg-primary/90"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Welcome to KonnectX: Your Hotspot Management Solution
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Seamlessly manage, monitor, and monetize your hotspots with our comprehensive platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/register")}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg h-12"
              >
                Start Free Trial <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg h-12"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Manage Your Hotspots Effortlessly
          </h2>
          <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
            Complete management of your hotspots with real-time monitoring and detailed analytics
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Real-time Analytics",
                description: "Monitor your hotspot performance with comprehensive real-time data"
              },
              {
                icon: Users,
                title: "User Management",
                description: "Easily manage connected users and monitor network activity"
              },
              {
                icon: Gift,
                title: "Rewards System",
                description: "Earn rewards and incentives for your active hotspots"
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-border/50 bg-card hover:shadow-lg hover:border-primary/50 transition"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section id="rewards" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Easily Earn Rewards with KonnectX
          </h2>
          <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
            Get rewarded for your hotspot usage and engagement
          </p>
          
          <div className="grid md:grid-cols cols-3 gap-8">
            {[
              { step: "Step 1", title: "Register Your Hotspot", description: "Set up your hotspot in minutes" },
              { step: "Step 2", title: "Share Your Bandwidth", description: "Enable users to connect and earn rewards" },
              { step: "Step 3", title: "Get Rewarded", description: "Receive instant rewards for your contribution" }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Why Choose KonnectX?</h2>
              <ul className="space-y-4">
                {[
                  "Easy to use dashboard and controls",
                  "Real-time performance monitoring",
                  "Secure and reliable infrastructure",
                  "24/7 customer support",
                  "Transparent reward system",
                  "Multi-device synchronization"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-2">500K+</div>
                <p className="text-foreground/70">Active Users Worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-foreground/70 mb-8">Have questions? We'd love to hear from you</p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { label: "Email", value: "support@konnectx.com" },
                { label: "Phone", value: "+1 (800) KONNECT" },
                { label: "Address", value: "123 Tech Street, San Francisco, CA" }
              ].map((item, idx) => (
                <div key={idx}>
                  <p className="text-sm text-foreground/60 mb-2">{item.label}</p>
                  <p className="text-foreground font-medium">{item.value}</p>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg h-12"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><a href="#" className="hover:text-foreground transition">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><a href="#" className="hover:text-foreground transition">About</a></li>
                <li><a href="#" className="hover:text-foreground transition">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><a href="#" className="hover:text-foreground transition">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><a href="#" className="hover:text-foreground transition">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground transition">LinkedIn</a></li>
                <li><a href="#" className="hover:text-foreground transition">GitHub</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/40 pt-8 text-center text-sm text-foreground/60">
            <p>&copy; 2024 KonnectX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
