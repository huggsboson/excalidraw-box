#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read versions from versions.json
const versionsPath = path.join(__dirname, 'versions.json');
const versions = JSON.parse(fs.readFileSync(versionsPath, 'utf8'));

// Read the HTML template
const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

console.log('🔄 Updating dependency versions in index.html...\n');

// Update React version (ESM.sh)
const oldReactPattern = /https:\/\/esm\.sh\/react@[\d.]+/g;
const newReactUrl = `https://esm.sh/react@${versions.react}`;
html = html.replace(oldReactPattern, newReactUrl);
console.log(`✅ React: ${versions.react}`);

// Update ReactDOM version (ESM.sh)
const oldReactDomPattern = /https:\/\/esm\.sh\/react-dom@[\d.]+/g;
const newReactDomUrl = `https://esm.sh/react-dom@${versions['react-dom']}`;
html = html.replace(oldReactDomPattern, newReactDomUrl);
console.log(`✅ ReactDOM: ${versions['react-dom']}`);

// Update Excalidraw version (ESM.sh)
const oldExcalidrawPattern = /https:\/\/esm\.sh\/@excalidraw\/excalidraw@[\d.]+/g;
const newExcalidrawUrl = `https://esm.sh/@excalidraw/excalidraw@${versions.excalidraw}`;
html = html.replace(oldExcalidrawPattern, newExcalidrawUrl);
console.log(`✅ Excalidraw: ${versions.excalidraw}`);

// Write back to file
fs.writeFileSync(htmlPath, html, 'utf8');

console.log('\n🎉 All versions updated in index.html!');
console.log('\n💡 Next steps:');
console.log('   1. Test locally: npm run dev');
console.log('   2. Commit changes: git add . && git commit -m "Update dependencies"');
console.log('   3. Push to deploy: git push');
