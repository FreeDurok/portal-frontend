#!/bin/bash

echo "🔧 Setup Portal Frontend (Development Mode)"
echo ""

if [ ! -f ".env" ]; then
    echo "📝 Creazione file .env..."
    cp .env.example .env
fi

if [ ! -d "node_modules" ]; then
    echo "📦 Installazione dipendenze..."
    npm install
else
    echo "✓ Dipendenze già installate"
fi

echo ""
echo "✅ Setup completato!"
echo ""
echo "🚀 Per avviare in modalità sviluppo:"
echo "   npm run dev"
echo ""
echo "🐳 Per avviare con Docker:"
echo "   ./start.sh"
echo ""
echo "🏗️  Per build di produzione:"
echo "   npm run build"
