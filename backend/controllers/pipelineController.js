/**
 * Pipeline Controller
 * Orchestrates the complete image generation pipeline
 */

const imageSearchService = require('../services/imageSearchService');
const aiGenerationService = require('../services/aiGenerationService');
const promptService = require('../services/promptService');

const PORT = process.env.PORT || 3001;

// In-memory job storage (in production, use Redis or database)
const jobs = new Map();

/**
 * Convert local file paths to accessible URLs
 */
const convertPathToUrl = (filePath) => {
  if (typeof filePath === 'string' && filePath.includes('TrainingImages')) {
    // Extract the relative path from absolute path
    // Example: /Users/kathy/.../TrainingImages/LandingPage/xxx.jpeg
    // Should become: /TrainingImages/LandingPage/xxx.jpeg
    const match = filePath.match(/TrainingImages\/(.+)$/);
    if (match && match[1]) {
      // Only encode the filename, not the folder path
      const pathParts = match[1].split('/');
      if (pathParts.length > 1) {
        const folder = pathParts[0]; // "LandingPage"
        const fileName = pathParts.slice(1).join('/'); // "xxx.jpeg" or with encoded chars
        const encodedFileName = encodeURIComponent(fileName);
        return `/TrainingImages/${folder}/${encodedFileName}`;
      }
    }
  }
  return filePath; // Already a URL or other format
};

/**
 * Generate a unique job ID
 */
const generateJobId = () => {
  return `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Create initial job status
 */
const createJob = (jobId) => {
  const job = {
    id: jobId,
    status: 'initializing',
    progress: 0,
    totalSteps: 30,
    completedSteps: 0,
    startedAt: new Date().toISOString(),
    results: [],
    errors: []
  };
  jobs.set(jobId, job);
  return job;
};

/**
 * Update job status
 */
const updateJob = (jobId, updates) => {
  const job = jobs.get(jobId);
  if (job) {
    Object.assign(job, updates);
    job.updatedAt = new Date().toISOString();
  }
  return job;
};

/**
 * Process generation request
 * Main pipeline orchestration
 */
const processGeneration = async (req, res) => {
  const jobId = generateJobId();
  console.log(`[Pipeline] Starting job ${jobId}`);
  
  try {
    // Extract input data - only textPrompt matters for image search
    const textPrompt = req.body.textPrompt || req.body.text;
    
    if (!textPrompt) {
      return res.status(400).json({ 
        error: 'textPrompt is required' 
      });
    }
    
    console.log(`[Pipeline] Text prompt: "${textPrompt}"`);
    
    // Initialize job
    const job = createJob(jobId);
    updateJob(jobId, { 
      status: 'searching',
      progress: 5,
      input: { textPrompt }
    });
    
    // Respond immediately with job ID
    res.status(202).json({
      jobId: jobId,
      status: 'processing',
      message: 'Generation started',
      statusUrl: `/api/status/${jobId}`
    });
    
    // Continue processing asynchronously - only textPrompt matters
    processGenerationPipeline(jobId, textPrompt);
    
  } catch (error) {
    console.error('[Pipeline] Error starting job:', error);
    res.status(500).json({
      error: error.message
    });
  }
};

/**
 * Main pipeline processing function
 * Only textPrompt is used to determine which folder to search
 */
const processGenerationPipeline = async (jobId, textPrompt) => {
  try {
    updateJob(jobId, { status: 'searching', progress: 10 });
    
    // Step 1: Search for reference images
    console.log(`[Pipeline] Step 1: Searching for reference images`);
    let referenceImages = [];
    
    try {
      referenceImages = await imageSearchService.searchImages(textPrompt);
      
      // Convert local file paths to URLs
      referenceImages = referenceImages.map(img => ({
        ...img,
        url: convertPathToUrl(img.url)
      }));
      
      updateJob(jobId, { 
        status: 'searching',
        progress: 20,
        referenceImages: referenceImages.length
      });
    } catch (error) {
      console.error('[Pipeline] Image search failed:', error);
      updateJob(jobId, {
        status: 'failed',
        errors: [error.message]
      });
      return;
    }
    
    if (referenceImages.length === 0) {
      updateJob(jobId, {
        status: 'failed',
        errors: ['No reference images found']
      });
      return;
    }
    
    updateJob(jobId, { status: 'processing', progress: 50 });
    
    // For demo: use reference images directly as "generated" images
    console.log(`[Pipeline] Processing ${referenceImages.length} images`);
    
    // Convert reference images to generated image format
    const generatedImages = referenceImages.map((ref, index) => {
      return {
        generated_image_url: ref.url,
        status: 'completed',
        prompt: textPrompt,
        index: index,
        timestamp: new Date().toISOString(),
        provider: 'local-images',
        metadata: {
          width: ref.metadata.width,
          height: ref.metadata.height,
          format: ref.metadata.format,
          style: ref.style
        }
      };
    });
    
    updateJob(jobId, {
      status: 'completed',
      progress: 100,
      results: generatedImages,
      errors: [],
      completedSteps: generatedImages.length,
      totalSteps: referenceImages.length
    });
    
    console.log(`[Pipeline] Successfully processed ${generatedImages.length} images`);
    
  } catch (error) {
    console.error('[Pipeline] Pipeline failed:', error);
    updateJob(jobId, {
      status: 'failed',
      errors: [error.message]
    });
  }
};

/**
 * Get job status
 */
const getStatus = (req, res) => {
  const { jobId } = req.params;
  const job = jobs.get(jobId);
  
  if (!job) {
    return res.status(404).json({
      error: 'Job not found'
    });
  }
  
  res.json(job);
};

module.exports = {
  processGeneration,
  getStatus
};
