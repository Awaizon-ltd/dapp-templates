import { NextRequest, NextResponse } from 'next/server'
import { verifySiweSignature } from '@awarizon/auth'
import { getSession } from '@/lib/session'

export async function POST(req: NextRequest) {
  const { message, signature } = await req.json()
  const session = await getSession()

  if (!session.nonce) {
    return NextResponse.json({ error: 'No nonce found — request a fresh nonce first.' }, { status: 422 })
  }

  try {
    const result = await verifySiweSignature({ message, signature, nonce: session.nonce })

    session.address = result.address as `0x${string}`
    session.chainId = result.chainId
    session.nonce   = undefined
    await session.save()

    return NextResponse.json({ address: result.address })
  } catch {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 })
  }
}
