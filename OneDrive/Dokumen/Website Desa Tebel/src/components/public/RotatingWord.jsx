import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Cycles through a list of words with a fade/slide transition.
 * Used in the hero headline: "Melayani Warga, Lebih {Dekat / Cepat / Transparan}"
 */
export default function RotatingWord({ words, interval = 2200, className = '' }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(timer)
  }, [words.length, interval])

  return (
    <span className={`inline-block relative ${className}`} style={{ minWidth: '1ch' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
