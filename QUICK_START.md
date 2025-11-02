# Quick Start Guide

## Prerequisites

- Node.js 16 or higher
- npm or yarn package manager

## Installation

1. **Clone the repository** (or navigate to the project directory)

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

## Running the Application

### Option 1: Using Start Scripts (Recommended)

```bash
# From project root
./start.sh
```

This will start both backend and frontend automatically.

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Backend runs on: http://localhost:3001

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend runs on: http://localhost:3000

## Using the Application

1. **Open your browser** to http://localhost:3000

2. **Enter a text prompt**:
   - Example: "landing page for SaaS startup"

3. **Optionally add brand elements**:
   - Colors: "#667eea, #764ba2"
   - Fonts: "Montserrat, Roboto"

4. **Click "Generate Images"**

5. **Watch the progress**:
   - Searching for reference images
   - Constructing AI prompts
   - Generating 30 personalized images

6. **Explore results**:
   - View images in responsive grid
   - Click any image to preview
   - Download images you like

## API Endpoints

### Health Check
```bash
curl http://localhost:3001/health
```

### Start Generation
```bash
curl -X POST http://localhost:3001/api/generate \
  -F "textPrompt=your prompt here" \
  -F "colors=#color1, #color2" \
  -F "fonts=font1, font2"
```

### Check Job Status
```bash
curl http://localhost:3001/api/status/JOB_ID
```

Replace `JOB_ID` with the ID returned from the generate endpoint.

## Troubleshooting

### Port Already in Use

If port 3000 or 3001 is already in use:

**Backend:**
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

**Frontend:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

Or change ports in:
- Backend: `backend/.env` (PORT=3001)
- Frontend: `frontend/package.json` (proxy)

### Node Version Issues

If you see version errors:
```bash
# Use nvm to switch to stable version
nvm use stable
```

### Dependencies Not Installing

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

## Example Workflows

### 1. Simple Generation
```
Prompt: "modern landing page"
Colors: "#667eea, #764ba2"
→ Generates 30 images with modern aesthetic
```

### 2. Brand-Specific Generation
```
Prompt: "SaaS product dashboard"
Colors: "#4CAF50, #2196F3, #FFC107"
Fonts: "Inter, Roboto"
→ Generates images matching brand colors
```

### 3. Style Exploration
```
Prompt: "e-commerce product page"
Colors: ""
→ Generates diverse style variations
```

## Stopping the Application

### Using Stop Script
```bash
./stop.sh
```

### Manually
- Press `Ctrl+C` in both terminal windows
- Or kill processes:
```bash
lsof -ti:3000,3001 | xargs kill -9
```

## Next Steps

- Read `README.md` for detailed documentation
- Check `docs/API_INTEGRATION.md` for API details
- See `docs/PROMPT_ENGINEERING.md` for prompt strategy
- Review `IMPLEMENTATION_SUMMARY.md` for architecture

## Need Help?

1. Check the logs in `backend.log` and `frontend.log`
2. Review error messages in browser console
3. Verify backend is running (check http://localhost:3001/health)
4. Check Node.js version: `node --version` (should be 16+)

---

**Happy generating! 🎨**
