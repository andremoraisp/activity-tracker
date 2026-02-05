# Quick Setup

## Step 1: Generate PNG Icons

Icons are required to install the PWA. Choose one of the options:

### Option A - Use HTML Generator (Easiest)
1. Open the `create-icons.html` file in your browser
2. Click the buttons to download `icon-192.png` and `icon-512.png`
3. Save the files in the project folder

### Option B - Convert SVG to PNG
Use an online converter or tool:
- **Online**: https://cloudconvert.com/svg-to-png
  - Upload `icon-192.svg` and `icon-512.svg`
  - Download the generated PNGs
  
- **ImageMagick** (if installed):
  ```bash
  magick icon-192.svg icon-192.png
  magick icon-512.svg icon-512.png
  ```

### Option C - Use Temporary Icons
SVG files work in some browsers, but PNG is recommended for better compatibility.

## Step 2: Start the Server

Choose a method to serve the files:

### Python (Recommended)
```bash
cd c:\repos\deadmanSwitch
python -m http.server 8000
```

### Node.js
```bash
cd c:\repos\deadmanSwitch
npx http-server -p 8000
```

### PHP
```bash
cd c:\repos\deadmanSwitch
php -S localhost:8000
```

## Step 3: Access the Application

1. Open your browser at: `http://localhost:8000`
2. The application should load normally
3. To install as PWA:
   - **Chrome/Edge**: Click the installation icon in the address bar
   - **Mobile**: Menu → "Add to Home Screen"

## Step 4: Test

1. Press "Confirm Presence" to start
2. Configure the desired interval (e.g., 5 minutes for testing)
3. Enable notifications if desired
4. Watch the timer counting down
5. Test the stop button to halt monitoring
6. Check statistics with different time ranges

## Troubleshooting

### Service Worker not registering
- Make sure you're using HTTPS or localhost
- Clear browser cache
- Check browser console (F12)

### Icons not appearing
- Make sure you have PNG files (not just SVG)
- Clear cache and reload the page
- Verify file names are correct

### Notifications not working
- Allow notifications when prompted
- Check browser settings
- Some browsers block notifications by default

## Production Deployment

To use in production, you can host on:
- **GitHub Pages**: Free and easy
- **Netlify**: Automatic deployment
- **Vercel**: Native PWA support
- **Firebase Hosting**: Free with SSL

All these services offer HTTPS automatically, which is required for PWAs.
