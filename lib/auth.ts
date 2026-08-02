import 'server-only'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'jhl_admin_session'
const SESSION_DURATION_MS = 1000 * 60 * 60 * 12

function secret(): string {
  const value = process.env.ADMIN_SESSION_SECRET
  if (!value) throw new Error('ADMIN_SESSION_SECRET não configurado.')
  return value
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('hex')
}

function safeEqual(a: string, b: string): boolean {
  const bufferA = Buffer.from(a)
  const bufferB = Buffer.from(b)
  if (bufferA.length !== bufferB.length) return false
  return timingSafeEqual(bufferA, bufferB)
}

export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  return safeEqual(password, expected)
}

export async function createSession(): Promise<void> {
  const expiresAt = Date.now() + SESSION_DURATION_MS
  const payload = String(expiresAt)
  const store = await cookies()

  store.set(COOKIE_NAME, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_DURATION_MS / 1000,
  })
}

export async function destroySession(): Promise<void> {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

export async function isAdmin(): Promise<boolean> {
  try {
    const store = await cookies()
    const token = store.get(COOKIE_NAME)?.value
    if (!token) return false

    const [payload, signature] = token.split('.')
    if (!payload || !signature) return false
    if (!safeEqual(signature, sign(payload))) return false

    return Number(payload) > Date.now()
  } catch {
    return false
  }
}
