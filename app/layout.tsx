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
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '16:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '08:00',
      closes: '13:00',
    },
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
