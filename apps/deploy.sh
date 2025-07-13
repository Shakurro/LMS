#!/bin/bash

# LMS Frontend Deployment Script
echo "🚀 Starting LMS Frontend deployment..."

# Stop and remove existing container
echo "📦 Stopping existing container..."
docker-compose down

# Build and start the new container
echo "🔨 Building new container..."
docker-compose build --no-cache

echo "🚀 Starting container..."
docker-compose up -d

# Wait for container to be healthy
echo "⏳ Waiting for container to be healthy..."
for i in {1..30}; do
    if docker-compose ps | grep -q "healthy"; then
        echo "✅ Container is healthy!"
        break
    fi
    echo "⏳ Waiting... ($i/30)"
    sleep 2
done

# Show container status
echo "📊 Container status:"
docker-compose ps

echo "🎉 Deployment completed!"
echo "🌐 Your application should be available at: https://jzetzmann.com" 