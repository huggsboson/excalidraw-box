#!/usr/bin/env node

const https = require('https');
const fs = require('fs');

// Read current versions
const versions = JSON.parse(fs.readFileSync('versions.json', 'utf8'));

console.log('🔍 Checking for latest versions...\n');

async function getLatestVersion(packageName) {
  return new Promise((resolve, reject) => {
    const url = `https://registry.npmjs.org/${packageName}/latest`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const pkg = JSON.parse(data);
          resolve(pkg.version);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function checkVersions() {
  try {
    // Check React
    const latestReact = await getLatestVersion('react');
    console.log(`React: ${versions.react} → ${latestReact} ${versions.react === latestReact ? '✅' : '🔄'}`);
    
    // Check ReactDOM  
    const latestReactDom = await getLatestVersion('react-dom');
    console.log(`ReactDOM: ${versions['react-dom']} → ${latestReactDom} ${versions['react-dom'] === latestReactDom ? '✅' : '🔄'}`);
    
    // Check Excalidraw
    const latestExcalidraw = await getLatestVersion('@excalidraw/excalidraw');
    console.log(`Excalidraw: ${versions.excalidraw} → ${latestExcalidraw} ${versions.excalidraw === latestExcalidraw ? '✅' : '🔄'}`);
    
    // Show update commands if needed
    const hasUpdates = versions.react !== latestReact || 
                      versions['react-dom'] !== latestReactDom || 
                      versions.excalidraw !== latestExcalidraw;
    
    if (hasUpdates) {
      console.log('\n📝 To update versions.json:');
      if (versions.react !== latestReact) {
        console.log(`   Edit versions.json: "react": "${latestReact}"`);
      }
      if (versions['react-dom'] !== latestReactDom) {
        console.log(`   Edit versions.json: "react-dom": "${latestReactDom}"`);
      }
      if (versions.excalidraw !== latestExcalidraw) {
        console.log(`   Edit versions.json: "excalidraw": "${latestExcalidraw}"`);
      }
      console.log('\n   Then run: npm run update-versions');
    } else {
      console.log('\n🎉 All dependencies are up to date!');
    }
    
  } catch (error) {
    console.error('❌ Error checking versions:', error.message);
  }
}

checkVersions();