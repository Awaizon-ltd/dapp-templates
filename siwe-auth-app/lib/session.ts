import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

export interface SessionData {
  nonce?: string
  address?: `0x${string}`
  chainId?: number
}

export const sessionConfig = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'awz_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
  },
}

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), sessionConfig)
}
