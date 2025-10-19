#!/bin/bash

# Stop development services
docker compose -f docker-compose.dev.yml --profile frontend down

echo "✅ Frontend stopped!"
