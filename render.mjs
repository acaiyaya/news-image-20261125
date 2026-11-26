import { stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import puppeteer from '/home/hatch/.makefun/shot-tools/node_modules/puppeteer/lib/puppeteer/puppeteer.js';

const documentUrl = new URL('./front.html', import.meta.url);
const outputPath = fileURLToPath(new URL('./entry.png', import.meta.url));

const browser = await puppeteer.launch({
  headless: 'shell',
  args: ['--no-sandbox', '--no-zygote', '--single-process', '--disable-gpu'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 1024, deviceScaleFactor: 1 });
  await page.setOfflineMode(true);
  await page.goto(documentUrl.href, { waitUntil: 'load' });
  await page.screenshot({ path: outputPath, type: 'png' });
  console.log(`entry.png: ${(await stat(outputPath)).size} bytes`);
} finally {
  await browser.close();
}
