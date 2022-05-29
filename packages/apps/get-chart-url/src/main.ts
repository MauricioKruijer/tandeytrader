import 'tslib'
import { http } from '@google-cloud/functions-framework'
import * as puppeteer from 'puppeteer'

const enableDarkCharts = async (page) => {
  await page.waitForSelector('div.layout__area--topleft div[data-role="button"]')
  await page.click('div.layout__area--topleft div[data-role="button"]')
  await page.waitForSelector('#theme-switcher')
  await page.click('#theme-switcher')
}

const getChartUrl = async (chartId: string) => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  })

  return new Promise( async (resolve, reject) => {
    const timer = setTimeout(() => {
      browser.close()
      reject({error: 'Took too long to get url'})
    }, 30 * 1000)

    try {
      const tradingview = await browser.newPage()
      await tradingview.goto(`https://www.tradingview.com/chart/${chartId}/`, {
        waitUntil: 'networkidle2',
        timeout: 0
      })

      const currentTheme = await tradingview.evaluate(() => localStorage.getItem('tradingview.current_theme.name'))

      if (currentTheme === 'light') {
        await enableDarkCharts(tradingview)
      }

      tradingview.on('popup', async(newTab) => {
        await newTab.waitForSelector('main > img')
        const url = await newTab.$eval('main > img', (image: HTMLImageElement) => image.src)

        browser.close()
        clearTimeout(timer)
        resolve(url)
      })

      await tradingview.click('#header-toolbar-screenshot')
      await tradingview.click('div[data-name="open-image-in-new-tab"]')
    } catch (e) {
      browser.close()
      reject(e)
    }
  })
}

http('get-chart-url', async (req, res) => {
  let data = {}
  try {
    if (req.method !== 'POST') {
      const error = new Error('Only POST requests are accepted')
      throw error
    }

    data = {url: await getChartUrl(req.body.chartId)}
  } catch(e) {
    console.log(e)
    data = {error: 'something went wrong'}
  } finally {
    return res.status(200).send(data);
  }
})
