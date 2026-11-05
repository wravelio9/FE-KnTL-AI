// Mock data for the dashboard. Replace with API responses later.

export interface Notebook {
  id: string
  name: string
}

export const notebooks: Notebook[] = [
  { id: 'system-architecture', name: 'System Architecture' },
  { id: 'algorithms-data-structures', name: 'Algorithms & Data Struct.' },
  { id: 'web-engineering', name: 'Web Engineering' },
]

export const streak = { current: 7, best: 14 }

export const weeklyGoalMinutes = 390 // 6h 30m

export interface DayActivity {
  day: string
  minutes: number
}

export const thisWeek: DayActivity[] = [
  { day: 'Mon', minutes: 40 },
  { day: 'Tue', minutes: 55 },
  { day: 'Wed', minutes: 30 },
  { day: 'Thu', minutes: 65 },
  { day: 'Fri', minutes: 45 },
  { day: 'Sat', minutes: 35 },
  { day: 'Sun', minutes: 50 },
]

export const lastWeek: DayActivity[] = [
  { day: 'Mon', minutes: 35 },
  { day: 'Tue', minutes: 20 },
  { day: 'Wed', minutes: 50 },
  { day: 'Thu', minutes: 40 },
  { day: 'Fri', minutes: 0 },
  { day: 'Sat', minutes: 60 },
  { day: 'Sun', minutes: 40 },
]

export const dailyGoal = { doneMinutes: 45, goalMinutes: 60, resumeNotebookId: 'system-architecture' }

export const attendance = { attendedDays: 5, totalDays: 7 }

export const knowledgeAssets = { notebooks: 6, notes: 48 }

export interface HeatmapDay {
  date: Date
  sessions: number
}

/** Last 84 days (12 weeks), deterministic pseudo-random sessions per day. */
export function buildHeatmap(today = new Date()): HeatmapDay[] {
  let seed = 7
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }

  const days: HeatmapDay[] = []
  for (let i = 83; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    const r = rand()
    const sessions = r < 0.35 ? 0 : r < 0.65 ? 1 : r < 0.85 ? 2 : r < 0.95 ? 3 : 4
    days.push({ date, sessions })
  }
  return days
}
