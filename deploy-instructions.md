# NC Furniture Website - GitHub Deployment Instructions

## Quick Setup (5 minutes)

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `nc-furniture-website`
3. Description: `North Carolina furniture business website`
4. Make it **Public** (required for free Netlify)
5. ✅ Add README file
6. Click **Create repository**

### Step 2: Upload Files (Option A - Web Interface)
1. Click **uploading an existing file**
2. Drag and drop these files from `C:\Users\Janesh Devkota\nc-furniture-import\`:
   - index.html
   - styles.css
   - script.js
   - images/ (entire folder)
3. Commit message: `Initial website launch with product catalog`
4. Click **Commit changes**

### Step 3: Upload Files (Option B - Git Commands)
If you have Git installed, open terminal in `C:\Users\Janesh Devkota\nc-furniture-import\` and run:

```bash
git init
git add .
git commit -m "Initial website launch with product catalog"
git remote add origin https://github.com/YOUR_USERNAME/nc-furniture-website.git
git branch -M main
git push -u origin main
```

### Step 4: Connect to Netlify
1. Go to https://netlify.com
2. Click **"New site from Git"**
3. Choose **GitHub**
4. Select **nc-furniture-website**
5. Build settings:
   - Build command: (leave empty)
   - Publish directory: (leave empty)
6. Click **Deploy site**

### Step 5: Get Your Live URL
- Netlify will generate a URL like: `amazing-pastry-123456.netlify.app`
- You can customize this to: `nc-furniture-demo.netlify.app`
- Share this URL with your partners!

## Future Updates

When you want updates:
1. Tell Claude what changes you need
2. Claude will provide updated files
3. Upload updated files to GitHub (same process as Step 2)
4. Netlify automatically updates the live site in 30 seconds!

## Repository Structure
```
nc-furniture-website/
├── index.html          # Main website page
├── styles.css          # Website styling
├── script.js           # Interactive functionality
├── README.md           # Project description
└── images/
    └── 07192025/       # Product research photos
        ├── 517318366_...jpg
        ├── 517365290_...jpg
        └── (all other product images)
```

## Support
If you need help with any step, just ask Claude for clarification!