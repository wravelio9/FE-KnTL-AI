import { useState, type CSSProperties } from 'react'
import { lastWeek, thisWeek } from '../../data/mockDashboard'
import { GaugeIcon } from '../icons'

type Range = 'this' | 'last'

export default function WeeklyActivityChart() {
  const [range, setRange] = useState<Range>('this')
  const data = range === 'this' ? thisWeek : lastWeek
  const max = Math.max(...data.map((d) => d.minutes), 1)
  const avg = Math.round(data.reduce((sum, d) => sum + d.minutes, 0) / data.length)
  const todayIndex = range === 'this' ? data.length - 1 : -1

  const tabClass = (active: boolean) =>
    `rounded-lg px-3 py-1.5 text-xs font-medium transition focus-visible:ring-3 focus-visible:ring-primary/35 focus-visible:outline-none ${
      active ? 'bg-white text-primary-strong shadow-sm' : 'text-body hover:text-ink'
    }`

  return (
    <section className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">Weekly Study Activity</h2>
          <p className="mt-0.5 text-sm text-body">Time logged per day in focused learning modes</p>
        </div>
        <div role="tablist" aria-label="Select week" className="flex rounded-[10px] bg-canvas p-1">
          <button type="button" role="tab" aria-selected={range === 'this'} onClick={() => setRange('this')} className={tabClass(range === 'this')}>
            This Week
          </button>
          <button type="button" role="tab" aria-selected={range === 'last'} onClick={() => setRange('last')} className={tabClass(range === 'last')}>
            Last Week
          </button>
        </div>
      </div>

      <figure className="mt-6 flex-1" aria-label={`Minutes studied per day, ${range === 'this' ? 'this' : 'last'} week`}>
        <div className="activity-chart">
          {data.map((d, i) => {
            const isToday = i === todayIndex
            return (
              <div key={`${range}-${d.day}`} className="activity-chart__col group">
                <span
                  className={`activity-chart__value ${isToday ? 'activity-chart__value--visible text-primary-strong' : 'text-body'}`}
                >
                  {d.minutes}m
                </span>
                <div
                  className={`activity-chart__bar ${isToday ? 'activity-chart__bar--today' : ''}`}
                  style={{ '--bar-h': `${(d.minutes / max) * 100}%` } as CSSProperties}
                  role="img"
                  aria-label={`${isToday ? 'Today' : d.day}: ${d.minutes} minutes`}
                />
              </div>
            )
          })}
        </div>
        <div className="mt-2 grid grid-cols-7 border-t border-line pt-2 text-center text-xs">
          {data.map((d, i) => (
            <span key={d.day} className={i === todayIndex ? 'font-semibold text-primary-strong' : 'text-body'}>
              {i === todayIndex ? 'Today' : d.day}
            </span>
          ))}
        </div>
      </figure>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-body">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-primary" /> Logged Session
          </span>
          {todayIndex >= 0 && (
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-primary-strong" /> Today
            </span>
          )}
        </div>
        <span className="flex items-center gap-1.5">
          <GaugeIcon className="size-4" /> Daily pace: <strong className="text-ink">{avg} min/day avg</strong>
        </span>
      </div>
    </section>
  )
}
