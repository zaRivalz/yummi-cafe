# Yummi Café Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a single-page marketing website for Yummi Café (Stellenbosch) using Next.js 14, Tailwind CSS, Framer Motion (motion v12), and 21.dev components — pushed to GitHub and hosted on Vercel.

**Architecture:** Single scrolling page (`app/page.tsx`) assembles independent section components. Each section lives in `components/sections/`. Shared animation and decoration utilities in `components/ui/`. Menu items are pure data in `data/menu.ts`. Fully static output — no server logic — auto-deployed to Vercel from GitHub on push to `main`.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, `motion` v12 (Framer Motion), Google Fonts (Dancing Script · Playfair Display · Inter), Behold.so free tier (Instagram feed), Jest + React Testing Library.

---

## File Map

| File | Responsibility |
|---|---|
| `app/layout.tsx` | Root layout: fonts, `<head>` metadata, JSON-LD LocalBusiness schema |
| `app/page.tsx` | Page: imports and orders all section components |
| `app/globals.css` | Tailwind directives + base reset |
| `tailwind.config.ts` | Brand color tokens, font-family tokens |
| `next.config.ts` | Static export config |
| `data/menu.ts` | All menu categories and items with prices |
| `data/reviews.ts` | Curated static Google review objects |
| `components/ui/SectionWrapper.tsx` | Framer Motion `whileInView` scroll-reveal wrapper |
| `components/ui/FlowerDivider.tsx` | Decorative floral divider between sections |
| `components/nav/Navbar.tsx` | Sticky nav, scroll-triggered bg, mobile hamburger |
| `components/sections/Hero.tsx` | Full-viewport hero with animated headline + CTAs |
| `components/sections/About.tsx` | Two-column: text left, photo right |
| `components/sections/Menu.tsx` | Tab-switched menu with AnimatePresence panel transitions |
| `components/sections/Gallery.tsx` | Photo grid with hover zoom + Framer Motion lightbox |
| `components/sections/Instagram.tsx` | Behold.so embed widget + follow CTA |
| `components/sections/Reviews.tsx` | Static Google review cards with stagger animation |
| `components/sections/Contact.tsx` | Hours, address, phone, Google Maps iframe |
| `components/Footer.tsx` | Minimal dark footer |
| `public/images/` | Cafe photos copied from `Reference/` |
| `__tests__/menu.test.ts` | Menu data structure unit tests |
| `__tests__/Contact.test.tsx` | Contact section render tests |
| `__tests__/Navbar.test.tsx` | Navbar links render tests |
| `jest.config.ts` | Jest + Next.js integration config |
| `jest.setup.ts` | `@testing-library/jest-dom` import |
| `README.md` | Project overview, local dev, Vercel deployment link |

---

## Task 1: Scaffold Next.js Project

**Files:**
- Delete: `package.json`, `package-lock.json`, `node_modules/`
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `.gitignore`, `app/globals.css`

- [ ] **Step 1: Remove existing package files**

```bash
cd "C:/Users/rober/Desktop/Claude/Projects/Yummi Cafe"
rm -rf node_modules package.json package-lock.json
```

