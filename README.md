# Logo Animation Tool 🎨

A modern logo creation tool with AI-powered features, featuring Apple-inspired liquid glass design and cross-platform compatibility.

## 🚀 Features

- **Logo Enhancement**: Upload existing logos and enhance them with AI-powered quality improvements
- **AI Logo Generator**: Create unique logos from text descriptions using advanced AI
- **Reference-Based Creation**: Generate similar logos based on reference images
- **Liquid Glass UI**: Beautiful, modern interface with Apple-inspired design
- **Cross-Platform**: Works on desktop, tablet, and mobile devices

## 🛠 Technology Stack

### Frontend
- **React** with Hooks for component management
- **Tailwind CSS** for responsive styling
- **Lucide React** for icons
- **Axios** for API communication
- **Vite** for fast development and building

### Backend
- **Node.js** with Express.js
- **Multer** for file uploads
- **Sharp** for image processing
- **Axios** for AI API integration

### AI Services
- **Gemini API (Nano Banana)** for advanced image generation and enhancement
- **Groq API** for text analysis and business insights (optional)

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp ../env.example .env
```

4. Add your API keys to `.env`:
```env
GEMINI_API_KEY=AIzaSyCBE2qnM_EP8EjX7N_KeFWVS32HNAp6RYQ
GROQ_API_KEY=your_groq_api_key_here
```

5. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🎯 Usage

1. **Logo Enhancement**:
   - Upload an existing logo image
   - Choose enhancement type (quality, style, resolution)
   - Select desired style
   - Download the enhanced result

2. **AI Logo Generation**:
   - Describe your logo vision
   - Select business type and style preferences
   - Choose color palette
   - Generate and download your logo

3. **Reference-Based Creation**:
   - Upload a reference image
   - Specify business name and modifications
   - Generate similar logo with your branding

## 🔧 API Endpoints

### Logo Endpoints
- `POST /api/logo/enhance` - Enhance existing logo
- `POST /api/logo/generate` - Generate logo from text
- `POST /api/logo/reference` - Create logo from reference
- `GET /api/logo/download/:filename` - Download generated logo

### AI Endpoints
- `POST /api/ai/analyze-business` - Analyze business information
- `POST /api/ai/generate-description` - Generate creative descriptions
- `POST /api/ai/enhance-prompt` - Enhance prompts for better results

### Health Check
- `GET /api/health` - Check API status

## 🎨 Design System

The application uses a liquid glass design system with:
- **Backdrop blur effects** for translucent elements
- **Gradient backgrounds** with smooth animations
- **Apple-inspired** clean and minimal interface
- **Responsive design** for all screen sizes
- **Smooth transitions** and micro-interactions

## 🔒 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
GROQ_API_KEY=your_groq_api_key_here
NANO_BANANA_API_KEY=your_nano_banana_api_key_here
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Logo Animation Tool
VITE_APP_VERSION=1.0.0
```

## 📱 Cross-Platform Support

- **Desktop**: Full-featured experience with all tools
- **Tablet**: Optimized layout for touch interaction
- **Mobile**: Responsive design with touch-friendly controls

## 🚀 Deployment

### Backend Deployment
1. Build the application
2. Set production environment variables
3. Deploy to your preferred platform (Heroku, Railway, etc.)

### Frontend Deployment
1. Build the application:
```bash
npm run build
```
2. Deploy the `dist` folder to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Check the API health endpoint: `/api/health`
- Review the console for error messages
- Ensure all environment variables are properly set

## 🔮 Future Enhancements

- [ ] User authentication and saved projects
- [ ] Logo animation features
- [ ] Batch processing capabilities
- [ ] Advanced AI customization options
- [ ] Integration with design tools
- [ ] Team collaboration features
