const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const logoService = require('../services/logoService');
const aiService = require('../services/aiService');

class LogoController {
  // Enhance existing logo
  async enhanceLogo(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      const { enhancement_type = 'quality', style = 'modern', custom_prompt = '' } = req.body;
      
      console.log(`🎨 Enhancing logo: ${req.file.filename}`);
      if (custom_prompt && custom_prompt.trim()) {
        console.log(`📝 Custom prompt: ${custom_prompt}`);
      }
      
      // Process the uploaded image
      const processedImage = await logoService.enhanceImage(req.file.path, {
        type: enhancement_type,
        style: style,
        custom_prompt: custom_prompt
      });

      // Clean up original file
      await fs.unlink(req.file.path);

      res.json({
        success: true,
        message: 'Logo enhanced successfully',
        result: {
          filename: processedImage.filename,
          url: `/api/logo/download/${processedImage.filename}`,
          metadata: processedImage.metadata
        }
      });

    } catch (error) {
      console.error('Error enhancing logo:', error);
      res.status(500).json({ 
        error: 'Failed to enhance logo',
        message: error.message 
      });
    }
  }

  // Generate logo from text description
  async generateLogo(req, res) {
    try {
      const { description, business_type, style = 'modern', colors = [] } = req.body;

      if (!description) {
        return res.status(400).json({ error: 'Description is required' });
      }

      console.log(`🤖 Generating logo for: ${description}`);

      // Enhance the prompt using AI
      const enhancedPrompt = await aiService.enhancePrompt(description, {
        business_type,
        style,
        colors
      });

      // Generate logo using AI service
      const generatedLogo = await logoService.generateFromText(enhancedPrompt, {
        style,
        colors,
        business_type
      });

      res.json({
        success: true,
        message: 'Logo generated successfully',
        result: {
          filename: generatedLogo.filename,
          url: `/api/logo/download/${generatedLogo.filename}`,
          prompt: enhancedPrompt,
          metadata: generatedLogo.metadata
        }
      });

    } catch (error) {
      console.error('Error generating logo:', error);
      res.status(500).json({ 
        error: 'Failed to generate logo',
        message: error.message 
      });
    }
  }

  // Create logo based on reference image
  async createFromReference(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No reference image provided' });
      }

      const { business_name, style = 'similar', modifications: modificationsRaw = [] } = req.body;
      
      // Parse modifications if it's a JSON string
      let modifications = modificationsRaw;
      if (typeof modificationsRaw === 'string') {
        try {
          modifications = JSON.parse(modificationsRaw);
        } catch (error) {
          console.warn('Failed to parse modifications:', error);
          modifications = [];
        }
      }
      
      // Ensure modifications is an array
      if (!Array.isArray(modifications)) {
        modifications = [];
      }

      console.log(`🖼️ Creating logo from reference: ${req.file.filename}`);
      console.log('📝 Modifications received:', modifications);

      // Analyze reference image
      const analysis = await aiService.analyzeImage(req.file.path);

      // Generate logo based on reference
      const referenceLogo = await logoService.createFromReference(req.file.path, {
        business_name,
        style,
        modifications,
        analysis
      });

      // Clean up reference file
      await fs.unlink(req.file.path);

      res.json({
        success: true,
        message: 'Logo created from reference successfully',
        result: {
          filename: referenceLogo.filename,
          url: `/api/logo/download/${referenceLogo.filename}`,
          analysis: analysis,
          metadata: referenceLogo.metadata
        }
      });

    } catch (error) {
      console.error('Error creating logo from reference:', error);
      res.status(500).json({ 
        error: 'Failed to create logo from reference',
        message: error.message 
      });
    }
  }

  // Download generated logo
  async downloadLogo(req, res) {
    try {
      const { filename } = req.params;
      const filePath = path.join(__dirname, '../../uploads', filename);

      // Check if file exists
      await fs.access(filePath);

      // Set appropriate headers
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

      // Send file
      res.sendFile(path.resolve(filePath));

    } catch (error) {
      console.error('Error downloading logo:', error);
      res.status(404).json({ 
        error: 'Logo not found',
        message: 'The requested logo file does not exist'
      });
    }
  }
}

module.exports = new LogoController();
