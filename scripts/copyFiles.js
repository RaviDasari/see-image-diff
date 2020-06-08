const ncp = require('ncp').ncp;
const {promisify} = require('util');
const { createFolder } = require('./utils');

const prosifiedNcp = promisify(ncp);

module.exports = async function copyFiles(options = {}) {
    const { baseDir, currentDir, destDir } = options;
    createFolder(`${destDir}/base`);
    createFolder(`${destDir}/current`);
    await prosifiedNcp(baseDir, `${destDir}/base`);
    await prosifiedNcp(currentDir, `${destDir}/current`);
}