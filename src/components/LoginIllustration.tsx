import type { ReactNode } from 'react'
import { BotIcon, FlameIcon } from './icons'

function StudyBookArt() {
  return (
    <svg viewBox="0 0 260 200" className="h-auto w-full" aria-hidden="true">
      {/* floor shadow */}
      <ellipse cx="130" cy="172" rx="105" ry="16" fill="#0284C7" opacity="0.12" />

      {/* knowledge network */}
      <path d="M58 52 C 90 30, 140 20, 170 52" stroke="#1E3A5F" strokeWidth="1.5" fill="none" />
      <path d="M140 40 L 160 62 L 196 70" stroke="#1E3A5F" strokeWidth="1.5" fill="none" />
      <circle cx="58" cy="52" r="4" fill="#1E3A5F" />
      <circle cx="196" cy="70" r="5" fill="#38BDF8" />
      <circle cx="160" cy="62" r="3" fill="#1E3A5F" />

      {/* brain orb */}
      <circle cx="130" cy="56" r="26" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="3" />
      <path
        d="M121 48a7 7 0 0 1 9-4 7 7 0 0 1 9 4 6 6 0 0 1 2 10 6 6 0 0 1-8 6h-6a6 6 0 0 1-8-6 6 6 0 0 1 2-10Z"
        fill="#1E3A5F"
      />
      <path d="M130 30 l2 -6 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 Z" fill="#F59E0B" />
      <path d="M214 46 l1.5 -4 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 Z" fill="#1E3A5F" />
      <path d="M78 84 l1 -3 l1 3 l3 1 l-3 1 l-1 3 l-1 -3 l-3 -1 Z" fill="#7DD3FC" />

      {/* reading light cone */}
      <path d="M118 80 L 142 80 L 160 110 L 100 110 Z" fill="#BAE6FD" opacity="0.5" />

      {/* base slab */}
      <rect x="40" y="140" width="180" height="20" rx="4" fill="#1E3A5F" />
      <rect x="36" y="138" width="8" height="22" rx="2" fill="#16304F" />
      <rect x="44" y="132" width="176" height="10" rx="3" fill="#7DD3FC" />

      {/* open book */}
      <path d="M130 136 C 110 124, 80 122, 56 126 L 56 92 C 82 88, 112 90, 130 104 Z" fill="#FFFFFF" />
      <path d="M130 136 C 150 124, 180 122, 204 126 L 204 92 C 178 88, 148 90, 130 104 Z" fill="#F8FAFC" />
      <path d="M130 104 L 130 136" stroke="#CBD5E1" strokeWidth="1.5" />
      <path d="M68 102 H 108 M68 110 H 100 M68 118 H 104" stroke="#BAE6FD" strokeWidth="3" strokeLinecap="round" />
      <path d="M70 126 H 96" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />

      {/* chart on right page */}
      <path d="M150 116 L 164 108 L 176 122 L 190 100" stroke="#1E3A5F" strokeWidth="1.5" fill="none" />
      <circle cx="150" cy="116" r="2.5" fill="#1E3A5F" />
      <circle cx="176" cy="122" r="3.5" fill="#1E3A5F" />
      <circle cx="190" cy="100" r="2.5" fill="#38BDF8" />
    </svg>
  )
}

function FloatingCard({
  icon,
  iconClass,
  title,
  subtitle,
  className,
}: {
  icon: ReactNode
  iconClass: string
  title: string
  subtitle: string
  className: string
}) {
  return (
    <div
      className={`animate-float absolute flex items-center gap-3 rounded-xl bg-white/90 px-3 py-2.5 shadow-[0_4px_16px_rgba(2,132,199,0.15)] backdrop-blur ${className}`}
    >
      <span className={`flex size-7 items-center justify-center rounded-lg ${iconClass}`}>{icon}</span>
      <div className="leading-tight">
        <p className="text-[11px] font-semibold text-ink">{title}</p>
        <p className="text-[9px] text-body">{subtitle}</p>
      </div>
    </div>
  )
}

export default function LoginIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[280px]">
      <StudyBookArt />

      <FloatingCard
        className="-top-12 -left-8 -rotate-2"
        icon={<FlameIcon className="size-4" />}
        iconClass="bg-amber-100 text-streak"
        title="7-Day Study Streak"
        subtitle="Top 5% continuous retention"
      />
      <FloatingCard
        className="-right-10 -bottom-8 rotate-2 [animation-delay:1.5s]"
        icon={<BotIcon className="size-4" />}
        iconClass="bg-primary-soft text-primary-strong"
        title="Neural Synthesizer"
        subtitle="Summaries generated on the fly"
      />
    </div>
  )
}
