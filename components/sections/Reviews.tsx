'use client'
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
