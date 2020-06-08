const Bundler = require('parcel-bundler');
const Path = require('path');

// Single entrypoint file location:
const entryFiles = Path.join(__dirname, '../web/index.html');

let buildOptions = {
    outDir: './dist/see-image-diff',
    outFile: 'index.html',
    publicUrl: '/',
    watch: false,
    bundleNodeModules: true,
    cache: false,
};

async function buildApp(options = {}) {
    console.log('Building app...')
    buildOptions = {
        ...buildOptions,
        outDir: options.destDir ? options.destDir : buildOptions.outDir,
    };
    // Initializes a bundler using the entrypoint location and options provided
    const bundler = new Bundler(entryFiles, buildOptions);

    // Run the bundler, this returns the main bundle
    // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
    const bundle = await bundler.bundle();
    return bundle;
};

// add below code to package.json if running locally
// "staticFiles": {
//     "staticPath": [
//         "screenshots"
//     ]
// }

module.exports = buildApp;