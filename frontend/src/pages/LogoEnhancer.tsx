import { useState, useCallback } from 'react';
import { ArrowLeft, Wand2, Download, Upload, X, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { logoApi } from '@/services/logoApi';
import { useNavigate } from 'react-router-dom';

const LogoEnhancer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [enhancementType, setEnhancementType] = useState('quality');
  const [style, setStyle] = useState('modern');
  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);

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

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      return 'Please select an image file';
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB
      return 'File size must be less than 10MB';
    }
    return null;
  };

  const handleFile = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      toast({
        title: "Invalid File",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleEnhance = async () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select an image file to enhance.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await logoApi.enhanceLogo(selectedFile, {
        enhancement_type: enhancementType,
        style: style,
        custom_prompt: customPrompt,
      });

      setResult(response.result);
      toast({
        title: "Logo Enhanced Successfully",
        description: "Your logo has been enhanced with AI!",
      });
    } catch (err: any) {
      toast({
        title: "Enhancement Failed",
        description: err.response?.data?.message || 'Failed to enhance logo',
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
        description: "Your enhanced logo is being downloaded.",
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
            <h1 className="text-3xl font-bold text-white mb-2">Logo Enhancement</h1>
            <p className="text-slate-300">Upload your logo and enhance it with AI-powered tools</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* File Upload */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Upload Logo</CardTitle>
                <CardDescription className="text-slate-300">
                  Drag and drop or click to select your logo file
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-300 ${
                    dragActive 
                      ? 'border-blue-400 bg-blue-500/10' 
                      : 'border-white/30 hover:border-white/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-w-full max-h-64 mx-auto rounded-lg"
                      />
                      <Button
                        onClick={clearFile}
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <div className="mt-4 text-center">
                        <p className="text-white text-sm">{selectedFile?.name}</p>
                        <p className="text-slate-400 text-xs">
                          {selectedFile && Math.round(selectedFile.size / 1024)} KB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-white/10">
                        {dragActive ? (
                          <Upload className="w-8 h-8 text-blue-400" />
                        ) : (
                          <Image className="w-8 h-8 text-slate-400" />
                        )}
                      </div>
                      
                      <h3 className="text-lg font-medium text-white mb-2">
                        {dragActive ? 'Drop your image here' : 'Upload an image'}
                      </h3>
                      
                      <p className="text-slate-400 text-sm mb-4">
                        Drag and drop or click to select
                      </p>
                      
                      <p className="text-slate-500 text-xs">
                        Supports: JPG, PNG, GIF, WebP (max 10MB)
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Enhancement Options */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Enhancement Type</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={enhancementType} onValueChange={setEnhancementType}>
                  <div className="space-y-3">
                    {enhancementTypes.map((type) => (
                      <div key={type.value} className="flex items-start space-x-3">
                        <RadioGroupItem value={type.value} id={type.value} className="mt-1" />
                        <Label htmlFor={type.value} className="cursor-pointer">
                          <div className="text-white font-medium">{type.label}</div>
                          <div className="text-slate-400 text-sm">{type.description}</div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Style Options */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Style</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {styles.map((styleOption) => (
                      <SelectItem key={styleOption.value} value={styleOption.value}>
                        {styleOption.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Custom Prompt */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Custom Enhancement Instructions</CardTitle>
                <CardDescription className="text-slate-300">
                  Describe specific changes you want to make to your logo (optional)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g., 'Make the colors more vibrant', 'Add a subtle shadow effect', 'Change the font to be more modern'"
                  className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 min-h-[100px] resize-none"
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-slate-400 text-xs">
                    Be specific about the changes you want to see
                  </p>
                  <span className="text-slate-400 text-xs">
                    {customPrompt.length}/500
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Enhance Button */}
            <Button
              onClick={handleEnhance}
              disabled={!selectedFile || loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              size="lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Enhancing...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 mr-2" />
                  Enhance Logo
                </>
              )}
            </Button>
          </div>

          {/* Result Section */}
          <div>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 h-full">
              <CardHeader>
                <CardTitle className="text-white">Enhanced Result</CardTitle>
              </CardHeader>
              <CardContent>
                {loading && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4" />
                    <p className="text-slate-300">Enhancing your logo...</p>
                  </div>
                )}

                {result && (
                  <div className="space-y-4">
                    <div className="relative bg-white/5 rounded-lg p-4">
                      <img
                        src={logoApi.getDownloadUrl(result.filename)}
                        alt="Enhanced Logo"
                        className="w-full rounded-lg"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-400">
                        <p>Enhanced with {enhancementType} • {style} style</p>
                      </div>
                      <Button
                        onClick={handleDownload}
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                )}

                {!loading && !result && (
                  <div className="flex items-center justify-center py-12 text-slate-400">
                    <p>Enhanced logo will appear here</p>
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

export default LogoEnhancer;
