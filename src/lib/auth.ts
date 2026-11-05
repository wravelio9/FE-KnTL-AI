export interface LoginPayload {
  username: string
  password: string
}

export interface AuthUser {
  username: string
  displayName: string
}

const STORAGE_KEY = 'kntl_user'

/** "alex.learner" -> "Alex Learner" */
function toDisplayName(username: string): string {
  return username
    .split(/[._\-\s]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ')
}

/**
 * Mock login: any non-empty username/password succeeds.
 * Integration point: replace the body with a real API call, e.g.
 *   const { data } = await api.post('/auth/login', payload)
 */
export async function login(payload: LoginPayload): Promise<AuthUser> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const username = payload.username.trim()
  if (!username || !payload.password) {
    throw new Error('Invalid username or password.')
  }

  const user: AuthUser = { username, displayName: toDisplayName(username) }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  return user
}

export function getCurrentUser(): AuthUser | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as Partial<AuthUser>
    if (!parsed.username) return null
    return { username: parsed.username, displayName: parsed.displayName ?? toDisplayName(parsed.username) }
  } catch {
    return null
  }
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY)
}
