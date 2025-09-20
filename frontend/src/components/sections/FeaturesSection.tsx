import { 
  Zap, 
  Download, 
  Palette, 
  RefreshCw, 
  Shield, 
  Clock,
  Star,
  Users
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate professional logos in seconds, not hours. Our AI processes your requirements instantly.",
    color: "blue",
  },
  {
    icon: Download,
    title: "Multiple Formats",
    description: "Download your logos in PNG, SVG, PDF, and more. Perfect for web, print, and any medium.",
    color: "purple",
  },
  {
    icon: Palette,
    title: "Unlimited Colors",
    description: "Explore endless color combinations with our AI color intelligence and brand matching.",
    color: "green",
  },
  {
    icon: RefreshCw,
    title: "Instant Revisions",
    description: "Don't like something? Our AI learns from your feedback and creates better versions instantly.",
    color: "blue",
  },
  {
    icon: Shield,
    title: "Commercial License",
    description: "All logos come with full commercial rights. Use them anywhere without restrictions.",
    color: "purple",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Create logos anytime, anywhere. Our AI never sleeps and is always ready to help.",
    color: "green",
  },
];

const stats = [
  { icon: Star, value: "4.9/5", label: "User Rating" },
  { icon: Users, value: "50K+", label: "Happy Customers" },
  { icon: Download, value: "1M+", label: "Downloads" },
  { icon: Zap, value: "99.9%", label: "Uptime" },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center glass rounded-full px-4 py-2 mb-6 backdrop-blur-md">
            <span className="text-sm text-white/80">⚡ Powerful Features</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Everything You Need for
            <span className="text-gradient-blue block">Perfect Logos</span>
          </h2>
          
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Our AI-powered platform combines cutting-edge technology with intuitive design 
            to deliver professional results every time.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`glass glass-hover rounded-2xl p-8 group backdrop-blur-md animate-fade-in`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 glass-${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-white/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="glass rounded-3xl p-12 backdrop-blur-md">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Trusted by Thousands
            </h3>
            <p className="text-white/70">
              Join the growing community of satisfied creators and businesses
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;