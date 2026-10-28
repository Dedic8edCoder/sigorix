# Brand implementation

## Assets
| File | Use |
|---|---|
| `public/brand/original/sigorix-*.png` | Approved originals. Never edited. Not deployed. |
| `public/brand/sigorix-fox.{webp,png}`, `-sm.webp` | Prism Fox: header mark, hero, About. |
| `public/brand/sigorix-horizontal.*` | Horizontal logo: footer. |
| `public/brand/sigorix-primary.*` | Primary logo (with tagline): available; not currently placed. |
| `public/icons/*`, `public/favicon.ico` | Derived from the Prism Fox on Obsidian. |
| `public/og-image.png` | Social preview, 1200×630, generated from the fox + tagline (set in system fonts). |

Derivatives only trim fully transparent margins and re-encode (WebP for speed, PNG fallback). Pixels of the artwork are not recoloured, scaled non-proportionally or cropped. Image dimensions are set on every `<img>` to prevent layout shift.

**Wordmark on dark.** The wordmark in the supplied logos is black, so the horizontal/primary logos sit on a Titanium White plate (footer). The dark header pairs the fox with the name set in live type; if you would rather show the full logo artwork in the header, supply a light-on-dark wordmark variant.

## Colours
Obsidian `#101116`, Electric Violet `#8257FF`, Prism Cyan `#64E7F2`, Titanium White `#E9EAF0`, Metallic Silver `#A7ACBA`.

Two **derived tints** were added purely for legibility, since pure Electric Violet measures about 4.2:1 on Obsidian and 3.7:1 on Titanium White (below the 4.5:1 AA threshold for body text):
- `--violet-300 #A58AFF` for violet text on dark (≈ 6.9:1)
- `--violet-deep #5B33D6` for violet text on light (≈ 6:1)

Pure Electric Violet is used for fills, borders and decoration. The primary button is Titanium White on Obsidian for the same reason.

## Typography
System font stacks only (no network font requests, fast, private). To adopt a licensed or OFL webfont, self-host the WOFF2 in `public/fonts/`, add `@font-face` (with `font-display: swap`) in `styles.css` and change `--font-display` / `--font-body`. No font was bundled because none could be downloaded in the build environment.

## Motion
Subtle hero fox drift, dashed prism rays, scroll reveals, hover transitions, CSS view transitions between pages. All disabled under `prefers-reduced-motion`; content is fully visible without JavaScript.
