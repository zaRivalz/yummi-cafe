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
