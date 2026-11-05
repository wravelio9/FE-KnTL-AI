import { useOutletContext } from 'react-router-dom'
import type { AppShellContext } from '../../components/layout/AppShell'
import DailyGoalCard from '../../components/dashboard/DailyGoalCard'
import StatCard from '../../components/dashboard/StatCard'
import StreakHeatmap from '../../components/dashboard/StreakHeatmap'
import WeeklyActivityChart from '../../components/dashboard/WeeklyActivityChart'
import {
  BoltIcon,
  CalendarCheckIcon,
  ClockIcon,
  FlameIcon,
  LibraryIcon,
  PlusIcon,
  SlidersIcon,
  TrendUpIcon,
} from '../../components/icons'
import { attendance, knowledgeAssets, streak, thisWeek, weeklyGoalMinutes } from '../../data/mockDashboard'
import './Dashboard.css'

function greeting(date = new Date()) {
  const h = date.getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

function formatMinutes(total: number) {
  const h = Math.floor(total / 60)
  const m = total % 60
  return m ? `${h}h ${m}m` : `${h}h`
}

export default function Dashboard() {
  const { user } = useOutletContext<AppShellContext>()

  const weekMinutes = thisWeek.reduce((sum, d) => sum + d.minutes, 0)
  const goalPercent = Math.round((weekMinutes / weeklyGoalMinutes) * 100)
  const consistency = Math.round((attendance.attendedDays / attendance.totalDays) * 100)

  return (
    <div className="space-y-6">
      {/* Greeting header */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-[28px] leading-9 font-bold text-ink">
            {greeting()}, {user.displayName} <span aria-hidden="true">👋</span>
          </h1>
          <p className="mt-1 text-sm text-body">
            You're on a <strong className="text-ink">{streak.current}-day streak</strong> — keep it going!
            <span className="mx-2 text-mist" aria-hidden="true">
              •
            </span>
            <span className="font-medium text-primary-strong">
              You've completed {goalPercent}% of your weekly study goal.
            </span>
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            className="flex h-11 items-center gap-2 rounded-xl border border-line bg-white px-4 text-sm font-medium text-ink transition hover:bg-canvas focus-visible:ring-3 focus-visible:ring-primary/35 focus-visible:outline-none"
          >
            <SlidersIcon /> Customize
          </button>
          <button
            type="button"
            className="flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-ink transition hover:bg-primary-strong hover:text-white focus-visible:ring-3 focus-visible:ring-primary/35 focus-visible:outline-none"
          >
            <PlusIcon /> New Notebook
          </button>
        </div>
      </header>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<FlameIcon className="size-5" />}
          iconClassName="bg-amber-100 text-streak"
          badge={
            <>
              <FlameIcon className="size-3" /> Top 10%
            </>
          }
          badgeClassName="bg-amber-100 text-amber-800"
          label="Current Streak"
          value={`${streak.current} days`}
          footerLeft={
            <>
              Personal best: <strong className="text-ink">{streak.best} days</strong>
            </>
          }
          footerRight={
            <span className="flex items-center gap-1 text-amber-700">
              <BoltIcon className="size-3" /> Active
            </span>
          }
        />
        <StatCard
          icon={<ClockIcon className="size-5" />}
          iconClassName="bg-primary-soft text-primary-strong"
          badge={
            <>
              <TrendUpIcon className="size-3" /> +12%
            </>
          }
          badgeClassName="bg-green-50 text-green-700"
          label="Study Time (This Week)"
          value={formatMinutes(weekMinutes)}
          footerLeft={
            <>
              Target: <strong className="text-ink">{formatMinutes(weeklyGoalMinutes)}</strong>
            </>
          }
          footerRight={<span className="text-primary-strong">{goalPercent}% reached</span>}
        />
        <StatCard
          icon={<CalendarCheckIcon className="size-5" />}
          iconClassName="bg-primary-soft text-primary-strong"
          badge="Consistent"
          badgeClassName="bg-primary-soft text-primary-strong"
          label="Weekly Attendance"
          value={`${attendance.attendedDays} / ${attendance.totalDays} days`}
          footerLeft="Consistency rate"
          footerRight={<span className="text-ink">{consistency}%</span>}
        />
        <StatCard
          icon={<LibraryIcon className="size-5" />}
          iconClassName="bg-primary-soft text-primary-strong"
          badge="All Active"
          badgeClassName="bg-slate-100 text-body"
          label="Knowledge Assets"
          value={`${knowledgeAssets.notebooks} Notebooks`}
          footerLeft="Curated highlights"
          footerRight={<span className="text-primary-strong">{knowledgeAssets.notes} notes</span>}
        />
      </div>

      {/* Activity + goal + heatmap */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <WeeklyActivityChart />
        </div>
        <div className="flex flex-col gap-6 xl:col-span-5">
          <DailyGoalCard />
          <StreakHeatmap />
        </div>
      </div>
    </div>
  )
}
