import { useMemo } from 'react'
import { buildHeatmap } from '../../data/mockDashboard'
import { GridIcon } from '../icons'

const dateFmt = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' })

export default function StreakHeatmap() {
  const days = useMemo(() => buildHeatmap(), [])
  const total = days.reduce((sum, d) => sum + d.sessions, 0)

  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-ink">
          <GridIcon className="text-primary-strong" /> 12-Week Momentum
        </h2>
        <span className="text-xs text-body">{total} sessions recorded</span>
      </div>

      <div className="heatmap mt-4" role="img" aria-label={`Study sessions over the last 12 weeks: ${total} in total`}>
        {days.map((d) => (
          <span
            key={d.date.toISOString()}
            className={`heatmap__cell heatmap__cell--l${d.sessions}`}
            title={`${dateFmt.format(d.date)}: ${d.sessions} session${d.sessions === 1 ? '' : 's'}`}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-body">
        <span>Last 84 days</span>
        <span className="flex items-center gap-1">
          Less
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className={`heatmap__cell heatmap__cell--l${l} heatmap__cell--legend`} />
          ))}
          More
        </span>
      </div>
    </section>
  )
}
