import { User as FirebaseUser } from 'firebase/auth'
import { prisma } from '.'

class UserApi {
  async create(user: FirebaseUser) {
    if (!user.email) {
      throw new Error('Usuário inválido')
    }

    const found = await prisma.user.findFirst({ where: { firebaseUid: user.uid } })

    if (found) {
      throw new Error('Usuário existente')
    }

    return await prisma.user.create({
      data: {
        firebaseUid: user.uid,
        email: user.email,
        name: user.displayName || undefined,
        photoURL: user.photoURL ? { create: { name: user.photoURL, url: user.photoURL } } : undefined
      }
    })
  }
}

export const userApi = new UserApi()
