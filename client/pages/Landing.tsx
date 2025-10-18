
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Moon, Sun, ArrowRight, Check, Users, Gift, TrendingUp, Wifi } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useApp();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Image Background */}
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        {/* Decorative PNG Background - Behind Everything */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="/Bg.png"
            alt=""
            className="absolute left-0 bottom-0 w-full md:w-1/0  object-cover opacity-100 brightness-110 contrast-125"
          />
        </div>

        {/* Background Image Container */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 w-full md:w-1/2 h-full z-10">
            <img
             src="/herosec_image.jpg"
              alt="Person using smartphone for hotspot management"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Header */}
        <header className="relative z-50 border-b border-border/20 bg-background">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Wifi className="text-primary-foreground" size={20} />
              </div>
              <span className="text-xl font-bold text-foreground">KonnectX</span>
            </div>
            
           <nav className="hidden md:flex items-center gap-4 font-bold">
  <a href="#home" className="text-foreground/80 hover:text-blue-600 transition">Home</a>
  <a href="#features" className="text-foreground/80 hover:text-blue-600 transition">Features</a>
  <a href="#rewards" className="text-foreground/80 hover:text-blue-600 transition">Rewards</a>
  <a href="#contact" className="text-foreground/80 hover:text-blue-600 transition">Support</a>
</nav>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-muted/50 transition"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <Button
                onClick={() => navigate("/register")}
                className="bg-primary hover:bg-primary/90"
              >
                Join Now
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Content */}
        <section className="relative">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-80px)] py-12 md:py-20">
              {/* Left Content */}
              <div className="relative z-10">
                <div className="relative">
                  <div className="border-0 border-primary pl-6 md:pl-8 py-2">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight">
                      Welcome to KonnectX: Your Hotspot Management Solution
                    </h1>
                    
                    <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
                      Manage your hotspots effortlessly and earn rewards with IKXT tokens. Join our community and unlock the full potential of your network.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => navigate("/register")}
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-base md:text-lg h-12 md:h-14 px-8"
                    >
                      Register
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-base md:text-lg h-12 md:h-14 px-8 group"
                    >
                      Learn More
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Side - Placeholder for Image (actual image is in background) */}
              <div className="hidden md:block"></div>
            </div>
          </div>
        </section>
      </div>

            {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Manage Your Hotspots Effortlessly and Maximize Your Earnings with KonnectX
                </h2>
              </div>
              <div className="flex items-center">
                <p className="text-base md:text-lg text-muted-foreground">
                  KonnectX simplifies hotspot management, allowing you to track your devices with ease. Monitor your performance and optimize your network to earn more rewards. Experience a seamless interface designed for efficiency and clarity.
                </p>
              </div>
            </div>
            
            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
              {[
                {
                  icon: TrendingUp,
                  title: "Track Your $KXT Rewards and Watch Your Earnings Grow",
                  description: "Stay informed about your earnings in real-time with our intuitive dashboard."
                },
                {
                  icon: Users,
                  title: "Unlock Exclusive Benefits with Our Referral Program",
                  description: "Invite friends and earn rewards for every successful referral you make."
                },
                {
                  icon: Gift,
                  title: "Experience a Community of Like-Minded Users and Grow Together",
                  description: "Connect with others, share tips, and enhance your hotspot experience."
                }
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex flex-col"
                >
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    
  


    {/* Rewards Section */}
<section id="rewards" className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    {/* Section Header */}
    <div className="mb-4">
      <p className="text-blue-600 font-semibold text-sm mb-2">Connect</p>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        Easily Earn Rewards with KonnectX
      </h2>
      <p className="text-gray-600 max-w-2xl">
        Getting started with KonnectX is a breeze. Follow these simple steps to register, connect your hotspot, and begin earning rewards.
      </p>
    </div>
    
    {/* Steps Grid */}
    <div className="grid md:grid-cols-3 gap-8 mt-12">
      {[
        { 
          step: "Step 1", 
          title: "Register Your Account", 
          description: "Create your account in just a few clicks.",
          icon: "👤"
        },
        { 
          step: "Step 2", 
          title: "Connect Your Hotspot", 
          description: "Link your hotspot to start tracking activity.",
          icon: "📶"
        },
        { 
          step: "Step 3", 
          title: "Start Earning Rewards", 
          description: "Watch your rewards grow as you engage.",
          icon: "💼"
        }
      ].map((item, idx) => (
        <div key={idx} className="text-left">
          {/* Icon */}
          <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-4">
            {item.icon}
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {item.step}: {item.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 text-sm mb-4">
            {item.description}
          </p>
        </div>
      ))}
    </div>
    
    {/* CTA Buttons */}
    <div className="flex gap-4 mt-8">
      <button className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors">
        Start
      </button>
      <button className="px-6 py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center gap-1">
        Learn <span className="text-sm">→</span>
      </button>
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
