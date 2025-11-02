/**
 * Mock AI Generation Service
 * Simulates an external AI image generation API with realistic delays and occasional failures
 */

const axios = require('axios');

const DELAY_MIN = 1500; // 1.5 seconds (slower than search)
const DELAY_MAX = 3500; // 3.5 seconds
const FAILURE_RATE = 0.15; // 15% failure rate
const MAX_RETRIES = 3;

/**
 * Generate a random delay between min and max
 */
const randomDelay = (min, max) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};

/**
 * Simulate random API failure
 */
const shouldFail = () => {
  return Math.random() < FAILURE_RATE;
};

/**
 * Generate a mock AI-generated image URL
 */
const generateImageUrl = (prompt, index) => {
  // Use a deterministic seed based on prompt for consistency
  const seed = Math.abs(prompt.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0)) + index;
  
  return `https://picsum.photos/seed/${seed}/800/600`;
};

/**
 * Generate an image using AI
 * @param {string} prompt - The generation prompt
 * @param {Object} options - Generation options (style, colors, etc.)
 * @returns {Promise<Object>} Generated image data
 */
const generateImage = async (prompt, options = {}) => {
  console.log(`[AIGeneration] Generating with prompt: "${prompt.substring(0, 50)}..."`);
  
  // Simulate network delay
  await randomDelay(DELAY_MIN, DELAY_MAX);
  
  // Simulate occasional failures
  let attempts = 0;
  while (attempts < MAX_RETRIES) {
    attempts++;
    if (shouldFail()) {
      if (attempts >= MAX_RETRIES) {
        throw new Error('AI generation API failed after multiple attempts');
      }
      console.log(`[AIGeneration] Retry attempt ${attempts}/${MAX_RETRIES}`);
      await randomDelay(500, 1000); // Short delay before retry
      continue;
    }
    break;
  }
  
  const imageUrl = generateImageUrl(prompt, options.index || 0);
  
  const result = {
    generated_image_url: imageUrl,
    status: 'completed',
    prompt: prompt,
    timestamp: new Date().toISOString(),
    provider: 'mock-ai',
    metadata: {
      width: 800,
      height: 600,
      format: 'jpg',
      style: options.style || 'modern'
    }
  };
  
  console.log(`[AIGeneration] Successfully generated image`);
  
  return result;
};

/**
 * Generate multiple images concurrently
 * @param {Array<Object>} prompts - Array of prompts with options
 * @returns {Promise<Array>} Array of generated images
 */
const generateImagesBatch = async (prompts) => {
  const batchSize = 5; // Process 5 at a time to avoid overwhelming
  const results = [];
  
  for (let i = 0; i < prompts.length; i += batchSize) {
    const batch = prompts.slice(i, i + batchSize);
    console.log(`[AIGeneration] Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(prompts.length / batchSize)}`);
    
    const batchPromises = batch.map(prompt => 
      generateImage(prompt.text, { ...prompt.options, index: i + batch.indexOf(prompt) })
        .catch(error => ({
          error: error.message,
          prompt: prompt.text,
          status: 'failed'
        }))
    );
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }
  
  return results;
};

module.exports = {
  generateImage,
  generateImagesBatch
};
