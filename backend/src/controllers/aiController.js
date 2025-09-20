const aiService = require('../services/aiService');
const geminiService = require('../services/geminiService');

class AIController {
  // Analyze business information for logo generation
  async analyzeBusiness(req, res) {
    try {
      const { business_name, business_type, description, target_audience } = req.body;

      if (!business_name || !business_type) {
        return res.status(400).json({ 
          error: 'Business name and type are required' 
        });
      }

      console.log(`🔍 Analyzing business: ${business_name}`);

      const analysis = await aiService.analyzeBusiness({
        business_name,
        business_type,
        description,
        target_audience
      });

      res.json({
        success: true,
        message: 'Business analysis completed',
        result: analysis
      });

    } catch (error) {
      console.error('Error analyzing business:', error);
      res.status(500).json({ 
        error: 'Failed to analyze business',
        message: error.message 
      });
    }
  }

  // Generate creative description for logo
  async generateDescription(req, res) {
    try {
      const { business_info, style_preferences, keywords } = req.body;

      if (!business_info) {
        return res.status(400).json({ 
          error: 'Business information is required' 
        });
      }

      console.log(`✨ Generating description for: ${business_info.business_name}`);

      const description = await aiService.generateCreativeDescription({
        business_info,
        style_preferences,
        keywords
      });

      res.json({
        success: true,
        message: 'Description generated successfully',
        result: {
          description,
          suggestions: description.variations || []
        }
      });

    } catch (error) {
      console.error('Error generating description:', error);
      res.status(500).json({ 
        error: 'Failed to generate description',
        message: error.message 
      });
    }
  }

  // Enhance prompt for better AI generation
  async enhancePrompt(req, res) {
    try {
      const { original_prompt, context, style, colors } = req.body;

      if (!original_prompt) {
        return res.status(400).json({ 
          error: 'Original prompt is required' 
        });
      }

      console.log(`🚀 Enhancing prompt: ${original_prompt.substring(0, 50)}...`);

      const enhancedPrompt = await aiService.enhancePrompt(original_prompt, {
        context,
        style,
        colors
      });

      res.json({
        success: true,
        message: 'Prompt enhanced successfully',
        result: {
          original: original_prompt,
          enhanced: enhancedPrompt,
          improvements: enhancedPrompt.improvements || []
        }
      });

    } catch (error) {
      console.error('Error enhancing prompt:', error);
      res.status(500).json({ 
        error: 'Failed to enhance prompt',
        message: error.message 
      });
    }
  }

  // Get AI service status
  async getServiceStatus(req, res) {
    try {
      const status = {
        gemini: geminiService.getStatus(),
        groq: {
          available: !!process.env.GROQ_API_KEY,
          api_key_configured: !!process.env.GROQ_API_KEY
        },
        services: {
          image_generation: geminiService.isAvailable(),
          text_analysis: !!process.env.GROQ_API_KEY || geminiService.isAvailable(),
          business_analysis: !!process.env.GROQ_API_KEY || geminiService.isAvailable()
        }
      };

      res.json({
        success: true,
        message: 'AI service status retrieved',
        result: status
      });

    } catch (error) {
      console.error('Error getting AI service status:', error);
      res.status(500).json({ 
        error: 'Failed to get AI service status',
        message: error.message 
      });
    }
  }
}

module.exports = new AIController();
