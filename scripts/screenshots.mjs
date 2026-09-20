// Capture screenshots of the built site at desktop, tablet and mobile widths.
import { writeFileSync } from 'node:fs'

const PORT = 9333
const OUT = 'C:/Users/zhaze/Documents/nuvella/preview'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function main() {
  const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()
  const page = list.find((t) => t.type === 'page')
  const ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((r) => (ws.onopen = r))
  let id = 0
  const pending = new Map()
  ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) } }
  const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })) })
  const evaluate = async (expr) => (await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result?.result?.value

  await send('Runtime.enable'); await send('Page.enable')

  const shot = async (file, { width, height, mobile, fullPage = false, scrollTo = null, wait = 1200 }) => {
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile })
    await send('Page.navigate', { url: 'http://localhost:4178/' })
    await sleep(2800)
    if (scrollTo) {
      await evaluate(`document.querySelector('${scrollTo}')?.scrollIntoView({block:'start'})`)
      await sleep(wait)
    }
    // trigger all reveal animations by scrolling through the page
    await evaluate(`(async () => {
      const step = window.innerHeight * 0.8
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90))
      }
      window.scrollTo(0, ${scrollTo ? 'window.scrollY' : 0})
      await new Promise(r => setTimeout(r, 700))
    })()`)
    await sleep(400)

    const params = { format: 'png', captureBeyondViewport: fullPage }
    if (fullPage) {
      const m = await send('Page.getLayoutMetrics')
      const h = Math.min(Math.ceil(m.result.cssContentSize.height), 30000)
      params.clip = { x: 0, y: 0, width, height: h, scale: 1 }
    }
    const r = await send('Page.captureScreenshot', params)
    writeFileSync(`${OUT}/${file}`, Buffer.from(r.result.data, 'base64'))
    console.log('saved', file, fullPage ? '(full page)' : `(${width}x${height})`)
  }

  await shot('01-desktop-hero.png', { width: 1440, height: 900, mobile: false })
  await shot('02-desktop-full.png', { width: 1440, height: 900, mobile: false, fullPage: true })
  await shot('03-mobile-full.png', { width: 390, height: 844, mobile: true, fullPage: true })
  await shot('04-tablet-full.png', { width: 834, height: 1112, mobile: true, fullPage: true })

  await send('Emulation.clearDeviceMetricsOverride')
  ws.close(); process.exit(0)
}
main().catch(e => { console.error(e); process.exit(2) })
