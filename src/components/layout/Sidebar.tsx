import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { notebooks } from '../../data/mockDashboard'
import {
  ChevronDownIcon,
  FolderIcon,
  ForumIcon,
  NotebookIcon,
  PlusIcon,
  SettingsIcon,
  SparklesIcon,
  UserCircleIcon,
} from '../icons'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const itemBase =
  'flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium transition focus-visible:ring-3 focus-visible:ring-primary/35 focus-visible:outline-none'
const itemIdle = 'text-ink hover:bg-canvas'
const itemActive = 'bg-primary-soft text-primary-strong'

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { pathname } = useLocation()
  const [notebookOpen, setNotebookOpen] = useState(true)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 4000)
    return () => clearTimeout(t)
  }, [toast])

  const inNotebook = pathname.startsWith('/notebook')

  return (
    <>
      {/* Mobile/tablet overlay */}
      {open && (
        <div className="fixed inset-0 top-16 z-10 bg-ink/40 lg:hidden" onClick={onClose} aria-hidden="true" />
      )}

      <aside
        id="app-sidebar"
        aria-label="Main navigation"
        className={`fixed top-16 bottom-0 left-0 z-20 flex w-[260px] flex-col border-r border-line bg-white transition-transform duration-200 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 overflow-y-auto p-4">
          <button
            type="button"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary-soft text-sm font-semibold text-primary-strong transition hover:bg-sky-200 focus-visible:ring-3 focus-visible:ring-primary/35 focus-visible:outline-none"
          >
            <PlusIcon /> New Notebook
          </button>

          <nav className="mt-5 space-y-1">
            {/* Notebook dropdown */}
            <button
              type="button"
              onClick={() => setNotebookOpen((v) => !v)}
              aria-expanded={notebookOpen}
              aria-controls="sidebar-notebooks"
              className={`${itemBase} ${inNotebook ? itemActive : itemIdle}`}
            >
              <NotebookIcon className="size-5" />
              <span className="flex-1 text-left">Notebook</span>
              <ChevronDownIcon className={`text-mist transition-transform ${notebookOpen ? '' : '-rotate-90'}`} />
            </button>

            {notebookOpen && (
              <ul id="sidebar-notebooks" className="space-y-0.5 py-1 pl-6">
                {notebooks.map((nb) => (
                  <li key={nb.id}>
                    <NavLink
                      to={`/notebook/${nb.id}`}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition focus-visible:ring-3 focus-visible:ring-primary/35 focus-visible:outline-none ${
                          isActive ? 'bg-primary-soft font-medium text-primary-strong' : 'text-body hover:bg-canvas'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            className={`size-1.5 shrink-0 rounded-full ${isActive ? 'bg-primary-strong' : 'bg-line'}`}
                          />
                          <span className="truncate">{nb.name}</span>
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}

            <button
              type="button"
              onClick={() => setToast('Public Materials are coming soon!')}
              className={`${itemBase} ${itemIdle}`}
            >
              <FolderIcon className="size-5" />
              <span className="flex-1 text-left">Material</span>
            </button>

            <button
              type="button"
              onClick={() => setToast('Forum is coming soon!')}
              className={`${itemBase} ${itemIdle}`}
            >
              <ForumIcon className="size-5" />
              <span className="flex-1 text-left">Forum</span>
            </button>

            <hr className="my-3 border-line" />

            <NavLink
              to="/settings"
              onClick={onClose}
              className={({ isActive }) => `${itemBase} ${isActive ? itemActive : itemIdle}`}
            >
              <SettingsIcon className="size-5" />
              Setting
            </NavLink>

            <NavLink
              to="/profile"
              onClick={onClose}
              className={({ isActive }) => `${itemBase} ${isActive ? itemActive : itemIdle}`}
            >
              <UserCircleIcon className="size-5" />
              Profile
            </NavLink>
          </nav>
        </div>

        <div className="p-4">
          <div className="rounded-xl border border-primary-soft bg-primary-softest p-3">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-primary-strong uppercase">
              <SparklesIcon className="size-3.5" /> Roadmap
            </p>
            <p className="mt-1 text-xs leading-5 text-body">
              More coming soon: AI Assistant · Flashcards · Quiz · Analytics
            </p>
          </div>
        </div>
      </aside>

      {toast && (
        <div
          role="status"
          className="fixed right-6 bottom-6 z-40 flex items-center gap-3 overflow-hidden rounded-xl border border-line bg-white py-3 pr-4 pl-0 text-sm text-ink shadow-soft"
        >
          <span className="h-full w-1 self-stretch bg-primary" />
          {toast}
        </div>
      )}
    </>
  )
}
