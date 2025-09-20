const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const axios = require('axios');
const geminiService = require('./geminiService');

class LogoService {
  constructor() {
    this.uploadsDir = path.join(__dirname, '../../uploads');
    this.nanoBananaApiKey = process.env.NANO_BANANA_API_KEY;
    this.nanoBananaBaseUrl = 'https://api.nanobanana.com/v1';
  }

  // Enhance existing logo image
  async enhanceImage(imagePath, options = {}) {
    try {
      const { type = 'quality', style = 'modern', custom_prompt = '' } = options;
      
      // Try Gemini API first for AI-powered enhancement
      if (geminiService.isAvailable()) {
        try {
          console.log('🤖 Using Gemini AI for image enhancement');
          return await geminiService.enhanceImage(imagePath, options);
        } catch (geminiError) {
          console.warn('⚠️ Gemini enhancement failed, falling back to Sharp processing:', geminiError.message);
        }
      }

      // Fallback to Sharp processing
      console.log('🔧 Using Sharp for image enhancement');
      const imageBuffer = await fs.readFile(imagePath);
      const image = sharp(imageBuffer);
      const metadata = await image.metadata();
      
      let processedImage;
      
      switch (type) {
        case 'quality':
          processedImage = await this.enhanceQuality(image, metadata);
          break;
        case 'style':
          processedImage = await this.enhanceStyle(image, style);
          break;
        case 'resolution':
          processedImage = await this.enhanceResolution(image, metadata);
          break;
        default:
          processedImage = await this.enhanceQuality(image, metadata);
      }

      // Generate unique filename
      const filename = `enhanced-${Date.now()}-${Math.round(Math.random() * 1E9)}.png`;
      const outputPath = path.join(this.uploadsDir, filename);

      // Save processed image
      await processedImage.png({ quality: 100 }).toFile(outputPath);

      return {
        filename,
        path: outputPath,
        metadata: {
          original: metadata,
          enhanced: await sharp(outputPath).metadata(),
          enhancement_type: type,
          style: style,
          api_used: 'sharp'
        }
      };

    } catch (error) {
      console.error('Error enhancing image:', error);
      throw new Error(`Failed to enhance image: ${error.message}`);
    }
  }

  // Generate logo from text description
  async generateFromText(description, options = {}) {
    try {
      const { style = 'modern', colors = [], business_type } = options;

      // Try Gemini API first for AI-powered generation
      if (geminiService.isAvailable()) {
        try {
          console.log('🤖 Using Gemini AI for logo generation');
          return await geminiService.generateImageFromText(description, options);
        } catch (geminiError) {
          console.warn('⚠️ Gemini generation failed, falling back to simple logo:', geminiError.message);
        }
      }

      // Fallback: Create a simple text-based logo
      console.log('🎨 Using fallback logo generation');
      return await this.createFallbackLogo(description, options);

    } catch (error) {
      console.error('Error generating logo from text:', error);
      // Always fallback to simple logo creation
      return await this.createFallbackLogo(description, options);
    }
  }

  // Create logo based on reference image
  async createFromReference(referencePath, options = {}) {
    try {
      const { business_name, style = 'similar', modifications = [] } = options;

      // Try Gemini API first for AI-powered reference-based generation
      if (geminiService.isAvailable()) {
        try {
          console.log('🤖 Using Gemini AI for reference-based logo creation');
          const prompt = `Create a logo similar to this reference image for ${business_name || 'the business'}`;
          return await geminiService.generateImageFromImageAndText(referencePath, prompt, options);
        } catch (geminiError) {
          console.warn('⚠️ Gemini reference generation failed, falling back to image processing:', geminiError.message);
        }
      }

      // Fallback: Basic image processing
      console.log('🔧 Using image processing for reference-based logo');
      const referenceBuffer = await fs.readFile(referencePath);
      const referenceImage = sharp(referenceBuffer);
      const metadata = await referenceImage.metadata();

      // Create a modified version of the reference
      const processedImage = await this.createSimilarLogo(referenceImage, {
        business_name,
        style,
        modifications,
        metadata
      });

      const filename = `reference-based-${Date.now()}-${Math.round(Math.random() * 1E9)}.png`;
      const outputPath = path.join(this.uploadsDir, filename);

      await processedImage.png({ quality: 100 }).toFile(outputPath);

      return {
        filename,
        path: outputPath,
        metadata: {
          reference: metadata,
          business_name,
          style,
          modifications,
          api_used: 'sharp'
        }
      };

    } catch (error) {
      console.error('Error creating logo from reference:', error);
      throw new Error(`Failed to create logo from reference: ${error.message}`);
    }
  }

  // Enhance image quality
  async enhanceQuality(image, metadata) {
    const targetWidth = Math.max(metadata.width * 2, 1024);
    const targetHeight = Math.max(metadata.height * 2, 1024);

    return image
      .resize(targetWidth, targetHeight, {
        kernel: sharp.kernel.lanczos3,
        fit: 'inside',
        withoutEnlargement: false
      })
      .sharpen()
      .normalize();
  }

