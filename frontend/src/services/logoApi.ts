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

// Types for API responses
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  result: T;
}

export interface LogoResult {
  filename: string;
  url: string;
  metadata: {
    prompt?: string;
    style?: string;
    colors?: string[];
    business_type?: string;
    api_used?: string;
    enhancement_type?: string;
  };
}

export interface AIServiceStatus {
  gemini: {
    available: boolean;
    model: string;
    api_key_configured: boolean;
  };
  groq: {
    available: boolean;
    api_key_configured: boolean;
  };
  services: {
    image_generation: boolean;
    text_analysis: boolean;
    business_analysis: boolean;
  };
}

// Logo API functions
export const logoApi = {
  // Health check
  async healthCheck(): Promise<{ status: string; message: string; timestamp: string }> {
    const response = await api.get('/health');
    return response.data;
  },

  // Enhance existing logo
  async enhanceLogo(file: File, options: {
    enhancement_type?: string;
    style?: string;
    custom_prompt?: string;
  } = {}): Promise<ApiResponse<LogoResult>> {
    const formData = new FormData();
    formData.append('image', file);
    
    // Add options to form data
    Object.keys(options).forEach(key => {
      formData.append(key, options[key as keyof typeof options] || '');
    });

    const response = await api.post('/logo/enhance', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Generate logo from text
  async generateLogo(description: string, options: {
    business_type?: string;
    style?: string;
    colors?: string[];
  } = {}): Promise<ApiResponse<LogoResult>> {
    const response = await api.post('/logo/generate', {
      description,
      ...options,
    });
    return response.data;
  },

  // Create logo from reference
  async createFromReference(file: File, options: {
    business_name?: string;
    style?: string;
    modifications?: string[];
  } = {}): Promise<ApiResponse<LogoResult>> {
    const formData = new FormData();
    formData.append('reference', file);
    
    // Add options to form data
    Object.keys(options).forEach(key => {
      const value = options[key as keyof typeof options];
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value || '');
      }
    });

    const response = await api.post('/logo/reference', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Download logo
  getDownloadUrl(filename: string): string {
    return `${API_BASE_URL}/logo/download/${filename}`;
  },

  // Download logo as blob
  async downloadLogo(filename: string): Promise<Blob> {
    const response = await api.get(`/logo/download/${filename}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};

// AI API functions
export const aiApi = {
  // Analyze business information
  async analyzeBusiness(businessInfo: {
    business_name: string;
    business_type: string;
    description?: string;
    target_audience?: string;
  }): Promise<ApiResponse<any>> {
    const response = await api.post('/ai/analyze-business', businessInfo);
    return response.data;
  },

  // Generate creative description
  async generateDescription(params: {
    business_info: any;
    style_preferences?: string[];
    keywords?: string[];
  }): Promise<ApiResponse<any>> {
    const response = await api.post('/ai/generate-description', params);
    return response.data;
  },

  // Enhance prompt
  async enhancePrompt(prompt: string, context: {
    style?: string;
    colors?: string[];
    business_type?: string;
  } = {}): Promise<ApiResponse<any>> {
    const response = await api.post('/ai/enhance-prompt', {
      original_prompt: prompt,
      ...context,
    });
    return response.data;
  },

  // Get AI service status
  async getServiceStatus(): Promise<ApiResponse<AIServiceStatus>> {
    const response = await api.get('/ai/status');
    return response.data;
  },
};

export default api;
