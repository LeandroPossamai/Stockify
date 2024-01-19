import { PrismaClient } from '@prisma/client'

let client

if (process.env.NODE_ENV === 'production') {
  client = new PrismaClient()
} else {
  if (!(global as any).prisma) {
    ;(global as any).prisma = new PrismaClient()
  }

  client = (global as any).prisma
}

export const prisma = client as InstanceType<typeof PrismaClient>
