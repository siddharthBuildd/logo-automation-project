import { Sparkles, Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 relative">
      <div className="container mx-auto px-6">
        <div className="glass rounded-3xl p-12 backdrop-blur-md">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">LogoAI</span>
              </div>
              <p className="text-white/60 leading-relaxed">
                AI-powered logo creation tool that transforms your ideas into stunning visual identities.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="/enhance" className="text-white/60 hover:text-white transition-colors">Logo Enhancement</a></li>
                <li><a href="/generate" className="text-white/60 hover:text-white transition-colors">AI Generation</a></li>
                <li><a href="/reference" className="text-white/60 hover:text-white transition-colors">Reference Creation</a></li>
                <li><a href="/help-center" className="text-white/60 hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="/about-us" className="text-white/60 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/careers" className="text-white/60 hover:text-white transition-colors">Careers</a></li>
                <li><a href="/blog" className="text-white/60 hover:text-white transition-colors">Blog</a></li>
                <li><a href="/contact-us" className="text-white/60 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="/help-center" className="text-white/60 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="/contact-us" className="text-white/60 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="https://github.com/siddharttth" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">GitHub</a></li>
                <li><a href="/privacy-policy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Copyright */}
              <div className="text-white/60 text-sm mb-4 md:mb-0">
                © 2025 LogoAI. Created by Siddharth Shekhar. All rights reserved.
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <a 
                  href="https://x.com/siddharttth" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  title="Follow on X (Twitter)"
                >
                  <Twitter className="w-5 h-5 text-white/60 hover:text-white" />
                </a>
                <a 
                  href="https://github.com/siddharttth" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  title="View GitHub Profile"
                >
                  <Github className="w-5 h-5 text-white/60 hover:text-white" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/siddharttth/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  title="Connect on LinkedIn"
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

              {/* Legal Links */}
              <div className="flex items-center space-x-6 text-sm">
                <a href="/privacy-policy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a>
                <a href="/terms-of-service" className="text-white/60 hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;