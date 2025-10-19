#!/bin/bash

echo "🐳 Building Portal Frontend Docker Image..."

# Ask which build to use
echo ""
echo "Scegli il tipo di build:"
echo "1) Production (Nginx)"
echo "2) Development (Hot reload)"
read -p "Scelta [1]: " choice
choice=${choice:-1}

if [ "$choice" == "2" ]; then
    echo "Building development image..."
    docker-compose build
else
    echo "Building production image..."
    docker build -t portal-frontend .
fi

echo "✅ Build completato!"
