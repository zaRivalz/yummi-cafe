# Yummi Café Website — Design Spec

**Date:** 2026-05-14  
**Project:** Yummi Café, Stellenbosch  
**Deployed to:** Vercel (via GitHub)

---

## 1. Overview

A single-page marketing website for Yummi Café — a whimsical, floral, feminine café in Stellenbosch. The site is purely for advertisement: showcasing the atmosphere, menu, Instagram presence, and Google reviews. No e-commerce, no bookings, no "free" offers.

---

## 2. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | Best Vercel integration, SSG, SEO |
| Styling | Tailwind CSS | Utility-first, pairs well with shadcn/21.dev |
| Animation | Framer Motion | Smooth scroll reveals, hero float, tab transitions |
| Components | 21.dev Magic MCP | Pre-built polished UI components |
| Instagram feed | Behold.so (free tier) | Live auto-updating feed, no API key required |
| Deployment | Vercel + GitHub | Free tier, auto-deploy on push |
| Fonts | Google Fonts (free) | Dancing Script, Playfair Display, Inter |

---

## 3. Visual Identity

### Colour Palette

| Role | Name | Hex |
|---|---|---|
| Primary | Hot Pink | `#D63384` |
| Secondary | Blush | `#F4A7C3` |
| Background | Lavender Blush | `#FFF0F5` |
| Dark | Charcoal | `#1A1A1A` |
| Base | White | `#FFFFFF` |

### Typography

- **Display / Logo:** Dancing Script (Google Fonts) — used for the "Yummi" wordmark and section hero headings
- **Headings (H2/H3):** Playfair Display — elegant serif for section titles
- **Body:** Inter — clean, readable sans-serif for all body copy, menu items, and UI

### Aesthetic

Whimsical floral romance. Inspired directly by the cafe's interior: large painted floral murals, pink-striped counter, white ornate iron chairs, black-and-white checkered floors, and vintage lampshades. Decorative floral SVG dividers between sections. Soft drop shadows, rounded corners on cards.

---

## 4. Page Structure (Single Scroll)

### 4.1 Navigation (Sticky)

- Transparent on hero, transitions to white/blush on scroll
- Logo left: "Yummi" in Dancing Script
- Links right: Menu · About · Gallery · Reviews · Contact
- Mobile: hamburger menu with slide-in drawer

### 4.2 Hero Section

- Full-viewport height
- Background: one of the cafe interior photos (the large floral mural wall shot)
- Dark overlay gradient from bottom for text legibility
- Content (centered):
  - "Yummi" in Dancing Script, large, white
  - Subtitle: "Café · Stellenbosch" in spaced caps
  - Tagline: short welcoming phrase
  - Two CTA buttons: "View Menu" (filled pink) + "Find Us" (outlined white)
- **Framer Motion:** hero text fades in with a gentle upward float on load; buttons fade in with a slight delay

### 4.3 About Section

- Two-column layout (text left, photo right) on desktop; stacked on mobile
- Text: warm, welcoming description of the cafe's atmosphere and personality
- Photo: interior shot showing the floral mural and checkered floor
- Small floral SVG divider above and below section
- **Framer Motion:** fade-in on scroll entry

### 4.4 Menu Section

- Section heading: "Our Menu" in Playfair Display
- Tab bar for categories (animated tab indicator sliding between tabs):
  - Coffee & Drinks
  - Serious Drinks (smoothies, shakes, bowls)
  - Toast & Scrambled Eggs
  - Jaffles
  - Breakfast (All Day)
  - Burgers
  - Lunch & Salads
- Each tab panel: grid of menu item cards — item name, description (where available), price in Rands
- **Framer Motion:** tab panel slides in on tab change; individual cards fade in with stagger on tab open
- Menu items reconstructed from reference images (Menu.jpg + Menu backside.jpg)

**Key menu items captured from reference images:**

*Coffee:*
- Cortado R30, Flat White R30, Americano R25/30, Cappuccino/Red R30/35, Caffe/Caramel Latte R30/35, Chai/Dirty Chai Latte R30/35, Hot Chocolate R35/40, Light/Vegan Hot Chocolate R35/40, Matcha Latte R40, Iced Latte/Chai Latte R40/45

*Serious Drinks:*
- Dragon Fruit Delight R60, Banana & Strawberry Shake R60, Blueberry & Lemonade Slushie R60, Collagen Fruit Delight R40, Cherry Kisses R40, Muscle Builder Protein Shake R50, Endurance Energy Booster R40, Green Performance Shake R40, Power Breakfast Bowl R60

