# Hey Opening Animation Setup

## Image File Required

To display the opening animation, add the "hey" image file to the public directory:

**File location**: `/Users/kathy/image-generation-pipeline/frontend/public/hey-opening.png`

The image should be:
- Dark background (#1a1a1a or similar)
- Word "hey" in stylized green gradient font
- PNG or JPG format
- Recommended size: 400x400px (or similar square dimensions)

## Fallback Version

If the image file is not provided, the component will gracefully handle the missing image. You can use the text-based CSS version by uncommenting the CSS fallback in `HeyOpening.css`.

## Animation Sequence

1. **0-0.6s**: Background fades in
2. **0.3-1.3s**: "hey" image slides in and scales up
3. **2s**: Starts fading out
4. **3s**: Complete - app is ready

## Testing

To test the animation:
1. Restart the frontend server
2. Refresh the browser
3. You should see the "hey" animation play for ~3 seconds
