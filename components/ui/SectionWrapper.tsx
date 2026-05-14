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
