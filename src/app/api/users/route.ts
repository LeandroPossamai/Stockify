import { userApi } from '@/server/prisma/user'
import { User } from 'firebase/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const user: User = await req.json()
    const created = await userApi.create(user)
    return Response.json(created, { status: 200 })
  } catch (err: any) {
    return Response.json(err.message, { status: err.statusCode || 400 })
  }
}
