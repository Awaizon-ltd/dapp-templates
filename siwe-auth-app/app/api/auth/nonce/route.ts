import { NextResponse } from 'next/server'
import { generateNonce } from '@awarizon/auth'
import { getSession } from '@/lib/session'

export async function GET() {
  const session = await getSession()
  session.nonce = generateNonce()
  await session.save()
  return new NextResponse(session.nonce, { status: 200 })
}
