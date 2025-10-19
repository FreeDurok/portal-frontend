#!/bin/bash

# Start frontend in development mode

echo "🚀 Starting Frontend in development mode..."
echo ""
echo "Frontend available at: http://localhost:3000"
echo ""
echo "⚠️  Make sure the backend is running at http://localhost:8000"
echo "💡 Code changes will be applied automatically!"
echo ""

# Stop any existing containers
docker compose -f docker-compose.dev.yml --profile frontend down

# Start services in development mode
docker compose -f docker-compose.dev.yml --profile frontend up --build

# Cleanup on interrupt
trap "docker compose -f docker-compose.dev.yml --profile frontend down" EXIT
