import { useState } from 'react'

/**
 * Tries to render a real photo from /public/images/<src>. If the file
 * doesn't exist yet (404), it falls back to the illustrated placeholder
 * instead of showing a broken image icon. Once you add the real photo file
 * to public/images/, it swaps in automatically — no code changes needed.
 */
export default function PhotoOrIllustration({ src, alt, fallback, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed) return fallback

  return (
    <img
      src={`/images/${src}`}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}
