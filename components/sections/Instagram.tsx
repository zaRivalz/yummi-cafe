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
