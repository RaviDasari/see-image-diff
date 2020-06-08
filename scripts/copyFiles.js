const ncp = require('ncp').ncp;
const {promisify} = require('util');
const { createFolder } = require('./utils');

const promisifiedNcp = promisify(ncp);

module.exports = async function copyFiles(options = {}) {
    const { baseDir, currentDir, destDir } = options;
    createFolder(`${destDir}/base`);
    createFolder(`${destDir}/current`);
    await promisifiedNcp('./dist', `${destDir}`);
    await promisifiedNcp(baseDir, `${destDir}/base`);
    await promisifiedNcp(currentDir, `${destDir}/current`);
}