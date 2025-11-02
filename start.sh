#!/bin/bash

# Image Generation Pipeline - Start Script
# This script starts both backend and frontend servers

echo "🚀 Starting Image Generation Pipeline..."
echo ""

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install/use node version if needed
if ! command -v node &> /dev/null; then
    echo "Installing Node.js v24.9.0..."
    nvm install v24.9.0
fi

nvm use v24.9.0 || nvm use stable

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Start backend in background
echo -e "${BLUE}Starting backend on port 3001...${NC}"
cd backend && bash -c 'source $HOME/.nvm/nvm.sh && nvm use v24.9.0 && npm start' > ../backend.log 2>&1 &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Check if backend started successfully
if curl -s http://localhost:3001/health > /dev/null; then
    echo -e "${GREEN}✓ Backend is running${NC}"
else
    echo "⚠️  Backend may still be starting..."
fi

# Start frontend in background
echo -e "${BLUE}Starting frontend on port 3000...${NC}"
cd frontend && bash -c 'source $HOME/.nvm/nvm.sh && nvm use v24.9.0 && npm start' > ../frontend.log 2>&1 &
FRONTEND_PID=$!

echo ""
echo -e "${GREEN}✓ Both servers are starting${NC}"
echo ""
echo "Access the application at: http://localhost:3000"
echo ""
echo "Process IDs:"
echo "  - Backend: $BACKEND_PID"
echo "  - Frontend: $FRONTEND_PID"
echo ""
echo "To stop the servers, run: ./stop.sh"
echo ""
echo "Logs are being written to:"
echo "  - backend.log"
echo "  - frontend.log"
echo ""
echo "Waiting for frontend to compile..."
sleep 10
echo ""
echo -e "${GREEN}✓ Setup complete!${NC}"
echo ""