*Toast:*
- Toasted Ham, Cheese & Tomato R30; Toasted Bacon & Eggs R35; Toasted Mince & Cheese R35; Toasted Steak, Cheese & Onion R45; Yummi Toast R45

*Scrambled Eggs:*
- Scrambled Eggs & Cheese R30; Scrambled Egg, Tomato & Cucumber R35; Avocado & Feta Cheese R35; Chicken Mayo & Turkish Avo R40; Tuna Mayo, Tomato & Mozzarella R40

*Jaffles:*
- Chicken, Mince, Bacon & Eggs (prices from reference)

*Breakfast (All Day):*
- Eggs on Toast R60; French Toast R35; Avo on Toast R60; Yummi's Special R75; Mixed Breakfast

*Burgers:*
- Chicken Fillet Burger & Cheese R70; Steak Burger & Cheese R100; Yummi Burger

*Lunch:*
- Chicken Wrap R70; Vegetarian Wrap; Chicken Schnitzel & Chips; Roland Special (PARRA)

### 4.5 Gallery Section

- Dark background (charcoal) to make photos pop
- Masonry-style grid of cafe reference photos
- Hover: subtle zoom + pink overlay with a 🌸 icon
- Click: lightbox with Framer Motion scale transition
- Photos sourced from Reference folder (unnamed (1-11).jpg, 2026-04-07 series, 2026-05-02 series)

### 4.6 Instagram Feed Section

- Blush/white background
- Heading: "Follow Along" + "@yummicafestellenbosch" as a clickable link
- Behold.so embed widget (free tier, up to 10 posts displayed)
  - Widget ID configured via Behold.so dashboard after connecting the Instagram account
- CTA button: "Follow us on Instagram" → links to `https://www.instagram.com/yummicafestellenbosch/`

### 4.7 Google Reviews Section

- White background with pink accents
- Heading: "What People Say"
- 3–4 curated static Google reviews displayed as cards:
  - Star rating (5 stars, rendered in pink)
  - Review excerpt
  - Reviewer name + "via Google"
- CTA button: "See All Reviews on Google" → links to the Google Maps page
- **Framer Motion:** cards animate in with stagger on scroll

### 4.8 Contact / Hours / Map Section

- Dark (charcoal) background
- Three columns on desktop, stacked on mobile:
  - **Contact:** address (137 Distillery Rd, Stellenbosch, 7600), phone (083 275 1545)
  - **Hours:** Mon–Fri 7am–4pm · Sat 8am–1pm · Sun Closed
  - **Map:** Google Maps iframe embed (free, no API key required) centered on the cafe location
- Social icons: Instagram link

### 4.9 Footer

- Minimal dark strip
- "© 2025 Yummi Café · Stellenbosch"
- Instagram link icon

---

## 5. Animations (Framer Motion)

| Element | Animation |
|---|---|
| Hero text | Fade up + float on load (staggered) |
| Nav | Background opacity transition on scroll |
| Section headings | Fade up on scroll entry (viewport trigger) |
| Menu tab indicator | Sliding underline via `layoutId` |
| Menu tab panels | Slide in from right on tab change |
| Menu item cards | Staggered fade-up on tab open |
| Gallery images | Scale + overlay on hover; scale lightbox on click |
| Review cards | Staggered fade-up on scroll |
| All sections | `whileInView` with `once: true` for scroll reveals |

---

## 6. Responsive Behaviour

- Mobile-first Tailwind breakpoints
- Navigation collapses to hamburger at `md` breakpoint
- Two-column layouts stack vertically on mobile
- Menu grid: 2 cols mobile → 3 cols desktop
- Gallery: 2 cols mobile → 3-4 cols desktop

---

## 7. SEO & Metadata

- `<title>` and `<meta description>` set in Next.js `layout.tsx`
- OpenGraph tags for social sharing (image: hero cafe photo)
- `siteName`: Yummi Café Stellenbosch
- Structured data (JSON-LD): LocalBusiness schema with address, phone, hours

---

## 8. Repository & Deployment

- Git init in project root
- Push to GitHub (new public repo: `yummi-cafe`)
- README.md: project overview, stack, local dev instructions, Vercel deployment link
- Connect GitHub repo to Vercel for auto-deploy on push to `main`
- Add `.superpowers/` and `node_modules/` to `.gitignore`

---

## 9. Out of Scope

- Online ordering or reservations
- CMS / editable content
- Authentication
- Any "free offer" or promotional mechanics
- Live Google Reviews API (requires billing account)
- Instagram API OAuth (Behold.so handles this)
