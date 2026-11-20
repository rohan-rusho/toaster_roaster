# 🍞 Toaster Roaster

**The premium roast joke generator.** Pick a victim, dial in the heat, and get a perfectly toasted roast — mild, savage, or total meltdown.

> Fresh burns, zero crumbs.

## What it does

- **Roast generator** — type any name, pick a flavour (General, Looks, Brains, Gaming, Work, Style, Food) and a heat level (Mild → Medium → Savage → Nuclear), then watch the toaster pop out a fresh roast.
- **Roast me** — feeling brave? Get roasted yourself.
- **Roast of the day** — a new burn every midnight.
- **Roast battle** — two names enter, three rounds of alternating burns, one verdict.
- **Favorites & history** — save the best burns and revisit recent roasts. Everything lives in your browser (localStorage), no account needed.
- **Copy & share** — one-tap copy, native share sheet on mobile, X/Twitter share on desktop.
- **Burn meter** — every roast shows its toastiness, from 25% to a full 100% meltdown.

## Tech

- **Zero build step, zero dependencies.** Plain HTML, CSS, and vanilla JavaScript.
- **Design system** — warm charcoal + toasted amber, Bricolage Grotesque display type with Inter body, glass cards, grain glow, marquee, and a toaster that shakes and pops on every roast.
- **Responsive** — desktop, tablet, and mobile, with a mobile menu and touch-friendly controls.
- **Accessible** — semantic HTML, ARIA labels, `aria-live` roast output, keyboard-friendly controls, focus states, and `prefers-reduced-motion` support.
- **SEO-ready** — title, meta description, Open Graph / Twitter cards, favicon, semantic structure.

## Run it locally

No install needed — it's a static site:

```bash
# from the project root
python3 -m http.server 8080
# then open http://localhost:8080
```

Or just double-click `index.html` (some browsers restrict localStorage on `file://`, so the server way is better).

## Deploy

It's a static site, so any static host works. For GitHub Pages:

1. Push to GitHub.
2. Settings → Pages → Deploy from branch → `main` → `/ (root)`.
3. Your site is live at `https://<username>.github.io/toaster_roaster/`.

## Project structure

```
toaster_roaster/
├── index.html          # Page structure + SEO
├── css/
│   └── style.css       # Design system (no framework)
├── js/
│   ├── roasts.js       # Roast bank + engine (100+ roasts)
│   └── app.js          # Generator, battle, favorites, history
├── favicon.svg         # Toaster mark
└── README.md
```

## Adding roasts

Add entries to the `ROASTS` array in `js/roasts.js`:

```js
{ text: "{name} is ...", category: "general", intensity: 2 }
```

- `{name}` is replaced with the victim's name.
- `category` is one of `general | looks | brains | gaming | work | style | food`.
- `intensity` is `1` (Mild) to `4` (Nuclear).

Keep it playful: clever burns, never hateful. No slurs, no protected characteristics, no real cruelty — just toast.

## License

MIT — see [LICENSE](LICENSE).
