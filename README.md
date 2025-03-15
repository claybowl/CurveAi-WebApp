<div align="center">
  <img src="https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/marblism-logo.png" height="150" alt="Marblism Logo" />
  <h1>Agentic AI Solutions</h1>
  <p><em>Building intelligent solutions for real-world problems</em></p>
</div>
<div style="height: 50px; background: linear-gradient(#000000, transparent);"></div>

## Documentation

Learn more in the [official documentation](https://dev.marblism.com).

Work in progress!

## Installation

<div style="color: red;">

> ⚠️ **Important**<br/>Make sure the following tools are installed on your computer

<p align="center">

<a target="_blank" href="https://www.docker.com/get-started/">![Docker Desktop Version](https://img.shields.io/badge/Docker%20Desktop-4.19.0-black?logo=docker)</a>
<a target="_blank" href="https://nodejs.org/en">![Node.js version](https://img.shields.io/badge/Node.js-20.11.0-black?logo=nodedotjs)</a>
<a target="_blank" href="https://www.npmjs.com/">![npm Version](https://img.shields.io/badge/npm-10.2.4-black?logo=npm)</a>

</p>
</div>

## 🛠️ Quick Start

```bash
conda activate curve-ai
```

1. **Initialize the project**

```bash
pnpm run init
```

2. **Development mode**

```bash
pnpm run dev
```

Visit [localhost:8099](http://localhost:8099) to view your application

3. **Production build**

```bash
pnpm run build
pnpm run start
```

## 📈 Success Metrics

- Functionality and accuracy in task automation
- User adoption and engagement rates
- Integration success with existing workflows
- Client satisfaction and feedback scores

## 🤝 Join Our Pilot Program

We're currently seeking pilot partners to help validate and refine our solutions. Benefits include:

- Early access to cutting-edge AI solutions
- Customized implementation support
- Reduced pricing for early adopters
- Direct input into product development

## 📚 Documentation

For detailed information about our solutions and implementation guides, visit our [official documentation](https://dev.marblism.com).

## 💬 Support

Need help? We're quick to respond:

- Join our [Discord community](https://discord.gg/GScNz7kAEu)
- Follow us on Twitter [@marblismAI](https://twitter.com/marblismAI)

## 🔒 License

Proprietary software. All rights reserved.

# Curve AI Solutions Web App - Deployment Guide

## Project Overview

This is a modern web application built with:

- React 18 frontend
- Remix framework for server-side rendering
- Prisma for database ORM
- PostgreSQL database
- TailwindCSS for styling
- Docker for containerization
- ZenStack for access control and API generation
- tRPC for type-safe API calls

## Prerequisites for Deployment

- Node.js 20+
- Docker and Docker Compose
- PostgreSQL database
- PNPM package manager

## Local Development Setup

### Environment Setup (Recommended)

For the best development experience, we recommend using Git Bash with a Conda environment:

1. **Create a new conda environment**:
   ```bash
   conda create -n curve-ai nodejs=20 -y
   ```

2. **Activate the environment**:
   ```bash
   conda activate curve-ai
   ```

3. **Install pnpm globally**:
   ```bash
   npm install -g pnpm
   ```

This approach provides an isolated environment with the correct Node.js version and avoids cross-platform issues between Windows and WSL.

### Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/claybowl/Curve-Ai-Solutions-Web-App.git
   cd Curve-Ai-Solutions-Web-App
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a .env file based on .env.template:

   ```bash
   cp .env.template .env
   ```

   Then edit the .env file with your configuration values.

4. Start the development services:

   ```bash
   pnpm run docker:init
   ```

5. Generate ZenStack code and initialize the database:

   ```bash
   pnpm run crud:sync
   pnpm run database:sync:dev
   pnpm run database:seed
   ```

6. Start the development server:
   ```bash
   pnpm run dev
   ```

### Troubleshooting Common Issues

#### ZenStack Schema Generation Issues

If you encounter errors like "Cannot read properties of undefined (reading 'createMany')", run these commands in order:

```bash
pnpm run crud:sync
pnpm run database:sync:dev
```

This regenerates the ZenStack schema and synchronizes the database.

#### Platform Compatibility Issues

When switching between Windows and WSL:

1. Delete node_modules:
   ```bash
   rm -rf node_modules
   ```

2. Reinstall in your current environment:
   ```bash
   pnpm install
   ```

This ensures native modules like esbuild are compiled for the correct platform.

## Production Deployment Options

### 1. Traditional Hosting (VPS/Dedicated Server)

1. Set up a VPS with Ubuntu/Debian
2. Install Node.js 20+, Docker, and PostgreSQL
3. Clone the repository
4. Build the application:
   ```bash
   pnpm run build
   ```
5. Start with PM2 or similar process manager:
   ```bash
   pm2 start npm --name "curve-ai-app" -- start
   ```

### 2. Platform as a Service (PaaS)

#### Deploying to Vercel

1. Connect your GitHub repository to Vercel
2. Set the following:
   - Framework Preset: Remix
   - Build Command: `pnpm run build`
   - Output Directory: `build/`
   - Install Command: `pnpm install`
3. Set up environment variables from your .env file
4. Deploy

#### Deploying to Render

1. Create a new Web Service on Render
2. Connect to your GitHub repository
3. Configure:
   - Build Command: `pnpm install && pnpm run build`
   - Start Command: `pnpm run start`
4. Add your environment variables
5. Deploy

### 3. Docker-based Deployment

This project includes Docker configuration for easy containerized deployment.

1. Build the Docker image:

   ```bash
   docker build -t curve-ai-app .
   ```

2. Run the container:
   ```bash
   docker run -p 8099:8099 --env-file .env curve-ai-app
   ```

### 4. Google Cloud Deployment

This application can be deployed on Google Cloud Platform:

1. **Database**: Use Cloud SQL for PostgreSQL
   - Create a PostgreSQL instance in Google Cloud Console
   - Set up a database named "api"
   - Configure secure access with Cloud SQL Auth Proxy

2. **Web App**: Deploy using Cloud Run (recommended) or App Engine
   - Cloud Run provides a serverless container environment
   - App Engine offers a managed platform for Node.js apps

3. **Environment Variables**: Use Secret Manager for sensitive information

4. **Google Auth**: The existing Google Authentication integration works seamlessly with GCP

## Database Considerations

- For production, use a managed PostgreSQL service (AWS RDS, DigitalOcean Managed Databases, etc.)
- Update your DATABASE_URL in the environment variables
- Run migrations before deployment:
  ```bash
  pnpm run database:sync
  ```

## Environment Variables

Ensure these environment variables are set for production:

- `NODE_ENV=production`
- `BASE_URL` - Your production URL
- `SERVER_AUTHENTICATION_SECRET` - A strong secret key
- `SERVER_DATABASE_URL` - PostgreSQL connection string
- `SERVER_OPENAI_API_KEY` - For AI functionality

## Monitoring and Maintenance

- Set up application monitoring with services like Sentry or New Relic
- Configure regular database backups
- Implement a CI/CD pipeline for automated deployments

## Support

For any deployment issues, please refer to the official documentation or open an issue on GitHub.