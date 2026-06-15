# Candy design system

Shared visual primitives extracted from dashboard v2
(`src/components/dashboard/v2/**`, source of truth:
`design/dashboard-approved.html`). These are the building blocks for
rebuilding other screens in the same "candy" gamified style — chunky 3D
buttons, rounded drop-shadow cards, springy progress bars/rings, pills and
the eagle mascot.

Import from `@/components/ui/candy`.

## Tokens — `tokens.module.css`

`.candyTheme` defines the canonical candy palette as CSS custom properties.
Apply it (directly or via `composes`) to the root element of any screen that
uses these primitives — without it, the `var(--candy-*)` references below
have no values.

Light values are the defaults; `[data-theme='dark'] .candyTheme` overrides
the **neutral** tokens only. The candy/brand hues are identical in both
themes.

| Token | Light | Dark |
|---|---|---|
| `--candy-bg` | `#F0F4FF` | `#0D1117` |
| `--candy-card` | `#FFFFFF` | `#161B22` |
| `--candy-ink` | `#3C3B54` | `#E6EDF3` |
| `--candy-ink-soft` | `#8B8AA3` | `#8B949E` |
| `--candy-shadow` | `#E0E4F5` | `rgba(0,0,0,0.45)` |
| `--candy-purple` / `--candy-purple-d` | `#8B5CF6` / `#7C3AED` | same |
| `--candy-blue` / `--candy-blue-d` | `#3B9EFF` / `#2B7FD9` | same |
| `--candy-green` / `--candy-green-d` | `#58CC02` / `#46A302` | same |
| `--candy-yellow` / `--candy-yellow-d` | `#FFC800` / `#E6AC00` | same |
| `--candy-orange` | `#FF9600` | same |
| `--candy-red` | `#FF4B4B` | same |
| `--candy-pink` | `#FF5FA2` | same |

Dashboard v2 consumes this token set via
`composes: candyTheme from '...tokens.module.css'` on `.dashboardV2`, then
aliases its own local var names (`--bg`, `--card`, `--purple`, ...) to the
`--candy-*` equivalents — so the rest of `dashboard.module.css` is unchanged.

## `<CandyPage />`

Page-level shell — wrap a screen's root in this to opt the whole page into
the candy visual language. Composes `.candyTheme` (so `var(--candy-*)`
resolves for every candy primitive used inside), and applies the candy
background, ink color, Nunito body font and `min-height: 100vh` — matching how
/dashboard's `.dashboardV2` root is configured. Renders a `<div>`; pass page
layout (container width, padding, flex centering) via `className`/`style` or a
child wrapper. Light/dark flips automatically via the app-wide `data-theme`.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `className` | `string` | — | page layout / container utilities |
| ...rest | `HTMLAttributes<HTMLDivElement>` | — | forwarded to the `<div>` |

## `<Card />`

Rounded (24px) surface with the flat candy drop-shadow
(`0 4px 0 var(--candy-shadow)`). Renders a `<div>`.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `className` | `string` | — | add layout (padding, flex/grid, gap, ...) |
| ...rest | `HTMLAttributes<HTMLDivElement>` | — | forwarded to the `<div>` |

## `<CandyButton />`

Chunky 3D-press button (`<button>`). A flat bottom shadow shrinks on press
and can grow on hover, simulating a physical button.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `depth` | `number` (px) | `4` | resting shadow depth |
| `shadowColor` | `string` (CSS color) | `var(--candy-shadow)` | |
| `hoverLift` | `number` (px) | `2` | `translateY(-N)` on hover |
| `hoverDepth` | `number` (px) | `depth` | shadow depth while hovered |
| `activePush` | `number` (px) | `1` | `translateY(+N)` on press |
| `activeDepth` | `number` (px) | `1` | shadow depth while pressed |
| ...rest | `ButtonHTMLAttributes<HTMLButtonElement>` | — | forwarded to the `<button>` |

Dashboard presets:
- Stat chip (CSS-only, via `composes: btn3d`): `depth=3`, `hoverLift=2`, `activePush=1`, `activeDepth=1`, `shadowColor=var(--shadow)`.
- Continue card: `depth=6`, `hoverLift=3`, `hoverDepth=9`, `activePush=3`, `activeDepth=3`, `shadowColor=var(--candy-green-d)`.
- Mode card: `depth=5`, `hoverLift=4`, `activePush=2`, `activeDepth=3`, `shadowColor=var(--candy-shadow)`.

## `<SectionTitle />`

Baloo 2, 20px/800 heading used to introduce a group of cards (e.g.
"⚡ Jump back in"). Renders a `<div>`; put the emoji directly in `children`.

| Prop | Type | Default | Notes |
|---|---|---|---|
| ...rest | `HTMLAttributes<HTMLDivElement>` | — | forwarded to the `<div>` |

## `<Pill />`

Small rounded label (e.g. a "NEW" badge). Renders a `<span>`.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `color` | `string` (CSS color) | `var(--candy-red)` | background color |
| ...rest | `HTMLAttributes<HTMLSpanElement>` | — | forwarded to the `<span>`; use `className` for absolute positioning |

## `<ProgressBar />`

Linear progress bar with the springy `growBar` overshoot animation.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `percent` | `number` | required | 0-100 |
| `height` | `number` (px) | `12` | |
| `borderRadius` | `number` (px) | `8` | |
| `trackColor` | `string` | `#EEF1FB` | |
| `fillColor` | `string` (color or gradient) | `linear-gradient(90deg, var(--candy-green), #7DE029)` | |
| `animated` | `boolean` | `true` | `false` renders at final width immediately (e.g. quest bars) |
| `className` | `string` | — | |

## `<ProgressRing />`

Circular progress ring with the springy `fillRing` overshoot animation.
`'use client'` (uses `useId` for a unique gradient id).

| Prop | Type | Default | Notes |
|---|---|---|---|
| `percent` | `number` | required | 0-100 |
| `size` | `number` (px) | `84` | overall width/height |
| `radius` | `number` (px) | `36` | circle radius |
| `strokeWidth` | `number` (px) | `10` | |
| `trackColor` | `string` | `#EEF1FB` | |
| `gradientFrom` | `string` | `#8B5CF6` (candy purple) | fill stroke gradient start |
| `gradientTo` | `string` | `#3B9EFF` (candy blue) | fill stroke gradient end |
| `label` | `ReactNode` | — | centered content, e.g. a "65%" label |
| `className` | `string` | — | |

## `<EagleMascot />`

The two hand-drawn eagle illustrations ported verbatim from
`design/dashboard-approved.html` — **do not redesign or simplify the
paths**.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `'logo' \| 'hero'` | required | `'logo'` = 38x38 mark (top bar); `'hero'` = 110x110 mark (banners) — different artwork, not a scaled copy |
| `size` | `number` (px) | `38` (logo) / `110` (hero) | uniform scale via the SVG `viewBox` |
| `className` | `string` | — | |

## `useConfetti()`

Returns a callback that bursts 40 confetti particles across the viewport
using the Web Animations API (ported from
`design/dashboard-approved.html`'s inline `<script>`). No arguments — the
hook owns its `.confetti` CSS class from `primitives.module.css`.

```tsx
const fireConfetti = useConfetti()
<button onClick={() => fireConfetti()}>...</button>
```

## Keyframes

`primitives.module.css` also defines the shared springy keyframes:
- `growBar` — linear `ProgressBar` fill-in (`cubic-bezier(0.34, 1.56, 0.64, 1)`, 1.2s)
- `fillRing` — circular `ProgressRing` fill-in (same easing, 1.4s)
