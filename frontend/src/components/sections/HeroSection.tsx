import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-logo-showcase.jpg";

const HeroSection = () => {
  const handleStartCreating = () => {
    // Scroll to services section
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
          filter: "brightness(0.3)",
        }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-1s" }} />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-green-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-2s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center glass rounded-full px-4 py-2 mb-8 backdrop-blur-md">
            <span className="text-sm text-white/80">🚀 AI-Powered Logo Creation</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Create Stunning Logos with
            <span className="text-gradient-blue block">AI-Powered Precision</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform your brand identity with professional logo design tools. 
            No design experience required.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              variant="hero-primary" 
              size="xl" 
              className="group"
              onClick={handleStartCreating}
            >
              Start Creating Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="hero" size="xl" className="group">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="glass rounded-xl p-6 backdrop-blur-md">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/60">Logos Created</div>
            </div>
            <div className="glass rounded-xl p-6 backdrop-blur-md">
              <div className="text-3xl font-bold text-white mb-2">99%</div>
              <div className="text-white/60">Satisfaction Rate</div>
            </div>
            <div className="glass rounded-xl p-6 backdrop-blur-md">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/60">AI Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
          <div className="w-1 h-3 bg-white/50 rounded-full mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;