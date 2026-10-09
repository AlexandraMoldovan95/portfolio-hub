# Portfolio Hub

The landing page for my project portfolio — two tabs, **About me** and
**Portfolio**. Portfolio lists eight projects as stacked rows (screenshot +
pitch), each linking to its own detail page with the full write-up and links
to its code and live demo.

**[Live →](https://alexandra-moldovan.netlify.app/)**

## Structure

```
index.html                           — hub: About me tab + Portfolio tab
styles.css                            — shared styles (light/dark theme, animations)
script.js                             — theme toggle, tabs, scroll-reveal
images/                               — real screenshots used on rows and detail pages
  avatar.jpg                          — personal photo, gitignored (see "The avatar photo" below)
projects/
  desktop-buddy.html
  flashcards.html
  job-tracker.html
  skyline-weather.html
  claritate.html
  document-embedding-studio.html
  halvorsen-reyes-builders.html
  note-organizer.html
netlify.toml
.gitignore
```

Every project detail page follows the same structure: one-line pitch → main
picture → What / My role / Quality / Status → Why this exists → Highlights →
How it was built — so a recruiter learns the format once and can skim the
rest.

## Design

Light/dark theme via CSS custom properties, following system preference by
default with a manual toggle (remembered in `localStorage`). Near-black /
off-white neutrals with a single lime accent, Space Grotesk for headings,
Inter for body text — deliberately different from any single project in the
portfolio. Project rows fade up into view on scroll (`IntersectionObserver`,
with a visible-by-default fallback if JS doesn't run, and a 2s safety timeout
so nothing can get stuck invisible) and respect `prefers-reduced-motion`.

## The avatar photo

`images/avatar.jpg` is listed in `.gitignore` on purpose, at my own request —
I didn't want a personal photo sitting in public git history forever, even
though it's fine for it to be visible on the live site. **This has a real
consequence: if you deploy by connecting this repo to Netlify (git-based
auto-deploy), the photo will be missing on the live site, because Netlify
only sees what's in git.** To have both — the photo excluded from git *and*
present on the live site — deploy by dragging the whole local folder onto
[app.netlify.com/drop](https://app.netlify.com/drop) instead (see
"Deploying" below), and re-drag it manually after each change instead of
relying on auto-deploy-on-push.

## Updating

This is plain HTML/CSS/JS, no build step. To add or update a project:

1. Add a row to the `.project-list` in `index.html` (image, tags, one-line
   pitch, link).
2. Add a matching page in `projects/`, copying the structure of an existing
   one.
3. Drop a real screenshot in `images/` — never a fabricated or AI-generated
   "screenshot."

## Deploying

Fully static, no build command, publish directory `/`. Two options:

- **Drag-and-drop** (recommended, since the avatar photo is gitignored —
  see above): go to [app.netlify.com/drop](https://app.netlify.com/drop) and
  drop the whole project folder in. Re-drop after any change.
- **Connect this repo in Netlify** (Add new site → Import an existing
  project): auto-deploys on every push, but the avatar photo won't appear
  live since it's not in git — fine if that trade-off is acceptable.

## License

MIT — see [LICENSE](LICENSE).
