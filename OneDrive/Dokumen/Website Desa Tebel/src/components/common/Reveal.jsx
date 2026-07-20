import { motion } from 'framer-motion'

/**
 * Scroll-triggered reveal wrapper built on framer-motion's viewport detection.
 * Wrap any section content: <Reveal><div>...</div></Reveal>
 */
export default function Reveal({ children, delay = 0, y = 20, className = '', once = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
