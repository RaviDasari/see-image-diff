#!/usr/bin/env node
const commandLineUsage = require('command-line-usage')
const commandLineArgs = require('command-line-args')
const compareImages = require('./scripts/compareImages');
// const buildApp = require('./scripts/buildApp')
const copyFiles = require('./scripts/copyFiles')

const optionList = [
    {
        name: 'baseDir',
        alias: 'b',
        typeLabel: '{underline folder}',
        description: 'Baseline images folder used for comparison. Should be flat list of image files. Can contain a {italic thumbnail} folder with same image names.',
        isRequired: true,
    },
    {
        name: 'currentDir',
        alias: 'c',
        typeLabel: '{underline folder}',
        description: 'Current images folder used for comparison. Should be flat list of image files. Can contain a {italic thumbnail} folder with same image names.',
        isRequired: true,
    },
    {
        name: 'destDir',
        alias: 'd',
        typeLabel: '{underline folder}',
        description: 'Destination folder to same all the diff images. Utility will overwrite any existing files in this locaiton.',
        isRequired: true,
    },
    {
        name: 'threshold',
        alias: 't',
        typeLabel: '{underline number}',
        description: '({italic Optional}) Defaults to {italic 0.1}. Ranges 0-1.',
        type: Number
    },
    {
        name: 'reportFileName',
        typeLabel: '{underline filename}',
        description: '({italic Optional}) Defaults to {italic report.json}.'
    },
    {
        name: 'help',
        alias: 'h',
        description: 'Print usage',
        type: Boolean
    }
];

const sections = [
    {
        header: 'Image comparison utility',
        content: `It takes two folders, {italic base} and {italic current} full of images with same {bold names} and ganarates a {bold diff} folder in given destination location with the same {bold names}. Also, it generates a {bold JSON} blob and a {italic neat} web app to navigate through this image files. It uses {italic jimp} npm module to compare the images.`
    },
    {
        header: 'Synopsis',
        content: [
            '$ see-image-diff {bold --baseDir} {underline ./base} {bold --currentDir} {underline ./current} {bold --destDir} {underline ./diff} [{bold --reportFileName} {underline "results.json"}]',
            '$ see-image-diff {bold --help}'
        ]
    },
    {
        header: 'Options',
        optionList,
    },
];


function validateOptions(options = {}) {
    let isValid = true;
    optionList.forEach(option => {
        if(option.isRequired && !options.hasOwnProperty(option.name)) {
            console.log(`Param "${option.name}" isRequired`);
            isValid = false;
        }
    })

    return isValid;
}

function parseArgs() {
    try {
        let options = commandLineArgs(optionList)
        return options;
    }
    catch(e) {
        console.log(e)
        console.log('\nUsage:');
        printUsage();
        process.exit(1);
    }
}

function printUsage() {
    const usage = commandLineUsage(sections);
    console.log(usage)
}

function runAyncFunc(message, runner) {
    return runner().then(() => {
        console.log(`Successfully done ${message}`);
    }).catch(e => {
        console.error(`Failed ${message}`);
        console.error(e);
    });
}

async function runActions(options) {
    await runAyncFunc('comparing images!', () => compareImages(options));
    // await runAyncFunc('building App!', () => buildApp(options));
    await runAyncFunc('copying files!', () => copyFiles(options))
    process.exit(0);
}

function main() {
    const options = parseArgs();
    if (options.debug) {
        console.log(JSON.stringify(options));
    }
    if (options.help) {
        printUsage();
    }
    else {
        if (validateOptions(options)) {
            runActions(options).catch(e => {
                console.log('Failed: ' + e);
            });
        }
        else {
            console.log('Run with --help option for more info.')
            process.exit(1);
        }
    }
}


main();

//ex: ./bin.js --baseDir screenshots1/base --currentDir screenshots1/current --destDir dist
