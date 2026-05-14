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
