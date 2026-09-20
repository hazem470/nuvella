// Capture screenshots of both languages at desktop + mobile.
import { writeFileSync } from 'node:fs'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const URL_ = process.argv[2] || 'http://localhost:4178/'
const OUT = 'C:/Users/zhaze/Documents/nuvella/preview'

const list = await (await fetch('http://127.0.0.1:9333/json/list')).json()
const page = list.find((t) => t.type === 'page')
const ws = new WebSocket(page.webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))
let id = 0
const pending = new Map()
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) } }
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })) })
const evaluate = async (expr) => (await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result?.result?.value

await send('Runtime.enable')
await send('Page.enable')

const setLang = async (lang) => {
  await evaluate(`(() => { try { localStorage.setItem('nuvella.lang', '${lang}') } catch(e){} return true })()`)
  await send('Page.navigate', { url: URL_ })
  await sleep(4200)
  // trigger all scroll reveals so nothing is captured mid-fade
  await evaluate(`(async () => {
    const step = window.innerHeight * 0.7
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y); await new Promise(r => setTimeout(r, 110))
    }
    window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 900))
  })()`)
  await sleep(500)
}

const shot = async (file, { width, height, mobile, fullPage = false }) => {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile })
  await sleep(900)
  const params = { format: 'png', captureBeyondViewport: fullPage }
  if (fullPage) {
    const m = await send('Page.getLayoutMetrics')
    const h = Math.min(Math.ceil(m.result.cssContentSize.height), 30000)
    params.clip = { x: 0, y: 0, width, height: h, scale: 1 }
  }
  const r = await send('Page.captureScreenshot', params)
  writeFileSync(`${OUT}/${file}`, Buffer.from(r.result.data, 'base64'))
  console.log('saved', file)
}

/* English */
await setLang('en')
await shot('i18n-01-en-desktop.png', { width: 1440, height: 900, mobile: false })
await shot('i18n-02-en-mobile.png', { width: 390, height: 844, mobile: true })

/* Arabic */
await setLang('ar')
await shot('i18n-03-ar-desktop.png', { width: 1440, height: 900, mobile: false })
await shot('i18n-04-ar-mobile.png', { width: 390, height: 844, mobile: true })

/* Arabic, scrolled to the product section so pricing + cart are visible */
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false })
await evaluate(`document.querySelector('#product')?.scrollIntoView({block:'start'})`)
await sleep(1200)
await shot('i18n-05-ar-product.png', { width: 1440, height: 1000, mobile: false })

await send('Emulation.clearDeviceMetricsOverride')
ws.close()
process.exit(0)
