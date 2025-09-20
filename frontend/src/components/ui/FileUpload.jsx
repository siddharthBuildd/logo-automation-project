import React, { useCallback, useState } from 'react';
import { Upload, X, Image } from 'lucide-react';
import GlassCard from './GlassCard';

const FileUpload = ({ 
  onFileSelect, 
  accept = 'image/*', 
  maxSize = 10 * 1024 * 1024, // 10MB
  className = '',
  preview = true 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file) => {
    if (!file.type.startsWith('image/')) {
      return 'Please select an image file';
    }
    if (file.size > maxSize) {
      return `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`;
    }
    return null;
  };

  const handleFile = (file) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setSelectedFile(file);
    
    if (preview) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
    
    onFileSelect(file);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <div className={className}>
      <GlassCard 
        className={`
          relative border-2 border-dashed transition-all duration-300
          ${dragActive ? 'border-blue-400 bg-blue-500/10' : 'border-white/30'}
          ${error ? 'border-red-400 bg-red-500/10' : ''}
        `}
        hover={false}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-full max-h-64 mx-auto rounded-lg"
            />
            <button
              onClick={clearFile}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={16} />
            </button>
            <div className="mt-4 text-center text-white/80">
              <p className="text-sm">{selectedFile?.name}</p>
              <p className="text-xs text-white/60">
                {Math.round(selectedFile?.size / 1024)} KB
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-white/10">
              {dragActive ? (
                <Upload className="w-8 h-8 text-blue-400" />
              ) : (
                <Image className="w-8 h-8 text-white/60" />
              )}
            </div>
            
            <h3 className="text-lg font-medium text-white mb-2">
              {dragActive ? 'Drop your image here' : 'Upload an image'}
            </h3>
            
            <p className="text-white/60 text-sm mb-4">
              Drag and drop or click to select
            </p>
            
            <p className="text-white/40 text-xs">
              Supports: JPG, PNG, GIF, WebP (max {Math.round(maxSize / 1024 / 1024)}MB)
            </p>
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default FileUpload;
