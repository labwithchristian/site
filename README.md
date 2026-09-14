# christiancarrasco.dev

Personal site built with [Hugo](https://gohugo.io) + the [Blowfish](https://github.com/nunocoracao/blowfish) theme.
Mermaid diagrams work out of the box via the `{{< mermaid >}}...{{< /mermaid >}}` shortcode.

## Structure

- `content/_index.md` — homepage (landing layout: hero, skills marquee, capability cards, what's
  cooking, experience timeline)
- `content/about.md` — the whoami page
- `content/homelab/_index.md` — the maintained, non-dated lab architecture reference
- `content/writeups/` — formal technical writeups (network segmentation, detection engineering, etc.)
- `content/blog/` — lighter narrative posts. Two drafts are stubbed with `draft: true`: paste in
  the actual text, set `draft: false`, and adjust the `date` when ready to publish.
- `config/_default/` — split config: `hugo.toml` (site-level), `languages.en.toml` (title/bio/social
  links), `menus.en.toml` (nav), `params.toml` (theme options), `markup.toml` (required by the theme).

## Before you push this live

1. Domain is `christiancarrasco.dev`, registered at Cloudflare. `static/CNAME` and `baseURL` in
   `config/_default/hugo.toml` are already set to it.
2. Add a headshot at `assets/img/author.jpg` (the homepage/profile layout will pick it up
   automatically — it's skipped gracefully if missing, which is why the build works without one).
3. GitHub handle is `labwithchristian` (set in `languages.en.toml`). LinkedIn stays `cybercc`.
4. Push to a public GitHub repo, then in the repo's Settings → Pages, set the custom domain and
   the source to "GitHub Actions" (the workflow at `.github/workflows/hugo.yml` handles the rest).

## First-time git setup

See DEPLOYMENT-SOP.md for the full go-live procedure. The Blowfish theme is vendored as plain files
in `themes/blowfish/`, so a normal `git add .` commits everything needed and the build works with no
submodule step.

## Local development

Requires the Hugo **extended** binary (this was built and tested against v0.166.0).

```bash
git clone https://github.com/labwithchristian/site.git
cd site
hugo server --buildDrafts
```

`--buildDrafts` is needed to preview the two draft posts in `content/blog/` locally; the production
build (and the GitHub Actions workflow) excludes drafts automatically.

## Adding a new writeup or note

```bash
hugo new content writeups/network-segmentation.md
hugo new content blog/some-new-post.md
```

## Adding a diagram

```markdown
{{< mermaid >}}
flowchart LR
  A --> B
{{< /mermaid >}}
```

## Color schemes

Nine custom schemes live in `assets/css/schemes/`. Switch by setting `colorScheme`
in `config/_default/params.toml`:

Green family: `signal`, `sage`, **`pine` (active)**, `moss`, `juniper`
Other: `ember` (amber/copper), `cobalt` (blue/coral), `meridian` (violet/cyan), `clay` (terracotta/sage)

Each file defines three ramps: `--color-neutral-*`, `--color-primary-*`, `--color-secondary-*`.
Primary drives buttons, links, timeline rail and icon chips; secondary is accent-only.

## Background patterns

Subtle tiling SVGs in `assets/img/patterns/`: `grid`, `dots`, `topo`, `circuit`, `mesh`,
`packets`, `nodes`.
Controlled by two params:

```toml
defaultBackgroundImage = "img/patterns/grid.svg"
backgroundCanvas = true
```

The theme renders this as a fixed full-page layer behind everything, with a translucent
overlay on top, so the pattern stays quiet. Patterns are drawn in neutral gray
(`#8a8f8c`) at low opacity so they work under any color scheme. Set
`backgroundCanvas = false` to turn the pattern off entirely.

## Skills & tools marquee

The homepage uses a custom `logos` shortcode (`layouts/shortcodes/logos.html`) that renders an
infinite horizontal scroll of tool marks:

```
{{< logos items="proxmox, linux, docker, ansible" speed="55" >}}
```

`items` is a comma-separated list of filenames (without `.svg`) from `assets/img/logos/`, with each
label read from that SVG's `<title>` element. `speed` is the loop duration in seconds; higher is
slower.

The shortcode also supports a `text:Label` form that renders a typographic wordmark instead of an
icon. It is deliberately unused: text entries sitting beside real marks look inconsistent. Only add
a tool here if you have an actual logo for it.

The track is duplicated in the markup so the loop is seamless. Labels are read from each SVG's
`<title>` element, so adding a new logo requires no extra config. Marks are monochrome and inherit
`--color-neutral-*`, tinting to `--color-primary-*` on hover, so they adapt to any color scheme
instead of clashing with it.

Hovering pauses the animation, and `prefers-reduced-motion` disables it entirely in favour of a
horizontally scrollable row.

### Adding or removing tools

Drop a monochrome SVG into `assets/img/logos/` and add its name to the `items` list.

Marks come from two sources, both CC0 at the package level, with individual logos remaining
trademarks of their owners:

- [Simple Icons](https://simpleicons.org/), already monochrome single-path
- [SVG Logos](https://github.com/gilbarbara/logos) via `@iconify-json/logos`, for brands Simple Icons
  does not carry (AWS, Azure, Microsoft). These ship in full colour, so they were converted:
  `<defs>` and gradient blocks stripped, all `fill` attributes removed, so the shape inherits
  `currentColor` and picks up the theme like every other mark.

No mark exists in either set for ServiceNow, LogRhythm, Rapid7, SCCM, Active Directory, Hyper-V or
Nmap, so those tools are not shown.

## Footer credits

`layouts/partials/extend-footer.html` hooks into Blowfish's footer extension point and credits the
sites this design drew from, plus the icon source. Edit that file to change the wording.

## Astral mode (glass surfaces)

Set under `[params]` in `config/_default/params.toml`:

```toml
astral = true
```

This puts `data-astral="true"` on `<html>` (via the `layouts/_default/baseof.html` override) and
activates the glass block in `assets/css/custom.css`: feature cards, timeline entries, article cards
and the floating header become semi-transparent with a backdrop blur and a primary-tinted edge, so
the background pattern reads through them. The canvas overlay is also darkened slightly so the
pattern stays visible behind the glass.

It respects `prefers-reduced-transparency` by dropping the blur.

Astral mode and the color scheme are independent. `astral = true` works with any of the twelve
schemes; the three tuned for it are `nebula`, `aurora`, and `cosmos`. Pair it with
`img/patterns/starfield.svg` for the full effect.

Astral schemes: `nebula` (indigo-violet + magenta), `aurora` (teal-cyan + violet),
`cosmos` (royal blue + starlight gold).

### Light nebula variants

Three off-white companions to `nebula`, each a different ground:

| Scheme | Page background | Character |
|---|---|---|
| `nebula-mist` | 248, 247, 252 | cool violet-tinted off-white, softest |
| `nebula-linen` | 251, 250, 246 | warm paper off-white, violet reads cooler against it |
| `nebula-quartz` | 253, 252, 255 | near-white with a faint lilac cast, highest contrast |

Violet ramps are deepened relative to dark `nebula` so links and buttons hold contrast on a light
ground. `astral = true` works with all three: on light backgrounds the glass lifts cards with a
white translucent fill and a soft primary shadow instead of tinting them darker.

Set `defaultAppearance = "light"` to open on the light variant, or leave
`autoSwitchAppearance = true` to follow the visitor's OS setting.

### Deeper light nebula variants

For a light theme with more ground than off-white. Each step is progressively deeper; all keep the
same violet and magenta accents, and `--color-neutral-50` is set *lighter* than the page ground so
cards lift off it rather than sinking in.

| Scheme | Page ground | Depth |
|---|---|---|
| `nebula-fog` | 240, 238, 247 | lightest of this set |
| `nebula-lilac` | 231, 227, 241 | clearly tinted, still bright |
| `nebula-stone` | 220, 216, 232 | muted, low glare |
| `nebula-dusk` | 206, 201, 222 | deepest light option |

Pair with `astral = true` for the white translucent card lift, which reads more strongly the deeper
the ground gets.

### Pattern legibility on light grounds

The pattern SVGs are drawn once, in neutral gray, and adapted per mode in `custom.css`:

```css
html:not(.dark) #background-canvas img { filter: brightness(0.42); }
html.dark      #background-canvas img { filter: brightness(1.45); }
```

`brightness()` scales RGB but leaves alpha untouched, so the strokes stay exactly as subtle as
drawn while darkening on light grounds and lifting on dark ones. The canvas overlay is also pulled
back in light mode (the theme default washes at 75%, which erases the pattern on a tinted ground).

If a pattern still reads too strong or too faint on a given scheme, adjust those two brightness
values rather than editing the SVGs.

## What's cooking section

A `pipeline` shortcode (`layouts/shortcodes/pipeline.html`) renders in-progress learning as a
status list. It appears on both the homepage and the whoami page.

```
{{< pipeline items="CISSP :: Nov 2026 :: short description | Home lab buildout :: Ongoing :: short description" >}}
```

Items are separated by `|`, and each item's fields by `::` in the order
`name :: status :: description`. The description is optional.

The status dot is solid primary for anything active, and muted grey when the status begins with
"target" or "queued", so future items read as queued rather than underway. Update the statuses as
things complete; finished items should move to the certifications list instead of staying here.

## Heading fonts

Display faces are self-hosted in `static/fonts/` (woff2, sourced from Fontsource via npm), so the
site makes no third-party font requests. Switch with `headingFont` in `params.toml`:

| Value | Face | Character |
|---|---|---|
| `instrument` | Instrument Serif | high contrast, editorial |
| `instrument-italic` | Instrument Serif italic | the most cursive of the set |
| `fraunces` | Fraunces (variable) | soft, characterful, slightly quirky |
| `fraunces-italic` | Fraunces italic | quirky and semi-cursive |
| `newsreader-italic` | Newsreader italic | literary, calm |
| `playfair-italic` | Playfair Display italic | classic, dramatic contrast |
| `literata` | Literata (variable) | sturdy, highly readable |

Remove the `headingFont` line entirely to fall back to the theme's system sans.

Only `h1`, `h2` and `h3` take the display face. Body copy, nav, badges and marquee labels stay in
the body font so reading flow and UI legibility are unaffected. Per-face weight, slant and tracking
are set as CSS variables in `assets/css/custom.css`; adjust there rather than in the heading rule.

Adding another face: `npm i @fontsource/<name>`, copy the woff2 into `static/fonts/`, add a
`@font-face` block and a `html[data-heading-font="<value>"]` variable block in `custom.css`.
