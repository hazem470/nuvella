// Build a TRUE single-file version of the site: HTML + CSS + JS + all images
// inlined into one .html file that opens from file:// with a double-click.
//
// TWO TRAPS this script guards against (both learned the hard way):
//
//  1. String.replace() treats "$&", "$`", "$'", "$1"… in the REPLACEMENT as
//     special patterns. Minified React code is full of "$" characters, so
//     passing the bundle as a plain string corrupts it into a SyntaxError.
//     → Always pass a replacer FUNCTION, which is treated literally.
//
//  2. An inline <script> ends at the first "</script" sequence ANYWHERE inside
//     it, including inside JS string literals. → Escape it as "<\/script".
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'C:/Users/zhaze/Documents/nuvella/dist'
const OUT = 'C:/Users/zhaze/Documents/nuvella/preview/nuvella-standalone.html'

let html = readFileSync(join(DIST, 'index.html'), 'utf8')

// ── 1. Inline the stylesheet ────────────────────────────────────────────────
const cssHref = html.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/)
if (!cssHref) throw new Error('stylesheet not found')
const css = readFileSync(join(DIST, cssHref[1].replace('./', '')), 'utf8')
html = html.replace(cssHref[0], () => `<style>\n${css}\n</style>`)

// ── 2. Inline the JS as a CLASSIC script (bundle has no module-only syntax) ──
const jsSrc = html.match(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/)
if (!jsSrc) throw new Error('module script not found')
let js = readFileSync(join(DIST, jsSrc[1].replace('./', '')), 'utf8')

// Trap 2: neutralise any sequence that would terminate the inline script early.
const closes = (js.match(/<\/script/gi) || []).length
js = js.replace(/<\/script/gi, () => '<\\/script')
js = js.replace(/<!--/g, () => '<\\!--')
console.log(`escaped ${closes} "</script" sequence(s)`)

// ── 3. Inline every SVG image as a data URI inside the JS ───────────────────
const imgDir = join(DIST, 'images')
const images = readdirSync(imgDir)
let inlined = 0
for (const file of images) {
  const b64 = readFileSync(join(imgDir, file)).toString('base64')
  const dataUri = `data:image/svg+xml;base64,${b64}`
  const needle = `./images/${file}`
  if (js.includes(needle)) {
    js = js.split(needle).join(dataUri) // split/join is literal, no $ semantics
    inlined++
  } else {
    console.log('  (not referenced in bundle:', file, ')')
  }
}
console.log(`inlined ${inlined}/${images.length} images`)

// Trap 1: replacer FUNCTION, never a plain string.
//
// Trap 3: a classic (non-deferred) inline script runs IMMEDIATELY, where it
// sits. The module tag it replaces lived in <head>, so inlining it there made
// React run before <div id="root"> existed → React error #299
// ("Target container is not a DOM element"). Move it to the end of <body>.
const inlineScript = `<script>\n${js}\n</script>`
html = html.replace(jsSrc[0], () => '')
html = html.replace(/<\/body>/i, () => `${inlineScript}\n</body>`)

// ── 4. Sanity: exactly one inline <script> (plus the JSON-LD block) ─────────
// Count only tags OUTSIDE the injected JS — the bundle itself legitimately
// contains the literal string "<script><\/script>" in React's DOM helpers.
const htmlWithoutJs = html.replace(js, () => '')
const opens = (htmlWithoutJs.match(/<script/gi) || []).length
const closesOut = (htmlWithoutJs.match(/<\/script/gi) || []).length
if (opens !== closesOut) {
  throw new Error(`unbalanced script tags outside the bundle: ${opens} open vs ${closesOut} close`)
}

writeFileSync(OUT, html)
console.log(`wrote ${OUT} (${(html.length / 1024).toFixed(0)} KB, ${opens} script tags balanced outside the bundle)`)
