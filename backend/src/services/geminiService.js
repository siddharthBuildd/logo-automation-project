const { GoogleGenAI } = require('@google/genai');
const fs = require('fs').promises;
const path = require('path');

class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.client = null;
    this.model = 'gemini-2.5-flash-image-preview';
    
    if (this.apiKey) {
      this.client = new GoogleGenAI(this.apiKey);
      console.log('✅ Gemini API initialized successfully');
    } else {
      console.warn('⚠️ Gemini API key not found. Image generation will use fallback methods.');
    }
  }

  // Generate image from text prompt (Text-to-Image)
  async generateImageFromText(prompt, options = {}) {
    if (!this.client) {
      throw new Error('Gemini API not initialized. Please check your API key.');
    }

    try {
      console.log(`🎨 Generating image with Gemini: ${prompt.substring(0, 50)}...`);

      // Enhance prompt with style and context
      const enhancedPrompt = this.enhancePromptForLogo(prompt, options);

      const response = await this.client.models.generateContent({
        model: this.model,
        contents: enhancedPrompt,
      });

      // Process the response
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          // Save the generated image
          const filename = `gemini-logo-${Date.now()}-${Math.round(Math.random() * 1E9)}.png`;
          const outputPath = path.join(__dirname, '../../uploads', filename);
          
          const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
          await fs.writeFile(outputPath, imageBuffer);

          console.log(`✅ Image generated successfully: ${filename}`);

          return {
            filename,
            path: outputPath,
            metadata: {
              model: this.model,
              prompt: enhancedPrompt,
              api_used: 'gemini',
              style: options.style || 'modern',
              colors: options.colors || [],
              business_type: options.business_type
            }
          };
        }
      }

      throw new Error('No image data received from Gemini API');

    } catch (error) {
      console.error('❌ Gemini image generation error:', error);
      throw new Error(`Failed to generate image with Gemini: ${error.message}`);
    }
  }

  // Generate image with image input (Image + Text-to-Image)
  async generateImageFromImageAndText(imagePath, prompt, options = {}) {
    if (!this.client) {
      throw new Error('Gemini API not initialized. Please check your API key.');
    }

    try {
      console.log(`🖼️ Generating image from reference with Gemini: ${prompt.substring(0, 50)}...`);

      // Read the input image
      const imageBuffer = await fs.readFile(imagePath);
      const base64Image = imageBuffer.toString('base64');

      // Enhance prompt for logo editing
      const enhancedPrompt = this.enhancePromptForLogoEditing(prompt, options);

      const contents = [
        { text: enhancedPrompt },
        {
          inlineData: {
            mimeType: 'image/png',
            data: base64Image,
          },
        },
      ];

      const response = await this.client.models.generateContent({
        model: this.model,
        contents: contents,
      });

      // Process the response
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          // Save the generated image
          const filename = `gemini-edited-logo-${Date.now()}-${Math.round(Math.random() * 1E9)}.png`;
          const outputPath = path.join(__dirname, '../../uploads', filename);
          
          const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
          await fs.writeFile(outputPath, imageBuffer);

          console.log(`✅ Image edited successfully: ${filename}`);

          return {
            filename,
            path: outputPath,
            metadata: {
              model: this.model,
              prompt: enhancedPrompt,
              api_used: 'gemini',
              style: options.style || 'similar',
              business_name: options.business_name,
              modifications: options.modifications || []
            }
          };
        }
      }

      throw new Error('No image data received from Gemini API');

    } catch (error) {
      console.error('❌ Gemini image editing error:', error);
      throw new Error(`Failed to edit image with Gemini: ${error.message}`);
    }
  }

  // Enhance image quality using Gemini
  async enhanceImage(imagePath, options = {}) {
    if (!this.client) {
      throw new Error('Gemini API not initialized. Please check your API key.');
    }

    try {
      console.log(`✨ Enhancing image with Gemini...`);

      // Read the input image
      const imageBuffer = await fs.readFile(imagePath);
      const base64Image = imageBuffer.toString('base64');

      // Create enhancement prompt
      const enhancementPrompt = this.createEnhancementPrompt(options);

      const contents = [
        { text: enhancementPrompt },
        {
          inlineData: {
            mimeType: 'image/png',
            data: base64Image,
          },
        },
      ];

      const response = await this.client.models.generateContent({
        model: this.model,
        contents: contents,
      });

      // Process the response
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          // Save the enhanced image
          const filename = `gemini-enhanced-${Date.now()}-${Math.round(Math.random() * 1E9)}.png`;
          const outputPath = path.join(__dirname, '../../uploads', filename);
          
          const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
          await fs.writeFile(outputPath, imageBuffer);

          console.log(`✅ Image enhanced successfully: ${filename}`);

          return {
            filename,
            path: outputPath,
            metadata: {
              model: this.model,
              enhancement_type: options.type || 'quality',
              style: options.style || 'modern',
              api_used: 'gemini'
            }
          };
        }
      }

      throw new Error('No image data received from Gemini API');

    } catch (error) {
      console.error('❌ Gemini image enhancement error:', error);
      throw new Error(`Failed to enhance image with Gemini: ${error.message}`);
    }
  }

  // Helper method to enhance prompts for logo generation
  enhancePromptForLogo(originalPrompt, options = {}) {
    const { style = 'modern', colors = [], business_type = '' } = options;
    
    let enhancedPrompt = `Create a professional logo: ${originalPrompt}. `;
    
    // Add style specifications
    enhancedPrompt += `Style: ${style}, clean and scalable design. `;
    
    // Add color specifications
    if (colors.length > 0) {
      enhancedPrompt += `Use colors: ${colors.join(', ')}. `;
    }
    
    // Add business context
    if (business_type) {
      enhancedPrompt += `This is for a ${business_type} business. `;
    }
    
    // Add technical requirements for logos
    enhancedPrompt += `Requirements: vector-style design, high contrast, readable at small sizes, `;
    enhancedPrompt += `professional appearance, suitable for branding, clean background, `;
    enhancedPrompt += `sharp edges, balanced composition, memorable and distinctive. `;
    enhancedPrompt += `Output should be suitable for use as a company logo on websites, business cards, and marketing materials.`;
    
    return enhancedPrompt;
  }

  // Helper method to enhance prompts for logo editing
  enhancePromptForLogoEditing(originalPrompt, options = {}) {
    const { business_name = '', style = 'similar', modifications = [] } = options;
    
    let enhancedPrompt = `Edit this logo image: ${originalPrompt}. `;
    
    if (business_name) {
      enhancedPrompt += `The business name is "${business_name}". `;
    }
    
    if (style === 'similar') {
      enhancedPrompt += `Keep the overall style and composition similar to the original. `;
    } else {
      enhancedPrompt += `Apply a ${style} style to the design. `;
    }
    
    if (modifications.length > 0) {
      enhancedPrompt += `Make these modifications: ${modifications.join(', ')}. `;
    }
    
    enhancedPrompt += `Maintain professional logo quality, ensure text is readable, `;
    enhancedPrompt += `keep the design scalable and suitable for branding purposes.`;
    
    return enhancedPrompt;
  }

  // Helper method to create enhancement prompts
  createEnhancementPrompt(options = {}) {
    const { type = 'quality', style = 'modern' } = options;
    
    let prompt = 'Enhance this logo image: ';
    
    switch (type) {
      case 'quality':
        prompt += 'Improve the image quality, increase sharpness and clarity, ';
        prompt += 'enhance colors and contrast, remove any artifacts or noise. ';
        break;
      case 'style':
        prompt += `Apply a ${style} style transformation, update the visual appearance `;
        prompt += 'while maintaining the core design elements. ';
        break;
      case 'resolution':
        prompt += 'Increase the resolution and detail of the image, ';
        prompt += 'make it crisp and suitable for high-resolution displays. ';
        break;
    }
    
    prompt += 'Maintain the logo\'s professional appearance, ensure all text remains readable, ';
    prompt += 'preserve the original composition and branding elements, ';
    prompt += 'output should be suitable for professional use.';
    
    return prompt;
  }

  // Check if Gemini API is available
  isAvailable() {
    return this.client !== null;
  }

  // Get API status
  getStatus() {
    return {
      available: this.isAvailable(),
      model: this.model,
      api_key_configured: !!this.apiKey
    };
  }
}

module.exports = new GeminiService();
