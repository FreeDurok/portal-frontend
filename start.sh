#!/bin/bash

echo "🚀 Starting Portal Frontend with Docker..."

if [ ! -f ".env" ]; then
    echo "⚠️  File .env non trovato, copio da .env.example..."
    cp .env.example .env
fi

# Check if we should use development or production
if [ "$1" == "prod" ]; then
    echo "Starting in production mode..."
    docker run -d -p 3000:80 --name portal-frontend portal-frontend
else
    echo "Starting in development mode with hot reload..."
    docker-compose up -d
fi

echo ""
echo "✅ Frontend avviato!"
echo ""
echo "🌐 URL: http://localhost:3000"
echo ""
echo "📊 Comandi utili:"
echo "   Logs: docker-compose logs -f frontend"
echo "   Stop: docker-compose down"
echo "   Restart: docker-compose restart frontend"
