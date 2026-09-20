// Decisive experiment: is the fixed drawer wrapper causing the document overflow?
const PORT = 9333
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
  const evaluate = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })
    if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails.text))
    return r.result?.result?.value
  }

  await send('Runtime.enable'); await send('Page.enable')
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true })
  await send('Page.navigate', { url: 'http://localhost:4178/' })
  await sleep(3500)

  const res = await evaluate(`(() => {
    const de = document.documentElement
    const drawer = document.querySelector('[aria-label="Shopping bag"]')
    const wrap = drawer.parentElement
    const out = {}
    out.baseline = { scrollW: de.scrollWidth, clientW: de.clientWidth, bodyScrollW: document.body.scrollWidth }
    out.wrapRect = (() => { const r = wrap.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.right)] })()

    // Variant A: hide the drawer wrapper entirely
    const prevDisplay = wrap.style.display
    wrap.style.display = 'none'
    out.drawerHidden = { scrollW: de.scrollWidth, bodyScrollW: document.body.scrollWidth }
    wrap.style.display = prevDisplay

    // Variant B: remove the drawer panel only (keep wrapper)
    const parent = drawer.parentNode
    parent.removeChild(drawer)
    out.panelRemoved = { scrollW: de.scrollWidth, wrapW: Math.round(wrap.getBoundingClientRect().width) }
    parent.appendChild(drawer)

    // Variant C: does any ancestor establish a containing block for fixed elements?
    const fixedOK = []
    let p = wrap.parentElement
    while (p && p !== document.documentElement) {
      const cs = getComputedStyle(p)
      const flags = []
      if (cs.transform !== 'none') flags.push('transform:' + cs.transform)
      if (cs.filter !== 'none') flags.push('filter')
      if (cs.backdropFilter && cs.backdropFilter !== 'none') flags.push('backdrop-filter')
      if (cs.perspective !== 'none') flags.push('perspective')
      if (cs.willChange !== 'auto') flags.push('will-change:' + cs.willChange)
      if (cs.contain !== 'none') flags.push('contain:' + cs.contain)
      if (cs.contentVisibility && cs.contentVisibility !== 'visible') flags.push('content-visibility')
      if (flags.length) fixedOK.push({ tag: p.tagName.toLowerCase(), cls: (typeof p.className === 'string' ? p.className : '').slice(0, 60), flags })
      p = p.parentElement
    }
    out.containingBlockAncestors = fixedOK

    // Variant D: computed style of the wrapper
    const wcs = getComputedStyle(wrap)
    out.wrapCS = { position: wcs.position, width: wcs.width, right: wcs.right, left: wcs.left, overflowX: wcs.overflowX }

    // Variant E: drawer panel computed width + the widest child
    const dcs = getComputedStyle(drawer)
    out.drawerCS = { width: dcs.width, maxWidth: dcs.maxWidth, transform: dcs.transform, right: dcs.right, position: dcs.position }

    return out
  })()`)

  console.log(JSON.stringify(res, null, 2))
  ws.close(); process.exit(0)
}
main().catch(e => { console.error('ERR', e.message); process.exit(2) })
