import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { AuthUser } from '../../lib/auth'
import { logout } from '../../lib/auth'
import { streak } from '../../data/mockDashboard'
import {
  BellIcon,
  BookOpenIcon,
  ChevronDownIcon,
  FlameIcon,
  LogoutIcon,
  MenuIcon,
  SearchIcon,
  SettingsIcon,
  UserCircleIcon,
} from '../icons'

interface TopbarProps {
  user: AuthUser
  sidebarOpen: boolean
  onMenuClick: () => void
}

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function Topbar({ user, sidebarOpen, onMenuClick }: TopbarProps) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const onPointer = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  const menuItemClass =
    'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-ink transition hover:bg-canvas focus-visible:bg-canvas focus-visible:outline-none'

  return (
    <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white px-4 lg:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={sidebarOpen}
        aria-controls="app-sidebar"
        className="rounded-lg p-2 text-body transition hover:bg-canvas focus-visible:ring-3 focus-visible:ring-primary/35 focus-visible:outline-none lg:hidden"
      >
        <MenuIcon className="size-5" />
      </button>

      <Link to="/dashboard" className="flex shrink-0 items-center gap-3 rounded-lg focus-visible:ring-3 focus-visible:ring-primary/35 focus-visible:outline-none">
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary-soft text-primary-strong">
          <BookOpenIcon className="size-5" />
        </span>
        <span className="hidden leading-tight sm:block">
          <span className="block font-display text-base font-bold text-ink">KnTL</span>
          <span className="block text-[11px] text-body">Knowledge 'n Tech Library</span>
        </span>
      </Link>

      <div className="mx-auto hidden w-full max-w-[440px] md:block">
        <label htmlFor="global-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-mist" />
          <input
            id="global-search"
            type="search"
            placeholder="Search notebooks, notes, materials…"
            className="h-10 w-full rounded-[10px] border border-line bg-canvas pr-3 pl-9 text-sm text-ink outline-none placeholder:text-mist transition focus:border-primary focus:bg-white focus:ring-3 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3 md:ml-0">
        <button
          type="button"
          aria-label="Notifications"
          className="flex size-9 items-center justify-center rounded-lg border border-line text-body transition hover:bg-canvas focus-visible:ring-3 focus-visible:ring-primary/35 focus-visible:outline-none"
        >
          <BellIcon className="size-[18px]" />
        </button>

        <span
          className="flex h-8 items-center gap-1 rounded-full bg-amber-100 px-3 text-sm font-semibold text-amber-800"
          title={`${streak.current}-day streak`}
        >
          <FlameIcon className="size-4 text-streak" />
          {streak.current}
          <span className="sr-only">-day streak</span>
        </span>

        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-label="Account menu"
            className="flex items-center gap-1 rounded-full p-0.5 text-body transition hover:bg-canvas focus-visible:ring-3 focus-visible:ring-primary/35 focus-visible:outline-none"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary-strong">
              {initials(user.displayName)}
            </span>
            <ChevronDownIcon className={`transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute top-12 right-0 w-56 rounded-xl border border-line bg-white p-1.5 shadow-soft"
            >
              <div className="border-b border-line px-3 py-2">
                <p className="truncate text-sm font-semibold text-ink">{user.displayName}</p>
                <p className="truncate text-xs text-body">@{user.username}</p>
              </div>
              <div className="pt-1">
                <Link role="menuitem" to="/profile" onClick={() => setMenuOpen(false)} className={menuItemClass}>
                  <UserCircleIcon className="text-body" /> Profile
                </Link>
                <Link role="menuitem" to="/settings" onClick={() => setMenuOpen(false)} className={menuItemClass}>
                  <SettingsIcon className="text-body" /> Settings
                </Link>
                <button role="menuitem" type="button" onClick={handleLogout} className={`${menuItemClass} text-danger`}>
                  <LogoutIcon /> Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
