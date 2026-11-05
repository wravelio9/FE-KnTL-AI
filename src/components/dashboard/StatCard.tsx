import type { ReactNode } from 'react'

interface StatCardProps {
  icon: ReactNode
  iconClassName: string
  badge: ReactNode
  badgeClassName: string
  label: string
  value: string
  footerLeft: ReactNode
  footerRight: ReactNode
}

export default function StatCard({
  icon,
  iconClassName,
  badge,
  badgeClassName,
  label,
  value,
  footerLeft,
  footerRight,
}: StatCardProps) {
  return (
    <article className="rounded-2xl border border-line bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between">
        <span className={`flex size-11 items-center justify-center rounded-xl ${iconClassName}`}>{icon}</span>
        <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${badgeClassName}`}>
          {badge}
        </span>
      </div>
      <p className="mt-4 text-sm text-body">{label}</p>
      <p className="mt-1 font-display text-[28px] leading-9 font-bold text-ink">{value}</p>
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-xs">
        <span className="text-body">{footerLeft}</span>
        <span className="font-semibold">{footerRight}</span>
      </div>
    </article>
  )
}
