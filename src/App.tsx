import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Placeholder from './pages/Dashboard/Placeholder'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notebook/:id" element={<Placeholder title="Notebook" />} />
        <Route path="/settings" element={<Placeholder title="Setting" />} />
        <Route path="/profile" element={<Placeholder title="Profile" />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
