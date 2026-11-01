# Notes (for future me)

Operational details for maintaining and deploying this repo — not part of
the README because they're not useful to someone evaluating the project,
only to whoever (me) is updating it later.

## The avatar photo

`images/avatar.jpg` is listed in `.gitignore` on purpose, at my own request
— I didn't want a personal photo sitting in public git history forever,
even though it's fine for it to be visible on the live site. **This has a
real consequence: if you deploy by connecting this repo to Netlify
(git-based auto-deploy), the photo will be missing on the live site,
because Netlify only sees what's in git.** To have both — the photo
excluded from git *and* present on the live site — deploy by dragging the
whole local folder onto [app.netlify.com/drop](https://app.netlify.com/drop)
instead (see "Deploying" below), and re-drag it manually after each change
instead of relying on auto-deploy-on-push.

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
