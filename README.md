# 🏃‍♂️ Posture Perfect - AI-Powered Posture Detection App

A full-stack web application that analyzes posture in real-time using rule-based logic. Perfect for monitoring squat form and desk posture to promote better health and prevent injuries.



## 🌟 Features

- **Real-time Webcam Analysis**: Live posture monitoring with instant feedback
- **Video Upload Analysis**: Upload and analyze pre-recorded videos
- **Dual Analysis Modes**:
  - 🏋️ **Squat Analysis**: Detects knee-over-toe issues and back angle problems
  - 💺 **Desk Posture**: Monitors neck bend, shoulder alignment, and slouching
- **Professional UI**: Modern, responsive design with smooth animations
- **Detailed Feedback**: Comprehensive scoring and improvement recommendations
- **Socket.IO Integration**: Real-time communication between client and server

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Styled Components** - Dynamic styling
- **Socket.IO Client** - Real-time communication
- **React Webcam** - Camera integration
- **React Dropzone** - File upload handling
- **Axios** - HTTP client

### Backend
- **Node.js & Express** - Server framework
- **Socket.IO** - Real-time WebSocket communication
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **fs-extra** - Enhanced file system operations

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Webcam** (for real-time analysis)
- **Modern web browser** with camera permissions

## 🚀 Quick Start

### 1. Clone and Install


```bash
# Clone the repository
git clone <your-repo-url>
cd posture-detection-app

# Install all dependencies (root, server, and client)
npm run install-all
```

### 2. Development Setup

```bash
# Start both server and client in development mode
npm run dev
```

This will start:
- **Backend server** on `http://localhost:5000`
- **React frontend** on `http://localhost:3000`

### 3. Individual Component Setup

If you prefer to run components separately:

```bash
# Terminal 1: Start the server
cd server
npm run dev

# Terminal 2: Start the client
cd client
npm start
```

## 📁 Project Structure

```
posture-detection-app/
├── 📄 package.json              # Root package with scripts
├── 📄 README.md                 # This file
├── 📁 server/                   # Backend Node.js application
│   ├── 📄 package.json          # Server dependencies
│   ├── 📄 server.js             # Main server file
│   └── 📁 utils/
│       └── 📄 postureAnalyzer.js # Posture analysis logic
└── 📁 client/                   # Frontend React application
    ├── 📄 package.json          # Client dependencies
    ├── 📁 public/               # Static assets
    └── 📁 src/
        ├── 📄 App.js            # Main App component
        ├── 📄 App.css           # Global styles
        └── 📁 components/       # React components
            ├── 📄 Header.js     # App header
            ├── 📄 WebcamCapture.js    # Webcam functionality
            ├── 📄 VideoUpload.js      # Video upload handling
            └── 📄 PostureAnalysis.js  # Results display
```

## 🎯 How to Use

### Real-time Webcam Analysis
1. **Select Analysis Type**: Choose between "Squat Analysis" or "Desk Posture"
2. **Choose Webcam Mode**: Click "📹 Live Webcam"
3. **Grant Permissions**: Allow camera access when prompted
4. **Start Analysis**: Click "▶️ Start Analysis"
5. **Get Feedback**: Receive real-time posture feedback and scoring

### Video Upload Analysis
1. **Select Analysis Type**: Choose your analysis mode
2. **Choose Upload Mode**: Click "📁 Upload Video"
3. **Upload Video**: Drag & drop or browse for video files (MP4, AVI, MOV, etc.)
4. **Analyze**: Click the analyze button and wait for processing
5. **Review Results**: Get comprehensive analysis with scoring and recommendations

## 🔧 Posture Analysis Rules

### Squat Analysis 🏋️
- **Knee Alignment**: Flags if knees extend beyond toes
- **Back Angle**: Monitors torso angle (should be >150°)
- **Depth Assessment**: Evaluates squat depth quality
- **Form Scoring**: Overall technique evaluation

### Desk Posture 💺
- **Neck Position**: Detects forward head posture (>30° bend)
- **Shoulder Level**: Monitors shoulder alignment
- **Back Straightness**: Checks for slouching (<160° back angle)
- **Head Alignment**: Ensures head stays over shoulders

## 🎨 Key Features

### Modern UI/UX
- **Gradient Backgrounds**: Beautiful color schemes
- **Glass Morphism**: Translucent elements with backdrop blur
- **Smooth Animations**: Fade-in effects and hover interactions
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Feedback**: Live scoring and recommendations

### Advanced Analysis
- **Frame-by-frame Processing**: Detailed video analysis
- **Confidence Scoring**: 0-100 posture quality scores
- **Issue Detection**: Specific problem identification
- **Improvement Tips**: Actionable feedback for better posture

## 🛡️ API Endpoints

### REST API
- `GET /api/health` - Server health check
- `POST /api/upload-video` - Video upload and analysis

### Socket.IO Events
- `analyze-frame` - Send frame for real-time analysis
- `analysis-result` - Receive analysis results
- `analysis-error` - Handle analysis errors

## 🔮 Future Enhancements

- **MediaPipe Integration**: Real pose landmark detection
- **OpenCV Processing**: Advanced computer vision features
- **Machine Learning**: AI-powered posture classification
- **Progress Tracking**: Historical posture improvement data
- **Exercise Recommendations**: Personalized corrective exercises
- **Multi-user Support**: User accounts and data persistence

## 🐛 Troubleshooting

### Common Issues

1. **Camera not working**:
   - Ensure browser has camera permissions
   - Check if camera is being used by another application
   - Try refreshing the page

2. **Socket connection failed**:
   - Verify server is running on port 5000
   - Check firewall settings
   - Ensure CORS is properly configured

3. **Video upload fails**:
   - Check video file size (max 100MB)
   - Ensure supported format (MP4, AVI, MOV, etc.)
   - Verify server has sufficient storage

### Development Tips

- Use browser dev tools to monitor network requests
- Check console for detailed error messages
- Ensure both client and server are running simultaneously
- Test with different video formats and sizes

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- MediaPipe team for pose detection research
- React community for excellent documentation
- Socket.IO for real-time communication
- All contributors and testers

---

**Built with ❤️ for better posture and health**