  // Enhance image style
  async enhanceStyle(image, style) {
    switch (style) {
      case 'modern':
        return image
          .modulate({ brightness: 1.1, saturation: 1.2 })
          .sharpen({ sigma: 1, flat: 1, jagged: 2 });
      
      case 'vintage':
        return image
          .modulate({ brightness: 0.9, saturation: 0.8 })
          .tint({ r: 255, g: 240, b: 200 });
      
      case 'bold':
        return image
          .modulate({ brightness: 1.2, saturation: 1.5 })
          .sharpen({ sigma: 2 });
      
      default:
        return image.normalize();
    }
  }

  // Enhance image resolution
  async enhanceResolution(image, metadata) {
    const scaleFactor = metadata.width < 512 ? 4 : 2;
    
    return image
      .resize(metadata.width * scaleFactor, metadata.height * scaleFactor, {
        kernel: sharp.kernel.lanczos3
      })
      .sharpen();
  }

  // Generate logo using Nano Banana API
  async generateWithNanoBanana(description, options) {
    try {
      const response = await axios.post(
        `${this.nanoBananaBaseUrl}/generate`,
        {
          prompt: description,
          style: options.style,
          colors: options.colors,
          format: 'png',
          size: '1024x1024'
        },
        {
          headers: {
            'Authorization': `Bearer ${this.nanoBananaApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Download generated image
      const imageResponse = await axios.get(response.data.image_url, {
        responseType: 'arraybuffer'
      });

      const filename = `generated-${Date.now()}-${Math.round(Math.random() * 1E9)}.png`;
      const outputPath = path.join(this.uploadsDir, filename);

      await fs.writeFile(outputPath, imageResponse.data);

      return {
        filename,
        path: outputPath,
        metadata: {
          prompt: description,
          style: options.style,
          colors: options.colors,
          api_used: 'nano_banana'
        }
      };

    } catch (error) {
      console.error('Nano Banana API error:', error);
      throw error;
    }
  }

  // Create fallback logo when AI services are unavailable
  async createFallbackLogo(description, options) {
    try {
      const { style = 'modern', colors = ['#2563eb', '#ffffff'], business_type } = options;
      
      // Extract business name from description
      const businessName = this.extractBusinessName(description);
      
      // Create a simple SVG logo
      const svgLogo = this.generateSVGLogo(businessName, {
        colors,
        style,
        business_type
      });

      // Convert SVG to PNG using Sharp
      const pngBuffer = await sharp(Buffer.from(svgLogo))
        .png()
        .toBuffer();

      const filename = `fallback-${Date.now()}-${Math.round(Math.random() * 1E9)}.png`;
      const outputPath = path.join(this.uploadsDir, filename);

      await fs.writeFile(outputPath, pngBuffer);

      return {
        filename,
        path: outputPath,
        metadata: {
          type: 'fallback',
          business_name: businessName,
          style,
          colors,
          description
        }
      };

    } catch (error) {
      console.error('Error creating fallback logo:', error);
      throw error;
    }
  }

  // Create similar logo based on reference
  async createSimilarLogo(referenceImage, options) {
    const { business_name, style, metadata } = options;

    // Apply basic transformations to create a "similar" logo
    return referenceImage
      .resize(1024, 1024, { fit: 'inside', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .modulate({ brightness: 1.1, saturation: 1.1 })
      .sharpen();
  }

  // Generate simple SVG logo
  generateSVGLogo(businessName, options) {
    const { colors, style } = options;
    const primaryColor = colors[0] || '#2563eb';
    const secondaryColor = colors[1] || '#ffffff';

    const initials = businessName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);

    return `
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${this.adjustColor(primaryColor, -20)};stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Background circle -->
        <circle cx="200" cy="200" r="180" fill="url(#grad1)" />
        
        <!-- Initials -->
        <text x="200" y="230" font-family="Arial, sans-serif" font-size="120" font-weight="bold" 
              text-anchor="middle" fill="${secondaryColor}">${initials}</text>
        
        <!-- Business name -->
        <text x="200" y="350" font-family="Arial, sans-serif" font-size="24" font-weight="normal" 
              text-anchor="middle" fill="${primaryColor}">${businessName}</text>
      </svg>
    `;
  }

  // Extract business name from description
  extractBusinessName(description) {
    // Simple extraction - look for patterns like "for [Company Name]" or "[Company Name] logo"
    const patterns = [
      /for\s+([A-Z][a-zA-Z\s]+)/i,
      /([A-Z][a-zA-Z\s]+)\s+logo/i,
      /logo\s+for\s+([A-Z][a-zA-Z\s]+)/i
    ];

    for (const pattern of patterns) {
      const match = description.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }

    // Fallback: use first few words
    return description.split(' ').slice(0, 2).join(' ') || 'Logo';
  }

  // Adjust color brightness
  adjustColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }
}

module.exports = new LogoService();
