# Setup Guide

Simple setup instructions for the Excalidraw-Box integration.

## Quick Setup

### 1. GitHub Repository Setup

```bash
# Clone or fork this repository
git clone https://github.com/yourusername/excalidraw-box.git
cd excalidraw-box
```

### 2. Set GitHub Secrets

1. Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**
2. Add these repository secrets:
   - `BOX_CLIENT_ID`: Your Box application's client ID
   - `BOX_CLIENT_SECRET`: Your Box application's client secret

### 3. Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Set **Source** to: **"GitHub Actions"**
3. The site will automatically deploy when you push to the main branch

### 4. Box Application Setup

Follow the main README.md for detailed Box app configuration instructions.

## Development

### Local Development

```bash
# Simple HTTP server for basic testing
npm run dev
# Opens at http://localhost:8080

# Check for dependency updates
npm run check-versions

# Update dependencies (edit versions.json first)
npm run update-versions
```

### HTTPS Development (for Box OAuth)

Box OAuth requires HTTPS. For local testing:

```bash
# Generate self-signed certificate
openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365

# Use Python HTTPS server or similar
python3 -m http.server 8443 --bind 127.0.0.1 --certfile cert.pem --keyfile key.pem
```

Then update your Box app's OAuth redirect URI to `https://127.0.0.1:8443`

## Version Management

### Updating Dependencies

1. **Check latest versions**:
   ```bash
   npm run check-versions
   ```

2. **Edit versions.json**:
   ```json
   {
     "react": "19.0.0",
     "react-dom": "19.0.0",
     "excalidraw": "0.19.0"
   }
   ```

3. **Update HTML file**:
   ```bash
   npm run update-versions
   ```

4. **Test and deploy**:
   ```bash
   npm run dev  # test locally
   git add . && git commit -m "Update Excalidraw to 0.19.0"
   git push     # auto-deploys
   ```

### Version Files

- `versions.json` - Single source of truth for dependency versions
- `update-versions.js` - Automatically updates CDN URLs in index.html
- `check-versions.js` - Checks npm registry for latest versions

## Deployment

### Automatic Deployment

- Push to `main` branch → GitHub Actions automatically deploys
- Credentials are injected from GitHub Secrets during deployment
- No build process needed - just credential replacement

### Manual Deployment

1. Go to **Actions** tab in GitHub
2. Select **"Deploy to GitHub Pages"**
3. Click **"Run workflow"**

## File Structure

```
excalidraw-box/
├── index.html              # Main application (template with {{placeholders}})
├── versions.json           # Dependency versions
├── update-versions.js      # Version management script
├── check-versions.js       # Version checking script
├── package.json           # Scripts and metadata
├── .github/workflows/
│   └── deploy.yml         # GitHub Actions deployment
└── README.md              # User documentation
```

## Troubleshooting

### Development Issues

**Credentials not working locally**:
- For local testing, manually replace `{{BOX_CLIENT_ID}}` in index.html
- Or use `sed` to replace them temporarily

**HTTPS certificate errors**:
- Use `--insecure` flag in browsers for self-signed certs
- Or install the certificate in your system's trust store

### Deployment Issues

**GitHub Actions failing**:
- Check that GitHub Secrets are set correctly
- Verify the secret names match exactly: `BOX_CLIENT_ID`, `BOX_CLIENT_SECRET`

**Box integration not working after deployment**:
- Check browser developer console for errors
- Verify Box OAuth redirect URI matches your GitHub Pages URL exactly
- Ensure Box app is authorized in Box Admin Console

### Version Management Issues

**Script errors when updating versions**:
- Ensure Node.js is installed for running the scripts
- Check that `versions.json` has valid JSON syntax

**CDN URLs not updating**:
- Verify the regex patterns in `update-versions.js` match your HTML
- Check that all CDN URLs follow the expected format

## Security Notes

- GitHub Secrets are encrypted and only accessible during Actions
- Credentials are injected into the deployed site (safe for static hosting)
- Never commit actual credentials to the repository
- Use `npm run validate` to check for placeholder credentials before deployment