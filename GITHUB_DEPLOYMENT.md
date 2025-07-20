# 🚀 GitHub Deployment Guide

## Your Repository
**GitHub URL**: [https://github.com/staylegitlonewolf/Template1.git](https://github.com/staylegitlonewolf/Template1.git)

## Step 1: Initialize Git Repository

```bash
# Initialize git in your project directory
git init

# Add your GitHub repository as remote
git remote add origin https://github.com/staylegitlonewolf/Template1.git

# Add all files to git
git add .

# Create initial commit
git commit -m "Initial commit: Wix Studio Headless Authentication"

# Push to GitHub
git push -u origin main
```

## Step 2: Set Up GitHub Pages

1. **Go to your repository**: [https://github.com/staylegitlonewolf/Template1](https://github.com/staylegitlonewolf/Template1)

2. **Navigate to Settings** → **Pages**

3. **Configure GitHub Pages**:
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/ (root)`
   - **Click Save**

4. **Your site will be available at**: `https://staylegitlonewolf.github.io/Template1/`

## Step 3: Update Wix Studio OAuth Settings

Since you're deploying to GitHub Pages, you need to update your Wix Studio OAuth app to allow your GitHub Pages domain:

1. **Go to Wix Studio Dashboard**: https://www.wix.com/studio
2. **Navigate to your site**: `my-studio-headless`
3. **Go to Headless Settings** → **OAuth Apps**
4. **Edit your OAuth app**: `Wix Studio Headless Auth`
5. **Add to Allowed Redirect Domains**:
   - `staylegitlonewolf.github.io`
   - `*.github.io` (already added)

## Step 4: Build for Production

```bash
# Install dependencies
npm install

# Build the project
npm run build

# The build output will be in the `.next` folder
```

## Step 5: Configure for Static Export

Since GitHub Pages serves static files, we need to configure Next.js for static export. Update your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_WIX_CLIENT_ID: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
    NEXT_PUBLIC_WIX_SITE_ID: process.env.NEXT_PUBLIC_WIX_SITE_ID,
  },
}

module.exports = nextConfig
```

## Step 6: Update Package.json Scripts

Add a build script for GitHub Pages:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "export": "next build && next export",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## Step 7: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build project
      run: npm run build
      env:
        NEXT_PUBLIC_WIX_CLIENT_ID: ${{ secrets.NEXT_PUBLIC_WIX_CLIENT_ID }}
        NEXT_PUBLIC_WIX_SITE_ID: ${{ secrets.NEXT_PUBLIC_WIX_SITE_ID }}
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

## Step 8: Set Up GitHub Secrets

1. **Go to your repository Settings** → **Secrets and variables** → **Actions**
2. **Add the following secrets**:
   - `NEXT_PUBLIC_WIX_CLIENT_ID`: `1e064af1-97ee-4c5a-8631-8f951b2f0b15`
   - `NEXT_PUBLIC_WIX_SITE_ID`: `5b2c9f91-0e9c-4f31-914c-55943f6483dc`

## Step 9: Deploy

```bash
# Push your changes
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

## 🎉 Your Live Site

After deployment, your Wix Studio Headless authentication site will be live at:
**https://staylegitlonewolf.github.io/Template1/**

## 🔧 Troubleshooting

### Common Issues:

1. **Build Errors**: Check GitHub Actions logs
2. **Authentication Not Working**: Verify OAuth app settings
3. **404 Errors**: Ensure `trailingSlash: true` in next.config.js
4. **Environment Variables**: Check GitHub Secrets are set correctly

### Local Testing:

```bash
# Test production build locally
npm run build
npm run start
```

## 📱 Features Available

✅ **OAuth Authentication** with Wix Studio  
✅ **User Registration** and Login  
✅ **Session Management**  
✅ **Responsive Design**  
✅ **GitHub Pages Hosting**  
✅ **Automatic Deployment** via GitHub Actions  

---

**Your Wix Studio Headless authentication system will be live on GitHub Pages! 🚀** 