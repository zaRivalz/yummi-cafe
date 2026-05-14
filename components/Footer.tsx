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
