import { ArrowLeft, Briefcase, Users, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Careers = () => {
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
            <h1 className="text-3xl font-bold text-white mb-2">Careers</h1>
            <p className="text-slate-300">Join our mission to democratize design</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="glass rounded-2xl p-8 backdrop-blur-md mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Build the Future of AI Design</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              We're looking for passionate individuals who want to revolutionize how people create 
              visual identities. Join our team and help shape the next generation of AI-powered design tools.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center text-white/60">
                <Users className="w-5 h-5 mr-2" />
                <span>Remote-First Team</span>
              </div>
              <div className="flex items-center text-white/60">
                <Clock className="w-5 h-5 mr-2" />
                <span>Flexible Hours</span>
              </div>
              <div className="flex items-center text-white/60">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Global Opportunities</span>
              </div>
            </div>
          </div>

          {/* Open Positions */}
          <div className="glass rounded-2xl p-8 backdrop-blur-md mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Open Positions</h2>
            
            <div className="space-y-6">
              {/* Position 1 */}
              <div className="border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Senior AI Engineer</h3>
                    <p className="text-white/60">Full-time • Remote</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    Apply Now
                  </Button>
                </div>
                <p className="text-white/80 mb-4">
                  Lead the development of our AI-powered logo generation algorithms and work with cutting-edge 
                  machine learning models to improve our design capabilities.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Python</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">TensorFlow</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">PyTorch</span>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">Computer Vision</span>
                </div>
              </div>

              {/* Position 2 */}
              <div className="border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Frontend Developer</h3>
                    <p className="text-white/60">Full-time • Remote</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    Apply Now
                  </Button>
                </div>
                <p className="text-white/80 mb-4">
                  Create beautiful, intuitive user interfaces that make AI-powered design accessible to everyone. 
                  Work with React, TypeScript, and modern design systems.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">React</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">TypeScript</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Tailwind CSS</span>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">Vite</span>
                </div>
              </div>

              {/* Position 3 */}
              <div className="border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Product Designer</h3>
                    <p className="text-white/60">Full-time • Remote</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    Apply Now
                  </Button>
                </div>
                <p className="text-white/80 mb-4">
                  Shape the user experience of our AI design platform. Create wireframes, prototypes, and 
                  design systems that make complex AI technology feel simple and intuitive.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Figma</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">User Research</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Prototyping</span>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">Design Systems</span>
                </div>
              </div>
            </div>
          </div>

          {/* Why Join Us */}
          <div className="glass rounded-2xl p-8 backdrop-blur-md mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Why Join LogoAI?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Our Culture</h3>
                <ul className="text-white/80 space-y-3">
                  <li>• <strong>Innovation First:</strong> We're always exploring the latest in AI and design</li>
                  <li>• <strong>Remote-First:</strong> Work from anywhere in the world</li>
                  <li>• <strong>Flexible Hours:</strong> We trust you to manage your time effectively</li>
                  <li>• <strong>Learning Budget:</strong> Annual budget for courses, books, and conferences</li>
                  <li>• <strong>Open Source:</strong> Contribute to the community and grow your portfolio</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Benefits & Perks</h3>
                <ul className="text-white/80 space-y-3">
                  <li>• <strong>Competitive Salary:</strong> Market-rate compensation</li>
                  <li>• <strong>Equity Options:</strong> Share in our success</li>
                  <li>• <strong>Health Insurance:</strong> Comprehensive coverage</li>
                  <li>• <strong>Unlimited PTO:</strong> Take time off when you need it</li>
                  <li>• <strong>Latest Equipment:</strong> Top-of-the-line hardware and software</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Application Process */}
          <div className="glass rounded-2xl p-8 backdrop-blur-md mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Application Process</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Apply</h3>
                <p className="text-white/60 text-sm">Submit your application and portfolio</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Interview</h3>
                <p className="text-white/60 text-sm">Initial screening with our team</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Technical</h3>
                <p className="text-white/60 text-sm">Skills assessment and coding challenge</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">4</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Offer</h3>
                <p className="text-white/60 text-sm">Welcome to the team!</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center">
            <div className="glass rounded-xl p-6 backdrop-blur-md mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Don't See Your Role?</h3>
              <p className="text-white/80 mb-4">
                We're always looking for talented individuals. Send us your resume and let us know how you'd like to contribute.
              </p>
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => window.open('mailto:siddharth.shekharr@gmail.com?subject=Career Inquiry - LogoAI', '_blank')}
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Send Resume
              </Button>
            </div>

            <Button 
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
