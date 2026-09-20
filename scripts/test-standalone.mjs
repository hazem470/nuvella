// Verify the standalone single-file build works from file:// — render + interaction.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const FILE_URL = 'file:///C:/Users/zhaze/Documents/nuvella/preview/nuvella-standalone.html'

const results = []
const check = (name, pass, detail = '') => {
  results.push({ name, pass })
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  → ' + detail : ''}`)
}

const list = await (await fetch('http://127.0.0.1:9333/json/list')).json()
const page = list.find((t) => t.type === 'page')
const ws = new WebSocket(page.webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))
let id = 0
const pending = new Map()
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) } }
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })) })
const evaluate = async (expr) => {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })
  if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails.text))
  return r.result?.result?.value
}

await send('Runtime.enable')
await send('Page.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })

// Start from a clean slate — the cart persists in localStorage between runs,
// which would otherwise leak state (extra drawer line, non-zero badge) into
// this test and produce false failures.
await send('Page.navigate', { url: FILE_URL })
await sleep(1500)
await evaluate(`(() => { try { localStorage.clear() } catch (e) {} return true })()`)
await send('Page.navigate', { url: FILE_URL })
await sleep(3500)

const base = await evaluate(`(() => ({
  title: document.title,
  h1: document.querySelector('h1')?.innerText.replace(/\\s+/g,' ').trim(),
  sections: document.querySelectorAll('section[id]').length,
  imgs: document.querySelectorAll('img').length,
  brokenImgs: [...document.querySelectorAll('img')].filter(i => i.complete && i.naturalWidth === 0).length,
  faq: document.querySelectorAll('[id^="faq-button-"]').length,
  thumbs: document.querySelectorAll('[role="tablist"][aria-label="Product images"] [role="tab"]').length,
  navLinks: [...document.querySelectorAll('nav[aria-label="Primary"] a')].map(a => a.textContent.trim()).filter(t => /^(Home|Product|Benefits|Ingredients|Reviews|FAQ)$/.test(t)).length,
  cartBadge: document.querySelector('header button[aria-label^="Open shopping bag"]')?.innerText.trim() || ''
}))()`)

check('standalone file renders (React mounted)', !!base.h1, base.h1)
check('all 10 sections present', base.sections === 10, `${base.sections} sections`)
check('images render (no broken)', base.brokenImgs === 0 && base.imgs >= 10, `${base.imgs} imgs, ${base.brokenImgs} broken`)
check('FAQ accordion built', base.faq === 7, `${base.faq} questions`)
check('gallery built', base.thumbs === 5, `${base.thumbs} thumbnails`)
check('nav built', base.navLinks === 6, `${base.navLinks} links`)

// interaction: add to cart
await evaluate(`(() => {
  const b = [...document.querySelectorAll('button')].find(x => x.innerText.trim().startsWith('Shop Now'))
  b.click(); return true
})()`)
await sleep(800)
const cart = await evaluate(`(() => ({
  badge: document.querySelector('header button[aria-label^="Open shopping bag"]')?.innerText.trim(),
  toast: document.querySelector('[role="status"]')?.innerText.trim() || ''
}))()`)
check('cart works from file:// (Shop Now → 1)', cart.badge === '1', `badge="${cart.badge}"`)
check('toast fires', /added to your bag/i.test(cart.toast))

// interaction: FAQ
await evaluate(`document.querySelector('[id="faq-button-3"]').click()`)
await sleep(500)
const faqState = await evaluate(`document.querySelector('[id="faq-button-3"]').getAttribute('aria-expanded')`)
check('FAQ accordion toggles from file://', faqState === 'true')

// overflow check at mobile
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true })
await sleep(700)
const ov = await evaluate(`document.documentElement.scrollWidth - document.documentElement.clientWidth`)
check('no horizontal overflow at 390px', ov <= 1, `${ov}px`)

// screenshot
const shot = await send('Page.captureScreenshot', { format: 'png' })
const { writeFileSync } = await import('node:fs')
writeFileSync('C:/Users/zhaze/Documents/nuvella/preview/standalone-mobile.png', Buffer.from(shot.result.data, 'base64'))
await send('Emulation.clearDeviceMetricsOverride')

const failed = results.filter((r) => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
ws.close()
process.exit(failed.length ? 1 : 0)
