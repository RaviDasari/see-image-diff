#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');

async function buildApp(options = {}) {
    console.log('Building app...')
    
    const destDir = options.destDir || './dist';
    const entryFile = path.join(__dirname, '../web/index.html');
    
    try {
        // Use Parcel v2 CLI to build the project
        const command = `npx parcel build --dist-dir ${destDir} ${entryFile} --no-source-maps`;
        console.log(`Running: ${command}`);
        
        execSync(command, { 
            stdio: 'inherit',
            cwd: path.join(__dirname, '..'),
            env: { ...process.env, NODE_ENV: 'production' }
        });
        
        console.log('Build completed successfully!');
        return true;
    } catch (error) {
        console.error('Build failed:', error.message);
        throw error;
    }
};

module.exports = buildApp;

// If this script is run directly (not imported), execute the build
if (require.main === module) {
    buildApp().then(() => {
        console.log('Done !');
    }).catch((e) => {
        console.log(e);
        process.exit(1);
    });
}