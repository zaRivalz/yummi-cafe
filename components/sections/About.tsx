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
