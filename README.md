# Excalidraw-Box Integration

A seamless integration between Excalidraw (collaborative whiteboarding) and Box (cloud storage) that allows users to create, edit, and auto-save Excalidraw drawings directly from their Box account.

## Features

- 🎨 **Native Excalidraw Editor**: Full-featured drawing experience with all Excalidraw tools
- 💾 **Auto-Save**: Intelligent debouncing saves changes after 5 seconds of inactivity or 60 seconds maximum
- 🖼️ **Image Support**: Embedded images are preserved with base64 encoding
- 🔐 **Secure OAuth**: Uses Box OAuth2 for secure authentication
- 🔄 **Real-time Sync**: Changes are automatically saved back to Box
- 📱 **Toast Notifications**: Native Excalidraw notifications for save status
- 🌐 **Client-Side Only**: No server required - runs entirely in the browser

## Demo

Try it live: [Your GitHub Pages URL]

## Setup Instructions

### 1. Create a Box Application

1. Go to the [Box Developer Console](https://app.box.com/developers/console)
2. Click **"Create New App"**
3. Choose **"Custom App"** and click **"Next"**
4. Select  **"User Authentication (OAuth 2.0)"** and click **"Next"**
5. Give your app a name (e.g., "Excalidraw Integration") and click **"Create App"**

### 2. Configure OAuth Settings

1. In your Box app settings, go to the **"Configuration"** tab
2. Under **"OAuth 2.0 Redirect URI"**, add your domain:
   ```
   https://yourdomain.github.io/excalidraw-box/
   ```
3. Under **"Application Scopes"**, ensure these are checked:
   - ✅ Read all files and folders stored in Box
   - ✅ Write all files and folders stored in Box
4. Under **"CORS Domains"**, add your domain under Allowed origins
   ```
   https://yourdomain.github.io
   ```
5. Under **Box Web Integrations**, you'll create 2 web integrations: "Edit with Excalidraw" and "View with Excalidraw" due to the vagaries of how locking works with Box web integrations.  For each specify
  - Name: "Edit or View with Excalidraw"
  - Description: "Edit or View your diagram in excalidraw"
  - Limit support to specific extentions: "excalidraw"
  - Permissions Requirement: For the Edit flavor select "Full permissions are required", for the View flavor select: "Download permissions are required"
  - Scopes: The file / folder from which this integration was invoked
  - For the Edit flavor select "Lock to only allow the current user..."
  - Client callback url: https://yourusername.github.io/excalidraw-box
  - Prompt: "Your file will now be opened in excalidraw"
  - New window settings: Enable the integration will open in a new tab
  - Callback parameters: 
    - GET fileId #file_id#
    - GET authCode #auth_code#
6. Click **"Save Changes"**


### 3. Get Your Credentials

1. In the **"Configuration"** tab, note down:
   - **Client ID**: Found under "OAuth 2.0 Credentials"
   - **Client Secret**: Found under "OAuth 2.0 Credentials"

### 4. Update the Code

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/excalidraw-box.git
   cd excalidraw-box
   ```

2. See credentials.json.md For instructions on how to setup your credentials

3. Deploy to GitHub Pages or your preferred hosting platform

### 5. Configure Box Integration

1. In Box, go to **Admin Console** → **Apps** → **Custom Apps Manager**
2. Find your app and click **"Authorize"**
3. Go to **Apps** → **App Integrations**
4. Click **"Add Integration"**
5. Fill in the integration details:
   - **Name**: Excalidraw Editor
   - **Description**: Edit drawings with Excalidraw
   - **Integration URL**: `https://yourdomain.github.io/excalidraw-box/`
   - **File Extensions**: `.excalidraw`
   - **Supported Integrations**: ✅ Open With

## Usage

### Creating a New Drawing

1. In Box, click **"New"** → **"More"** → **"Excalidraw Drawing"** (if configured)
2. Or create any file with `.excalidraw` extension and open it

### Editing Existing Drawings

1. Right-click any `.excalidraw` file in Box
2. Select **"Open With"** → **"Excalidraw Editor"**
3. The drawing will open in the integrated editor

### Auto-Save Behavior

- Changes are automatically detected and saved
- Saves occur after **5 seconds** of inactivity
- Maximum save interval is **60 seconds** (even during continuous editing)
- Save status is shown via toast notifications
- Embedded images are preserved with full fidelity

## Technical Details

### Architecture

- **Frontend**: Single HTML file with CDN dependencies
- **Drawing Engine**: Excalidraw 0.18.0 (configurable in versions.json)
- **Authentication**: Box OAuth 2.0
- **Storage**: Box Content API
- **Image Handling**: Base64 encoding for embedded files
- **Deployment**: GitHub Actions with credential injection

### File Format

Drawings are saved as JSON files with the structure:
```json
{
  "type": "excalidraw",
  "version": 2,
  "elements": [...],
  "appState": {...},
  "files": {
    "fileId": {
      "dataURL": "data:image/png;base64,..."
    }
  }
}
```

### Browser Support

- Modern browsers with ES6 module support
- Chrome 61+, Firefox 60+, Safari 11+, Edge 16+

## Development

### Local Development

1. Clone the repository
2. Serve the files over HTTPS (required for Box OAuth):
   ```bash
   npx http-server -S -p 8080
   ```
3. Update Box OAuth redirect URI to `https://localhost:8080`

### File Structure

```
excalidraw-box/
├── index.html          # Main application file
├── README.md          # This file
└── .gitignore         # Git ignore rules
```

## Troubleshooting

### Common Issues

**"No authorization code" error**
- Ensure you're launching from Box using "Open With"
- Check that OAuth redirect URI matches exactly

**Images not saving/loading**
- Verify file permissions in Box
- Check browser console for serialization errors

**Authentication failures**
- Confirm Client ID and Secret are correct
- Ensure app is authorized in Box Admin Console

### Debug Mode

Add `?debug=true` to the URL to enable verbose console logging:
```
https://yourdomain.github.io/excalidraw-box/?debug=true&fileId=123&authCode=abc
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with your Box integration
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

- 📧 Create an issue on GitHub
- 📖 Check Box Developer Documentation
- 🎨 Refer to Excalidraw Documentation

---

Built with ❤️ using [Excalidraw](https://excalidraw.com/) and [Box Platform](https://developer.box.com/)