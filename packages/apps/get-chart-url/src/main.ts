import 'tslib'
import { http } from '@google-cloud/functions-framework'
import * as puppeteer from 'puppeteer'

const getChartUrl = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  })

  try {
    const page = await browser.newPage();
    await page.goto('https://www.github.com')
    await page.waitForSelector('img.home-astro-mona.width-full')

    const url = await page.$eval('img.home-astro-mona.width-full', (image: HTMLImageElement) => image.src)

    return url
  } catch (e) {
    throw e;
  }
}

http('get-chart-url',async (req, res) => res.send('ok! ' + await getChartUrl()))
