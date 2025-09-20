import { useState } from 'react';
import { ArrowLeft, Sparkles, Download, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { logoApi, aiApi } from '@/services/logoApi';
import { useNavigate } from 'react-router-dom';

const LogoGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [description, setDescription] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [style, setStyle] = useState('modern');
  const [colors, setColors] = useState(['#2563eb', '#ffffff']);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [businessAnalysis, setBusinessAnalysis] = useState<any>(null);

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
      toast({
        title: "Business Analysis Complete",
        description: "AI suggestions have been generated for your logo.",
      });
    } catch (err) {
      console.error('Business analysis failed:', err);
      toast({
        title: "Analysis Failed",
        description: "Could not analyze business information.",
        variant: "destructive",
      });
    }
  };

  const handleGenerate = async () => {
    if (!description) {
      toast({
        title: "Description Required",
        description: "Please provide a description for your logo.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await logoApi.generateLogo(description, {
        business_type: businessType,
        style: style,
        colors: colors,
      });

      setResult(response.result);
      toast({
        title: "Logo Generated Successfully",
        description: "Your AI-powered logo has been created!",
      });
    } catch (err: any) {
      toast({
        title: "Generation Failed",
        description: err.response?.data?.message || 'Failed to generate logo',
        variant: "destructive",
      });
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
      
      toast({
        title: "Download Started",
        description: "Your logo is being downloaded.",
      });
    } catch (err) {
      toast({
        title: "Download Failed",
        description: "Could not download the logo.",
        variant: "destructive",
      });
    }
  };

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
            Back
          </Button>
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-white mb-2">AI Logo Generator</h1>
            <p className="text-slate-300">Describe your vision and let AI create the perfect logo</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Logo Description</CardTitle>
                <CardDescription className="text-slate-300">
                  Be specific about your business, style preferences, and target audience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your logo idea... e.g., 'A modern logo for TechStart, a software company that helps startups build better products'"
                  className="min-h-32 bg-white/5 border-white/20 text-white placeholder:text-slate-400"
                />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-slate-400">
                    Be specific about your business, style preferences, and target audience
                  </p>
                  <Button
                    onClick={handleAnalyzeBusiness}
                    variant="outline"
                    size="sm"
                    disabled={!description || !businessType}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Get AI Suggestions
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Business Type */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Business Type</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={businessType} onValueChange={setBusinessType}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Style Selection */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Style</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {styles.map((styleOption) => (
                    <Card
                      key={styleOption.value}
                      className={`cursor-pointer transition-all duration-300 ${
                        style === styleOption.value
                          ? 'bg-blue-500/20 border-blue-400'
                          : 'bg-white/5 border-white/20 hover:border-white/40'
                      }`}
                      onClick={() => setStyle(styleOption.value)}
                    >
                      <CardContent className="p-4">
                        <h4 className="font-medium text-white">{styleOption.label}</h4>
                        <p className="text-sm text-slate-400 mt-1">{styleOption.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Color Palette */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Color Palette</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {colorPalettes.map((palette) => (
                    <Card
                      key={palette.name}
                      className={`cursor-pointer transition-all duration-300 ${
                        JSON.stringify(colors) === JSON.stringify(palette.colors)
                          ? 'bg-blue-500/20 border-blue-400'
                          : 'bg-white/5 border-white/20 hover:border-white/40'
                      }`}
                      onClick={() => setColors(palette.colors)}
                    >
                      <CardContent className="p-3">
                        <div className="flex space-x-2 mb-2">
                          {palette.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-6 h-6 rounded-full border border-white/20"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-white">{palette.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={!description || loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              size="lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Logo
                </>
              )}
            </Button>
          </div>

          {/* Result Section */}
          <div className="space-y-6">
            {/* AI Suggestions */}
            {businessAnalysis && (
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">AI Suggestions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {businessAnalysis.style_suggestions && (
                    <div>
                      <p className="text-white font-medium">Recommended Styles:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {businessAnalysis.style_suggestions.map((suggestion: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {businessAnalysis.color_schemes && businessAnalysis.color_schemes.length > 0 && (
                    <div>
                      <p className="text-white font-medium">Color Suggestions:</p>
                      <div className="flex space-x-2 mt-2">
                        {businessAnalysis.color_schemes[0].map((color: string, index: number) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-white/20"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Generated Logo */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 h-96">
              <CardHeader>
                <CardTitle className="text-white">Generated Logo</CardTitle>
              </CardHeader>
              <CardContent>
                {loading && (
                  <div className="flex flex-col items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4" />
                    <p className="text-slate-300">Creating your logo...</p>
                    <p className="text-slate-400 text-sm mt-2">This may take a few moments</p>
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
                        variant="outline"
                        className="w-full border-white/20 text-white hover:bg-white/10"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Logo
                      </Button>
                      
                      <div className="text-xs text-slate-400">
                        <p>Style: {style} • Colors: {colors.join(', ')}</p>
                        {result.prompt && (
                          <p className="mt-1">Enhanced prompt used for generation</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {!loading && !result && (
                  <div className="flex items-center justify-center h-64 text-slate-400">
                    <p>Your generated logo will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoGenerator;
