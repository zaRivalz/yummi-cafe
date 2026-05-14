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
