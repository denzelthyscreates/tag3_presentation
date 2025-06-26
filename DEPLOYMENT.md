# GitHub Pages Deployment Guide

## 🚀 Quick Start

Your repository is now configured for GitHub Pages deployment! Follow these steps to get your site live.

## 📋 Prerequisites

- Node.js 18+ installed
- Git installed
- Access to your GitHub repository settings

## 🔧 Step-by-Step Deployment

### Step 1: Merge the Configuration PR

1. Go to your repository: https://github.com/denzelthyscreates/tag3_presentation
2. Review and merge Pull Request #1 "Fix Next.js configuration for GitHub Pages deployment"
3. This adds all necessary configuration files

### Step 2: Enable GitHub Pages

1. **Navigate to Repository Settings**
   - Go to https://github.com/denzelthyscreates/tag3_presentation/settings
   - Click on "Pages" in the left sidebar

2. **Configure Pages Source**
   - Under "Source", select "Deploy from a branch"
   - Choose branch: `main`
   - Choose folder: `/ (root)`
   - Click "Save"

### Step 3: Build and Deploy

#### Option A: Manual Deployment (Recommended)

1. **Clone and setup locally:**
   ```bash
   git clone https://github.com/denzelthyscreates/tag3_presentation.git
   cd tag3_presentation
   npm install
   ```

2. **Build the static export:**
   ```bash
   npm run export
   ```

3. **Deploy the `out` folder to `gh-pages` branch:**
   ```bash
   # Create and switch to gh-pages branch
   git checkout --orphan gh-pages
   
   # Remove all files except the out folder
   git rm -rf .
   
   # Copy contents of out folder to root
   cp -r out/* .
   cp out/.nojekyll .
   
   # Remove the out folder
   rm -rf out
   
   # Commit and push
   git add .
   git commit -m "Deploy static site"
   git push origin gh-pages
   ```

4. **Update GitHub Pages settings:**
   - Go back to Settings → Pages
   - Change source branch to `gh-pages`
   - Keep folder as `/ (root)`

#### Option B: GitHub Actions (Advanced)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run export
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 🌐 Your Live Site

After deployment, your site will be available at:
**https://denzelthyscreates.github.io/tag3_presentation/**

## ✅ Configuration Details

The repository is configured with:

- **basePath**: `/tag3_presentation` - Matches your repository name
- **assetPrefix**: `/tag3_presentation` - Ensures all assets load correctly
- **Static Export**: Generates static HTML/CSS/JS files
- **Jekyll Disabled**: `.nojekyll` file prevents Jekyll processing
- **Image Optimization**: Disabled for static export compatibility

## 🔍 Troubleshooting

### Site not loading?
- Check that GitHub Pages is enabled in repository settings
- Verify the correct branch and folder are selected
- Wait 5-10 minutes for deployment to complete

### Assets not loading?
- Ensure the `basePath` in `next.config.js` matches your repository name exactly
- Check that the `.nojekyll` file exists in your deployment

### Build errors?
- Run `npm install` to ensure all dependencies are installed
- Check that Node.js version is 18 or higher
- Review build logs for specific error messages

## 📝 Making Changes

To update your site:

1. Make changes to your React components in the `app/` folder
2. Test locally with `npm run dev`
3. Build and export with `npm run export`
4. Deploy the new `out` folder contents to your `gh-pages` branch

## 🎯 Next Steps

- Customize the content in `app/page.tsx`
- Add more pages by creating new files in the `app/` directory
- Style your site with CSS modules or Tailwind CSS
- Add images to the `public/` folder (they'll be served from `/tag3_presentation/`)

Your GitHub Pages site is now ready to go! 🎉