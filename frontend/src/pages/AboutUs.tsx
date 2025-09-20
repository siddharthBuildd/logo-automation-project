import { ArrowLeft, Sparkles, Code, Palette, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-white hover:text-purple-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-white mb-2">About Us</h1>
            <p className="text-slate-300">Meet the creator behind LogoAI</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Founder Section */}
          <div className="glass rounded-2xl p-8 backdrop-blur-md mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Founder Image */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <img
                    src="/src/assets/founder.heic"
                    alt="Siddharth Shekhar - Founder of LogoAI"
                    className="w-64 h-64 rounded-2xl object-cover border-4 border-white/20 shadow-2xl"
                    onError={(e) => {
                      // Fallback to a placeholder if image doesn't load
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='%236366f1'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-family='Arial' font-size='24'%3ESS%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Founder Info */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Siddharth Shekhar</h2>
                <p className="text-purple-300 text-lg mb-4">Founder & Full-Stack Developer</p>
                
                <div className="space-y-4 mb-6">
                  <p className="text-white/80 leading-relaxed">
                    A passionate 4th year B.Tech Computer Science Engineering student with a deep love for 
                    technology, creativity, and innovation. As a night owl developer, I spend my evenings 
                    and nights crafting digital solutions that bridge the gap between imagination and reality.
                  </p>
                  
                  <p className="text-white/80 leading-relaxed">
                    With expertise in JavaScript, Python, Node.js, and modern web technologies, I believe 
                    in the power of AI to democratize design and make professional-quality logos accessible 
                    to everyone, regardless of their design experience.
                  </p>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">JavaScript</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Python</span>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">Node.js</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">React</span>
                  <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">AI/ML</span>
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">Full-Stack</span>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com/siddharttth" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    title="GitHub Profile"
                  >
                    <Code className="w-5 h-5 text-white/60 hover:text-white" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/siddharttth/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    title="LinkedIn Profile"
                  >
                    <Palette className="w-5 h-5 text-white/60 hover:text-white" />
                  </a>
                  <a 
                    href="mailto:siddharth.shekharr@gmail.com" 
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    title="Send Email"
                  >
                    <Zap className="w-5 h-5 text-white/60 hover:text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* About LogoAI */}
          <div className="glass rounded-2xl p-8 backdrop-blur-md mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">About LogoAI</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Our Mission</h3>
                <p className="text-white/80 leading-relaxed mb-6">
                  LogoAI was born from the vision of making professional logo design accessible to everyone. 
                  Whether you're a startup founder, small business owner, or creative individual, our AI-powered 
                  platform eliminates the barriers of design expertise and budget constraints.
                </p>

                <h3 className="text-xl font-semibold text-white mb-4">What We Offer</h3>
                <ul className="text-white/80 space-y-2">
                  <li>• AI-powered logo generation from text descriptions</li>
                  <li>• Professional logo enhancement and improvement</li>
                  <li>• Reference-based logo creation</li>
                  <li>• Custom prompt-driven modifications</li>
                  <li>• High-quality downloads in multiple formats</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Technology Stack</h3>
                <p className="text-white/80 leading-relaxed mb-4">
                  Built with cutting-edge technologies including Google Gemini AI for intelligent logo generation, 
                  React for a modern user interface, and Node.js for robust backend processing.
                </p>

                <h3 className="text-xl font-semibold text-white mb-4">Our Values</h3>
                <ul className="text-white/80 space-y-2">
                  <li>• <strong>Accessibility:</strong> Design for everyone, regardless of skill level</li>
                  <li>• <strong>Innovation:</strong> Leveraging AI to push creative boundaries</li>
                  <li>• <strong>Quality:</strong> Professional-grade outputs every time</li>
                  <li>• <strong>Privacy:</strong> Your data and creations are protected</li>
                  <li>• <strong>Simplicity:</strong> Complex technology, simple user experience</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass rounded-xl p-6 backdrop-blur-md text-center">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/60">Logos Created</div>
            </div>
            <div className="glass rounded-xl p-6 backdrop-blur-md text-center">
              <div className="text-3xl font-bold text-white mb-2">99%</div>
              <div className="text-white/60">Satisfaction Rate</div>
            </div>
            <div className="glass rounded-xl p-6 backdrop-blur-md text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/60">AI Support</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Button 
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg"
            >
              Start Creating Your Logo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
