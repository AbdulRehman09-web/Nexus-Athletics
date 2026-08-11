# Deployment Guide — Nexus Athletics

## 📋 Pre-Deployment Checklist

### Required Services
- [ ] PostgreSQL 15+ database
- [ ] Node.js 20+ runtime
- [ ] Domain name with DNS access
- [ ] SSL certificate (Let's Encrypt or cloud provider)
- [ ] OpenAI API account
- [ ] Email service (SMTP)
- [ ] Optional: Stripe, AWS S3, Redis, Pinecone

### Environment Variables
All variables from `.env.example` must be configured for production.

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
# Multi-stage build for smaller image
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci --production

# Build application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production image
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/nexus_athletics
      - JWT_SECRET=${JWT_SECRET}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - SMTP_HOST=${SMTP_HOST}
      - SMTP_PORT=${SMTP_PORT}
      - SMTP_USER=${SMTP_USER}
      - SMTP_PASSWORD=${SMTP_PASSWORD}
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=nexus_athletics
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

### Deploy Commands
```bash
# Build and start
docker-compose up -d --build

# Run migrations
docker-compose exec app npx prisma migrate deploy

# Seed database
docker-compose exec app npx tsx prisma/seed.ts

# View logs
docker-compose logs -f app
```

## ☁️ Vercel Deployment (Recommended)

### 1. Connect Repository
- Import project in Vercel dashboard
- Select GitHub/GitLab/Bitbucket repo

### 2. Configure Environment Variables
Add all variables from `.env.example` in Vercel project settings:
- `DATABASE_URL` (use Vercel Postgres or external)
- `JWT_SECRET` (generate: `openssl rand -base64 32`)
- `OPENAI_API_KEY`
- `NEXTAUTH_URL` (your production URL)
- `NEXT_PUBLIC_APP_URL` (your production URL)
- SMTP variables
- Optional: Stripe, AWS, Pinecone

### 3. Build Settings
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 4. Deploy
- Automatic on push to main branch
- Preview deployments for PRs

### 5. Post-Deploy
```bash
# Run migrations on production database
npx prisma migrate deploy

# Seed if needed
npx tsx prisma/seed.ts
```

## 🔧 Traditional VPS/Server Deployment

### Server Requirements
- Ubuntu 22.04+ / Debian 12+
- 2+ GB RAM
- 20+ GB disk
- Node.js 20+, PM2, Nginx, PostgreSQL

### Setup Steps

#### 1. System Preparation
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx certbot python3-certbot-nginx
```

#### 2. Database Setup
```bash
sudo -u postgres psql
CREATE DATABASE nexus_athletics;
CREATE USER nexus_user WITH ENCRYPTED PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE nexus_athletics TO nexus_user;
\q
```

#### 3. Application Deploy
```bash
# Clone repo
git clone <repo-url> /var/www/nexus-athletics
cd /var/www/nexus-athletics

# Install dependencies
npm ci --production

# Configure environment
cp .env.example .env
# Edit .env with production values

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database
npx tsx prisma/seed.ts

# Build
npm run build
```

#### 4. PM2 Process Manager
```bash
# Create ecosystem.config.js
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'nexus-athletics',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/nexus-athletics',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 'max',
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    error_file: '/var/log/nexus-athletics/error.log',
    out_file: '/var/log/nexus-athletics/out.log',
    log_file: '/var/log/nexus-athletics/combined.log',
    time: true
  }]
};
EOF

# Create log directory
sudo mkdir -p /var/log/nexus-athletics
sudo chown -R $USER:$USER /var/log/nexus-athletics

# Start app
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 5. Nginx Reverse Proxy
```nginx
# /etc/nginx/sites-available/nexus-athletics
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # Static assets caching
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /public/ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/nexus-athletics /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# SSL with Let's Encrypt
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

#### 6. Firewall
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## 🗄 Database Management

### Migrations
```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Apply to production
npx prisma migrate deploy

# Reset (development only)
npx prisma migrate reset
```

### Backup
```bash
# Backup
pg_dump -U nexus_user -h localhost nexus_athletics > backup_$(date +%Y%m%d).sql

# Restore
psql -U nexus_user -h localhost nexus_athletics < backup_file.sql
```

### Automated Backup (cron)
```bash
# Add to crontab
0 2 * * * pg_dump -U nexus_user nexus_athletics | gzip > /backups/nexus_$(date +\%Y\%m\%d).sql.gz
```

## 🔒 Security Hardening

### Application
- [ ] Strong JWT_SECRET (32+ chars)
- [ ] Secure cookies (HTTPS only)
- [ ] Rate limiting on auth endpoints
- [ ] Input validation (Zod schemas)
- [ ] SQL injection prevention (Prisma)
- [ ] XSS protection (React auto-escaping)
- [ ] CSP headers configured

### Server
- [ ] Firewall configured
- [ ] Fail2ban for SSH
- [ ] Regular security updates
- [ ] Non-root user for app
- [ ] Database user with minimal privileges
- [ ] SSL/TLS with strong ciphers
- [ ] HSTS enabled

### Monitoring
- [ ] Uptime monitoring (UptimeRobot, Pingdom)
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (Vercel Analytics)
- [ ] Database monitoring (pg_stat_statements)
- [ ] Log aggregation (ELK, Loki)

## 📊 Performance Optimization

### Build Optimization
```bash
# Analyze bundle
npm run build && npx @next/bundle-analyzer

# Check for large dependencies
npm run build 2>&1 | grep -E "(Large|Warning)"
```

### Runtime
- Enable Next.js caching
- Configure CDN for static assets
- Database connection pooling (PgBouncer)
- Redis for session caching
- Image optimization (next/image)

## 🔄 CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## 🚨 Troubleshooting

### Common Issues

**Build fails with WebGL errors**
```bash
# Install system dependencies
sudo apt install -y libgl1-mesa-glx libglib2.0-0
```

**Database connection timeout**
- Check DATABASE_URL format
- Verify firewall allows PostgreSQL port
- Check connection pool limits

**Prisma migration fails**
```bash
# Reset and reapply (dev only)
npx prisma migrate reset --force

# Or manually fix migration history
npx prisma migrate resolve --applied "migration_name"
```

**AI chatbot not responding**
- Verify OPENAI_API_KEY is valid
- Check OpenAI API quota
- Review chatbot API logs

**3D scene not loading on mobile**
- Check WebGL support
- Verify reduced motion handling
- Check particle count limits

### Logs
```bash
# PM2 logs
pm2 logs nexus-athletics

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Database logs
sudo tail -f /var/log/postgresql/postgresql-15-main.log
```

## 📞 Support Contacts

- **Vercel Support**: vercel.com/support
- **Prisma Support**: prisma.io/support
- **OpenAI Support**: help.openai.com
- **PostgreSQL Docs**: postgresql.org/docs

---

For questions about this deployment guide, contact the development team.