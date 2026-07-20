/**
 * Illustrated placeholder scenery for Desa Tebel. These are hand-built SVG
 * illustrations (rice terraces, gapura/gate silhouette, coconut palms) used
 * in place of real photography until the village supplies actual photos.
 * Swap any of these for <img src="..." /> once real images are available —
 * the surrounding layout (masks, overlays, badges) is already built for it.
 */

export function HeroScene({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8FC79E" />
          <stop offset="0.5" stopColor="#3E8F68" />
          <stop offset="1" stopColor="#0F5132" />
        </linearGradient>
        <linearGradient id="heroField" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E7C356" />
          <stop offset="1" stopColor="#C79A2B" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#heroSky)" />
      <circle cx="1300" cy="170" r="82" fill="#FCEBAE" opacity="0.85" />
      <path d="M0 520 L220 300 L440 520 Z" fill="#3E8F68" opacity="0.9" />
      <path d="M320 540 L560 260 L820 540 Z" fill="#2E7D5B" />
      <path d="M700 550 L950 310 L1220 550 Z" fill="#3E8F68" opacity="0.9" />
      <path d="M1050 545 L1300 330 L1600 545 Z" fill="#2E7D5B" opacity="0.85" />
      <path d="M0 560 L1600 560 L1600 900 L0 900 Z" fill="url(#heroField)" />
      <g opacity="0.55">
        <path d="M0 610 L1600 585 L1600 615 L0 640 Z" fill="#B98A22" />
        <path d="M0 670 L1600 648 L1600 680 L0 702 Z" fill="#D8B03C" />
        <path d="M0 735 L1600 715 L1600 748 L0 768 Z" fill="#E9C55A" />
        <path d="M0 800 L1600 782 L1600 900 L0 900 Z" fill="#F3D26B" />
      </g>
      <g transform="translate(1180,470)">
        <path d="M0 130 L0 65 L90 0 L180 65 L180 130 Z" fill="#F7F1DD" />
        <path d="M-16 65 L90 -14 L196 65 L180 65 L90 4 L0 65 Z" fill="#7A1B1B" />
        <rect x="72" y="82" width="36" height="48" fill="#8F2323" />
        <rect x="20" y="80" width="26" height="26" fill="#D9CDA1" />
        <rect x="134" y="80" width="26" height="26" fill="#D9CDA1" />
      </g>
      <g transform="translate(150,560)" opacity="0.95">
        <line x1="0" y1="140" x2="0" y2="20" stroke="#4B3410" strokeWidth="7" />
        <path d="M0 20 Q-44 44 -60 16 Q-16 4 0 20Z" fill="#1B7A4D" />
        <path d="M0 28 Q44 52 60 24 Q16 12 0 28Z" fill="#237E4F" />
        <path d="M0 12 Q-32 -20 -12 -44 Q12 -16 0 12Z" fill="#2E9160" />
        <path d="M0 12 Q32 -20 12 -44 Q-12 -16 0 12Z" fill="#237E4F" />
      </g>
      <g transform="translate(300,610)" opacity="0.95">
        <line x1="0" y1="120" x2="0" y2="16" stroke="#4B3410" strokeWidth="6" />
        <path d="M0 16 Q-36 36 -50 14 Q-14 4 0 16Z" fill="#237E4F" />
        <path d="M0 24 Q36 44 50 20 Q14 10 0 24Z" fill="#2E9160" />
      </g>
      <g transform="translate(1420,600)" opacity="0.9">
        <line x1="0" y1="130" x2="0" y2="18" stroke="#4B3410" strokeWidth="6" />
        <path d="M0 18 Q-38 38 -52 16 Q-15 5 0 18Z" fill="#1B7A4D" />
        <path d="M0 26 Q38 46 52 22 Q15 11 0 26Z" fill="#237E4F" />
      </g>
    </svg>
  )
}

export function RiceFieldScene({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 500 420" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="500" height="420" fill="#DDECDF" />
      <path d="M0 260 L120 150 L240 260Z" fill="#3E8F68" />
      <path d="M160 270 L300 140 L440 270Z" fill="#2E7D5B" />
      <rect y="270" width="500" height="150" fill="#E4BE4A" />
    </svg>
  )
}

export function GapuraScene({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="300" fill="#8F2323" />
      <path d="M0 180 L150 90 L300 180 V300 H0Z" fill="#F7F1DD" />
      <path d="M150 90 L300 180 H0Z" fill="#7A1B1B" />
    </svg>
  )
}

const GALLERY_VARIANTS = {
  gotong_royong: (
    <svg viewBox="0 0 300 300"><rect width="300" height="300" fill="#2E7D5B" /><path d="M0 180 L100 100 L200 180Z" fill="#3E8F68" /></svg>
  ),
  panen: (
    <svg viewBox="0 0 300 300"><rect width="300" height="300" fill="#C08A15" /><rect y="180" width="300" height="120" fill="#E4BE4A" /></svg>
  ),
  balai: (
    <svg viewBox="0 0 300 300"><rect width="300" height="300" fill="#8F2323" /><path d="M0 180 L150 90 L300 180 V300H0Z" fill="#F7F1DD" /></svg>
  ),
  posyandu: (
    <svg viewBox="0 0 300 300"><rect width="300" height="300" fill="#146B41" /><circle cx="150" cy="120" r="50" fill="#8FC79E" /></svg>
  ),
}

export function GalleryTile({ variant = 'gotong_royong', className = '' }) {
  return <div className={className}>{GALLERY_VARIANTS[variant] || GALLERY_VARIANTS.gotong_royong}</div>
}

export function PersonAvatarScene({ tone = 'green', className = '' }) {
  const tones = {
    green: { bg: '#E3F1E8', head: '#0F5132', body: '#146B41' },
    gold: { bg: '#FBF0D9', head: '#C08A15', body: '#E0A81C' },
    maroon: { bg: '#F7E3E1', head: '#8F2323', body: '#A62C2C' },
  }
  const t = tones[tone] || tones.green
  return (
    <svg className={className} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill={t.bg} />
      <circle cx="100" cy="80" r="34" fill={t.head} />
      <rect x="50" y="120" width="100" height="80" rx="16" fill={t.body} />
    </svg>
  )
}
