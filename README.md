# Vicianum Dental Studio

Landing page for Vicianum Dental Studio, a dental laboratory in Prishtina, Kosovo, serving dentists and clinics (not a patient-facing site).

## Stack

- [React 19](https://react.dev) + [Vite](https://vite.dev) (`@vitejs/plugin-react`)
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`, configured entirely in `src/index.css` (`@theme` block) — there is no `tailwind.config.js`
- [Framer Motion](https://motion.dev) for animation
- [lucide-react](https://lucide.dev) for icons
- Deployed on [Vercel](https://vercel.com) as a static build (`vercel.json`)

## Running locally

```sh
npm install
npm run dev       # start the dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable | Purpose |
|---|---|
| `VITE_FORMSPREE_ENDPOINT` | Formspree endpoint the contact form (`src/Contact.jsx`) POSTs to. If unset, the form shows an inline "not configured" error instead of submitting. |

## Content

All copy, links, and structured content (nav links, headings, stats, services, gallery captions, process steps, contact info, form fields) live in `src/content.js` — edit values there rather than in component files.

## Images

`public/images/` contains generated responsive WebP + JPEG variants (`<name>-{400,700,1024}.{webp,jpg}`), rendered via the `<ResponsiveImage>` component (`src/components/ResponsiveImage.jsx`) or, for Hero's animated slideshow, inlined directly.

Full-resolution originals live in `images-source/` and are **not** served directly — they're the source for regeneration.

To regenerate (e.g. after replacing a source photo in `images-source/`):

```sh
node scripts/optimize-images.mjs
```

This resizes every image in `images-source/` to 400/700/1024px widths in both WebP and JPEG and writes them to `public/images/`. Widths are chosen to cover everything from the ~280–400px service icons/hero thumbnail up to the full-bleed hero background and gallery tiles; see the comments in `scripts/optimize-images.mjs` for details. Requires `sharp` (already a devDependency).

## SEO / structured data

`index.html` contains Open Graph, Twitter Card, and `LocalBusiness` JSON-LD metadata. The JSON-LD deliberately omits any field that hasn't been explicitly confirmed by the business owner (e.g. `priceRange`, `geo`, `openingHours`, `foundingDate`) rather than guessing — check with the owner before adding any of those.
