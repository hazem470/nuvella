// Full bilingual verification of the updated Nuvella site over CDP.
// Checks: language switching, RTL/LTR, EGP prices, Telegram links, banner,
// persistence across reload, and that every pre-existing feature still works.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const URL_ = process.argv[2] || 'http://localhost:4178/'

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
const jsErrors = []
ws.onmessage = (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) }
  else if (m.method === 'Runtime.exceptionThrown') {
    jsErrors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text)
  }
}
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })) })
const evaluate = async (expr) => {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })
  if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails.text))
  return r.result?.result?.value
}
const reload = async (wait = 3800) => { await send('Page.navigate', { url: URL_ }); await sleep(wait) }

await send('Runtime.enable')
await send('Page.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })

// Clean slate
await reload(1500)
await evaluate(`(() => { try { localStorage.clear() } catch(e){} return true })()`)
await reload()

/* ── 1. Default language is English, LTR ─────────────────────────── */
const def = await evaluate(`(() => ({
  lang: document.documentElement.lang,
  dir: document.documentElement.dir,
  h1: document.querySelector('h1')?.innerText.replace(/\\s+/g,' ').trim(),
  nav: [...document.querySelectorAll('nav[aria-label="Primary"] ul a')].map(a=>a.textContent.trim()).filter(Boolean).slice(0,6),
  shopBtn: [...document.querySelectorAll('button')].some(b => b.innerText.includes('Shop Now')),
  switcher: !!document.querySelector('button[aria-label*="Arabic"]') || !!document.querySelector('button[aria-label*="Switch"]'),
  stored: localStorage.getItem('nuvella.lang')
}))()`)
check('default language is English', def.lang === 'en', `lang="${def.lang}"`)
check('default direction is LTR', def.dir === 'ltr', `dir="${def.dir}"`)
check('English nav labels', def.nav.join(',') === 'Home,Product,Benefits,Ingredients,Reviews,FAQ', def.nav.join(','))
check('English CTA present', def.shopBtn === true)
check('language switcher rendered', def.switcher === true)
check('language persisted to localStorage', def.stored === 'en', `stored="${def.stored}"`)

/* ── 2. Announcement banner ──────────────────────────────────────── */
const banner = await evaluate(`(() => {
  const t = document.body.innerText
  return {
    comingSoon: /Coming Soon/i.test(t),
    prep: /in preparation/i.test(t),
    telegramCta: /Follow on Telegram/i.test(t)
  }
})()`)
check('Coming Soon banner visible', banner.comingSoon && banner.prep, JSON.stringify(banner))

/* ── 3. EGP pricing ─────────────────────────────────────────────── */
const pricing = await evaluate(`(() => {
  const t = document.body.innerText
  return {
    hasEgp: /349\\s*EGP/.test(t),
    hasCompare: /429\\s*EGP/.test(t),
    noUsd: !/\\$\\s*\\d/.test(t) && !/USD/.test(t),
    preLaunch: /Pre-launch/i.test(t)
  }
})()`)
check('price shown in EGP (349 EGP)', pricing.hasEgp === true)
check('compare-at price in EGP (429 EGP)', pricing.hasCompare === true)
check('no USD anywhere on the page', pricing.noUsd === true)
check('product marked pre-launch', pricing.preLaunch === true)

/* ── 4. Telegram links ──────────────────────────────────────────── */
const tg = await evaluate(`(() => {
  const links = [...document.querySelectorAll('a[href*="t.me"]')]
  return {
    count: links.length,
    allCorrect: links.every(a => a.href === 'https://t.me/Hazem455ziad'),
    newTab: links.every(a => a.target === '_blank'),
    hasRel: links.every(a => (a.rel || '').includes('noopener'))
  }
})()`)
check('Telegram links present', tg.count >= 3, `${tg.count} links`)
check('all point to t.me/Hazem455ziad', tg.allCorrect === true)
check('open in a new tab', tg.newTab === true)
check('have rel=noopener (safe)', tg.hasRel === true)

/* ── 5. Switch to Arabic ────────────────────────────────────────── */
// The saved language persists in localStorage, so make sure we are starting
// from English before looking for the "switch to Arabic" control.
await evaluate(`(() => { try { localStorage.setItem('nuvella.lang','en') } catch(e){} return true })()`)
await reload()
await evaluate(`(() => {
  const b = [...document.querySelectorAll('button')].find(x => /Switch to Arabic|العربية/i.test(x.getAttribute('aria-label')||'') || /العربية/.test(x.innerText))
  b.click(); return true
})()`)
await sleep(900)

const ar = await evaluate(`(() => ({
  lang: document.documentElement.lang,
  dir: document.documentElement.dir,
  h1: document.querySelector('h1')?.innerText.replace(/\\s+/g,' ').trim(),
  nav: [...document.querySelectorAll('nav[aria-label="القائمة الرئيسية"] ul a')].map(a=>a.textContent.trim()).filter(Boolean).slice(0,6),
  arabicChars: /[\\u0600-\\u06FF]/.test(document.body.innerText),
  egpArabic: /جنيه/.test(document.body.innerText),
  stored: localStorage.getItem('nuvella.lang'),
  bodyDir: document.body.getAttribute('dir'),
  // the drawer should now slide from the right (RTL) using -translate-x-full when closed
  drawerClass: document.querySelector('[aria-label="حقيبتك"]')?.className || ''
}))()`)
check('switching sets lang="ar"', ar.lang === 'ar', `lang="${ar.lang}"`)
check('switching sets dir="rtl"', ar.dir === 'rtl', `dir="${ar.dir}"`)
check('body direction also RTL', ar.bodyDir === 'rtl')
check('page content is Arabic', ar.arabicChars === true, ar.h1)
check('Arabic nav labels', ar.nav.length === 6, ar.nav.join(','))
check('prices rendered in Arabic (جنيه)', ar.egpArabic === true)
check('Arabic choice persisted', ar.stored === 'ar', `stored="${ar.stored}"`)

/* ── 6. Language survives a reload ──────────────────────────────── */
await reload()
const afterReload = await evaluate(`(() => ({
  lang: document.documentElement.lang,
  dir: document.documentElement.dir,
  arabic: /[\\u0600-\\u06FF]/.test(document.body.innerText),
  egp: /جنيه/.test(document.body.innerText)
}))()`)
check('language survives page reload', afterReload.lang === 'ar' && afterReload.arabic, `lang="${afterReload.lang}"`)
check('RTL survives reload', afterReload.dir === 'rtl')
check('Arabic prices survive reload', afterReload.egp === true)

/* ── 7. Pre-existing features still work (in Arabic) ────────────── */
// The hero button only adds to the bag (toast); the drawer is opened by the
// product section's "أضف إلى الحقيبة" button. Test both paths.
await evaluate(`(() => {
  const b = [...document.querySelectorAll('button')].find(x => x.innerText.trim().startsWith('اطلب الآن'))
  b.click(); return true
})()`)
await sleep(900)
const cartAr = await evaluate(`(() => ({
  badge: document.querySelector('button[aria-label^="فتح حقيبة"]')?.innerText.trim(),
  toast: document.querySelector('[role="status"]')?.innerText.trim() || ''
}))()`)
check('cart add works in Arabic', cartAr.badge === '1', `badge="${cartAr.badge}"`)
check('Arabic toast fires', /أُضيف إلى حقيبتك/.test(cartAr.toast), cartAr.toast.replace(/\n/g, ' ').slice(0, 60))

// Now open the drawer from the product section's Add to Cart button
await evaluate(`document.querySelector('#product').scrollIntoView()`)
await sleep(400)
await evaluate(`(() => {
  const b = [...document.querySelectorAll('#product button')].find(x => x.innerText.trim() === 'أضف إلى الحقيبة')
  b.click(); return true
})()`)
await sleep(1000)
const drawerAr = await evaluate(`(() => {
  const d = document.querySelector('[aria-label="حقيبتك"]')
  const cls = (d?.className || '').split(/\\s+/)
  const closed = cls.includes('translate-x-full') || cls.includes('-translate-x-full')
  const r = d?.getBoundingClientRect()
  return {
    open: d ? !closed : false,
    // In RTL the drawer must sit on the LEFT edge (logical end-0)
    onLeftSide: r ? r.left < window.innerWidth / 2 : null,
    rect: r ? [Math.round(r.left), Math.round(r.right)] : null,
    hasArabicTotals: /الإجمالي/.test(d?.innerText || ''),
    hasEgp: /جنيه/.test(d?.innerText || ''),
    telegramInDrawer: (d?.innerHTML || '').includes('t.me')
  }
})()`)
check('cart drawer opens in Arabic', drawerAr.open === true)
check('drawer anchored to the LEFT edge in RTL', drawerAr.onLeftSide === true, `rect=${JSON.stringify(drawerAr.rect)}`)
check('drawer totals localised (الإجمالي)', drawerAr.hasArabicTotals === true)
check('drawer prices in جنيه', drawerAr.hasEgp === true)
check('Telegram button shown in drawer during pre-launch', drawerAr.telegramInDrawer === true)

const faqAr = await evaluate(`(() => {
  const btns = [...document.querySelectorAll('[id^="faq-button-"]')]
  if (btns[2]) btns[2].click()
  return { count: btns.length }
})()`)
await sleep(500)
const faqState = await evaluate(`document.querySelector('[id="faq-button-2"]')?.getAttribute('aria-expanded')`)
check('FAQ accordion works in Arabic', faqAr.count === 8 && faqState === 'true', `${faqAr.count} questions, clicked #3 expanded=${faqState}`)

/* ── 8. Switch back to English ──────────────────────────────────── */
await evaluate(`(() => {
  const d = document.querySelector('[aria-label="حقيبتك"]')
  const closeBtn = d?.querySelector('button[aria-label="إغلاق حقيبة التسوق"]')
  if (closeBtn) closeBtn.click()
  return true
})()`)
await sleep(600)
// Same as above: reset to Arabic first so the English switch control exists.
await evaluate(`(() => { try { localStorage.setItem('nuvella.lang','ar') } catch(e){} return true })()`)
await reload()
await evaluate(`(() => {
  const b = [...document.querySelectorAll('button')].find(x => /Switch to English|English/i.test(x.getAttribute('aria-label')||'') || /English/.test(x.innerText))
  b.click(); return true
})()`)
await sleep(900)
const back = await evaluate(`(() => ({
  lang: document.documentElement.lang,
  dir: document.documentElement.dir,
  egp: /349\\s*EGP/.test(document.body.innerText)
}))()`)
check('switching back to English works', back.lang === 'en' && back.dir === 'ltr', `lang="${back.lang}" dir="${back.dir}"`)
check('English EGP price restored', back.egp === true)

/* ── 9. Mobile + Arabic RTL (the trickiest combination) ─────────── */
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true })
await sleep(600)
await evaluate(`(() => {
  const b = [...document.querySelectorAll('button')].find(x => /Switch to Arabic|العربية/i.test(x.getAttribute('aria-label')||'') || /العربية/.test(x.innerText))
  b.click(); return true
})()`)
await sleep(900)
const mob = await evaluate(`(() => {
  const de = document.documentElement
  return {
    overflow: de.scrollWidth - de.clientWidth,
    dir: de.dir,
    switcherVisible: !!document.querySelector('button[aria-label*="Switch"]')?.offsetParent,
    burgerVisible: !!document.querySelector('button[aria-label="فتح القائمة"]')?.offsetParent,
    bannerVisible: /قريبًا/.test(document.body.innerText)
  }
})()`)
check('no horizontal overflow in mobile Arabic RTL', mob.overflow <= 1, `overflow=${mob.overflow}px`)
check('switcher visible on mobile', mob.switcherVisible === true)
check('mobile menu button visible', mob.burgerVisible === true)
check('Arabic banner visible on mobile', mob.bannerVisible === true)

const mobileMenu = await evaluate(`(() => {
  const b = document.querySelector('button[aria-label="فتح القائمة"]')
  b.click()
  return true
})()`)
await sleep(700)
const menuState = await evaluate(`(() => {
  const m = document.querySelector('#mobile-menu')
  return { maxH: getComputedStyle(m).maxHeight, links: m.querySelectorAll('a').length, telegram: m.innerHTML.includes('t.me') }
})()`)
check('mobile menu expands in Arabic', menuState.maxH !== '0px' && menuState.links >= 7, `${menuState.links} links`)

await send('Emulation.clearDeviceMetricsOverride')

/* ── 10. No JS errors anywhere ──────────────────────────────────── */
check('no JavaScript errors during the whole run', jsErrors.length === 0, jsErrors.length ? jsErrors[0].slice(0, 160) : 'clean')

const failed = results.filter((r) => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
if (failed.length) console.log('FAILED:', failed.map((f) => f.name).join(' | '))
ws.close()
process.exit(failed.length ? 1 : 0)
