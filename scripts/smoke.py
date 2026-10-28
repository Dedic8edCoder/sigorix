"""Browser smoke test: serves dist/, visits every route at several viewports.
Fails on console errors, failed requests, horizontal overflow, or missing h1. Optional: --shots DIR."""
import sys, subprocess, time, pathlib, re, os
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
PORT = os.environ.get("PORT", "4173")
BASE = f"http://localhost:{PORT}"
shots = pathlib.Path(sys.argv[sys.argv.index("--shots")+1]) if "--shots" in sys.argv else None
if shots: shots.mkdir(parents=True, exist_ok=True)

routes = ["/"] + [f"/{p.parent.relative_to(ROOT/'dist').as_posix()}/" for p in sorted((ROOT/'dist').rglob('index.html')) if p.parent != ROOT/'dist'] + ["/does-not-exist/"]
viewports = {"mobile-320": (320, 640), "mobile-390": (390, 844), "tablet": (820, 1180), "laptop": (1280, 800), "desktop": (1920, 1080)}

srv = subprocess.Popen(["node", "scripts/serve.mjs"], cwd=ROOT, env={**os.environ, "PORT": PORT}, stdout=subprocess.DEVNULL)
time.sleep(1.2)
problems = []
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        for vn, (w, h) in viewports.items():
            ctx = b.new_context(viewport={"width": w, "height": h}); pg = ctx.new_page()
            errs = []
            pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
            pg.on("pageerror", lambda e: errs.append(str(e)))
            pg.on("requestfailed", lambda r: errs.append("requestfailed " + r.url))
            pg.on("response", lambda r: errs.append(f"{r.status} {r.url}") if r.status >= 400 and "does-not-exist" not in r.url else None)
            for r in routes:
                errs.clear()
                pg.goto(BASE + r); pg.wait_for_load_state("networkidle")
                over = pg.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
                h1 = pg.locator("h1").count()
                if over > 0: problems.append(f"[{vn}] {r}: horizontal overflow {over}px")
                if h1 != 1: problems.append(f"[{vn}] {r}: {h1} h1 elements")
                for e in errs:
                    if 'does-not-exist' in r and 'status of 404' in e: continue
                    problems.append(f"[{vn}] {r}: {e}")
                if shots and (r in ("/", "/contact/", "/process/", "/services/", "/about/") or "does-not" in r):
                    pg.evaluate("document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in'))")
                    pg.screenshot(path=str(shots / f"{vn}{re.sub('[^a-z0-9]+','-',r) or '-home'}.png"), full_page=(vn != 'desktop'))
            ctx.close()
        b.close()
finally:
    srv.terminate()
print(f"{len(routes)} routes x {len(viewports)} viewports")
if problems:
    print("\n".join(problems)); sys.exit(1)
print("smoke: OK")
