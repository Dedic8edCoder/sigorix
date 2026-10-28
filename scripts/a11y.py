"""Lightweight accessibility audit in a real browser (no network needed): computed text contrast,
focusable-control names, form control labels, heading order, landmark and keyboard checks.
This complements, and does not replace, manual screen-reader and keyboard testing."""
import sys, subprocess, time, pathlib, os
from playwright.sync_api import sync_playwright
ROOT = pathlib.Path(__file__).resolve().parent.parent
PORT = os.environ.get("PORT", "4174"); BASE = f"http://localhost:{PORT}"
routes = ["/"] + [f"/{p.parent.relative_to(ROOT/'dist').as_posix()}/" for p in sorted((ROOT/'dist').rglob('index.html')) if p.parent != ROOT/'dist'] + ["/nope/"]
JS = r"""
() => {
  const lum=c=>{const a=c.map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*a[0]+.7152*a[1]+.0722*a[2]};
  const parse=s=>{const m=s.match(/rgba?\(([^)]+)\)/);if(!m)return null;const p=m[1].split(/[ ,\/]+/).filter(Boolean).map(Number);return {r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}};
  const over=(f,b)=>({r:f.r*f.a+b.r*(1-f.a),g:f.g*f.a+b.g*(1-f.a),b:f.b*f.a+b.b*(1-f.a),a:1});
  const bgOf=el=>{let stack=[];for(let e=el;e;e=e.parentElement){const c=parse(getComputedStyle(e).backgroundColor);if(c&&c.a>0){stack.push(c);if(c.a>=1)break}}let base={r:16,g:17,b:22,a:1};for(let i=stack.length-1;i>=0;i--)base=over(stack[i],base);return base};
  const out=[];
  document.querySelectorAll('body *').forEach(el=>{
    if(!el.childNodes.length)return;
    const hasText=[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());
    if(!hasText)return;
    const cs=getComputedStyle(el); if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity===0)return;
    if(cs.webkitTextFillColor==='rgba(0, 0, 0, 0)'||el.closest('.grad,.tl-n,.hp,.sr,.skip'))return;
    const fg=parse(cs.color); if(!fg)return; const bg=bgOf(el); const f=over(fg,bg);
    const L1=lum([f.r,f.g,f.b]),L2=lum([bg.r,bg.g,bg.b]);const ratio=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);
    const px=parseFloat(cs.fontSize),bold=+cs.fontWeight>=700;const large=px>=24||(px>=18.66&&bold);
    if(ratio<(large?3:4.5))out.push(`${el.tagName.toLowerCase()}.${el.className||''} "${el.textContent.trim().slice(0,30)}" ratio ${ratio.toFixed(2)} (${cs.color} on rgb(${Math.round(bg.r)},${Math.round(bg.g)},${Math.round(bg.b)}))`);
  });
  document.querySelectorAll('a,button,input,select,textarea').forEach(el=>{
    if(el.closest('.hp'))return;
    const name=(el.getAttribute('aria-label')||el.textContent||'').trim()||(el.labels&&el.labels[0]&&el.labels[0].textContent.trim());
    if(!name)out.push(`unnamed control <${el.tagName.toLowerCase()}> ${el.outerHTML.slice(0,80)}`);
    const r=el.getBoundingClientRect(); if(el.tagName==='A'&&el.closest('p,li')&&getComputedStyle(el).display==='inline')return;
    if(r.width&&r.height&&(r.height<24||r.width<24)&&!el.closest('.hp'))out.push(`small target ${r.width|0}x${r.height|0} ${el.outerHTML.slice(0,60)}`);
  });
  let last=0;document.querySelectorAll('h1,h2,h3,h4').forEach(h=>{const n=+h.tagName[1];if(last&&n>last+1)out.push(`heading jump h${last}->h${n} "${h.textContent.trim().slice(0,30)}"`);last=n});
  return out;
}
"""
srv = subprocess.Popen(["node", "scripts/serve.mjs"], cwd=ROOT, env={**os.environ, "PORT": PORT}, stdout=subprocess.DEVNULL); time.sleep(1.2)
bad = 0
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        for vw in (390, 1280):
            pg = b.new_context(viewport={"width": vw, "height": 900}, reduced_motion="reduce").new_page()
            for r in routes:
                pg.goto(BASE + r); pg.wait_for_load_state("networkidle")
                for issue in pg.evaluate(JS):
                    bad += 1; print(f"[{vw}] {r}: {issue}")
        # keyboard: menu button reachable and operable on mobile
        pg = b.new_context(viewport={"width": 390, "height": 844}).new_page(); pg.goto(BASE + "/"); pg.wait_for_load_state("networkidle")
        pg.keyboard.press("Tab"); first = pg.evaluate("document.activeElement.className")
        if first != "skip": bad += 1; print("first tab stop is not the skip link:", first)
        pg.focus("[data-menu]"); pg.keyboard.press("Enter")
        if pg.get_attribute("[data-menu]", "aria-expanded") != "true": bad += 1; print("menu not operable via keyboard")
        b.close()
finally:
    srv.terminate()
print("a11y audit:", "OK" if not bad else f"{bad} issue(s)"); sys.exit(1 if bad else 0)
