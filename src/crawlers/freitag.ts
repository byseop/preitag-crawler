import chromium from 'chrome-aws-lambda';
import cheerio from 'cheerio';
import sleep from '../utils/sleep.js';

export async function getFreitag(url: string) {
  const browser = await chromium.puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    headless: true,
    // defaultViewport: chromium.defaultViewport,
  });

  const page = (await browser.pages())[0];
  const cookies = [
    {
      name: 'datadome',
      value:
        'N8i7hCQguqx_g8eyJ1rvYn9RvuCINaw.wOEFtD5Q8~4tsfIEP_he-.GFz_~1THPk5umI5KUe7ujZJp3I3J0l-7QgunZaA4OUjur1I3_AC_M8nBHHg04vkChO-~ME-6J',
      domain: '.freitag.ch',
    },
  ];
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-gb',
  });
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36',
  );
  await page.setCookie(...cookies);
  await page.setViewport({
    width: 1376,
    height: 786,
  });
  await page.goto(url);
  const $ = cheerio.load(await page.content());
  await sleep(3000);
  await browser.close();
  return $;
}
