import { Sparkles, Brain, Image, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: "enhance",
    title: "Enhance Existing Logo",
    description: "Upload your current logo and let our AI enhance it with professional polish, better colors, and improved design elements.",
    icon: Sparkles,
    color: "blue",
    features: ["AI-powered enhancement", "Color optimization", "Vector conversion", "Multiple formats"],
    buttonVariant: "service-blue" as const,
    textGradient: "text-gradient-blue",
  },
  {
    id: "generate",
    title: "Generate from Description",
    description: "Describe your vision and watch our AI create unique, professional logos that perfectly match your brand identity.",
    icon: Brain,
    color: "purple",
    features: ["Text-to-logo AI", "Custom styles", "Brand analysis", "Unlimited iterations"],
    buttonVariant: "service-purple" as const,
    textGradient: "text-gradient-purple",
  },
  {
    id: "reference",
    title: "Reference-Based Creation",
    description: "Provide reference images or inspiration and our AI will create similar logos while ensuring complete originality.",
    icon: Image,
    color: "green",
    features: ["Style matching", "Original designs", "Smart analysis", "Instant results"],
    buttonVariant: "service-green" as const,
    textGradient: "text-gradient-green",
  },
];

const ServicesSection = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceId: string) => {
    console.log('Service clicked:', serviceId);
    switch (serviceId) {
      case 'enhance':
        console.log('Navigating to /enhance');
        navigate('/enhance');
        break;
      case 'generate':
        console.log('Navigating to /generate');
        navigate('/generate');
        break;
      case 'reference':
        console.log('Navigating to /reference');
        navigate('/reference');
        break;
      default:
        console.log('Unknown service:', serviceId);
        break;
    }
  };

  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center glass rounded-full px-4 py-2 mb-6 backdrop-blur-md">
            <span className="text-sm text-white/80">✨ Three Powerful Services</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Choose Your
            <span className="text-gradient-purple block">Creation Method</span>
          </h2>
          
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Whether you're enhancing, creating from scratch, or drawing inspiration, 
            we have the perfect AI-powered solution for you.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`glass-${service.color} glass-hover rounded-2xl p-8 group relative overflow-hidden backdrop-blur-md cursor-pointer`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
              onClick={() => {
                console.log('Card clicked for service:', service.id);
                handleServiceClick(service.id);
              }}
            >
              {/* Icon */}
              <div className="w-16 h-16 glass rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className={`text-2xl font-bold mb-4 ${service.textGradient}`}>
                {service.title}
              </h3>
              
              <p className="text-white/70 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-white/60 text-sm">
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button 
                variant={service.buttonVariant} 
                className="w-full group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                size="lg"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Button clicked for service:', service.id);
                  handleServiceClick(service.id);
                }}
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Background Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl ${
                service.color === 'blue' ? 'from-blue-400 to-blue-600' :
                service.color === 'purple' ? 'from-purple-400 to-purple-600' :
                'from-green-400 to-green-600'
              }`} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto backdrop-blur-md">
            <h3 className="text-2xl font-bold text-white mb-4">
              Not sure which service to choose?
            </h3>
            <p className="text-white/70 mb-6">
              Take our quick quiz and we'll recommend the perfect solution for your needs.
            </p>
            <Button variant="hero-primary" size="lg">
              Take Quiz
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;