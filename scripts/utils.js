const fs = require('fs').promises;
const oldFs = require('fs');
const emoji = require('node-emoji');

function fileExists(file) {
    try {
        const flag = oldFs.existsSync(file);
        return flag;
    }
    catch(e) {
        console.log(`fileExists: `, e)
        return false;
    }
}

async function createFolder(dir) {
    if (!oldFs.existsSync(dir)){
        await fs.mkdir(dir, { recursive: true });
    }
}

const isJenkins = false;

function emojify(str) {
    if (isJenkins) {
        return str;
    }
    return emoji.emojify(str);
}

module.exports = {
    fileExists,
    createFolder,
    emojify,
}