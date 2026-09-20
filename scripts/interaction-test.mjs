// Nuvella interaction test — drives the built site over CDP in headless Edge.
const PORT = process.env.CDP_PORT || 9333

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function getTarget() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`)
      const list = await res.json()
      const page = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl)
      if (page) return page
    } catch {}
    await sleep(400)
  }
  throw new Error('no CDP target')
}

const results = []
function check(name, pass, detail = '') {
  results.push({ name, pass, detail })
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  → ' + detail : ''}`)
}

async function main() {
  const target = await getTarget()
  const ws = new WebSocket(target.webSocketDebuggerUrl)
  await new Promise((r) => (ws.onopen = r))

  let id = 0
  const pending = new Map()
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data)
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg)
      pending.delete(msg.id)
    }
  }
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const mid = ++id
      pending.set(mid, resolve)
      ws.send(JSON.stringify({ id: mid, method, params }))
    })

  const evaluate = async (expr) => {
    const r = await send('Runtime.evaluate', {
      expression: expr,
      returnByValue: true,
      awaitPromise: true,
    })
    if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails))
    return r.result?.result?.value
  }

  await send('Runtime.enable')
  await send('Page.enable')
  await send('Page.navigate', { url: 'http://localhost:4178/' })
  await sleep(3000)

  // ── 0. Baseline ──────────────────────────────────────────────
  const base = await evaluate(`(() => ({
    title: document.title,
    h1: document.querySelector('h1')?.innerText.trim(),
    imgsBroken: [...document.querySelectorAll('img')].filter(i => i.complete && i.naturalWidth === 0).length,
    imgsTotal: document.querySelectorAll('img').length,
    badge: document.querySelector('header button[aria-label^="Open shopping bag"]')?.innerText.trim() || '',
    drawerOpen: document.querySelector('[aria-label="Shopping bag"]')?.className.includes('translate-x-0'),
    ls: localStorage.getItem('nuvella.cart.v1')
  }))()`)
  check('page loads with hero headline', !!base.h1, base.h1)
  check('all images resolve (no broken src)', base.imgsBroken === 0, `${base.imgsTotal} images`)
  check('cart badge starts empty', base.badge === '', `badge="${base.badge}"`)

  // ── 1. Hero "Shop Now" adds to cart ──────────────────────────
  await evaluate(`(() => {
    const btn = [...document.querySelectorAll('button')].find(b => b.innerText.trim().startsWith('Shop Now'))
    btn.click(); return true
  })()`)
  await sleep(700)
  const afterAdd = await evaluate(`(() => ({
    badge: document.querySelector('header button[aria-label^="Open shopping bag"]')?.innerText.trim(),
    toast: document.querySelector('[role="status"]')?.innerText.trim() || '',
    ls: JSON.parse(localStorage.getItem('nuvella.cart.v1') || '[]')
  }))()`)
  check('hero Shop Now → badge shows 1', afterAdd.badge === '1', `badge="${afterAdd.badge}"`)
  check('toast notification shown', /added to your bag/i.test(afterAdd.toast), afterAdd.toast.replace(/\n/g, ' '))
  check('cart persisted to localStorage', afterAdd.ls.length === 1 && afterAdd.ls[0].qty === 1, JSON.stringify(afterAdd.ls[0] || {}).slice(0, 90))

  // ── 2. Product section: quantity + Add to Cart opens drawer ──
  await evaluate(`document.querySelector('#product').scrollIntoView()`)
  await sleep(400)
  await evaluate(`(() => {
    const inc = document.querySelector('#product [aria-label="Increase quantity"]')
    inc.click(); inc.click(); return true
  })()`)
  await sleep(300)
  const qty = await evaluate(`document.querySelector('#product [role="group"][aria-label^="Quantity"] input[type=number]')?.value`)
  check('quantity stepper increments', qty === '3', `qty=${qty}`)

  await evaluate(`(() => {
    const b = [...document.querySelectorAll('#product button')].find(x => x.innerText.trim() === 'Add to Cart')
    b.click(); return true
  })()`)
  await sleep(900)
  const drawer = await evaluate(`(() => {
    const d = document.querySelector('[aria-label="Shopping bag"]')
    return {
      open: d.className.includes('translate-x-0'),
      lines: [...d.querySelectorAll('li')].map(li => li.innerText.replace(/\\n+/g, ' | ').trim()).slice(0, 2),
      lineCount: d.querySelectorAll('li').length
    }
  })()`)
  check('Add to Cart opens the cart drawer', drawer.open === true)
  check('drawer lists the added line', drawer.lineCount >= 1, drawer.lines[0]?.slice(0, 110))

  // ── 3. Drawer quantity + totals ──────────────────────────────
  const totals = await evaluate(`(() => {
    const d = document.querySelector('[aria-label="Shopping bag"]')
    return [...d.querySelectorAll('dl div')].map(r => r.innerText.replace(/\\n+/g, '=')).join(' ; ')
  })()`)
  check('order summary shows subtotal/shipping/total', /Subtotal/.test(totals) && /Total/.test(totals), totals.slice(0, 120))

  const freeShip = await evaluate(`(() => {
    const d = document.querySelector('[aria-label="Shopping bag"]')
    return /Free/.test(d.innerText)
  })()`)
  check('free shipping applied over $60', freeShip === true)

  // ── 4. Remove from cart ──────────────────────────────────────
  await evaluate(`(() => {
    const d = document.querySelector('[aria-label="Shopping bag"]')
    const rm = d.querySelector('button[aria-label^="Remove"]')
    rm.click(); return true
  })()`)
  await sleep(600)
  const afterRemove = await evaluate(`(() => {
    const d = document.querySelector('[aria-label="Shopping bag"]')
    return { empty: /Your bag is empty/.test(d.innerText), badge: document.querySelector('header button[aria-label^="Open shopping bag"]').innerText.trim() }
  })()`)
  check('remove from cart empties the bag', afterRemove.empty === true, `badge="${afterRemove.badge}"`)

  // ── 5. Close drawer, FAQ accordion ───────────────────────────
  await evaluate(`document.querySelector('button[aria-label="Close shopping bag"]').click()`)
  await sleep(600)
  const closed = await evaluate(`!document.querySelector('[aria-label="Shopping bag"]').className.includes('translate-x-0')`)
  check('drawer closes', closed === true)

  const faq = await evaluate(`(() => {
    const btns = [...document.querySelectorAll('[id^="faq-button-"]')]
    const before = btns.map(b => b.getAttribute('aria-expanded'))
    btns[2].click()
    return { count: btns.length, before }
  })()`)
  await sleep(500)
  const faqAfter = await evaluate(`[...document.querySelectorAll('[id^="faq-button-"]')].map(b => b.getAttribute('aria-expanded'))`)
  check('FAQ accordion has 7 questions', faq.count === 7, `${faq.count} items`)
  check('FAQ accordion toggles panels', faqAfter[2] === 'true' && faqAfter[0] === 'false', `before=${faq.before} after=${faqAfter}`)

  // ── 6. Gallery switching ─────────────────────────────────────
  const gal = await evaluate(`(() => {
    const rail = document.querySelector('#product [role="tablist"][aria-label="Product images"]')
    const tabs = [...rail.querySelectorAll('[role="tab"]')]
    const main = document.querySelector('#product [role="group"] img')
    const before = main.getAttribute('src')
    tabs[2].click()
    return { before, tabs: tabs.length }
  })()`)
  await sleep(400)
  const galAfter = await evaluate(`document.querySelector('#product [role="group"] img').getAttribute('src')`)
  check('product gallery switches images', gal.before !== galAfter, `${gal.before} → ${galAfter}`)
  check('gallery has 5 views', gal.tabs === 5, `${gal.tabs} thumbnails`)

  // ── 7. Variant + legal modal ─────────────────────────────────
  const variant = await evaluate(`(() => {
    const b = [...document.querySelectorAll('#product button')].find(x => x.getAttribute('aria-pressed') === 'true')
    const uns = [...document.querySelectorAll('#product button')].find(x => x.innerText.includes('Unscented'))
    uns.click()
    return { wasPressed: b?.innerText.split('\\n')[0] }
  })()`)
  await sleep(300)
  const variantAfter = await evaluate(`[...document.querySelectorAll('#product button[aria-pressed="true"]')].map(b=>b.innerText.split('\\n')[0])`)
  check('edition selector toggles', variantAfter.includes('Unscented'), `was ${variant.wasPressed} → now ${variantAfter}`)

  await evaluate(`(() => {
    const b = [...document.querySelectorAll('footer button')].find(x => x.innerText.trim() === 'Privacy Policy')
    b.click(); return true
  })()`)
  await sleep(500)
  const modal = await evaluate(`(() => {
    const d = document.querySelector('[role="dialog"][aria-labelledby="legal-title"]')
    return { open: !!d, title: d?.querySelector('h2')?.innerText, textLen: d?.innerText.length }
  })()`)
  check('privacy policy modal opens', modal.open && modal.title === 'Privacy Policy', `${modal.textLen} chars`)

  // ── 8. Responsive + a11y sanity ──────────────────────────────
  await evaluate(`document.querySelector('button[aria-label="Close"]')?.click()`)
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true })
  await sleep(600)
  const mobile = await evaluate(`(() => {
    const de = document.documentElement
    return {
      overflow: de.scrollWidth - de.clientWidth,
      burgerVisible: !!document.querySelector('button[aria-label="Open menu"]')?.offsetParent,
      desktopNavHidden: !document.querySelector('nav[aria-label="Primary"] ul')?.offsetParent
    }
  })()`)
  check('no horizontal overflow at 390px', mobile.overflow <= 1, `overflow=${mobile.overflow}px`)
  check('mobile menu button shown, desktop nav hidden', mobile.burgerVisible && mobile.desktopNavHidden, JSON.stringify(mobile))

  // mobile menu opens
  await evaluate(`document.querySelector('button[aria-label="Open menu"]').click()`)
  await sleep(600)
  const mobMenu = await evaluate(`(() => {
    const m = document.querySelector('#mobile-menu')
    return { maxH: getComputedStyle(m).maxHeight, links: m.querySelectorAll('a').length }
  })()`)
  check('mobile menu expands with nav links', mobMenu.maxH !== '0px' && mobMenu.links === 7, `${mobMenu.links} links, maxH=${mobMenu.maxH}`)

  await send('Emulation.clearDeviceMetricsOverride')

  // ── 9. SEO / structured data ─────────────────────────────────
  const seo = await evaluate(`(() => ({
    desc: document.querySelector('meta[name=description]')?.content?.length,
    og: !!document.querySelector('meta[property="og:title"]'),
    ld: !!document.querySelector('script[type="application/ld+json"]'),
    lang: document.documentElement.lang,
    dir: document.documentElement.dir,
    h1s: document.querySelectorAll('h1').length,
    skip: !!document.querySelector('a[href="#product"].sr-only')
  }))()`)
  check('SEO meta + JSON-LD present', seo.desc > 60 && seo.og && seo.ld, JSON.stringify(seo))
  check('LTR + English only, single H1', seo.lang === 'en' && seo.dir === 'ltr' && seo.h1s === 1)

  const failed = results.filter((r) => !r.pass)
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
  if (failed.length) console.log('FAILED:', failed.map((f) => f.name).join(', '))
  ws.close()
  process.exit(failed.length ? 1 : 0)
}

main().catch((e) => {
  console.error('ERROR', e)
  process.exit(2)
})
