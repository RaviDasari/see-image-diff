import cmd from 'node-cmd'
import { rimraf } from 'rimraf'
import expectedReport from './data/report.json'
import _ from 'lodash';

const runCommand = (command) => {
    return new Promise((resolve, reject) => {
        cmd.run(command, (err, data, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

describe('CLI Basic Tests', function () {
    beforeAll(async () => {
        // cleanup temp folder
        try {
            await rimraf(__dirname + '/../temp');
        } catch (e) {
            // ignore if folder doesn't exist
        }
    })

    test('help', async () => {
        const results = await runCommand('./bin.js --help');
        expect(results).toContain('Image comparison utility');
        expect(results).toContain('--baseDir');
        expect(results).toContain('--currentDir');
        expect(results).toContain('--destDir');
    })

    test('required options', async () => {
        expect.assertions(1);
        try {
            await runCommand('./bin.js');
        }
        catch (e) {
            expect(e).toBeDefined();
        }
    })

    test('generate diff images and copy dist files', async () => {
        const results = await runCommand('./bin.js -b tests/data/baseline -c tests/data/current -d temp');
        const resultString = _.isArray(results) ? _.first(results) : results;
        
        // Debug: log the actual output in case of CI issues
        if (process.env.CI || process.env.GITHUB_ACTIONS) {
            console.log('=== CLI OUTPUT DEBUG ===');
            console.log('Type:', typeof resultString);
            console.log('Length:', resultString ? resultString.length : 'null/undefined');
            console.log('Content:', JSON.stringify(resultString));
            console.log('=== END DEBUG ===');
        }
        
        // order could change, so we need to assert each item separately
        const expectedData = [
            'Comparing images...',
            'Successfully done comparing images!',
            // 'Successfully done copying files!',
            'Successfully done building App!',
        ];
        _.forEach(expectedData, i => {
            expect(resultString).toContain(i);
        });

        const generatedRport = require('../temp/report.json');
        expect(generatedRport).toBeDefined();
        expect(Array.isArray(generatedRport)).toBe(true);
    }, 30000); // 30 second timeout
});