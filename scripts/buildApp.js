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
        
        // In test environment, suppress verbose output
        const isTestEnv = process.env.SEE_IMAGE_DIFF_NODE_ENV === 'test';
        const stdio = isTestEnv ? 'pipe' : 'inherit';
        
        const result = execSync(command, { 
            stdio: stdio,
            cwd: path.join(__dirname, '..'),
            env: { ...process.env, NODE_ENV: 'production' }
        });
        
        // In test environment, only show errors if any
        if (isTestEnv && result && result.toString().toLowerCase().includes('error')) {
            console.error('Build output contained errors:', result.toString());
        }
        
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