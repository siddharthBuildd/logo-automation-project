import { ArrowLeft, Mail, MessageCircle, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
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
            <h1 className="text-3xl font-bold text-white mb-2">Contact Us</h1>
            <p className="text-slate-300">Get in touch with our team</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="glass rounded-2xl p-8 backdrop-blur-md mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">We'd Love to Hear From You</h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Have questions about LogoAI? Need help with your logo creation? 
              Want to collaborate or share feedback? We're here to help!
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Email Contact */}
            <div className="glass rounded-xl p-6 backdrop-blur-md text-center hover:border-white/20 transition-colors">
              <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Email Us</h3>
              <p className="text-white/80 mb-4">
                Send us an email and we'll get back to you within 24 hours
              </p>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white w-full"
                onClick={() => window.open('mailto:siddharth.shekharr@gmail.com?subject=LogoAI Inquiry', '_blank')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
            </div>

            {/* GitHub Issues */}
            <div className="glass rounded-xl p-6 backdrop-blur-md text-center hover:border-white/20 transition-colors">
              <Github className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">GitHub Issues</h3>
              <p className="text-white/80 mb-4">
                Report bugs, request features, or contribute to our open source project
              </p>
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 w-full"
                onClick={() => window.open('https://github.com/siddharttth', '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                Visit GitHub
              </Button>
            </div>
          </div>

          {/* Developer Info */}
          <div className="glass rounded-2xl p-8 backdrop-blur-md mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Meet the Developer</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Siddharth Shekhar</h3>
                <p className="text-purple-300 text-lg mb-4">Founder & Full-Stack Developer</p>
                
                <p className="text-white/80 leading-relaxed mb-6">
                  A passionate 4th year B.Tech CSE student with expertise in JavaScript, Python, 
                  Node.js, and AI technologies. I created LogoAI to democratize design and make 
                  professional-quality logos accessible to everyone.
                </p>

                <div className="flex space-x-4">
                  <a 
                    href="https://github.com/siddharttth" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    title="GitHub Profile"
                  >
                    <Github className="w-5 h-5 text-white/60 hover:text-white" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/siddharttth/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5 text-white/60 hover:text-white" />
                  </a>
                  <a 
                    href="mailto:siddharth.shekharr@gmail.com" 
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    title="Send Email"
                  >
                    <Mail className="w-5 h-5 text-white/60 hover:text-white" />
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">👨‍💻</div>
                <h3 className="text-xl font-semibold text-white mb-2">Night Owl Developer</h3>
                <p className="text-white/80">Building the future of AI design</p>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="glass rounded-xl p-6 backdrop-blur-md mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Response Times</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">24h</div>
                <div className="text-white/80">Email Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">48h</div>
                <div className="text-white/80">GitHub Issues</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-2">72h</div>
                <div className="text-white/80">Feature Requests</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
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

export default ContactUs;
