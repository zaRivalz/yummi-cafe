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
