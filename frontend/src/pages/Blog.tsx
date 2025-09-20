import { ArrowLeft, Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI-Powered Design: How Machine Learning is Revolutionizing Logo Creation",
      excerpt: "Explore how artificial intelligence is transforming the design industry and making professional-quality logos accessible to everyone.",
      author: "Siddharth Shekhar",
      date: "January 15, 2025",
      readTime: "5 min read",
      category: "AI & Design"
    },
    {
      id: 2,
      title: "Building LogoAI: A Developer's Journey into AI-Driven Design",
      excerpt: "Behind the scenes look at creating an AI-powered logo generation platform, from concept to deployment.",
      author: "Siddharth Shekhar",
      date: "January 10, 2025",
      readTime: "7 min read",
      category: "Development"
    },
    {
      id: 3,
      title: "Best Practices for Logo Design: What Makes a Great Brand Identity",
      excerpt: "Learn the fundamental principles of effective logo design and how to create memorable brand identities.",
      author: "Siddharth Shekhar",
      date: "January 5, 2025",
      readTime: "6 min read",
      category: "Design Tips"
    },
    {
      id: 4,
      title: "Integrating Google Gemini AI: A Technical Deep Dive",
      excerpt: "Technical insights into integrating Google's Gemini AI for image generation and the challenges we overcame.",
      author: "Siddharth Shekhar",
      date: "December 28, 2024",
      readTime: "8 min read",
      category: "Technology"
    },
    {
      id: 5,
      title: "The Psychology of Colors in Logo Design",
      excerpt: "Understanding how color choices impact brand perception and customer behavior in logo design.",
      author: "Siddharth Shekhar",
      date: "December 20, 2024",
      readTime: "4 min read",
      category: "Design Psychology"
    },
    {
      id: 6,
      title: "From Startup to Scale: How Small Businesses Can Leverage AI Design Tools",
      excerpt: "Practical advice for entrepreneurs on using AI-powered design tools to build professional brand identities on a budget.",
      author: "Siddharth Shekhar",
      date: "December 15, 2024",
      readTime: "6 min read",
      category: "Business"
    }
  ];

  const categories = ["All", "AI & Design", "Development", "Design Tips", "Technology", "Design Psychology", "Business"];

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
            <h1 className="text-3xl font-bold text-white mb-2">Blog</h1>
            <p className="text-slate-300">Insights on AI, design, and technology</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="glass rounded-2xl p-8 backdrop-blur-md mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Latest Insights</h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Stay updated with the latest trends in AI-powered design, development insights, 
              and tips for creating stunning visual identities.
            </p>
          </div>

          {/* Categories */}
          <div className="glass rounded-xl p-6 backdrop-blur-md mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    category === "All"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          <div className="glass rounded-2xl p-8 backdrop-blur-md mb-8">
            <div className="flex items-center mb-4">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium">
                Featured
              </span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-white/80 mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center text-white/60 text-sm mb-4">
                  <User className="w-4 h-4 mr-2" />
                  <span className="mr-4">{blogPosts[0].author}</span>
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{blogPosts[0].date}</span>
                </div>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Design</h3>
                <p className="text-white/80">The future is here</p>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {blogPosts.slice(1).map((post) => (
              <article key={post.id} className="glass rounded-xl p-6 backdrop-blur-md hover:border-white/20 transition-colors">
                <div className="flex items-center mb-3">
                  <span className="px-2 py-1 bg-white/10 text-white/80 rounded-full text-xs">
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-white/80 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-white/60 text-xs mb-4">
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{post.date}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">{post.readTime}</span>
                  <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                    Read More
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="glass rounded-2xl p-8 backdrop-blur-md mb-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-white/80 mb-6">
              Subscribe to our newsletter for the latest insights on AI design, development tips, and industry trends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:border-white/40"
              />
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6">
                Subscribe
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

export default Blog;
