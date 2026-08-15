---
name: testing-growth-kit
description: How to run and browser-test the Spreadbliss Growth Kit (static Next.js App Router app) locally, including dev server, static-export parity, responsive/zoom checks and font/asset assertions.
---

# Testing the Spreadbliss Growth Kit locally

## Run it
- Node 24 (`.nvmrc`). `npm install`, then `npm run dev` → http://localhost:3000.
- A dev server may already be running from earlier work: check `lsof -i :3000` / `curl -sI localhost:3000` and reuse instead of restarting.
- Required checks: `npm run lint` and `npm run build`. Build uses `output: "export"` and must produce `out/index.html`.

## Static-export parity (easy to break with next/image)
```bash
npm run build
python3 -m http.server 4173 --directory out > /tmp/serveout.log 2>&1 &
```
Then load http://localhost:4173 and assert the same DOM/visuals as dev. `next/image` must stay `unoptimized` for export; a missing/404 `/spreadbliss-logo.png` or a broken-image box is the classic failure.

## Useful browser console one-liners
Wrap everything in an IIFE (`(()=>{...})()`) or the console tool returns `undefined`.

- Horizontal overflow: `(()=>JSON.stringify({iw:innerWidth,de:document.documentElement.scrollWidth,body:document.body.scrollWidth}))()`
- Logo loaded: `document.images[0].naturalWidth > 0 && document.images[0].complete`
- No remote fonts: filter `performance.getEntriesByType('resource')` for `fonts.googleapis.com|fonts.gstatic.com` (must be empty) and expect `/_next/static/media/*.woff2` instead.
- Font resolution: `getComputedStyle(document.querySelector('h1')).fontFamily` should contain `DM Sans`; body should contain `Inter`.
- Failed requests: `performance.getEntriesByType('resource').filter(r=>r.responseStatus>=400)`
- Disabled controls: `[...document.querySelectorAll('button')].every(b=>b.disabled)`

## Resizing / zoom on this box (Linux, no working `wmctrl` on :1)
The browser lives on `DISPLAY=:0`. `wmctrl` may report "Cannot open display" and `xdotool windowactivate` may fail with a `_NET_ACTIVE_WINDOW` warning — resizing still works:
```bash
export DISPLAY=:0
xdotool search --onlyvisible --class chrom | head   # find the window id
xdotool windowsize <WINDOW_ID> 390 1050             # 1440 / 768 / 390 / 320
xdotool key --window <WINDOW_ID> ctrl+plus          # zoom step; ctrl+0 resets
```
Verify the real viewport afterwards with `innerWidth` / `devicePixelRatio` — zoom steps are 110/125/150/175/200/250/300, so count presses.

Caveat: when driving Chrome through the browser automation tool, the viewport may be CDP-emulated and pinned (e.g. `innerWidth` stays 1600 even after `xdotool windowsize` succeeds). If `innerWidth` doesn't follow the OS window size, use the tool's mobile emulation (`set_mobile`) instead — it yields a ~410px-wide mobile viewport (exact 390 not settable). Always assert `innerWidth` before trusting any responsive measurement, and re-run the overflow one-liner in that state.

## Browser typing gotcha
The automation `type` action appends to existing input. To replace a field's value: click the field, press `Control+A`, press `Delete`, then type. Multi-key strings like "BackSpace BackSpace" don't work — send individual key presses.

## Clipboard, downloads and QR verification
- Read the real clipboard from the shell: `sudo apt-get install -y xclip` (once), then `DISPLAY=:0 xclip -selection clipboard -o`. This verifies exact multi-line contents (badge HTML) better than console tricks; top-level `await` is NOT allowed in the browser console tool — use `.then()` or xclip.
- Downloads land in `/tmp/chisel_browser_downloads/`. `file` may be missing; verify PNG signature/dimensions with a short Python snippet instead.
- Decode QR PNGs with `zbarimg <file>` (package `zbar-tools`) and compare against the exact URL including query + fragment.
- Clipboard-failure path: in the console run `navigator.clipboard.writeText = () => Promise.reject(new Error('denied'))`, click the copy button, expect error banner + readonly fallback textarea; reload to restore.

## Harness artifact: target="_blank" is stripped from the DOM
The browser automation instrumentation removes the `target` attribute from anchors (to keep navigation in-tab). `a.getAttribute('target')` returns `null` even for a plain static HTML control page containing `target="_blank"`. Do NOT report this as an app bug — verify `target="_blank"` via the source/React props or a control page instead.

## Expectations for the shell phase
- Exactly five numbered sections: Organization Information, Share Your Profile, QR Code, Website Badge, Impact Card.
- All 16 actions (12 share targets + Download QR Code, Copy Profile Link, Copy Website Code, Download Impact Card) are intentionally `disabled` — "does nothing" is correct; failing behavior would be a throw, a fake success toast, or a focusable disabled button.
- Only the 4 text inputs are in the tab order. The logo dropzone's "browse files" is a plain `<span>` (no `<input type=file>` yet), so it is not keyboard reachable — expected until the upload phase. (From the form-state phase onward there IS a hidden `#organization-logo` file input — use the automation tool's `select_file` on it; a `chmod 000` file safely triggers the FileReader read-failure path.)
- Ignore `[HMR] connected` and the React DevTools notice in the dev console; they are not app errors.

## Devin Secrets Needed
None — the app is static, client-only and unauthenticated.
