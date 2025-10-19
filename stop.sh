#!/bin/bash

echo "🛑 Stopping Portal Frontend..."

# Stop docker-compose
docker-compose down 2>/dev/null

# Stop standalone container
docker stop portal-frontend 2>/dev/null
docker rm portal-frontend 2>/dev/null

echo "✅ Frontend fermato!"
