import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs'

const outDir = 'C:/Users/Admin/Desktop/metrum-screenshots'
fs.mkdirSync(outDir, { recursive: true })

const pages = [
  { url: 'http://localhost:5173/', name: '01-priemka' },
  { url: 'http://localhost:5173/finishing', name: '02-otdelka' },
  { url: 'http://localhost:5173/projects', name: '03-nashi-raboty' },
  { url: 'http://localhost:5173/privacy', name: '04-privacy' },
  { url: 'http://localhost:5173/terms', name: '05-terms' },
]

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
})
const page = await context.newPage()

for (const item of pages) {
  console.log('shot', item.name)
  await page.goto(item.url, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(1500)
  await page.addStyleTag({
    content: '*,*::before,*::after{animation:none!important;transition:none!important}',
  })
  await page.evaluate(() => {
    document.querySelectorAll('*').forEach((el) => {
      const style = window.getComputedStyle(el)
      if (style.opacity !== '1') el.style.opacity = '1'
      if (style.transform !== 'none') el.style.transform = 'none'
    })
  })
  const file = path.join(outDir, `${item.name}.png`)
  await page.screenshot({ path: file, fullPage: true })
  console.log('saved', file)
}

await browser.close()
console.log('ALL_DONE')
