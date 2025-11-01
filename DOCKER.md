# Running the Project with Docker Desktop

This guide will help you run the Next.js project using Docker Desktop.

## Prerequisites

1. **Docker Desktop** installed and running on your machine
   - Download from: https://www.docker.com/products/docker-desktop
   - Make sure Docker Desktop is running before proceeding

## Quick Start

### Option 1: Using Docker Compose (Recommended)

1. **Build and start the container:**
   ```bash
   docker-compose up --build
   ```

2. **Run in detached mode (background):**
   ```bash
   docker-compose up -d --build
   ```

3. **View logs:**
   ```bash
   docker-compose logs -f
   ```

4. **Stop the container:**
   ```bash
   docker-compose down
   ```

### Option 2: Using Docker CLI

1. **Build the Docker image:**
   ```bash
   docker build -t nextjs-app .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3000:3000 nextjs-app
   ```

3. **Run in detached mode:**
   ```bash
   docker run -d -p 3000:3000 nextjs-app
   ```

4. **Stop the container:**
   ```bash
   docker stop <container-id>
   ```

## Access the Application

Once the container is running, open your browser and navigate to:
- **URL:** http://localhost:3001 (or http://localhost:3000 if port is available)

## Useful Docker Commands

### Check running containers:
```bash
docker ps
```

### View container logs:
```bash
docker-compose logs -f nextjs-app
```

### Stop and remove containers:
```bash
docker-compose down
```

### Stop and remove containers with volumes:
```bash
docker-compose down -v
```

### Rebuild without cache:
```bash
docker-compose build --no-cache
```

### Access container shell:
```bash
docker exec -it <container-id> sh
```

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, you can change it in the `docker-compose.yml` file:
```yaml
ports:
  - "3001:3000"  # Change 3001 to any available port
```

### Container Won't Start
1. Check Docker Desktop is running
2. Check logs: `docker-compose logs`
3. Rebuild without cache: `docker-compose build --no-cache`
4. Ensure port 3000 is available

### Build Fails
1. Make sure `node_modules` is properly excluded (handled by `.dockerignore`)
2. Check your internet connection for npm package downloads
3. Try rebuilding: `docker-compose build --no-cache`

## Production Deployment

For production deployments, consider:
- Using environment variables for configuration
- Setting up proper SSL/TLS certificates
- Using a reverse proxy (nginx, traefik)
- Implementing health checks (already configured in docker-compose.yml)

## Docker Desktop Settings

Make sure Docker Desktop has:
- **Resources:** At least 2GB RAM allocated
- **File sharing:** Enabled for your project directory
- **WSL 2:** Enabled (if using Windows)

