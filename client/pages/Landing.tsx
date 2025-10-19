
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





  {/* Empowering Section */}
      <section className="py-20 bg-white relative pb-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <div className="relative z-10">
              <img 
                src="/Placeholder.png" 
                alt="Solar Panel Installation" 
                className="rounded-2xl shadow-lg w-full h-auto object-cover"
              />
            </div>
            
            {/* Right: Content */}
            <div className="relative z-10">
              <p className="text-blue-600 font-semibold text-sm mb-2">Seamlessly Connect. Effortlessly Earn.</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Empowering You to Connect and Earn
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At KonnectX, our mission is to simplify hotspot management while maximizing rewards for our users. We envision a connected community where everyone benefits from shared connectivity.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex gap-4">
                <button className="px-6 py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors">
                  Join
                </button>
                <button className="px-6 py-2.5 text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center gap-1">
                  Learn <span className="text-sm">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Diagonal Transition to Blue */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-80" viewBox="0 0 1200 220" preserveAspectRatio="none">
            <path d="M0,0 L1200,100 L1200,220 L0,220 Z" className="fill-current text-blue-600"></path>
          </svg>
        </div>
      </section>

      {/* User Feedback Section with Large Globe */}
      <section className="relative overflow-hidden -mt-1">
        <div className="bg-blue-600 py-20 relative">
          {/* Large Globe Background */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-[700px] h-[700px] opacity-15">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Globe Circle */}
              <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8"/>
              
              {/* Latitude Lines */}
              <ellipse cx="100" cy="100" rx="90" ry="15" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6"/>
              <ellipse cx="100" cy="100" rx="90" ry="35" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6"/>
              <ellipse cx="100" cy="100" rx="90" ry="55" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6"/>
              <ellipse cx="100" cy="100" rx="90" ry="75" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6"/>
              
              {/* Longitude Lines */}
              <ellipse cx="100" cy="100" rx="15" ry="90" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6"/>
              <ellipse cx="100" cy="100" rx="35" ry="90" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6"/>
              <ellipse cx="100" cy="100" rx="55" ry="90" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6"/>
              <ellipse cx="100" cy="100" rx="75" ry="90" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6"/>
              
              {/* Center Vertical Line */}
              <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6"/>
              
              {/* Center Horizontal Line */}
              <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6"/>
              
              {/* Outer Circle */}
              <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
            </svg>
          </div>

          {/* Decorative Background Circles */}
          <div className="absolute top-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-32 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Section Header */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                User Feedback
              </h2>
              <p className="text-blue-100">
                Hear what our users have to say!
              </p>
            </div>
            
            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Alice Johnson",
                  role: "Community Member",
                  feedback: "KonnectX transformed how I manage my hotspots!",
                  avatar: "AJ",
                  rating: 5
                },
                {
                  name: "Mark Thompson",
                  role: "Data Enthusiast",
                  feedback: "Earning $KXT tokens has never been easier!",
                  avatar: "MT",
                  rating: 5
                },
                {
                  name: "Sarah Lee",
                  role: "Product Designer",
                  feedback: "The referral program is a game changer!",
                  avatar: "SL",
                  rating: 5
                }
              ].map((testimonial, idx) => (
                <div key={idx} className="p-6">
                  {/* Star Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                  
                  {/* Feedback Text */}
                  <p className="text-white text-lg mb-6 font-medium">
                    "{testimonial.feedback}"
                  </p>
                  
                  {/* User Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-300 flex items-center justify-center text-blue-900 font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      <p className="text-blue-100 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  
    







{/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <p className="text-blue-600 text-sm font-semibold mb-2">Support</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Get in Touch</h2>
            </div>
            
            {/* Contact Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { 
                  icon: "✉️",
                  label: "Email",
                  description: "For any assistance, reach out to our support team. We're here to help!",
                  value: "support@konnectx.com",
                  iconBg: "bg-blue-100",
                  iconColor: "text-blue-600"
                },
                { 
                  icon: "📞",
                  label: "Phone",
                  description: "Need help? Our support team is just a tap-away—reach out anytime!",
                  value: "+1 (888) 123-4567",
                  iconBg: "bg-blue-100",
                  iconColor: "text-blue-600"
                },
                { 
                  icon: "📍",
                  label: "Office",
                  description: "Visit our office for support or inquiries—we're here to assist you.",
                  value: "456 Tech Ave, San Francisco, CA 94102",
                  iconBg: "bg-blue-100",
                  iconColor: "text-blue-600"
                }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${item.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className={`text-2xl ${item.iconColor}`}>{item.icon}</span>
                  </div>
                  
                  {/* Label */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.label}</h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{item.description}</p>
                  
                  {/* Value */}
                  <p className="text-blue-600 font-medium text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-8 border-b border-gray-200">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">K</span>
              </div>
              <span className="text-xl font-bold text-gray-900">KonnectX</span>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex gap-8 mb-6 md:mb-0">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition text-sm font-medium">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition text-sm font-medium">Features</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition text-sm font-medium">Rewards</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition text-sm font-medium">About Us</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition text-sm font-medium">Contact</a>
            </nav>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                <span className="text-sm">f</span>
              </a>
              <a href="#" className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                <span className="text-sm">in</span>
              </a>
              <a href="#" className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                <span className="text-sm">X</span>
              </a>
              <a href="#" className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                <span className="text-sm">yt</span>
              </a>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>© 2025 KonnectX. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition">Terms of Service</a>
              <a href="#" className="hover:text-blue-600 transition">Cookies Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