- [ ] **Step 2: Scaffold Next.js app**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --yes
```

When prompted about existing files (`.git`, `docs/`, `Reference/`), select to keep them.

- [ ] **Step 3: Install additional dependencies**

```bash
npm install motion
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @types/jest
```

- [ ] **Step 4: Update `.gitignore`**

Add to the end of the generated `.gitignore`:

```
.superpowers/
Reference/
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```

Expected: `ready on http://localhost:3000` with no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 14 project with Tailwind and dependencies"
```

---

## Task 2: Configure Tailwind & Fonts

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Write Tailwind config with brand tokens**

Replace the contents of `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'pink-hot': '#D63384',
        'pink-blush': '#F4A7C3',
        'pink-light': '#FFF0F5',
        charcoal: '#1A1A1A',
      },
      fontFamily: {
        dancing: ['var(--font-dancing)', 'cursive'],
        playfair: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Write globals.css**

Replace `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-white text-charcoal font-sans;
}
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: Build completes with no type errors.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: configure Tailwind brand tokens and global styles"
```

---

## Task 3: Copy Cafe Photos to Public

**Files:**
- Create: `public/images/` (directory with named copies of Reference images)

- [ ] **Step 1: Copy and rename reference images**

```bash
mkdir -p public/images

# Interior shots
cp "Reference/unnamed.jpg"      public/images/interior-1.jpg
cp "Reference/unnamed (1).jpg"  public/images/interior-2.jpg
cp "Reference/unnamed (7).jpg"  public/images/interior-3.jpg
cp "Reference/unnamed (8).jpg"  public/images/interior-4.jpg
cp "Reference/unnamed (9).jpg"  public/images/interior-5.jpg
cp "Reference/unnamed (10).jpg" public/images/interior-6.jpg
cp "Reference/unnamed (11).jpg" public/images/interior-7.jpg

# Food & drinks
cp "Reference/unnamed (2).jpg"  public/images/food-1.jpg
cp "Reference/unnamed (5).jpg"  public/images/food-2.jpg
cp "Reference/unnamed (6).jpg"  public/images/food-3.jpg
cp "Reference/2026-05-02.jpg"   public/images/food-4.jpg
cp "Reference/2026-05-02 (1).jpg" public/images/food-5.jpg

# Exterior & decor
cp "Reference/unnamed (3).jpg"  public/images/decor-1.jpg
cp "Reference/unnamed (4).jpg"  public/images/decor-2.jpg
cp "Reference/2026-04-07.jpg"   public/images/decor-3.jpg
cp "Reference/2026-04-07 (1).jpg" public/images/decor-4.jpg
```

- [ ] **Step 2: Verify files exist**

```bash
ls public/images/
```

Expected: 16 `.jpg` files listed.

- [ ] **Step 3: Commit**

```bash
git add public/images/
git commit -m "feat: add cafe photos to public assets"
```

---

## Task 4: Root Layout, Fonts & Metadata

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Write root layout**

Replace `app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import { Dancing_Script, Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yummi Café | Stellenbosch',
  description:
    'A warm, floral escape in the heart of Stellenbosch. Great coffee, homemade breakfast and lunch. Visit us at 137 Distillery Rd.',
  openGraph: {
    title: 'Yummi Café | Stellenbosch',
    description: 'A warm, floral escape in the heart of Stellenbosch.',
    siteName: 'Yummi Café',
    images: [{ url: '/images/interior-4.jpg' }],
    locale: 'en_ZA',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  name: 'Yummi Café',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '137 Distillery Rd',
    addressLocality: 'Stellenbosch',
    postalCode: '7600',
    addressCountry: 'ZA',
  },
  telephone: '+27832751545',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '16:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '08:00', closes: '13:00' },
  ],
  image: '/images/interior-4.jpg',
  url: 'https://yummicafe.vercel.app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dancing.variable} ${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: Build completes, no type or font errors.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add root layout with Google Fonts, metadata, and JSON-LD schema"
```

---

## Task 5: Jest Setup

**Files:**
- Create: `jest.config.ts`
- Create: `jest.setup.ts`

- [ ] **Step 1: Write jest config**

Create `jest.config.ts`:

```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
```

- [ ] **Step 2: Write jest setup**

Create `jest.setup.ts`:

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 3: Add test script to package.json**

In `package.json`, add to `"scripts"`:

```json
"test": "jest"
```

- [ ] **Step 4: Verify Jest runs**

```bash
npm test -- --passWithNoTests
```

Expected: `Test Suites: 0 passed` with no errors.

- [ ] **Step 5: Commit**

```bash
git add jest.config.ts jest.setup.ts package.json
git commit -m "feat: configure Jest with React Testing Library"
```

---

## Task 6: Menu Data

**Files:**
- Create: `data/menu.ts`
- Create: `__tests__/menu.test.ts`

- [ ] **Step 1: Write the failing test**

Create `__tests__/menu.test.ts`:

```typescript
import { menuCategories } from '@/data/menu'

describe('menuCategories', () => {
  it('has at least 7 categories', () => {
    expect(menuCategories.length).toBeGreaterThanOrEqual(7)
  })

  it('every category has an id, label, and items array', () => {
    for (const cat of menuCategories) {
      expect(cat.id).toBeTruthy()
      expect(cat.label).toBeTruthy()
      expect(Array.isArray(cat.items)).toBe(true)
      expect(cat.items.length).toBeGreaterThan(0)
    }
  })

  it('every item has a name', () => {
    for (const cat of menuCategories) {
      for (const item of cat.items) {
        expect(item.name).toBeTruthy()
      }
    }
  })

  it('coffee category contains Cortado', () => {
    const coffee = menuCategories.find((c) => c.id === 'coffee')
    expect(coffee).toBeDefined()
    expect(coffee!.items.some((i) => i.name === 'Cortado')).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npm test -- __tests__/menu.test.ts
```

Expected: FAIL — `Cannot find module '@/data/menu'`

- [ ] **Step 3: Write menu data**

Create `data/menu.ts`:

```typescript
export type MenuPrice = number | { tall: number; serious: number }

export interface MenuItem {
  name: string
  description?: string
  price?: MenuPrice
}

export interface MenuCategory {
  id: string
  label: string
  items: MenuItem[]
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'coffee',
    label: 'Coffee',
    items: [
      { name: 'Cortado', price: 30 },
      { name: 'Flat White', price: 30 },
      { name: 'Americano', price: { tall: 25, serious: 30 } },
      { name: 'Cappuccino / Red', price: { tall: 30, serious: 35 } },
      { name: 'Caffè / Caramel Latte', price: { tall: 30, serious: 35 } },
      { name: 'Chai / Dirty Chai Latte', price: { tall: 30, serious: 35 } },
      { name: 'Hot Chocolate', price: { tall: 35, serious: 40 } },
      { name: 'Light / Vegan Hot Chocolate', price: { tall: 35, serious: 40 } },
      { name: 'Matcha Latte', price: 40 },
      { name: 'Iced Latte / Chai Latte', price: { tall: 40, serious: 45 } },
    ],
  },
  {
    id: 'serious-drinks',
    label: 'Serious Drinks',
    items: [
      { name: 'Dragon Fruit Delight', description: 'Dragon Fruit, Banana, Raspberries & Almond Milk', price: 60 },
      { name: 'Banana & Strawberry Shake', description: 'Strawberries, Banana, Peach, Orange Juice & Flakes', price: 60 },
      { name: 'Blueberry & Lemonade Slushie', description: 'Frozen Lemon Juice & Lemonade', price: 60 },
      { name: 'Collagen Fruit Delight', description: 'Mango, Banana, Strawberries, Collagen Powder & Almond Milk', price: 40 },
      { name: 'Cherry Kisses', description: 'Cherry, Strawberry, Banana, Yogurt, Almond Milk', price: 40 },
      { name: 'Muscle Builder Protein Shake', description: 'Coconut Milk & Chia Seeds', price: 50 },
      { name: 'Endurance Energy Booster', description: 'Mango, Pineapple, Cinnamon Extract', price: 40 },
      { name: 'Green Performance Shake', description: 'Celery, Apple, Cucumber, Lemon & Ginger Extract', price: 40 },
      { name: 'Power Breakfast Bowl', description: 'Mixed Berries, Bananas, Quinoa Seeds & Nut Butter', price: 60 },
    ],
  },
  {
    id: 'toast',
    label: 'Toast',
    items: [
      { name: 'Toasted Ham, Cheese & Tomato', price: 30 },
      { name: 'Toasted Bacon & Eggs', price: 35 },
      { name: 'Toasted Mince & Cheese', price: 35 },
      { name: 'Toasted Steak, Cheese & Onion', price: 45 },
      { name: 'Yummi Toast', price: 45 },
      { name: 'Scrambled Eggs & Cheese', price: 30 },
      { name: 'Scrambled Egg, Tomato & Cucumber', price: 35 },
      { name: 'Avocado & Feta Cheese', price: 35 },
      { name: 'Chicken Mayo & Turkish Avo', price: 40 },
      { name: 'Tuna Mayo, Tomato & Mozzarella Cheese', price: 40 },
    ],
  },
  {
    id: 'jaffles',
    label: 'Jaffles',
    items: [
      { name: 'Chicken Jaffle', price: 35 },
      { name: 'Mince Jaffle', price: 35 },
      { name: 'Bacon & Eggs Jaffle', price: 40 },
    ],
  },
  {
    id: 'breakfast',
    label: 'Breakfast',
    items: [
      { name: 'Eggs on Toast', price: 60 },
      { name: 'French Toast', price: 35 },
      { name: 'Avo on Toast', price: 60 },
      { name: "Yummi's Special", price: 75 },
      { name: 'Mixed Breakfast' },
    ],
  },
  {
    id: 'burgers',
    label: 'Burgers',
    items: [
      { name: 'Chicken Fillet Burger & Cheese', price: 70 },
      { name: 'Steak Burger & Cheese', price: 100 },
      { name: 'Yummi Burger' },
    ],
  },
  {
    id: 'lunch',
    label: 'Lunch',
    items: [
      { name: 'Chicken Wrap', price: 70 },
      { name: 'Vegetarian Wrap' },
      { name: 'Chicken Schnitzel & Chips' },
      { name: 'Roland Special (PARRA)' },
    ],
  },
]
```

- [ ] **Step 4: Run test to confirm it passes**

```bash
npm test -- __tests__/menu.test.ts
```

Expected: PASS — 4 tests pass.

- [ ] **Step 5: Commit**

```bash
git add data/menu.ts __tests__/menu.test.ts
git commit -m "feat: add menu data and unit tests"
```

---

## Task 7: Reviews Data

**Files:**
- Create: `data/reviews.ts`

> **Note:** Before this task, visit the Google Maps page for Yummi Café and copy 3–4 real 5-star review excerpts. Replace the placeholder text below with the actual reviewer names and review text.

- [ ] **Step 1: Write reviews data**

Create `data/reviews.ts`:

```typescript
export interface Review {
  id: string
  author: string
  rating: 5
  text: string
  date: string
}

export const reviews: Review[] = [
  {
    id: '1',
    author: 'Sarah M.',
    rating: 5,
    text: 'Absolutely beautiful café! The floral decor is stunning and the food is delicious. The best breakfast spot in Stellenbosch.',
    date: 'April 2025',
  },
  {
    id: '2',
    author: 'James T.',
    rating: 5,
    text: 'The coffee is incredible and the atmosphere is so warm and welcoming. Staff are always friendly and the food is consistently good.',
    date: 'March 2025',
  },
  {
    id: '3',
    author: 'Lerato K.',
    rating: 5,
    text: 'Such a unique and charming spot. The Dragon Fruit Delight is a must-try! Will definitely be back.',
    date: 'February 2025',
  },
  {
    id: '4',
    author: 'Michael R.',
    rating: 5,
    text: "Yummi Café never disappoints. The murals are gorgeous, the menu is varied and the portions are generous. My go-to in Stellenbosch.",
    date: 'January 2025',
  },
]
```

- [ ] **Step 2: Commit**

```bash
git add data/reviews.ts
git commit -m "feat: add static Google review data"
```

---

## Task 8: Shared UI Components

**Files:**
- Create: `components/ui/SectionWrapper.tsx`
- Create: `components/ui/FlowerDivider.tsx`

- [ ] **Step 1: Write SectionWrapper**

Create `components/ui/SectionWrapper.tsx`:

```typescript
'use client'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function SectionWrapper({ children, className = '', delay = 0 }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Write FlowerDivider**

Create `components/ui/FlowerDivider.tsx`:

```typescript
interface Props {
  className?: string
  dark?: boolean
}

export default function FlowerDivider({ className = '', dark = false }: Props) {
  const lineColor = dark ? 'bg-pink-hot/30' : 'bg-pink-blush'
  return (
    <div className={`flex items-center justify-center gap-3 py-6 ${className}`}>
      <div className={`h-px flex-1 ${lineColor}`} />
      <span className="text-pink-hot text-lg select-none">🌸</span>
      <span className="text-pink-blush text-xs select-none">✦</span>
      <span className="text-pink-hot text-lg select-none">🌸</span>
      <div className={`h-px flex-1 ${lineColor}`} />
    </div>
  )
}
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: Build completes with no errors.

- [ ] **Step 4: Commit**

```bash
git add components/ui/
git commit -m "feat: add SectionWrapper scroll-reveal and FlowerDivider components"
```

---

## Task 9: Navbar

**Files:**
- Create: `components/nav/Navbar.tsx`
- Create: `__tests__/Navbar.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/Navbar.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import Navbar from '@/components/nav/Navbar'

describe('Navbar', () => {
  it('renders the brand name', () => {
    render(<Navbar />)
    expect(screen.getByText('Yummi')).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /menu/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /gallery/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /reviews/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npm test -- __tests__/Navbar.test.tsx
```

Expected: FAIL — `Cannot find module '@/components/nav/Navbar'`

- [ ] **Step 3: Write Navbar**

Create `components/nav/Navbar.tsx`:

```typescript
'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const links = [
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-dancing text-3xl text-pink-hot">
          Yummi
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-pink-hot ${
                  scrolled ? 'text-charcoal' : 'text-white'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden flex flex-col gap-1.5 p-2 ${scrolled ? 'text-charcoal' : 'text-white'}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-pink-blush/40 px-6 pb-4"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="block py-3 text-charcoal font-medium hover:text-pink-hot transition-colors border-b border-pink-light last:border-0"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
```

- [ ] **Step 4: Run test to confirm it passes**

```bash
npm test -- __tests__/Navbar.test.tsx
```

Expected: PASS — 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add components/nav/ __tests__/Navbar.test.tsx
git commit -m "feat: add sticky Navbar with mobile hamburger and scroll transparency"
```

---

## Task 10: Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Write Hero section**

Create `components/sections/Hero.tsx`:

```typescript
'use client'
import Image from 'next/image'
import { motion } from 'motion/react'

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/interior-4.jpg"
        alt="Yummi Café interior"
        fill
        priority
        className="object-cover object-center"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-charcoal/70" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm tracking-[0.4em] uppercase mb-4 text-pink-blush font-medium"
        >
          Stellenbosch
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="font-dancing text-8xl md:text-9xl mb-4 drop-shadow-lg"
        >
          Yummi
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl font-playfair italic text-white/90 mb-10"
        >
          Coffee · Breakfast · Lunch
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#menu"
            className="px-8 py-3 bg-pink-hot text-white rounded-full font-medium text-sm tracking-wide hover:bg-pink-700 transition-colors"
          >
            View Menu
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-white text-white rounded-full font-medium text-sm tracking-wide hover:bg-white hover:text-charcoal transition-colors"
          >
            Find Us
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/70 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify it renders in dev**

```bash
npm run dev
```

Open `http://localhost:3000`. Temporarily add `<Hero />` to `app/page.tsx` and verify the hero image and animations appear. Remove the import after checking.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: add Hero section with Framer Motion entrance animations"
```

---

## Task 11: About Section

**Files:**
- Create: `components/sections/About.tsx`

- [ ] **Step 1: Write About section**

Create `components/sections/About.tsx`:

```typescript
import Image from 'next/image'
import SectionWrapper from '@/components/ui/SectionWrapper'
import FlowerDivider from '@/components/ui/FlowerDivider'

export default function About() {
  return (
    <section id="about" className="bg-pink-light py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionWrapper className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-3">
            Our Story
          </h2>
          <FlowerDivider />
        </SectionWrapper>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <SectionWrapper delay={0.1}>
            <p className="font-playfair text-xl italic text-pink-hot mb-6">
              A floral escape in the heart of Stellenbosch.
            </p>
            <p className="text-charcoal/80 leading-relaxed mb-4">
              Yummi Café is a warm, welcoming space where great coffee meets beautiful surroundings.
              Nestled at 137 Distillery Road, we&apos;ve created a spot that feels like a little escape
              from the everyday — where every detail, from our hand-painted floral murals to our
              carefully crafted menu, is made with love.
            </p>
            <p className="text-charcoal/80 leading-relaxed mb-4">
              Whether you&apos;re starting your morning with a perfectly pulled flat white, catching up
              with friends over a hearty breakfast, or enjoying a relaxed lunch — Yummi is your place.
              We&apos;re proud to be part of the Stellenbosch community and can&apos;t wait to welcome you.
            </p>
            <p className="text-charcoal/70 text-sm font-medium tracking-wide">
              Open Monday – Friday, 7am – 4pm · Saturday, 8am – 1pm
            </p>
          </SectionWrapper>

          <SectionWrapper delay={0.3}>
            <div className="relative h-80 md:h-[480px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/interior-1.jpg"
                alt="Inside Yummi Café"
                fill
                className="object-cover"
              />
            </div>
          </SectionWrapper>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/About.tsx
git commit -m "feat: add About section with two-column layout"
```

---

## Task 12: Menu Section

**Files:**
- Create: `components/sections/Menu.tsx`

- [ ] **Step 1: Write Menu section**

Create `components/sections/Menu.tsx`:

```typescript
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { menuCategories, type MenuPrice } from '@/data/menu'
import SectionWrapper from '@/components/ui/SectionWrapper'
import FlowerDivider from '@/components/ui/FlowerDivider'

function formatPrice(price?: MenuPrice): string {
  if (price === undefined) return 'Ask us'
  if (typeof price === 'number') return `R${price}`
  return `R${price.tall} / R${price.serious}`
}

export default function Menu() {
  const [activeId, setActiveId] = useState(menuCategories[0].id)
  const activeCategory = menuCategories.find((c) => c.id === activeId)!

  return (
    <section id="menu" className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionWrapper className="text-center mb-6">
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-3">Our Menu</h2>
          <FlowerDivider />
          <p className="text-charcoal/60 text-sm">All prices in South African Rand</p>
        </SectionWrapper>

        {/* Tab bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeId === cat.id
                  ? 'bg-pink-hot text-white'
                  : 'bg-pink-light text-charcoal hover:bg-pink-blush/30'
              }`}
            >
              {cat.label}
              {activeId === cat.id && (
                <motion.div
                  layoutId="tab-bg"
                  className="absolute inset-0 rounded-full bg-pink-hot -z-10"
                />
              )}
            </button>
          ))}
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            {activeId === 'coffee' && (
              <div className="mb-4 text-center">
                <p className="text-xs text-charcoal/50 tracking-widest uppercase">
                  Tall price / Serious price where applicable
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeCategory.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-pink-light rounded-xl p-5 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-start gap-3">
                    <h3 className="font-medium text-charcoal text-sm leading-snug flex-1">
                      {item.name}
                    </h3>
                    <span className="text-pink-hot font-semibold text-sm whitespace-nowrap shrink-0">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-charcoal/60 text-xs leading-relaxed">{item.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Menu.tsx
git commit -m "feat: add tabbed Menu section with Framer Motion panel transitions"
```

---

## Task 13: Gallery Section

**Files:**
- Create: `components/sections/Gallery.tsx`

- [ ] **Step 1: Write Gallery section**

Create `components/sections/Gallery.tsx`:

```typescript
'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import FlowerDivider from '@/components/ui/FlowerDivider'

const photos = [
  { src: '/images/interior-1.jpg', alt: 'Café interior with floral mural' },
  { src: '/images/food-1.jpg', alt: 'Delicious food at Yummi' },
  { src: '/images/interior-3.jpg', alt: 'Cosy seating area' },
  { src: '/images/food-2.jpg', alt: 'Coffee and drinks' },
  { src: '/images/interior-5.jpg', alt: 'Beautiful café atmosphere' },
  { src: '/images/food-3.jpg', alt: 'Fresh baked goods' },
  { src: '/images/decor-1.jpg', alt: 'Floral bicycle outside Yummi' },
  { src: '/images/interior-6.jpg', alt: 'Interior with teacup mural' },
  { src: '/images/food-4.jpg', alt: 'Tasty lunch plate' },
  { src: '/images/interior-7.jpg', alt: 'The counter and display case' },
  { src: '/images/food-5.jpg', alt: 'Breakfast plate' },
  { src: '/images/decor-2.jpg', alt: 'Neon Yummi sign' },
]

export default function Gallery() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <section id="gallery" className="bg-charcoal py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionWrapper className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-3">Gallery</h2>
          <FlowerDivider dark />
        </SectionWrapper>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {photos.map((photo, i) => (
            <SectionWrapper key={photo.src} delay={i * 0.04}>
              <motion.button
                className="relative w-full overflow-hidden rounded-xl block group cursor-pointer"
                style={{ aspectRatio: i % 3 === 0 ? '3/4' : '4/3' }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelected(photo.src)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-pink-hot/0 group-hover:bg-pink-hot/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white text-2xl transition-opacity duration-300">🌸</span>
                </div>
              </motion.button>
            </SectionWrapper>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selected}
                alt="Gallery photo"
                fill
                className="object-contain rounded-lg"
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-white text-2xl bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Gallery.tsx
git commit -m "feat: add Gallery section with masonry grid and Framer Motion lightbox"
```

---

## Task 14: Instagram Section

**Files:**
- Create: `components/sections/Instagram.tsx`

> **Note before coding:** Sign up at [behold.so](https://behold.so), connect the `yummicafestellenbosch` Instagram account, and copy the widget ID. Add it to `.env.local` as `NEXT_PUBLIC_BEHOLD_WIDGET_ID=your_widget_id`. The component reads this value at runtime.

- [ ] **Step 1: Create .env.local**

Create `.env.local`:

```
NEXT_PUBLIC_BEHOLD_WIDGET_ID=your_widget_id_here
```

Add `.env.local` to `.gitignore` (it already should be — verify with `cat .gitignore`).

- [ ] **Step 2: Write Instagram section**

Create `components/sections/Instagram.tsx`:

```typescript
'use client'
import { useEffect } from 'react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import FlowerDivider from '@/components/ui/FlowerDivider'

export default function Instagram() {
  const widgetId = process.env.NEXT_PUBLIC_BEHOLD_WIDGET_ID

  useEffect(() => {
    if (!widgetId) return
    const script = document.createElement('script')
    script.src = 'https://w.behold.so/widget.js'
    script.type = 'module'
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [widgetId])

  return (
    <section id="instagram" className="bg-pink-light py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionWrapper className="text-center mb-4">
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-2">Follow Along</h2>
          <a
            href="https://www.instagram.com/yummicafestellenbosch/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-hot font-medium hover:underline text-sm tracking-wide"
          >
            @yummicafestellenbosch
          </a>
          <FlowerDivider />
        </SectionWrapper>

        {widgetId ? (
          <div id={widgetId} />
        ) : (
          <div className="text-center py-10 text-charcoal/40 text-sm">
            Instagram feed — configure NEXT_PUBLIC_BEHOLD_WIDGET_ID to display posts.
          </div>
        )}

        <SectionWrapper delay={0.2} className="text-center mt-10">
          <a
            href="https://www.instagram.com/yummicafestellenbosch/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-pink-hot text-white rounded-full font-medium text-sm hover:bg-pink-700 transition-colors"
          >
            Follow us on Instagram
          </a>
        </SectionWrapper>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Instagram.tsx
git commit -m "feat: add Instagram section with Behold.so embed"
```

---

## Task 15: Reviews Section

**Files:**
- Create: `components/sections/Reviews.tsx`
- Create: `__tests__/Reviews.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/Reviews.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import Reviews from '@/components/sections/Reviews'

describe('Reviews', () => {
  it('renders the section heading', () => {
    render(<Reviews />)
    expect(screen.getByText(/what people say/i)).toBeInTheDocument()
  })

  it('renders at least one 5-star review', () => {
    render(<Reviews />)
    const stars = screen.getAllByText('★★★★★')
    expect(stars.length).toBeGreaterThan(0)
  })

  it('renders a link to Google Maps', () => {
    render(<Reviews />)
    const link = screen.getByRole('link', { name: /see all reviews/i })
    expect(link).toHaveAttribute('href', expect.stringContaining('google.com/maps'))
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npm test -- __tests__/Reviews.test.tsx
```

Expected: FAIL — `Cannot find module '@/components/sections/Reviews'`

- [ ] **Step 3: Write Reviews section**

Create `components/sections/Reviews.tsx`:

```typescript
import { motion } from 'motion/react'
import { reviews } from '@/data/reviews'
import SectionWrapper from '@/components/ui/SectionWrapper'
import FlowerDivider from '@/components/ui/FlowerDivider'

const MAPS_URL =
  'https://www.google.com/maps/place/Yummi+Cafe/@-33.9405008,18.8436542,935m/data=!3m1!1e3!4m17!1m8!3m7!1s0x1dcdb3fc7bf8be37:0xb45e901b5b3986a8!2sYummi+Cafe!8m2!3d-33.9405053!4d18.8462291!10e9!16s%2Fg%2F11z2svy1xz!3m7!1s0x1dcdb3fc7bf8be37:0xb45e901b5b3986a8!8m2!3d-33.9405053!4d18.8462291!9m1!1b1!16s%2Fg%2F11z2svy1xz?entry=ttu'

export default function Reviews() {
  return (
    <section id="reviews" className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionWrapper className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl text-charcoal mb-3">
            What People Say
          </h2>
          <FlowerDivider />
        </SectionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-pink-light rounded-2xl p-8 flex flex-col gap-4"
            >
              <p className="text-pink-hot text-xl tracking-widest">★★★★★</p>
              <p className="text-charcoal/80 italic font-playfair leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-auto">
                <p className="font-semibold text-charcoal text-sm">{review.author}</p>
                <p className="text-charcoal/50 text-xs">via Google · {review.date}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <SectionWrapper delay={0.2} className="text-center">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 border-2 border-pink-hot text-pink-hot rounded-full font-medium text-sm hover:bg-pink-hot hover:text-white transition-colors"
          >
            See All Reviews on Google
          </a>
        </SectionWrapper>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to confirm it passes**

```bash
npm test -- __tests__/Reviews.test.tsx
```

Expected: PASS — 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Reviews.tsx __tests__/Reviews.test.tsx
git commit -m "feat: add Reviews section with static Google reviews and tests"
```

---

## Task 16: Contact Section

**Files:**
- Create: `components/sections/Contact.tsx`
- Create: `__tests__/Contact.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/Contact.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import Contact from '@/components/sections/Contact'

describe('Contact', () => {
  it('renders the street address', () => {
    render(<Contact />)
    expect(screen.getByText(/137 Distillery Rd/i)).toBeInTheDocument()
  })

  it('renders the phone number', () => {
    render(<Contact />)
    expect(screen.getByText(/083 275 1545/i)).toBeInTheDocument()
  })

  it('renders Saturday hours', () => {
    render(<Contact />)
    expect(screen.getByText(/8am/i)).toBeInTheDocument()
  })

  it('renders Sunday as Closed', () => {
    render(<Contact />)
    expect(screen.getByText(/closed/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npm test -- __tests__/Contact.test.tsx
```

Expected: FAIL — `Cannot find module '@/components/sections/Contact'`

- [ ] **Step 3: Write Contact section**

Create `components/sections/Contact.tsx`:

```typescript
import SectionWrapper from '@/components/ui/SectionWrapper'
import FlowerDivider from '@/components/ui/FlowerDivider'

const hours = [
  { day: 'Monday – Friday', time: '7am – 4pm' },
  { day: 'Saturday', time: '8am – 1pm' },
  { day: 'Sunday', time: 'Closed' },
]

export default function Contact() {
  return (
    <section id="contact" className="bg-charcoal py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionWrapper className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-3">Find Us</h2>
          <FlowerDivider dark />
        </SectionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Contact info */}
          <SectionWrapper delay={0.1}>
            <h3 className="font-playfair text-xl text-pink-blush mb-4">Contact</h3>
            <p className="text-white/80 leading-relaxed mb-2">
              137 Distillery Rd<br />
              Stellenbosch Central<br />
              Stellenbosch, 7600
            </p>
            <a
              href="tel:+27832751545"
              className="text-pink-hot hover:text-pink-blush transition-colors font-medium"
            >
              083 275 1545
            </a>
            <div className="mt-6">
              <a
                href="https://www.instagram.com/yummicafestellenbosch/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-pink-hot transition-colors text-sm"
              >
                @yummicafestellenbosch
              </a>
            </div>
          </SectionWrapper>

          {/* Hours */}
          <SectionWrapper delay={0.2}>
            <h3 className="font-playfair text-xl text-pink-blush mb-4">Hours</h3>
            <ul className="space-y-3">
              {hours.map(({ day, time }) => (
                <li key={day} className="flex justify-between gap-4 text-sm">
                  <span className="text-white/70">{day}</span>
                  <span className={time === 'Closed' ? 'text-white/40' : 'text-white font-medium'}>
                    {time}
                  </span>
                </li>
              ))}
            </ul>
          </SectionWrapper>

          {/* Map */}
          <SectionWrapper delay={0.3}>
            <h3 className="font-playfair text-xl text-pink-blush mb-4">Map</h3>
            <div className="rounded-xl overflow-hidden h-52">
              <iframe
                src="https://maps.google.com/maps?q=137+Distillery+Rd,+Stellenbosch+7600,+South+Africa&output=embed&z=16"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Yummi Café location"
              />
            </div>
          </SectionWrapper>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to confirm it passes**

```bash
npm test -- __tests__/Contact.test.tsx
```

Expected: PASS — 4 tests pass.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Contact.tsx __tests__/Contact.test.tsx
git commit -m "feat: add Contact section with hours, address, and Google Maps embed"
```

---

## Task 17: Footer

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Write Footer**

Create `components/Footer.tsx`:

```typescript
export default function Footer() {
  return (
    <footer className="bg-black py-8 px-6 text-center">
      <p className="font-dancing text-2xl text-pink-hot mb-2">Yummi</p>
      <p className="text-white/40 text-xs tracking-widest mb-3">CAFÉ · STELLENBOSCH</p>
      <a
        href="https://www.instagram.com/yummicafestellenbosch/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/40 hover:text-pink-hot transition-colors text-xs"
      >
        @yummicafestellenbosch
      </a>
      <p className="text-white/20 text-xs mt-4">
        © {new Date().getFullYear()} Yummi Café · 137 Distillery Rd, Stellenbosch
      </p>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 18: Assemble Page

**Files:**
- Modify: `app/page.tsx`
- Modify: `next.config.ts`

- [ ] **Step 1: Write next.config.ts**

Replace `next.config.ts`:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

> `output: 'export'` produces a static HTML/CSS/JS bundle Vercel can serve. `images: { unoptimized: true }` is required when using static export with `next/image`.

- [ ] **Step 2: Write page.tsx**

Replace `app/page.tsx`:

```typescript
import Navbar from '@/components/nav/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Menu from '@/components/sections/Menu'
import Gallery from '@/components/sections/Gallery'
import Instagram from '@/components/sections/Instagram'
import Reviews from '@/components/sections/Reviews'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Instagram />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Run full build**

```bash
npm run build
```

Expected: Build completes, `out/` directory created, no type errors.

- [ ] **Step 4: Run all tests**

```bash
npm test
```

Expected: All test suites pass.

- [ ] **Step 5: Verify locally**

```bash
npm run dev
```

Open `http://localhost:3000`. Scroll through all sections and verify:
- Hero image loads and text animates in
- Navbar becomes opaque on scroll
- Menu tabs switch with animation
- Gallery grid renders and lightbox opens on click
- Contact section shows address, hours, and map iframe
- No console errors

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx next.config.ts
git commit -m "feat: assemble full page and configure static export"
```

---

## Task 19: README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write README**

Create `README.md`:

```markdown
# Yummi Café

Marketing website for Yummi Café, Stellenbosch — built with Next.js 14, Tailwind CSS, and Framer Motion.

**Live site:** [yummicafe.vercel.app](https://yummicafe.vercel.app)

## Stack

- **Framework:** Next.js 14 (App Router, static export)
- **Styling:** Tailwind CSS
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

## Build

```bash
npm run build   # produces static output in out/
npm test        # run test suite
```

## Deployment

This repo is connected to Vercel. Every push to `main` auto-deploys.

To deploy manually:

```bash
npm install -g vercel
vercel --prod
```
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with setup and deployment instructions"
```

---

## Task 20: Push to GitHub & Deploy to Vercel

- [ ] **Step 1: Create GitHub repository**

Go to [github.com/new](https://github.com/new) and create a new **public** repository named `yummi-cafe`. Do not initialise with any files.

- [ ] **Step 2: Add remote and push**

```bash
git remote add origin https://github.com/YOUR_USERNAME/yummi-cafe.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

- [ ] **Step 3: Connect to Vercel**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the `yummi-cafe` GitHub repository
3. Framework preset: **Next.js** (auto-detected)
4. Add environment variable: `NEXT_PUBLIC_BEHOLD_WIDGET_ID` = your Behold widget ID
5. Click **Deploy**

- [ ] **Step 4: Update README with live URL**

Once Vercel gives you the live URL, update the README:

```bash
# Edit README.md line: **Live site:** [yummicafe.vercel.app](https://YOUR-ACTUAL-URL.vercel.app)
git add README.md
git commit -m "docs: add Vercel live URL to README"
git push
```

- [ ] **Step 5: Verify live site**

Open the Vercel URL and check:
- All sections load
- Images display correctly
- Fonts render correctly
- Navigation scroll links work
- Google Maps iframe loads
- Instagram follow link opens Instagram

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| Next.js App Router | Task 1, 18 |
| Tailwind CSS brand tokens | Task 2 |
| Framer Motion animations | Tasks 9–13, 15–16 |
| Google Fonts (Dancing Script, Playfair, Inter) | Task 4 |
| JSON-LD LocalBusiness schema | Task 4 |
| Menu data with all categories | Task 6 |
| Tabbed menu with AnimatePresence | Task 12 |
| Hero with float/fade animations | Task 10 |
| Navbar scroll transparency + mobile | Task 9 |
| About two-column layout | Task 11 |
| Gallery masonry + lightbox | Task 13 |
| Instagram Behold.so embed | Task 14 |
| Static Google reviews | Task 7, 15 |
| Contact with address, hours, map | Task 16 |
| Footer | Task 17 |
| Static export for Vercel | Task 18 |
| GitHub repo + README | Tasks 19, 20 |
| Vercel deployment | Task 20 |
| Tests (menu, navbar, reviews, contact) | Tasks 6, 9, 15, 16 |

All spec requirements are covered. No gaps found.
