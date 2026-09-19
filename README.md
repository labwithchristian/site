# christiancarrasco.dev

Personal site built with [Hugo](https://gohugo.io) (extended, v0.166.0) and the
[Blowfish](https://github.com/nunocoracao/blowfish) theme, deployed to GitHub Pages by GitHub Actions.
See `DEPLOYMENT-SOP.md` for the domain, DNS and certificate setup.

## Local development

```bash
git clone --recurse-submodules https://github.com/labwithchristian/site.git
cd site
hugo server --buildDrafts
```

Already cloned without submodules? Run `git submodule update --init`.

`--buildDrafts` previews the draft posts in `content/blog/`. Production builds exclude drafts.

## How it's put together

### Theme

Blowfish is a git submodule at `themes/blowfish`, pinned to a specific upstream commit. Nothing inside
it is edited. Every customization lives in this repo's own `layouts/` and `assets/`, which Hugo prefers
over the theme's files.

To update the theme deliberately:

```bash
cd themes/blowfish
git fetch && git checkout <tag-or-commit>
cd ../..
hugo server   # check every page, light and dark, desktop and phone
git add themes/blowfish && git commit -m "Update Blowfish to <version>"
```

### Template overrides (`layouts/`)

| File | What it changes |
|---|---|
| `_default/baseof.html` | Adds `data-astral`, `data-heading-font` and `data-bg-tinted` attributes to `<html>` |
| `_default/list.html` | Drops the theme's "no articles" line; sections use their own empty states |
| `_default/_markup/render-heading.html` | Theme heading markup, but keeps classes set with `{.h-minor}` style attributes |
| `partials/header/floating.html`, `header/basic.html` | Compact pill nav with the Home icon |
| `partials/home/landing.html` | Homepage hero: name, `heroRole` eyebrow, lead, buttons |
| `partials/cta-button.html` | Primary and outline buttons with an arrow (optional `download`) |
| `partials/extend-head.html` | Loads the site stylesheet bundle |
| `partials/extend-head-uncached.html` | Loads the homepage intro script on the homepage only |
| `partials/extend-footer.html` | Credits line |
| `partials/nav-icons/tp-classic.html` | Terminal pot Home icon (`navHomeIcon` in `params.toml`) |
| `partials/header/social-links.html` | LinkedIn and GitHub icons at the top right of every page (`navSocial` in `params.toml`, URLs from `languages.en.toml`) |

### Styles (`assets/css/site/`)

Every file in this folder is concatenated in filename order and loaded after the theme's CSS:

| File | Covers |
|---|---|
| `00-fonts.css` | Self-hosted faces and font tokens (`--font-display`, `--font-body`, `--font-mono`) |
| `10-typography.css` | Type scale tokens (`--step--1` to `--step-5`), headings, body copy, link underlines |
| `20-surfaces.css` | Page background, glass surfaces, background pattern |
| `30-nav.css` | Nav pill, mobile dropdown, Home icon |
| `40-hero.css` | Hero name, role eyebrow, lead, buttons |
| `50-home.css` | Skills marquee, highlights, career timeline, core strengths, pipeline, experience cards, certifications, connect |
| `60-pages.css` | whoami portrait and How I work headings, resume page, work-in-progress and coming-soon blocks, network diagram, spec cards |
| `70-footer.css` | Footer menu and credits |
| `80-intro.css` | Homepage intro overlay |
| `90-print.css` | Print and Save as PDF layout, mainly for the resume |

Colors come from the scheme in `assets/css/schemes/nebula-stone.css` (`colorScheme` in `params.toml`).
Use its variables, for example `rgb(var(--color-primary-600))`, rather than hex values, so light and
dark mode stay in step.

### Fonts (`static/fonts/`)

| Role | Face |
|---|---|
| Headings | Fraunces (variable) |
| Body and UI | IBM Plex Sans (variable) |
| Eyebrows, labels, terminal text | IBM Plex Mono 400 and 500 |

All are latin-subset woff2 files from Fontsource, so the site makes no third-party font requests.

### Homepage intro

`assets/js/intro.js` plays a short terminal "breach" overlay (about 3.5 seconds) on a visitor's first
homepage visit, then animates the hero name. It's remembered per browser, skippable, and never runs for
visitors who prefer reduced motion. Set `introSequence = false` in `params.toml` to turn it off.

### Resume and its PDF

`content/resume/index.md` is the full resume. The site pages split the work:

| Page | Job |
|---|---|
| Home | The 30-second pitch: highlights, core strengths, a short career timeline, certifications |
| Resume | The full record: dated experience, frameworks, tools, certifications, education |
| whoami | How Christian works, and who he is outside of work |

The **Download PDF** button appears whenever a PDF sits next to the page
(`content/resume/christian-carrasco-resume.pdf`). It can be Christian's own exported resume: replace
the file, keeping the name. To generate one from the page instead: run `hugo server`, open `/resume/` in Chrome in light mode, Print, Destination "Save as PDF",
Paper "Letter", Margins "Default", Background graphics off, and save over the file. `90-print.css`
strips the site chrome and adds the name and links at the top.

### Link previews

`static/img/og-card.jpg` (1200x630) is the image LinkedIn, Slack and X show when the site is shared.
It's set with `images` in `params.toml`.

## Shortcodes

| Shortcode | Used on | Purpose |
|---|---|---|
| `logos items="slug, slug" speed="45"` | Home | Scrolling Skills & Tools logo marquee. Logos live in `assets/img/logos/`; `text:Label` adds a wordmark |
| `highlights` + `highlight figure label` | Home | Proof-point tiles under the hero. Swap figures for outcome numbers as they're gathered |
| `timeline more` + `timeline-item dates role company` | Home | Career at a glance, with a button to the full resume. For a promotion, nest `timeline-role title dates promoted` entries in one item, newest first; each title gets its own row and dates, and `promoted` draws the promotion comet |
| `resume-head facts="Label :: Value \| ..."` | Resume | Summary, quick facts, Download PDF and LinkedIn buttons, print-only name block |
| `job company dates location context positions tags` | Resume | One employer: titles held (`"Title :: years \| Title :: years"`), Markdown bullets, tags |
| `role title dates promoted tags` | Resume | Inside `job`, one title with its own bullets and tags, for a promotion (newest first; `promoted="2023"` on the newer title draws the promotion comet) |
| `strengths` + `strength icon title items` | Home | Core Strengths cards |
| `pipeline items="Name :: Status :: Note \| ..."` | Home, Homelab | Status list with cooking-themed badges |
| `xp` | Resume | Wrapper that stacks `job` cards |
| `certs groups="Label :: Cert, Cert \| ..." seal class` | Home, Resume | Labeled pill groups. `seal="false"` for lists that aren't certifications |
| `connect url label` | Home | `> connect --linkedin` card |
| `connect-mini url label` | whoami | One-line LinkedIn sign-off at the end of a page |
| `intro image alt` | whoami | Portrait beside the opening statement |

On whoami, `### Area {.area}` renders a small eyebrow for a Core Strengths area, with `####` practices under it.
| `specs` + `spec role title rows tags` | Homelab | Hardware spec cards. `rows="CPU: ... \| Memory: ..."` |
| `proof items="Label :: file.jpg :: alt \| ..."` | Resume | Thumbnails at the bottom of a card that open a popup viewer (`assets/js/proof.js`). Images live in the page bundle |
| `network-diagram` | Homelab | Inline SVG network diagram. Edit the labels in the shortcode file |
| `soon title status` | Writeups, Blog, Tags | Coming-soon block |
| `wip title` | Homelab | Work-in-progress block |

Homepage section headings can be made smaller with a heading attribute:
`## Education {.h-minor}`.

## Adding content

```bash
hugo new content writeups/network-segmentation.md
hugo new content blog/some-new-post.md
```

When the first post is published, set `showRecent = true` under `[homepage]` in `params.toml` to bring
back the recent posts list.

## Continuous integration

`.github/workflows/hugo.yml` runs on every pull request and every push to `main`:

1. Builds the site with Hugo extended.
2. Checks every internal link, anchor, stylesheet, script and image in the build with
   [lychee](https://github.com/lycheeverse/lychee), offline. A broken internal link fails the run.
3. On `main` only, deploys the build to GitHub Pages.

Working on a branch and opening a pull request gets the checks without touching the live site.
