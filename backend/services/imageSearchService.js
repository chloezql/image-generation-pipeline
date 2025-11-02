/**
 * Local Image Search Service
 * Retrieves pre-selected images from local directories based on prompt
 */

const fs = require('fs');
const path = require('path');

const IMAGE_DIRECTORIES = {
  'landing page': path.join(__dirname, '../TrainingImages/LandingPage'),
  'interior design': path.join(__dirname, '../TrainingImages/InteriorDesign')
};

const IMAGE_STYLES = {
  'landing page': ['modern', 'minimalist', 'professional', 'creative', 'bold', 'elegant', 'tech', 'startup', 'corporate', 'innovative'],
  'interior design': ['modern', 'minimalist', 'cozy', 'luxury', 'scandinavian', 'contemporary', 'traditional', 'industrial', 'rustic', 'minimal']
};

/**
 * Detect prompt type and return corresponding directory
 */
const detectPromptType = (prompt) => {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes('landing page')) {
    return 'landing page';
  } else if (lowerPrompt.includes('interior design')) {
    return 'interior design';
  }

  // Default to 'landing page' if no match
  return 'landing page';
};

/**
 * Get all image files from a directory
 */
const getImageFiles = (directory) => {
  try {
    const files = fs.readdirSync(directory)
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpeg', '.jpg', '.png'].includes(ext);
      })
      .map(file => path.join(directory, file));

    return files;
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error);
    return [];
  }
};

/**
 * Generate a random delay to simulate API behavior
 */
const randomDelay = (min = 500, max = 1500) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};

/**
 * Search for reference images based on prompt
 * @param {string} prompt - Text prompt describing what to search for
 * @returns {Promise<Array>} Array of reference images with local file paths
 */
const searchImages = async (prompt) => {
  console.log(`[ImageSearch] Searching for: "${prompt}"`);

  // Simulate small network delay
  await randomDelay();

  // Detect prompt type
  const promptType = detectPromptType(prompt);
  const directory = IMAGE_DIRECTORIES[promptType];

  console.log(`[ImageSearch] Using directory: ${directory}`);
  console.log(`[ImageSearch] Prompt type: ${promptType}`);

  // Get all image files from the directory
  const imageFiles = getImageFiles(directory);

  if (imageFiles.length === 0) {
    throw new Error(`No images found in directory: ${directory}`);
  }

  // Select up to 30 images (or all if less than 30)
  const selectedImages = imageFiles.slice(0, 30);

  // Map files to image objects with accessible paths
  const images = selectedImages.map((filePath, index) => {
    const styles = IMAGE_STYLES[promptType] || ['modern'];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];

    return {
      url: filePath, // Will be served as static file
      style: randomStyle,
      id: `ref-${index}`,
      provider: 'local-files',
      metadata: {
        width: 800,
        height: 600,
        format: path.extname(filePath).substring(1)
      }
    };
  });

  console.log(`[ImageSearch] Found ${images.length} reference images`);

  return images;
};

module.exports = {
  searchImages,
  IMAGE_STYLES,
  IMAGE_DIRECTORIES
};