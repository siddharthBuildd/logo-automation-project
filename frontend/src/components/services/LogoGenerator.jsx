import React, { useState } from 'react';
import { Sparkles, Download, ArrowLeft, Lightbulb } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import { logoApi, aiApi } from '../../api/logoApi';

const LogoGenerator = ({ onBack }) => {
  const [description, setDescription] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [style, setStyle] = useState('modern');
  const [colors, setColors] = useState(['#2563eb', '#ffffff']);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [businessAnalysis, setBusinessAnalysis] = useState(null);

  const businessTypes = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail',
    'Food & Beverage', 'Real Estate', 'Consulting', 'Creative', 'Other'
  ];

  const styles = [
    { value: 'modern', label: 'Modern', description: 'Clean, contemporary design' },
    { value: 'classic', label: 'Classic', description: 'Timeless, traditional look' },
    { value: 'playful', label: 'Playful', description: 'Fun, creative approach' },
    { value: 'minimal', label: 'Minimal', description: 'Simple, elegant design' },
    { value: 'bold', label: 'Bold', description: 'Strong, impactful presence' },
  ];

  const colorPalettes = [
    { name: 'Professional Blue', colors: ['#2563eb', '#ffffff'] },
    { name: 'Creative Purple', colors: ['#7c3aed', '#ffffff'] },
    { name: 'Nature Green', colors: ['#059669', '#ffffff'] },
    { name: 'Energy Orange', colors: ['#ea580c', '#ffffff'] },
    { name: 'Elegant Black', colors: ['#1f2937', '#ffffff'] },
    { name: 'Warm Red', colors: ['#dc2626', '#ffffff'] },
  ];

  const handleAnalyzeBusiness = async () => {
    if (!description || !businessType) return;

    try {
      const response = await aiApi.analyzeBusiness({
        business_name: description.split(' ')[0] || 'Business',
        business_type: businessType,
        description: description,
      });

      setBusinessAnalysis(response.result);
    } catch (err) {
      console.error('Business analysis failed:', err);
    }
  };

  const handleGenerate = async () => {
    if (!description) {
      setError('Please provide a description for your logo');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await logoApi.generateLogo(description, {
        business_type: businessType,
        style: style,
        colors: colors,
      });

      setResult(response.result);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate logo');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!result) return;

    try {
      const blob = await logoApi.downloadLogo(result.filename);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to download logo');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mr-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">AI Logo Generator</h2>
          <p className="text-white/60">Describe your vision and let AI create the perfect logo</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-4">Logo Description</h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your logo idea... e.g., 'A modern logo for TechStart, a software company that helps startups build better products'"
              className="w-full h-32 p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 resize-none"
            />
            <div className="flex items-center justify-between mt-4">
              <p className="text-white/60 text-sm">
                Be specific about your business, style preferences, and target audience
              </p>
              <Button
                onClick={handleAnalyzeBusiness}
                variant="ghost"
                size="sm"
                disabled={!description || !businessType}
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Get AI Suggestions
              </Button>
            </div>
          </GlassCard>

          {/* Business Type */}
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-4">Business Type</h3>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
            >
              <option value="" className="bg-gray-800">Select business type</option>
              {businessTypes.map((type) => (
                <option key={type} value={type} className="bg-gray-800">
                  {type}
                </option>
              ))}
            </select>
          </GlassCard>

          {/* Style Selection */}
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-4">Style</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {styles.map((styleOption) => (
                <button
                  key={styleOption.value}
                  onClick={() => setStyle(styleOption.value)}
                  className={`
                    p-4 rounded-lg border text-left transition-all duration-300
                    ${style === styleOption.value
                      ? 'border-blue-400 bg-blue-500/20'
                      : 'border-white/20 hover:border-white/40'
                    }
                  `}
                >
                  <div className="font-medium text-white">{styleOption.label}</div>
                  <div className="text-white/60 text-sm mt-1">{styleOption.description}</div>
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Color Palette */}
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-4">Color Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {colorPalettes.map((palette) => (
                <button
                  key={palette.name}
                  onClick={() => setColors(palette.colors)}
                  className={`
                    p-3 rounded-lg border transition-all duration-300
                    ${JSON.stringify(colors) === JSON.stringify(palette.colors)
                      ? 'border-blue-400 bg-blue-500/20'
                      : 'border-white/20 hover:border-white/40'
                    }
                  `}
                >
                  <div className="flex space-x-2 mb-2">
                    {palette.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border border-white/20"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="text-white/80 text-sm">{palette.name}</div>
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            loading={loading}
            disabled={!description}
            className="w-full"
            size="lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Logo
          </Button>
        </div>

        {/* Result Section */}
        <div className="space-y-6">
          {/* AI Suggestions */}
          {businessAnalysis && (
            <GlassCard>
              <h3 className="text-lg font-semibold text-white mb-4">AI Suggestions</h3>
              <div className="space-y-3 text-sm">
                {businessAnalysis.style_suggestions && (
                  <div>
                    <p className="text-white/80 font-medium">Recommended Styles:</p>
                    <p className="text-white/60">{businessAnalysis.style_suggestions.join(', ')}</p>
                  </div>
                )}
                {businessAnalysis.color_schemes && businessAnalysis.color_schemes.length > 0 && (
                  <div>
                    <p className="text-white/80 font-medium">Color Suggestions:</p>
                    <div className="flex space-x-2 mt-2">
                      {businessAnalysis.color_schemes[0].map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>
          )}

          {/* Generated Logo */}
          <GlassCard className="h-96">
            <h3 className="text-lg font-semibold text-white mb-4">Generated Logo</h3>
            
            {loading && (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="spinner mb-4" />
                <p className="text-white/60">Creating your logo...</p>
                <p className="text-white/40 text-sm mt-2">This may take a few moments</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-200">{error}</p>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="relative bg-white/5 rounded-lg p-4">
                  <img
                    src={logoApi.getDownloadUrl(result.filename)}
                    alt="Generated Logo"
                    className="w-full max-h-48 object-contain"
                  />
                </div>
                
                <div className="space-y-3">
                  <Button
                    onClick={handleDownload}
                    variant="secondary"
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Logo
                  </Button>
                  
                  <div className="text-xs text-white/60">
                    <p>Style: {style} • Colors: {colors.join(', ')}</p>
                    {result.prompt && (
                      <p className="mt-1">Enhanced prompt used for generation</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {!loading && !error && !result && (
              <div className="flex items-center justify-center h-64 text-white/40">
                <p>Your generated logo will appear here</p>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default LogoGenerator;
