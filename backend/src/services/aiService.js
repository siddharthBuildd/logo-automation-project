const axios = require('axios');
const fs = require('fs').promises;
const geminiService = require('./geminiService');

class AIService {
  constructor() {
    this.groqApiKey = process.env.GROQ_API_KEY;
    this.nanoBananaApiKey = process.env.NANO_BANANA_API_KEY;
    this.groqBaseUrl = 'https://api.groq.com/openai/v1';
    this.nanoBananaBaseUrl = 'https://api.nanobanana.com/v1';
  }

  // Analyze business information using Groq
  async analyzeBusiness(businessInfo) {
    try {
      const prompt = `
        Analyze the following business information and provide insights for logo design:
        
        Business Name: ${businessInfo.business_name}
        Business Type: ${businessInfo.business_type}
        Description: ${businessInfo.description || 'Not provided'}
        Target Audience: ${businessInfo.target_audience || 'General'}
        
        Please provide:
        1. Brand personality traits
        2. Recommended color schemes
        3. Style suggestions (modern, classic, playful, etc.)
        4. Symbol/icon recommendations
        5. Typography suggestions
        
        Format the response as JSON with clear categories.
      `;

      const response = await this.callGroqAPI(prompt);
      
      return {
        brand_personality: response.brand_personality || [],
        color_schemes: response.color_schemes || [],
        style_suggestions: response.style_suggestions || [],
        symbol_recommendations: response.symbol_recommendations || [],
        typography: response.typography || {},
        confidence_score: 0.85
      };

    } catch (error) {
      console.error('Error in business analysis:', error);
      // Return fallback analysis
      return this.getFallbackBusinessAnalysis(businessInfo);
    }
  }

  // Generate creative description using Groq
  async generateCreativeDescription(params) {
    try {
      const { business_info, style_preferences, keywords } = params;
      
      const prompt = `
        Create a detailed, creative description for a logo design based on:
        
        Business: ${business_info.business_name} (${business_info.business_type})
        Style Preferences: ${style_preferences?.join(', ') || 'Modern, Professional'}
        Keywords: ${keywords?.join(', ') || 'Innovation, Trust, Quality'}
        
        Generate a comprehensive logo description that includes:
        1. Visual elements and composition
        2. Color palette with specific colors
        3. Typography style
        4. Overall mood and feeling
        5. Technical specifications
        
        Make it detailed enough for AI image generation.
      `;

      const response = await this.callGroqAPI(prompt);
      
      return {
        main_description: response.main_description || response,
        variations: response.variations || [],
        technical_specs: response.technical_specs || {},
        mood_board: response.mood_board || []
      };

    } catch (error) {
      console.error('Error generating description:', error);
      return this.getFallbackDescription(params);
    }
  }

  // Enhance prompt for better AI generation
  async enhancePrompt(originalPrompt, context = {}) {
    try {
      const enhancementPrompt = `
        Enhance this logo design prompt for better AI image generation:
        
        Original: "${originalPrompt}"
        
        Context:
        - Style: ${context.style || 'modern'}
        - Colors: ${context.colors?.join(', ') || 'professional colors'}
        - Business Type: ${context.business_type || 'general business'}
        
        Improve the prompt by:
        1. Adding specific visual details
        2. Including technical specifications
        3. Specifying composition and layout
        4. Adding style and mood descriptors
        5. Including quality and format requirements
        
        Return an enhanced prompt that will generate better logo results.
      `;

      const response = await this.callGroqAPI(enhancementPrompt);
      
      return typeof response === 'string' ? response : response.enhanced_prompt || originalPrompt;

    } catch (error) {
      console.error('Error enhancing prompt:', error);
      return this.getFallbackEnhancedPrompt(originalPrompt, context);
    }
  }

  // Analyze image using AI (for reference-based generation)
  async analyzeImage(imagePath) {
    try {
      // For now, return basic analysis
      // In a full implementation, you would use vision AI APIs
      const imageBuffer = await fs.readFile(imagePath);
      const imageSize = imageBuffer.length;
      
      return {
        dominant_colors: ['#2563eb', '#ffffff', '#1f2937'],
        style_detected: 'modern',
        elements: ['text', 'geometric shapes'],
        composition: 'centered',
        complexity: 'medium',
        file_size: imageSize,
        recommendations: [
          'Clean, modern design approach',
          'Use of geometric elements',
          'Professional color palette'
        ]
      };

    } catch (error) {
      console.error('Error analyzing image:', error);
      return {
        dominant_colors: ['#000000', '#ffffff'],
        style_detected: 'unknown',
        elements: ['unknown'],
        composition: 'unknown',
        complexity: 'medium'
      };
    }
  }

  // Call Groq API
  async callGroqAPI(prompt, model = 'mixtral-8x7b-32768') {
    try {
      if (!this.groqApiKey) {
        throw new Error('Groq API key not configured');
      }

      const response = await axios.post(
        `${this.groqBaseUrl}/chat/completions`,
        {
          model: model,
          messages: [
            {
              role: 'system',
              content: 'You are a professional brand designer and marketing expert. Provide detailed, actionable insights for logo design and branding.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        },
        {
          headers: {
            'Authorization': `Bearer ${this.groqApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const content = response.data.choices[0].message.content;
      
      // Try to parse as JSON, fallback to string
      try {
        return JSON.parse(content);
      } catch {
        return content;
      }

    } catch (error) {
      console.error('Groq API error:', error.response?.data || error.message);
      throw error;
    }
  }

  // Fallback methods for when APIs are unavailable
  getFallbackBusinessAnalysis(businessInfo) {
    const businessType = businessInfo.business_type.toLowerCase();
    
    const fallbackData = {
      tech: {
        brand_personality: ['innovative', 'modern', 'reliable', 'cutting-edge'],
        color_schemes: [['#2563eb', '#ffffff', '#1f2937'], ['#7c3aed', '#ffffff', '#374151']],
        style_suggestions: ['modern', 'minimalist', 'geometric'],
        symbol_recommendations: ['abstract shapes', 'circuit patterns', 'arrows'],
        typography: { style: 'sans-serif', weight: 'medium' }
      },
      default: {
        brand_personality: ['professional', 'trustworthy', 'reliable', 'approachable'],
        color_schemes: [['#1f2937', '#ffffff', '#3b82f6'], ['#059669', '#ffffff', '#1f2937']],
        style_suggestions: ['professional', 'clean', 'balanced'],
        symbol_recommendations: ['geometric shapes', 'abstract symbols', 'typography-based'],
        typography: { style: 'sans-serif', weight: 'regular' }
      }
    };

    return fallbackData[businessType] || fallbackData.default;
  }

  getFallbackDescription(params) {
    const { business_info } = params;
    return {
      main_description: `A modern, professional logo for ${business_info.business_name}, featuring clean typography and a sophisticated color palette that reflects the ${business_info.business_type} industry. The design should be versatile, scalable, and memorable.`,
      variations: [
        'Horizontal layout version',
        'Stacked vertical version',
        'Icon-only version'
      ],
      technical_specs: {
        format: 'vector-based',
        colors: 'RGB and CMYK ready',
        scalability: 'infinite'
      }
    };
  }

  getFallbackEnhancedPrompt(originalPrompt, context) {
    const style = context.style || 'modern';
    const colors = context.colors?.join(' and ') || 'professional blue and white';
    
    return `${originalPrompt}, ${style} design style, using ${colors} colors, high quality vector logo, clean composition, professional branding, scalable design, white background, 4K resolution`;
  }
}

module.exports = new AIService();
