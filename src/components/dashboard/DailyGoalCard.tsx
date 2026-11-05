import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { dailyGoal } from '../../data/mockDashboard'
import { PlayIcon } from '../icons'

const RADIUS = 34
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function DailyGoalCard() {
  const { doneMinutes, goalMinutes, resumeNotebookId } = dailyGoal
  const progress = Math.min(doneMinutes / goalMinutes, 1)
  const percent = Math.round(progress * 100)
  const left = Math.max(goalMinutes - doneMinutes, 0)

  return (
    <section className="flex items-center gap-5 rounded-2xl border border-line bg-white p-5">
      <div className="relative size-20 shrink-0" role="img" aria-label={`Daily goal ${percent}% complete`}>
        <svg viewBox="0 0 80 80" className="size-full -rotate-90">
          <circle cx="40" cy="40" r={RADIUS} fill="none" stroke="var(--color-line)" strokeWidth="7" />
          <circle
            cx="40"
            cy="40"
            r={RADIUS}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="7"
            strokeLinecap="round"
            className="goal-ring__progress"
            style={
              {
                '--ring-circ': CIRCUMFERENCE,
                strokeDasharray: CIRCUMFERENCE,
                strokeDashoffset: CIRCUMFERENCE * (1 - progress),
              } as CSSProperties
            }
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-lg font-bold text-ink">
          {percent}%
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="text-sm font-semibold text-ink">Daily Focus Goal</h2>
        <p className="mt-1 text-sm text-body">
          <strong className="text-ink">{doneMinutes}</strong> / {goalMinutes} minutes done
        </p>
        <p className="mt-1 text-xs font-medium text-primary-strong">
          {left > 0 ? `${left} min left to hit target!` : 'Goal reached — great work!'}
        </p>
      </div>

      <Link
        to={`/notebook/${resumeNotebookId}`}
        className="flex shrink-0 items-center gap-1.5 rounded-[10px] bg-primary-soft px-3.5 py-2 text-sm font-medium text-primary-strong transition hover:bg-sky-200 focus-visible:ring-3 focus-visible:ring-primary/35 focus-visible:outline-none"
      >
        <PlayIcon className="size-3.5" /> Resume
      </Link>
    </section>
  )
}
