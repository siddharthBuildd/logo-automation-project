const express = require('express');
const aiController = require('../controllers/aiController');

const router = express.Router();

// AI service routes
router.post('/analyze-business', aiController.analyzeBusiness);
router.post('/generate-description', aiController.generateDescription);
router.post('/enhance-prompt', aiController.enhancePrompt);
router.get('/status', aiController.getServiceStatus);

module.exports = router;
