import { Link } from 'react-router-dom'

// Temporary page for routes that are not built yet.
export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-white p-10 text-center">
      <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary-strong">Coming soon</span>
      <h1 className="font-display text-2xl font-bold text-ink">{title}</h1>
      <p className="text-sm text-body">This page is not built yet.</p>
      <Link to="/dashboard" className="text-sm font-medium text-primary-strong hover:underline">
        Back to Dashboard
      </Link>
    </div>
  )
}
