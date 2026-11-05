import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getCurrentUser, type AuthUser } from '../../lib/auth'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export interface AppShellContext {
  user: AuthUser
}

/** Global layout for every page after login: fixed topbar + sidebar. */
export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = getCurrentUser()

  if (!user) return <Navigate to="/login" replace />

  return (
    <div className="min-h-screen bg-canvas">
      <Topbar user={user} sidebarOpen={sidebarOpen} onMenuClick={() => setSidebarOpen((v) => !v)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="pt-16 lg:pl-[260px]">
        <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet context={{ user } satisfies AppShellContext} />
        </div>
      </main>
    </div>
  )
}
