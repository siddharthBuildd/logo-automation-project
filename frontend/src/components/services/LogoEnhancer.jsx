import React, { useState } from 'react';
import { Wand2, Download, ArrowLeft } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import FileUpload from '../ui/FileUpload';
import { logoApi } from '../../api/logoApi';

const LogoEnhancer = ({ onBack }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [enhancementType, setEnhancementType] = useState('quality');
  const [style, setStyle] = useState('modern');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const enhancementTypes = [
    { value: 'quality', label: 'Quality Enhancement', description: 'Improve resolution and clarity' },
    { value: 'style', label: 'Style Enhancement', description: 'Apply modern styling effects' },
    { value: 'resolution', label: 'Resolution Boost', description: 'Increase image resolution' },
  ];

  const styles = [
    { value: 'modern', label: 'Modern' },
    { value: 'vintage', label: 'Vintage' },
    { value: 'bold', label: 'Bold' },
    { value: 'minimal', label: 'Minimal' },
  ];

  const handleEnhance = async () => {
    if (!selectedFile) {
      setError('Please select an image file');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await logoApi.enhanceLogo(selectedFile, {
        enhancement_type: enhancementType,
        style: style,
      });

      setResult(response.result);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to enhance logo');
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
    <div className="max-w-4xl mx-auto p-6">
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
          <h2 className="text-2xl font-bold text-white mb-2">Logo Enhancement</h2>
          <p className="text-white/60">Upload your logo and enhance it with AI-powered tools</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* File Upload */}
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-4">Upload Logo</h3>
            <FileUpload
              onFileSelect={setSelectedFile}
              accept="image/*"
            />
          </GlassCard>

          {/* Enhancement Options */}
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-4">Enhancement Type</h3>
            <div className="space-y-3">
              {enhancementTypes.map((type) => (
                <label
                  key={type.value}
                  className="flex items-start space-x-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="enhancement"
                    value={type.value}
                    checked={enhancementType === type.value}
                    onChange={(e) => setEnhancementType(e.target.value)}
                    className="mt-1 text-blue-500 focus:ring-blue-500"
                  />
                  <div>
                    <div className="text-white font-medium group-hover:text-blue-300 transition-colors">
                      {type.label}
                    </div>
                    <div className="text-white/60 text-sm">{type.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </GlassCard>

          {/* Style Options */}
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-4">Style</h3>
            <div className="grid grid-cols-2 gap-3">
              {styles.map((styleOption) => (
                <button
                  key={styleOption.value}
                  onClick={() => setStyle(styleOption.value)}
                  className={`
                    p-3 rounded-lg border transition-all duration-300
                    ${style === styleOption.value
                      ? 'border-blue-400 bg-blue-500/20 text-white'
                      : 'border-white/20 text-white/70 hover:border-white/40 hover:text-white'
                    }
                  `}
                >
                  {styleOption.label}
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Enhance Button */}
          <Button
            onClick={handleEnhance}
            loading={loading}
            disabled={!selectedFile}
            className="w-full"
          >
            <Wand2 className="w-5 h-5 mr-2" />
            Enhance Logo
          </Button>
        </div>

        {/* Result Section */}
        <div>
          <GlassCard className="h-full">
            <h3 className="text-lg font-semibold text-white mb-4">Enhanced Result</h3>
            
            {loading && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="spinner mb-4" />
                <p className="text-white/60">Enhancing your logo...</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-200">{error}</p>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={logoApi.getDownloadUrl(result.filename)}
                    alt="Enhanced Logo"
                    className="w-full rounded-lg"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white/60">
                    <p>Enhanced with {enhancementType} • {style} style</p>
                  </div>
                  <Button
                    onClick={handleDownload}
                    variant="secondary"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            )}

            {!loading && !error && !result && (
              <div className="flex items-center justify-center py-12 text-white/40">
                <p>Enhanced logo will appear here</p>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default LogoEnhancer;
