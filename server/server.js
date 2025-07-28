const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const PostureAnalyzer = require('./utils/postureAnalyzer');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
fs.ensureDirSync(uploadsDir);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /mp4|avi|mov|wmv|flv|webm/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only video files are allowed!'));
    }
  }
});

const postureAnalyzer = new PostureAnalyzer();

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Upload video for analysis
app.post('/api/upload-video', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }

    const { analysisType } = req.body; // 'squat' or 'desk'
    const videoPath = req.file.path;

    console.log(`Analyzing video: ${req.file.filename} for ${analysisType} posture`);

    // Process video and get analysis results
    const results = await postureAnalyzer.analyzeVideo(videoPath, analysisType);

    // Clean up uploaded file
    await fs.remove(videoPath);

    res.json({
      success: true,
      results: results,
      analysisType: analysisType,
      filename: req.file.filename
    });

  } catch (error) {
    console.error('Error processing video:', error);
    res.status(500).json({ 
      error: 'Failed to process video',
      message: error.message 
    });
  }
});

// Real-time pose analysis via Socket.IO
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('analyze-frame', async (data) => {
    try {
      const { imageData, analysisType } = data;
      
      // Process the frame
      const result = await postureAnalyzer.analyzeFrame(imageData, analysisType);
      
      socket.emit('analysis-result', {
        result: result,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error analyzing frame:', error);
      socket.emit('analysis-error', { error: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
  }
  res.status(500).json({ error: error.message });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Socket.IO enabled for real-time analysis`);
});

module.exports = app;
