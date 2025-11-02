#!/bin/bash

# Image Generation Pipeline - Stop Script

echo "🛑 Stopping Image Generation Pipeline..."

# Find and kill node processes on ports 3000 and 3001
if lsof -ti:3000 > /dev/null 2>&1; then
    echo "Stopping frontend (port 3000)..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null
fi

if lsof -ti:3001 > /dev/null 2>&1; then
    echo "Stopping backend (port 3001)..."
    lsof -ti:3001 | xargs kill -9 2>/dev/null
fi

# Also kill any npm processes that might be related
pkill -f "react-scripts" 2>/dev/null

echo "✓ Servers stopped"
echo ""
echo "Note: Log files are preserved in backend.log and frontend.log"
echo "Delete them manually if needed: rm -f backend.log frontend.log"
