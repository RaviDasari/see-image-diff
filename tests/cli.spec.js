import Promise from 'bluebird'
import cmd from 'node-cmd'
import rimraf from 'rimraf'
import expectedReport from './data/report.json'
import StaticServer from 'static-server';
import puppeteer from 'puppeteer';
import _ from 'lodash';

const runCommand = Promise.promisify(cmd.get, { multiArgs: true, context: cmd })

const server = new StaticServer({
    rootPath: __dirname + '/../temp',            // required, the root of the server file tree
    port: 3000,               // required, the port to listen
    //   name: 'my-http-server',   // optional, will set "X-Powered-by" HTTP header
    //   host: '10.0.0.100',       // optional, defaults to any interface
    cors: '*',                // optional, defaults to undefined
    followSymlink: true,      // optional, defaults to a 404 error
});

let browser;

const startServer = () => {
    return new Promise((resolve, reject) => {
        server.start(() => {
            resolve([]);
        });
    });
}

describe('CLI', function () {
    beforeAll(async () => {
        // cleanup temp folder
        rimraf(__dirname + '/../temp', () => {
            // console.log('Cleaned up temp folder')
        });
        browser = await puppeteer.launch({
            // headless: false,
            // args: ['--start-fullscreen']
        });
        // rimraf(__dirname + '/../dist', () => {
        //     console.log('Cleaned up dist folder')
        // })
        // await runCommand('npm run build-ci');
    })

    afterAll(() => {
        try {
            server.stop();
            browser.close();
        } catch (e) {
            console.log(e)
        }

    })
    test('help', async () => {
        const results = await runCommand('./bin.js --help');
        expect(results).toMatchSnapshot();
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
        // order could change, so we need to assert each item separately
        const expectedData = [
            'Comparing images...',
            '⚠ duck duck go search.png',
            '✖ google.png',
            '✔ duck duck go.png',
            '✖ google batman.png',
            '✔ duck duck go obsolete.png',
            '1 tests are missing in latest test run! if they are obselete, use --remove-absolete flag',
            '1 newly added tests 💚',
            '2 screenshot test(s) failed 👿',
            'Successfully done comparing images!',
            'Successfully done copying files!',
        ];
        _.forEach(expectedData, i => {
            expect(resultString).toContain(i);
        });

        const generatedRport = require('../temp/report.json');
        _.forEach(expectedReport, item => {
            const newItem = _.find(generatedRport, { file: item.file });
            expect(item).toEqual(newItem);
        });

    }); //, 10 * 1000) // 1 min

    test('home page', async () => {
        await startServer();
        const page = await browser.newPage();
        await page.goto('http://localhost:3000');
        await page.setViewport({ width: 1080, height: 768 })
        const image = await page.screenshot();
        // expect(image).toMatchImageSnapshot();
    });

    test('navigation', async (done) => {
        const page = await browser.newPage()

        await page.goto('http://localhost:3000/')
        await page.setViewport({ width: 1080, height: 768 })

        await page.waitForSelector('.thumbnail-0 .euiCard__content')
        await page.click('.thumbnail-0 .euiCard__content')

        await page.waitForSelector('#portals > div > #image-viewer > .right')
        await page.click('#portals > div > #image-viewer > .right')

        await page.waitForSelector('#portals > div > #image-viewer > .left')
        await page.click('#portals > div > #image-viewer > .left')

        await page.waitForSelector('#portals > div > #image-viewer > .left')
        await page.click('#portals > div > #image-viewer > .left')

        await page.waitForSelector('#portals > div > #image-viewer > .close')
        await page.click('#portals > div > #image-viewer > .close')

        await page.waitForSelector('.euiHeaderSection > .euiHeaderSectionItem > .euiTabs > .euiTab:nth-child(2) > .euiTab__content')
        await page.click('.euiHeaderSection > .euiHeaderSectionItem > .euiTabs > .euiTab:nth-child(2) > .euiTab__content')

        await page.waitForSelector('.euiHeaderSection > .euiHeaderSectionItem > .euiTabs > .euiTab:nth-child(3) > .euiTab__content')
        await page.click('.euiHeaderSection > .euiHeaderSectionItem > .euiTabs > .euiTab:nth-child(3) > .euiTab__content')

        await page.waitForSelector('.euiCard__top > .euiCard__image > div > div > img')
        await page.click('.euiCard__top > .euiCard__image > div > div > img')

        await page.waitForSelector('.thumbnail-0 .euiCard__content')
        await page.click('.thumbnail-0 .euiCard__content')

        await page.waitForSelector('#portals > div > #image-viewer > .close')
        await page.click('#portals > div > #image-viewer > .close')

        await page.waitForSelector('.euiHeaderSection > .euiHeaderSectionItem > .euiTabs > .euiTab:nth-child(4) > .euiTab__content')
        await page.click('.euiHeaderSection > .euiHeaderSectionItem > .euiTabs > .euiTab:nth-child(4) > .euiTab__content')

        await page.waitForSelector('.euiCard__top > .euiCard__image > div > div > img')
        await page.click('.euiCard__top > .euiCard__image > div > div > img')

        await page.waitForSelector('.thumbnail-0 .euiCard__content')
        await page.click('.thumbnail-0 .euiCard__content')

        await page.waitForSelector('#portals > div > #image-viewer > .close')
        await page.click('#portals > div > #image-viewer > .close')

        done();
    }, 2 * 60 * 1000) // give it 2 minutes to finish this
});