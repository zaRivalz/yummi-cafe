# Yummi Café

Marketing website for Yummi Café, Stellenbosch — built with Next.js, Tailwind CSS, and Framer Motion.

**Live site:** [yummi-cafe.vercel.app](https://yummi-cafe.vercel.app)

## Stack

- **Framework:** Next.js 16 (App Router, static export)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion (motion v12)
- **Fonts:** Dancing Script, Playfair Display, Inter (Google Fonts)
- **Instagram feed:** Behold.so (free tier)
- **Hosting:** Vercel

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_BEHOLD_WIDGET_ID=your_behold_widget_id
```

Get a widget ID by signing up at [behold.so](https://behold.so) and connecting the Instagram account `yummicafestellenbosch`.

## Build & Test

```bash
npm run build   # produces static output in out/
npm test        # run test suite (13 tests)
```

## Deployment

This repo is connected to Vercel. Every push to `main` auto-deploys.

To deploy manually:

```bash
npm install -g vercel
vercel --prod
```
