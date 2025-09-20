import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds for image processing
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Logo API functions
export const logoApi = {
  // Health check
  async healthCheck() {
    const response = await api.get('/health');
    return response.data;
  },

  // Enhance existing logo
  async enhanceLogo(file, options = {}) {
    const formData = new FormData();
    formData.append('image', file);
    
    // Add options to form data
    Object.keys(options).forEach(key => {
      formData.append(key, options[key]);
    });

    const response = await api.post('/logo/enhance', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Generate logo from text
  async generateLogo(description, options = {}) {
    const response = await api.post('/logo/generate', {
      description,
      ...options,
    });
    return response.data;
  },

  // Create logo from reference
  async createFromReference(file, options = {}) {
    const formData = new FormData();
    formData.append('reference', file);
    
    // Add options to form data
    Object.keys(options).forEach(key => {
      formData.append(key, options[key]);
    });

    const response = await api.post('/logo/reference', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Download logo
  getDownloadUrl(filename) {
    return `${API_BASE_URL}/logo/download/${filename}`;
  },

  // Download logo as blob
  async downloadLogo(filename) {
    const response = await api.get(`/logo/download/${filename}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};

// AI API functions
export const aiApi = {
  // Analyze business information
  async analyzeBusiness(businessInfo) {
    const response = await api.post('/ai/analyze-business', businessInfo);
    return response.data;
  },

  // Generate creative description
  async generateDescription(params) {
    const response = await api.post('/ai/generate-description', params);
    return response.data;
  },

  // Enhance prompt
  async enhancePrompt(prompt, context = {}) {
    const response = await api.post('/ai/enhance-prompt', {
      original_prompt: prompt,
      ...context,
    });
    return response.data;
  },

  // Get AI service status
  async getServiceStatus() {
    const response = await api.get('/ai/status');
    return response.data;
  },
};

export default api;
