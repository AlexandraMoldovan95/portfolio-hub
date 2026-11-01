# Portfolio Hub

The landing page for my project portfolio — two tabs, **About me** and
**Portfolio**. Portfolio lists nine projects as stacked rows (screenshot +
pitch), each linking to its own detail page with the full write-up and links
to its code and live demo.

**[Live →](https://alexandra-moldovan.netlify.app/)**

## Why it exists

I wanted one page recruiters land on instead of nine separate repos with
nine different styles. Every project detail page follows the same structure
— one-line pitch → main picture → What / My role / Quality / Status → Why
this exists → Highlights → How it was built — so a recruiter learns the
format once on the first project and can skim the rest in seconds.

## Structure

```
index.html                           — hub: About me tab + Portfolio tab
styles.css                            — shared styles (light/dark theme, animations)
script.js                             — theme toggle, tabs, scroll-reveal
images/                               — real screenshots used on rows and detail pages
projects/
  desktop-buddy.html
  flashcards.html
  job-tracker.html
  skyline-weather.html
  claritate.html
  document-embedding-studio.html
  halvorsen-reyes-builders.html
  note-organizer.html
  video-editor.html
netlify.toml
.gitignore
```

## Design

Light/dark theme via CSS custom properties, following system preference by
default with a manual toggle (remembered in `localStorage`). Near-black /
off-white neutrals with a single lime accent, Space Grotesk for headings,
Inter for body text — deliberately different from any single project in the
portfolio, so the hub reads as its own thing rather than borrowing one
project's look. Project rows fade up into view on scroll
(`IntersectionObserver`, with a visible-by-default fallback if JS doesn't
run, and a 2s safety timeout so nothing can get stuck invisible) and respect
`prefers-reduced-motion`.

## How it was built

Plain HTML/CSS/JS, no framework, no build step — nine project pages sharing
one layout convention, written in pair-programming with Claude (Anthropic's
AI assistant). I own the structure and the writing on every page: what each
project says about itself, in what order, and how honestly (including
listing real limitations, not just wins).

## License

MIT — see [LICENSE](LICENSE).
