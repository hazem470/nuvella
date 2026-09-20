// Verify the live GitHub Pages deployment renders fully and interactively.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const URL_ = 'https://hazem470.github.io/nuvella/'

const list = await (await fetch('http://127.0.0.1:9333/json/list')).json()
const page = list.find((t) => t.type === 'page')
const ws = new WebSocket(page.webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))
let id = 0
const pending = new Map()
const errors = []
ws.onmessage = (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) }
  else if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text)
}
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })) })
const evaluate = async (expr) => {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })
  if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails.text))
  return r.result?.result?.value
}

await send('Runtime.enable')
await send('Page.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })

await send('Page.navigate', { url: URL_ })
await sleep(1500)
await evaluate(`(() => { try { localStorage.clear() } catch(e) {} return true })()`)
await send('Page.navigate', { url: URL_ })
await sleep(5000)

const base = await evaluate(`(() => ({
  title: document.title,
  h1: document.querySelector('h1')?.innerText.replace(/\\s+/g,' ').trim(),
  sections: document.querySelectorAll('section[id]').length,
  imgs: document.querySelectorAll('img').length,
  brokenImgs: [...document.querySelectorAll('img')].filter(i => i.complete && i.naturalWidth === 0).length,
  faq: document.querySelectorAll('[id^="faq-button-"]').length,
  thumbs: document.querySelectorAll('[role="tablist"][aria-label="Product images"] [role="tab"]').length,
  nav: [...document.querySelectorAll('nav[aria-label="Primary"] a')].map(a=>a.textContent.trim()).filter(t=>/^(Home|Product|Benefits|Ingredients|Reviews|FAQ)$/.test(t)).length,
  font: getComputedStyle(document.querySelector('h1')).fontFamily.split(',')[0],
  badge: document.querySelector('header button[aria-label^="Open shopping bag"]')?.innerText.trim() || ''
}))()`)

const checks = [
  ['live site renders (React mounted)', !!base.h1, base.h1],
  ['all 10 sections present', base.sections === 10, `${base.sections}`],
  ['all images load (none broken)', base.brokenImgs === 0 && base.imgs >= 10, `${base.imgs} imgs, ${base.brokenImgs} broken`],
  ['FAQ accordion built', base.faq === 7, `${base.faq}`],
  ['product gallery built', base.thumbs === 5, `${base.thumbs}`],
  ['navbar built', base.nav === 6, `${base.nav}`],
  ['brand font applied', /Fraunces/.test(base.font), base.font],
  ['cart starts empty', base.badge === '', `badge="${base.badge}"`],
]
checks.forEach(([n, p, d]) => console.log(`${p ? 'PASS' : 'FAIL'}  ${n}${d ? '  → ' + d : ''}`))

// real interaction: add to cart on the LIVE site
await evaluate(`(() => {
  const b = [...document.querySelectorAll('button')].find(x => x.innerText.trim().startsWith('Shop Now'))
  b.click(); return true
})()`)
await sleep(900)
const cart = await evaluate(`(() => ({
  badge: document.querySelector('header button[aria-label^="Open shopping bag"]')?.innerText.trim(),
  toast: document.querySelector('[role="status"]')?.innerText.trim() || ''
}))()`)
console.log(`${cart.badge === '1' ? 'PASS' : 'FAIL'}  cart works on live site  → badge="${cart.badge}"`)
console.log(`${/added to your bag/i.test(cart.toast) ? 'PASS' : 'FAIL'}  toast fires on live site`)

// mobile overflow on the live site
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true })
await sleep(900)
const ov = await evaluate(`document.documentElement.scrollWidth - document.documentElement.clientWidth`)
console.log(`${ov <= 1 ? 'PASS' : 'FAIL'}  no horizontal overflow at 390px  → ${ov}px`)

const shot = await send('Page.captureScreenshot', { format: 'png' })
const { writeFileSync } = await import('node:fs')
writeFileSync('C:/Users/zhaze/Documents/nuvella/preview/github-pages-live.png', Buffer.from(shot.result.data, 'base64'))
await send('Emulation.clearDeviceMetricsOverride')

console.log('\nJS errors:', errors.length ? errors : 'none')
ws.close()
process.exit(0)
