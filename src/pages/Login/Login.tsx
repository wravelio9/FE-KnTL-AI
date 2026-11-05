import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginIllustration from '../../components/LoginIllustration'
import { ArrowRightIcon, EyeIcon, EyeOffIcon, LockIcon, Spinner, UserIcon, XIcon } from '../../components/icons'
import { login } from '../../lib/auth'
import './Login.css'

interface FieldErrors {
  username?: string
  password?: string
}

const inputClass =
  'h-11 w-full rounded-[10px] border bg-canvas pl-9 pr-10 text-sm text-ink placeholder:text-mist outline-none transition focus:border-primary focus:bg-white focus:ring-3 focus:ring-primary/30'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormError('')

    const next: FieldErrors = {}
    if (!username.trim()) next.username = 'Username is required'
    if (!password) next.password = 'Password is required'
    setErrors(next)
    if (next.username || next.password) return

    setLoading(true)
    try {
      await login({ username, password })
      navigate('/dashboard')
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen">
      {/* Left: form */}
      <section className="flex w-full items-center justify-center px-6 py-12 md:w-1/2">
        <div className="w-full max-w-[400px]">
          <h1 className="font-display text-4xl leading-[44px] font-bold text-ink">Welcome back</h1>
          <p className="mt-2 text-sm text-body">Log in to continue your personalized learning session.</p>

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
            {/* Username */}
            <div>
              <label htmlFor="username" className="mb-2 block text-xs font-semibold tracking-wide text-body uppercase">
                Username
              </label>
              <div className="relative">
                <UserIcon className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-mist" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    if (errors.username) setErrors((p) => ({ ...p, username: undefined }))
                  }}
                  aria-invalid={!!errors.username}
                  aria-describedby={errors.username ? 'username-error' : undefined}
                  className={`${inputClass} ${errors.username ? 'border-danger' : 'border-transparent'}`}
                />
                {username && (
                  <button
                    type="button"
                    onClick={() => setUsername('')}
                    aria-label="Clear username"
                    className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-mist transition hover:text-body focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  >
                    <XIcon />
                  </button>
                )}
              </div>
              {errors.username && (
                <p id="username-error" className="mt-1.5 text-xs text-danger">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-2 block text-xs font-semibold tracking-wide text-body uppercase">
                Password
              </label>
              <div className="relative">
                <LockIcon className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-mist" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password) setErrors((p) => ({ ...p, password: undefined }))
                  }}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  className={`${inputClass} ${errors.password ? 'border-danger' : 'border-transparent'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-mist transition hover:text-body focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="mt-1.5 text-xs text-danger">
                  {errors.password}
                </p>
              )}
            </div>

            {formError && (
              <div role="alert" className="rounded-[10px] bg-red-50 px-3 py-2.5 text-sm text-danger">
                {formError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-ink transition hover:bg-primary-strong hover:text-white focus-visible:ring-3 focus-visible:ring-primary/35 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Spinner /> Logging in…
                </>
              ) : (
                <>
                  Log in <ArrowRightIcon />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Right: illustration panel (hidden on mobile) */}
      <aside className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-linear-to-br from-primary-soft via-sky-100 to-sky-300 md:flex">
        <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-white/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 size-96 rounded-full bg-primary/40 blur-3xl" />
        <LoginIllustration />
      </aside>
    </main>
  )
}
