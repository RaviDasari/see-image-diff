const Jimp = require('jimp');
const fs = require('fs').promises;
const pSettle = require('p-settle');
const _ = require('lodash');
const chalk = require('chalk');
const SYMBOLS = require('log-symbols');
const {exec} = require('child_process');
const { fileExists, createFolder, emojify } = require('./utils');

const removeOutdatedBaselines = false;
const defaultOptions = {
    baseDir: `screenshots/base`,
    currentDir: `screenshots/current`,
    destDir: `screenshots`,
    reportFileName: 'report.json',
    threshold: 0.1,
};

async function basicSetup(destDir) {
    await createFolder(destDir);
    const diffDir = `${destDir}/diff`;
    await createFolder(diffDir);
}

async function compareImages(options = {}){
    const { baseDir, currentDir, destDir, reportFileName, threshold } = {
        ...defaultOptions,
        ...options,
    };
    await basicSetup(destDir);
    const currentFiles = await fs.readdir(currentDir);

    let data = [];

    const allDiffOps = currentFiles.map(async file => {
        if (file.indexOf('.png') < 0) return;
        const item = {
            file,
            hasBaseline: false,
            hasCurrent: true,
            hasDiff: false,
        }

        // what if the file is not available in baseline?
        if (fileExists(`${baseDir}/${file}`)) {
            const baseline = await Jimp.read(`${baseDir}/${file}`); 
            const current = await Jimp.read(`${currentDir}/${file}`);
            
            const diff = Jimp.diff(baseline, current, threshold);
            if (diff.percent > 0) {
                // fail the test in this case
                item.percent = diff.percent;
                item.hasDiff = true;
                diff.image.write(`${destDir}/diff/${file}`);
            }
            item.hasBaseline = true;
        }
        data.push(item);
    });
    const responses = await pSettle(allDiffOps);

    if (responses.length !== _.filter(responses, {isFulfilled: true}).length) {
        const reasons = _.chain(responses)
            .filter(i=> i.isFulfilled !== true)
            .value();
        // const messages = _.chain(reasons).map('message').uniq().value();
        _.forEach(reasons, console.error);
        exitWithError();
    }
    const baselineFiles = await fs.readdir(baseDir);
    const allRemoveOps = baselineFiles.map(async file => {
        if (file.indexOf('.png') < 0) return;
        if (!_.find(data, {file})) {
            console.log(`DEBUG: file`, file)
            if (removeOutdatedBaselines) {
                await fs.unlink(`${baseDir}/${file}`);
            }
            else {
                // flag all the files that are not in current
                data.push({
                    file,
                    hasBaseline: true,
                    hasCurrent: false,
                    hasDiff: false,
                });
            }
        }
    });
    await pSettle(allRemoveOps);
    await fs.writeFile(`${destDir}/${reportFileName}`, JSON.stringify(data));
    
    return data;
}

const printNewlyAdded = (data) => {
    const count = _.filter(data, {hasBaseline: false, hasCurrent: true}).length;
    if (count > 0) {
        console.log(chalk.green(emojify(`${count} newly added tests :green_heart:`)));
    }
}

const printMissingCurrent = (data) => {
    const count = _.filter(data, {hasBaseline: true, hasCurrent: false}).length;
    if (count > 0) {
        console.log(chalk.yellow(emojify(`${count} tests are missing in latest test run! if they are obselete, use --remove-absolete flag`)));
    }
}

function exitWithError() {
    // console.log(chalk.red('\n\nError !'));
}

//TODO: need a better looking jest stlye errpr reporting instead
function resultHandler(data) {
    _.forEach(data, item => {
        if (item.hasDiff) {
            console.log(chalk.red(SYMBOLS.error + ' ' + item.file));
        }
        else if (!item.hasBaseline) {
            console.log(chalk.blue(SYMBOLS.warning + ' ' + item.file));
        }
        else {
            console.log(chalk.green(SYMBOLS.success + ' ' + item.file));
        }
    });
    console.log('\n');
    printMissingCurrent(data);
    printNewlyAdded(data);

    if (_.some(data, {hasDiff: true})) {
        console.log(chalk.red(emojify(`${_.filter(data, {hasDiff: true}).length} screenshot test(s) failed :imp:`)));
        exitWithError();
    }
    else {
        console.log(chalk.green(emojify(`\n${data.length} screenshot tests passed :ghost:!`)));
    }
}

async function runBuild() {
    console.log('Building app...');
    await exec('yarn run build') // replace it with npm or use parcel bundler
}

module.exports = async function compareImage(options) {
    console.log('\nComparing images...');
    // await runBuild();
    await compareImages(options).then(resultHandler);
}

