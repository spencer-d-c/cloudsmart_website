# CloudSmart Website Deployment Guide

## 🚀 Quick Deployment

Your LXD container is perfectly set up! Here's how to deploy:

### Step 1: Upload the Code

From your local machine, push the code to your GitHub repository, then on the container:

```bash
# Stop current app
sudo pkill -f "node /var/www/app-server.js"

# Backup current setup
sudo mv /var/www/app /var/www/app-backup-$(date +%Y%m%d) 2>/dev/null || true
sudo mv /var/www/app-server.js /var/www/app-server.js.backup 2>/dev/null || true

# Clone new application
cd /var/www
sudo git clone YOUR_GITHUB_REPO_URL app
cd app

# Install dependencies
sudo npm install
```

### Step 2: Set Up Environment

```bash
# Create production environment file
sudo cp .env.local .env.production

# Edit with your database password (you'll need the appuser password)
sudo nano .env.production
```

**Required .env.production settings:**
```env
DATABASE_URL=postgresql://appuser:YOUR_APPUSER_PASSWORD@localhost:5432/appdb
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_EMAIL=admin@cloudsmart.com
ADMIN_PASSWORD=your-secure-admin-password
UPLOAD_DIR=./public/uploads
NEXT_PUBLIC_SITE_URL=https://cloudsmart.com
NODE_ENV=production
```

### Step 3: Database Setup

```bash
# Get the appuser password first
sudo -u postgres psql -c "\\du" # Check if appuser exists
# If you need to set/reset the appuser password:
# sudo -u postgres psql -c "ALTER USER appuser PASSWORD 'your-password';"

# Run migrations
sudo npm run db:migrate

# Seed with initial data
sudo npm run db:seed

# Create upload directories
sudo mkdir -p public/uploads/team public/uploads/blog
sudo chown -R www-data:www-data public/uploads
```

### Step 4: Build & Deploy

```bash
# Build the application
sudo npm run build

# Install PM2 if not present
sudo npm install -g pm2

# Start the application
sudo pm2 start npm --name "cloudsmart" -- start

# Save PM2 configuration
sudo pm2 save
sudo pm2 startup
```

### Step 5: Verify Deployment

1. Visit `https://cloudsmart.com` - should show the new homepage
2. Visit `https://cloudsmart.com/admin` - should show login page
3. Login with your admin credentials
4. Check that all pages load correctly

## 🔧 Admin Access

- **URL**: `https://cloudsmart.com/admin`
- **Default Login**: Use the credentials you set in .env.production

## 📋 Quick Commands

```bash
# View logs
sudo pm2 logs cloudsmart

# Restart application
sudo pm2 restart cloudsmart

# Stop application
sudo pm2 stop cloudsmart

# Check status
sudo pm2 status

# View NGINX logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## 🎯 What You Get

✅ **Complete CloudSmart website recreation**
✅ **Full admin panel for content management**  
✅ **All team member profiles**
✅ **Blog system with markdown support**
✅ **Job listings management**
✅ **Responsive, modern design**
✅ **SEO optimized**
✅ **Secure authentication**

## 🔄 Making Updates

After initial deployment, to update the site:

```bash
cd /var/www/app
sudo git pull origin main
sudo npm install
sudo npm run build
sudo pm2 restart cloudsmart
```

## 🎉 You're Done!

Your CloudSmart website is now live with a powerful admin panel. The site visually matches your original WordPress site but is now built on modern, maintainable technology.

The admin panel at `/admin` gives you full control over:
- Team member profiles
- Blog posts  
- Job listings
- All content management

Enjoy your new, modern CloudSmart website! 🚀