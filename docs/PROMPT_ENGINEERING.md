# Prompt Engineering Strategy

## Overview

This document describes the prompt engineering approach used to create effective AI generation prompts from user inputs and brand assets.

## Core Strategy

### 1. Brand Asset Processing

Extract meaningful information from user inputs:

```javascript
const extractColors = (colors) => {
  // Parse comma-separated colors
  return colors.split(',').map(c => c.trim()).filter(Boolean);
};
```

**Input**: `"#667eea, #764ba2, #f093fb"`  
**Output**: `["#667eea", "#764ba2", "#f093fb"]`

### 2. Reference Image Analysis

Analyze reference images to identify style patterns:

```javascript
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
```

**Input**: `["modern", "minimalist", "modern", "tech"]`  
**Output**: `["modern", "minimalist", "tech"]`

### 3. Dynamic Prompt Construction

Build contextually rich prompts:

```javascript
const createGenerationPrompts = (textPrompt, brandAssets, referenceImages) => {
  // Extract brand elements
  const colors = extractColors(brandAssets.colors);
  const styles = getTopStyles(referenceImages.map(img => img.style));
  
  // Build base prompt
  let basePrompt = textPrompt;
  if (colors.length > 0) {
    basePrompt += `, color palette: ${colors.join(', ')}`;
  }
  if (styles.length > 0) {
    basePrompt += `, style inspiration: ${styles.join(', ')}`;
  }
  
  // Create variations for each reference
  return referenceImages.map((ref, index) => ({
    text: `${basePrompt}, incorporating ${ref.style} aesthetic, inspired by ${ref.style} design patterns`,
    index: index,
    referenceStyle: ref.style,
    options: { style: ref.style, colors, fonts: brandAssets.fonts }
  }));
};
```

## Prompt Structure

### Base Prompt

```
[User Text Prompt] + [Brand Colors] + [Style Inspiration]
```

**Example**:
```
"landing page for SaaS startup, color palette: #667eea, #764ba2, style inspiration: modern, minimalist"
```

### Variation Prompt

For each reference image:

```
[Base Prompt] + [Specific Style] + [Design Patterns]
```

**Example**:
```
"landing page for SaaS startup, color palette: #667eea, #764ba2, style inspiration: modern, minimalist, incorporating modern aesthetic, inspired by modern design patterns"
```

## Brand Asset Integration

### Colors

Colors are appended to the prompt to guide the visual output:

**Input**: `"#667eea, #764ba2"`  
**Prompt Addition**: `", color palette: #667eea, #764ba2"`

**Result**: Generated images will incorporate these colors.

### Fonts

Font preferences are stored in prompt options:

```javascript
options: {
  style: ref.style,
  colors: colors,
  fonts: fonts  // Can be used in future enhancement
}
```

### Logos

Logo uploads are supported through multer:

```javascript
app.post('/api/generate', upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'colors', maxCount: 1 }
]), controller);
```

Future enhancement: Analyze logo for style extraction.

## Context Management

### Maintaining Consistency

1. **Base elements** are consistent across all variations
2. **Style variations** provide diversity while maintaining brand coherence
3. **Color palette** is enforced across all generations

### Diversity Strategy

- Each variation incorporates a different reference style
- Ensures output diversity while maintaining brand consistency
- 30 variations provide ample creative options

## Prompt Templates

### Example Prompts Generated

**Input**:
- Text: "landing page for SaaS startup"
- Colors: "#667eea, #764ba2"
- Reference styles: ["modern", "minimalist", "professional"]

**Generated Prompts**:

1. `"landing page for SaaS startup, color palette: #667eea, #764ba2, style inspiration: modern, minimalist, professional, incorporating modern aesthetic, inspired by modern design patterns"`

2. `"landing page for SaaS startup, color palette: #667eea, #764ba2, style inspiration: modern, minimalist, professional, incorporating minimalist aesthetic, inspired by minimalist design patterns"`

3. `"landing page for SaaS startup, color palette: #667eea, #764ba2, style inspiration: modern, minimalist, professional, incorporating professional aesthetic, inspired by professional design patterns"`

...and 27 more variations

## Advanced Techniques

### Style Blending

Combine multiple style elements:

```javascript
const enhancedPrompt = basePrompt + 
  `. Design style should blend ${uniqueStyles.slice(0, 3).join(', ')} elements`;
```

**Result**: `"landing page for SaaS startup. Design style should blend modern, minimalist, tech elements"`

### Contextual Variations

Each prompt references its source reference image:

```javascript
{
  text: variationPrompt,
  referenceStyle: ref.style,
  referenceId: ref.id,
  ...
}
```

This maintains traceability and allows for style-specific refinements.

## Optimization Strategies

### Prompt Length Management

- Base prompt: ~50-100 characters
- Variations: ~100-200 characters each
- Total: Manageable for AI processing

### Keywords for Quality

Key terms added to prompts:
- "aesthetic" - Encourages style consistency
- "design patterns" - Guides structural approach
- "inspired by" - Suggests reference adherence

### Exclusion Terms

Can add negative prompts in production:
```javascript
const negativePrompt = "avoid cluttered, unprofessional designs";
```

## Future Enhancements

### Logo Analysis

1. Upload logo to vision API
2. Extract dominant colors
3. Identify style characteristics
4. Auto-populate brand assets

### Advanced Analytics

1. Track which styles generate best results
2. A/B test prompt variations
3. Learn optimal prompt structure
4. Personalize by user preferences

### Multi-Modal Inputs

Support additional inputs:
- Voice descriptions
- Sketch uploads
- Design inspirations
- Industry templates

## Testing Prompt Effectiveness

### Quality Metrics

1. **Style adherence**: Match to intended style
2. **Color accuracy**: Use of specified colors
3. **User satisfaction**: User ratings
4. **Diversity**: Variation in outputs

### A/B Testing Framework

```javascript
const testVariations = [
  { colors: "explicitly", styles: "prominently" },
  { colors: "subtle", styles: "hinted" },
  { colors: "primary only", styles: "single" }
];
```

Compare results to find optimal approach.

## Best Practices

### 1. Clear and Specific

- Use clear language
- Specify requirements explicitly
- Avoid ambiguity

### 2. Brand Consistency

- Always include brand colors
- Maintain style coherence
- Reinforce brand identity

### 3. Diversity

- Create meaningful variations
- Explore different styles
- Provide options for selection

### 4. Contextual Relevance

- Reference images inform style
- User input drives content
- Brand assets guide appearance
