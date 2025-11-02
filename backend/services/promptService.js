/**
 * Prompt Engineering Service
 * Processes brand assets and constructs AI generation prompts
 */

const axios = require('axios');

/**
 * Extract colors from brand assets
 */
const extractColors = (colors) => {
  if (!colors) return [];
  
  if (typeof colors === 'string') {
    // Parse comma-separated colors
    return colors.split(',').map(c => c.trim()).filter(Boolean);
  }
  
  return Array.isArray(colors) ? colors : [];
};

/**
 * Process brand assets and create enhanced prompts
 * @param {string} textPrompt - User's text prompt
 * @param {Object} brandAssets - Brand assets (colors, fonts, style preferences)
 * @param {Array} referenceImages - Reference images from search
 * @returns {Array} Array of detailed prompts for generation
 */
const createGenerationPrompts = (textPrompt, brandAssets = {}, referenceImages = []) => {
  const colors = extractColors(brandAssets.colors);
  const fonts = brandAssets.fonts || [];
  
  // Analyze reference images for styles
  const styles = referenceImages.map(img => img.style);
  const topStyles = getTopStyles(styles);
  
  // Build base prompt with brand elements
  let basePrompt = textPrompt;
  
  if (colors.length > 0) {
    basePrompt += `, color palette: ${colors.join(', ')}`;
  }
  
  if (topStyles.length > 0) {
    basePrompt += `, style inspiration: ${topStyles.join(', ')}`;
  }
  
  // Create variations for each reference image
  const prompts = referenceImages.map((ref, index) => {
    let variationPrompt = basePrompt;
    
    // Add specific style from reference
    if (ref.style) {
      variationPrompt += `, incorporating ${ref.style} aesthetic`;
    }
    
    // Add reference context
    variationPrompt += `, inspired by ${ref.style} design patterns`;
    
    return {
      text: variationPrompt,
      index: index,
      referenceStyle: ref.style,
      referenceId: ref.id,
      options: {
        style: ref.style,
        colors: colors,
        fonts: fonts
      }
    };
  });
  
  console.log(`[PromptService] Created ${prompts.length} generation prompts`);
  
  return prompts;
};

/**
 * Get top N most common styles from reference images
 */
const getTopStyles = (styles, topN = 3) => {
  const counts = {};
  styles.forEach(style => {
    counts[style] = (counts[style] || 0) + 1;
  });
  
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([style]) => style);
};

/**
 * Generate contextual prompt based on reference images
 * @param {string} basePrompt - Base text prompt
 * @param {Array} referenceImages - Reference images
 * @returns {string} Enhanced prompt
 */
const enhancePromptWithContext = (basePrompt, referenceImages) => {
  const styles = referenceImages.map(img => img.style);
  const uniqueStyles = [...new Set(styles)];
  
  let enhanced = basePrompt;
  
  if (uniqueStyles.length > 0) {
    enhanced += `. Design style should blend ${uniqueStyles.slice(0, 3).join(', ')} elements`;
  }
  
  return enhanced;
};

module.exports = {
  createGenerationPrompts,
  extractColors,
  enhancePromptWithContext
};
