# Opening Animations Guide

## Overview

The application features a two-stage opening sequence:
1. **hey-opening** - The "hey" image slides in from right, then exits to left
2. **KURA-opening** - Letters K, U, R, A enter from right while rotating upright with a grid background

## Animation Sequence

### Stage 1: hey-opening (~3 seconds)
- Image slides in from right to center
- Holds for 2 seconds
- Slides out to the left

### Stage 2: KURA-opening (~4 seconds)
- Black background fades in
- Grid pattern (#82CD59) appears
- K.png enters from right, rotating from -90° to 0°
- U.png enters with 0.1s delay
- R.png enters with 0.2s delay  
- A.png enters with 0.3s delay
- All letters form "KURA"
- Holds for 2 seconds
- Fades out

### Stage 3: Main App
- Application becomes interactive

## Files Created

### Components:
- `frontend/src/components/HeyOpening.js` - First animation
- `frontend/src/components/HeyOpening.css` - hey-opening styles
- `frontend/src/components/KuraOpening.js` - KURA animation
- `frontend/src/components/KuraOpening.css` - KURA styles

### Images Required:
- `/frontend/public/hey-opening.png` ✓
- `/frontend/public/K.png` ✓
- `/frontend/public/U.png` ✓
- `/frontend/public/R.png` ✓
- `/frontend/public/A.png` ✓

## Grid Pattern

The KURA-opening uses a CSS grid pattern:
- Color: `#82CD59` (bright green)
- Size: 50x50px squares
- Opacity: 0.3 (subtle)

## Letter Animation

Each letter:
1. Starts at +200px X position (off-screen right)
2. Starts at -90° rotation (lying down)
3. Animates to 0px X position (center)
4. Rotates to 0° (upright)
5. Duration: 0.8s per letter
6. Staggered delays: 0s, 0.1s, 0.2s, 0.3s

## Testing

Restart the application to see the animations:

```bash
cd /Users/kathy/image-generation-pipeline
./stop.sh
./start.sh
```

Then visit: http://localhost:3000

You should see:
1. "hey" slides in from right, then exits left
2. Black background with green grid appears
3. K, U, R, A letters enter from right while rotating upright
4. Main app loads

## Total Animation Time

- hey-opening: ~3 seconds
- KURA-opening: ~4 seconds
- **Total: ~7 seconds** before main app appears
