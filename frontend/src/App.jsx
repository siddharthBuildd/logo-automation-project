import React, { useState, useEffect } from 'react';
import { Wand2, Sparkles, Image, Palette } from 'lucide-react';
import Header from './components/layout/Header';
import ServiceCard from './components/services/ServiceCard';
import LogoEnhancer from './components/services/LogoEnhancer';
import LogoGenerator from './components/services/LogoGenerator';
import GlassCard from './components/ui/GlassCard';
import Button from './components/ui/Button';
import { logoApi, aiApi } from './api/logoApi';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [apiStatus, setApiStatus] = useState('checking');
  const [aiServiceStatus, setAiServiceStatus] = useState(null);

  // Check API health on component mount
  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      await logoApi.healthCheck();
      setApiStatus('connected');
      
      // Also check AI service status
      try {
        const aiStatus = await aiApi.getServiceStatus();
        setAiServiceStatus(aiStatus.result);
      } catch (aiError) {
        console.warn('AI service status check failed:', aiError);
      }
    } catch (error) {
      console.error('API health check failed:', error);
      setApiStatus('disconnected');
    }
  };

  const services = [
    {
      id: 'enhance',
      title: 'Logo Enhancement',
      description: 'Upload your existing logo and enhance it with AI-powered quality improvements, style adjustments, and resolution boosts.',
      icon: Wand2,
      features: [
        'Quality enhancement',
        'Style transformation',
        'Resolution upscaling',
        'Format optimization'
      ],
      component: LogoEnhancer
    },
    {
      id: 'generate',
      title: 'AI Logo Generator',
      description: 'Describe your vision and let our AI create unique, professional logos tailored to your business needs.',
      icon: Sparkles,
      features: [
        'Text-to-logo generation',
        'Business analysis',
        'Style customization',
        'Multiple variations'
      ],
      component: LogoGenerator
    },
    {
      id: 'reference',
      title: 'Reference-Based Creation',
      description: 'Upload a reference image and create similar logos with your own branding and customizations.',
      icon: Image,
      features: [
        'Reference analysis',
        'Style adaptation',
        'Brand customization',
        'Similar design creation'
      ],
      component: () => <div className="text-white">Coming Soon!</div>
    }
  ];

  const renderCurrentView = () => {
    if (currentView === 'home') {
      return <HomeView />;
    }

    const service = services.find(s => s.id === currentView);
    if (service) {
      const ServiceComponent = service.component;
      return <ServiceComponent onBack={() => setCurrentView('home')} />;
    }

    return <HomeView />;
  };

  const HomeView = () => (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 mb-6">
            <Palette className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-float">
            Logo Animation Tool
          </h1>
          
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Create stunning, professional logos with AI-powered tools. 
            Enhance existing designs, generate from text descriptions, 
            or create based on reference images.
          </p>

          {/* API Status */}
          <div className="space-y-2 mb-8">
            <div className="inline-flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                apiStatus === 'connected' ? 'bg-green-400' : 
                apiStatus === 'disconnected' ? 'bg-red-400' : 'bg-yellow-400'
              }`} />
              <span className="text-white/60 text-sm">
                API Status: {apiStatus === 'connected' ? 'Connected' : 
                            apiStatus === 'disconnected' ? 'Disconnected' : 'Checking...'}
              </span>
              {apiStatus === 'disconnected' && (
                <Button
                  onClick={checkApiHealth}
                  variant="ghost"
                  size="sm"
                  className="ml-2"
                >
                  Retry
                </Button>
              )}
            </div>
            
            {/* AI Service Status */}
            {aiServiceStatus && (
              <div className="inline-flex items-center space-x-4 text-xs text-white/50">
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${
                    aiServiceStatus.gemini.available ? 'bg-blue-400' : 'bg-gray-400'
                  }`} />
                  <span>Gemini AI: {aiServiceStatus.gemini.available ? 'Ready' : 'Unavailable'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${
                    aiServiceStatus.services.image_generation ? 'bg-purple-400' : 'bg-gray-400'
                  }`} />
                  <span>Image Gen: {aiServiceStatus.services.image_generation ? 'Active' : 'Fallback'}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              features={service.features}
              onClick={() => setCurrentView(service.id)}
              className="h-full"
            />
          ))}
        </div>

        {/* Features Section */}
        <GlassCard className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Why Choose Our Logo Tool?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">AI-Powered</h3>
              <p className="text-white/70">
                Advanced AI algorithms analyze your requirements and create perfect logos
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-500/20 to-blue-600/20 flex items-center justify-center">
                <Wand2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Professional Quality</h3>
              <p className="text-white/70">
                High-resolution outputs suitable for all your branding needs
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-pink-600/20 flex items-center justify-center">
                <Image className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Multiple Formats</h3>
              <p className="text-white/70">
                Download in various formats optimized for web, print, and mobile
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Header />
      {renderCurrentView()}
    </div>
  );
}

export default App;