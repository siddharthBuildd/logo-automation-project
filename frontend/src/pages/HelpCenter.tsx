import { ArrowLeft, Search, MessageCircle, BookOpen, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HelpCenter = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How does AI logo generation work?",
      answer: "Our AI uses advanced machine learning models, including Google Gemini, to analyze your text description and create unique logos. Simply describe your vision, and our AI will generate professional-quality logos tailored to your needs."
    },
    {
      question: "What file formats are supported for uploads?",
      answer: "We support common image formats including PNG, JPG, JPEG, and WebP. For best results, upload high-quality images with good contrast and clear details."
    },
    {
      question: "Can I modify generated logos?",
      answer: "Yes! You can use our custom prompt feature to request specific modifications like color changes, style adjustments, or adding text. Our AI will regenerate the logo based on your instructions."
    },
    {
      question: "How long does logo generation take?",
      answer: "Most logos are generated within 10-30 seconds. Complex designs or high-resolution outputs may take up to 2 minutes. You'll see a progress indicator during generation."
    },
    {
      question: "Are the generated logos royalty-free?",
      answer: "Yes! All logos generated through our platform are provided to you for personal and commercial use. You own the rights to use them for your business or personal projects."
    },
    {
      question: "What if I'm not satisfied with the results?",
      answer: "You can regenerate logos with different prompts, try different styles, or use our enhancement tools to improve existing designs. We're committed to helping you create the perfect logo."
    }
  ];

  const guides = [
    {
      title: "Getting Started with LogoAI",
      description: "Learn the basics of creating your first AI-generated logo",
      icon: "🚀",
      readTime: "3 min read"
    },
    {
      title: "Writing Effective Logo Prompts",
      description: "Tips for describing your vision to get better results",
      icon: "✍️",
      readTime: "5 min read"
    },
    {
      title: "Enhancing Existing Logos",
      description: "How to improve and modify your current logo designs",
      icon: "✨",
      readTime: "4 min read"
    },
    {
      title: "Download and Export Options",
      description: "Understanding different file formats and quality settings",
      icon: "📥",
      readTime: "2 min read"
    }
  ];

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
            <h1 className="text-3xl font-bold text-white mb-2">Help Center</h1>
            <p className="text-slate-300">Find answers and get support</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Search */}
          <div className="glass rounded-2xl p-8 backdrop-blur-md mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">How can we help you?</h2>
              <p className="text-white/80">Search our knowledge base or browse common questions</p>
            </div>
            
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles, guides, or FAQs..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:outline-none focus:border-white/40"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass rounded-xl p-6 backdrop-blur-md text-center hover:border-white/20 transition-colors cursor-pointer">
              <MessageCircle className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Contact Support</h3>
              <p className="text-white/80 text-sm">Get personalized help from our team</p>
            </div>
            
            <div className="glass rounded-xl p-6 backdrop-blur-md text-center hover:border-white/20 transition-colors cursor-pointer">
              <BookOpen className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">User Guide</h3>
              <p className="text-white/80 text-sm">Complete guide to using LogoAI</p>
            </div>
            
            <div className="glass rounded-xl p-6 backdrop-blur-md text-center hover:border-white/20 transition-colors cursor-pointer">
              <Zap className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Feature Updates</h3>
              <p className="text-white/80 text-sm">Latest features and improvements</p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="glass rounded-2xl p-8 backdrop-blur-md mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Guides Section */}
          <div className="glass rounded-2xl p-8 backdrop-blur-md mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Helpful Guides</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guides.map((guide, index) => (
                <div key={index} className="border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors cursor-pointer">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{guide.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{guide.title}</h3>
                      <p className="text-white/80 text-sm mb-3">{guide.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-xs">{guide.readTime}</span>
                        <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                          Read Guide
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="glass rounded-2xl p-8 backdrop-blur-md mb-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Still Need Help?</h2>
            <p className="text-white/80 mb-6">
              Can't find what you're looking for? Our support team is here to help you succeed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                onClick={() => window.open('mailto:siddharth.shekharr@gmail.com?subject=LogoAI Support Request', '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Email Support
              </Button>
              
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => window.open('https://github.com/siddharttth', '_blank')}
              >
                <Zap className="w-4 h-4 mr-2" />
                GitHub Issues
              </Button>
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

export default HelpCenter;
