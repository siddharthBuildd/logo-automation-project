import { useState, useCallback } from 'react';
import { ArrowLeft, Image, Download, Upload, X, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { logoApi } from '@/services/logoApi';
import { useNavigate } from 'react-router-dom';

const LogoReference = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState('');
  const [style, setStyle] = useState('modern');
  const [modifications, setModifications] = useState<string[]>([]);
  const [customModification, setCustomModification] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);

  const styles = [
    { value: 'modern', label: 'Modern' },
    { value: 'vintage', label: 'Vintage' },
    { value: 'bold', label: 'Bold' },
    { value: 'minimal', label: 'Minimal' },
    { value: 'playful', label: 'Playful' },
  ];

  const commonModifications = [
    'Change colors',
    'Simplify design',
    'Add text',
    'Remove text',
    'Change font',
    'Add icon',
    'Remove background',
    'Make it more professional',
    'Make it more playful',
    'Add gradient',
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

  const toggleModification = (modification: string) => {
    setModifications(prev => 
      prev.includes(modification) 
        ? prev.filter(m => m !== modification)
        : [...prev, modification]
    );
  };

  const addCustomModification = () => {
    if (customModification.trim() && !modifications.includes(customModification.trim())) {
      setModifications(prev => [...prev, customModification.trim()]);
      setCustomModification('');
    }
  };

  const removeModification = (modification: string) => {
    setModifications(prev => prev.filter(m => m !== modification));
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      toast({
        title: "No Reference Image",
        description: "Please upload a reference image to create your logo.",
        variant: "destructive",
      });
      return;
    }

    if (!businessName.trim()) {
      toast({
        title: "Business Name Required",
        description: "Please enter your business name.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await logoApi.createFromReference(selectedFile, {
        business_name: businessName,
        style: style,
        modifications: modifications,
      });

      setResult(response.result);
      toast({
        title: "Logo Created Successfully",
        description: "Your reference-based logo has been generated!",
      });
    } catch (err: any) {
      toast({
        title: "Creation Failed",
        description: err.response?.data?.message || 'Failed to create logo from reference',
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
            <h1 className="text-3xl font-bold text-white mb-2">Reference-Based Creation</h1>
            <p className="text-slate-300">Upload inspiration and create original logos based on your reference</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Reference Upload */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Reference Image</CardTitle>
                <CardDescription className="text-slate-300">
                  Upload an image that inspires your logo design
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
                        alt="Reference Preview"
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
                        {dragActive ? 'Drop your image here' : 'Upload reference image'}
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

            {/* Business Name */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Business Name</CardTitle>
                <CardDescription className="text-slate-300">
                  Enter your business name for the logo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Enter your business name..."
                  className="bg-white/5 border-white/20 text-white placeholder:text-slate-400"
                />
              </CardContent>
            </Card>

            {/* Style Selection */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Style Preference</CardTitle>
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

            {/* Modifications */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Desired Modifications</CardTitle>
                <CardDescription className="text-slate-300">
                  Select modifications you'd like to apply to the reference
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {commonModifications.map((modification) => (
                    <Button
                      key={modification}
                      variant={modifications.includes(modification) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleModification(modification)}
                      className={`text-xs ${
                        modifications.includes(modification)
                          ? 'bg-blue-500 text-white'
                          : 'border-white/20 text-white hover:bg-white/10'
                      }`}
                    >
                      {modification}
                    </Button>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <Input
                    value={customModification}
                    onChange={(e) => setCustomModification(e.target.value)}
                    placeholder="Add custom modification..."
                    className="bg-white/5 border-white/20 text-white placeholder:text-slate-400"
                    onKeyPress={(e) => e.key === 'Enter' && addCustomModification()}
                  />
                  <Button
                    onClick={addCustomModification}
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Add
                  </Button>
                </div>

                {modifications.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-white font-medium">Selected modifications:</p>
                    <div className="flex flex-wrap gap-2">
                      {modifications.map((modification) => (
                        <Badge
                          key={modification}
                          variant="secondary"
                          className="text-xs cursor-pointer hover:bg-red-500/20"
                          onClick={() => removeModification(modification)}
                        >
                          {modification} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={!selectedFile || !businessName.trim() || loading}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white"
              size="lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 mr-2" />
                  Create Logo
                </>
              )}
            </Button>
          </div>

          {/* Result Section */}
          <div>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 h-full">
              <CardHeader>
                <CardTitle className="text-white">Generated Logo</CardTitle>
              </CardHeader>
              <CardContent>
                {loading && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4" />
                    <p className="text-slate-300">Creating your logo...</p>
                    <p className="text-slate-400 text-sm mt-2">Analyzing reference and generating original design</p>
                  </div>
                )}

                {result && (
                  <div className="space-y-4">
                    <div className="relative bg-white/5 rounded-lg p-4">
                      <img
                        src={logoApi.getDownloadUrl(result.filename)}
                        alt="Generated Logo"
                        className="w-full rounded-lg"
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
                      
                      <div className="text-xs text-slate-400 space-y-1">
                        <p>Business: {businessName} • Style: {style}</p>
                        {modifications.length > 0 && (
                          <p>Modifications: {modifications.join(', ')}</p>
                        )}
                        {result.metadata?.api_used && (
                          <p>Generated using: {result.metadata.api_used}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {!loading && !result && (
                  <div className="flex items-center justify-center py-12 text-slate-400">
                    <div className="text-center">
                      <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Your reference-based logo will appear here</p>
                    </div>
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

export default LogoReference;
