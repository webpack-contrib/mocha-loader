/* global page, document */

import path from 'path';
import { promisify } from 'util';
import { once } from 'events';

import puppeteer from 'puppeteer';
import express from 'express';

import {
  compile,
  getCompiler,
  normalizeErrors,
  readAsset,
  htmlWithScript,
} from './helpers';

const loaderPath = path.join(__dirname, '../src');
const testFileFixturePath = require.resolve('./fixtures/test-file.js');
const getElementText = (el) =>
  el.getProperty('textContent').then((handle) => handle.jsonValue());

describe('mocha-loader', () => {
  const disposables = new Set();

  afterEach(async () => {
    await Promise.all(Array.from(disposables).map((d) => d()));
    disposables.clear();
  });

  it('executes mocha tests when evaluating bundle in browser', async () => {
    // bundle using loader
    const compiler = getCompiler(`${loaderPath}!${testFileFixturePath}`);
    const stats = await compile(compiler);

    const { errors, warnings } = stats.compilation;

    expect(normalizeErrors(warnings)).toMatchSnapshot('warnings');
    expect(normalizeErrors(errors)).toMatchSnapshot('errors');

    // serve bundle result
    const bundleFileName = 'main.bundle.js';
    const outputBundleText = readAsset(bundleFileName, compiler, stats);
    const app = express();
    app.get('/', (_req, res) => res.end(htmlWithScript(bundleFileName)));
    app.get(`/${bundleFileName}`, (_req, res) => res.end(outputBundleText));

    const httpServer = app.listen(3000);
    await once(httpServer, 'listening');
    disposables.add(promisify(httpServer.close.bind(httpServer)));

    // start browser and open test page
    const browser = await puppeteer.launch({ devtools: false, timeout: 5000 });
    disposables.add(() => browser.close());
    const [page] = await browser.pages();
    const pageErrors = [];
    page.on('pageerror', (e) => pageErrors.push(e));
    await page.goto('http://localhost:3000/');
    expect(pageErrors).toHaveLength(0);

    const passesEl = await page.waitForSelector('#mocha-stats .passes');
    const passes = await getElementText(passesEl);

    const failuresEl = await page.waitForSelector('#mocha-stats .failures');
    const failed = await getElementText(failuresEl);

    expect(passes).toContain('passes: 1');
    expect(failed).toContain('failures: 1');
  });
});
