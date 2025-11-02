# Local Images Setup

## Changes Made

The system has been updated to use pre-selected local images from your Downloads directory instead of mock API calls.

### 1. Image Search Service (`backend/services/imageSearchService.js`)

**Updated to:**
- Read images from local directories based on prompt keywords
- "Landing Page" → `/Users/kathy/Downloads/Training Images/Landing Page` (31 images)
- "Interior Design" → `/Users/kathy/Downloads/Training Images/Interior Design` (30 images)
- Returns local file paths that are converted to accessible URLs

### 2. Server (`backend/server.js`)

**Added route:**
```javascript
app.get('/images/*', (req, res) => {
  // Serves local images from Downloads/Training Images directory
});
```

This route allows the frontend to access local images through HTTP.

### 3. Pipeline Controller (`backend/controllers/pipelineController.js`)

**Simplified for demo:**
- Removed AI generation step
- Uses reference images directly as "generated" images
- Converts local file paths to HTTP URLs
- Shows your actual training images in the results

### 4. URL Conversion

Local file paths are converted to accessible URLs:
- **Before**: `/Users/kathy/Downloads/Training Images/Landing Page/image.jpg`
- **After**: `http://localhost:3001/images/%2FUsers%2Fkathy%2FDownloads%2FTraining%20Images%2FLanding%20Page%2Fimage.jpg`

## How It Works

1. User enters a prompt containing "landing page" or "interior design"
2. System detects the prompt type
3. Loads images from the corresponding directory
4. Converts file paths to accessible HTTP URLs
5. Displays them in the frontend grid

## Usage

### Test with Landing Page Images

Enter any of these prompts:
- "landing page for startup"
- "modern landing page design"
- "landing page design"

You'll see 30 images from the Landing Page directory.

### Test with Interior Design Images

Enter any of these prompts:
- "interior design ideas"
- "modern interior design"
- "interior design inspiration"

You'll see 30 images from the Interior Design directory.

## Default Behavior

If the prompt doesn't match "landing page" or "interior design", it defaults to showing landing page images.

## Starting the Application

```bash
cd /Users/kathy/image-generation-pipeline
./start.sh
```

Then visit: http://localhost:3000

## Files Modified

- `backend/services/imageSearchService.js` - Local image reading
- `backend/server.js` - Image serving route
- `backend/controllers/pipelineController.js` - Simplified pipeline
