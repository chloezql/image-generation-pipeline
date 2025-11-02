const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const imageSearchService = require('./services/imageSearchService');
const aiGenerationService = require('./services/aiGenerationService');
const promptService = require('./services/promptService');
const pipelineController = require('./controllers/pipelineController');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Main pipeline endpoint
app.post('/api/generate', upload.any(), pipelineController.processGeneration);

// Get generation status
app.get('/api/status/:jobId', pipelineController.getStatus);

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Serve local training images
app.get('/images/*', (req, res) => {
  // Extract the file path from the request
  const filePath = decodeURIComponent(req.params[0]);
  
  // Security check: ensure the path is within the Training Images directory
  if (!filePath.includes('/Training Images/')) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  // Check if file exists
  if (fs.existsSync(filePath)) {
    res.sendFile(path.resolve(filePath));
  } else {
    res.status(404).json({ error: 'Image not found' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
