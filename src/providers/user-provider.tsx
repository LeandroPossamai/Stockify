'use client'
import { setApiToken } from '@/services/axios'
import { auth } from '@/services/firebase'
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { ReactNode, createContext, useEffect, useState } from 'react'

export interface UserContextProps {
  user?: User | null
  isAuthenticated: boolean
  isLoading: boolean
  singUp(email: string, password: string): Promise<void>
  singIn(email: string, password: string): Promise<void>
  signInWithGoogle(): Promise<void>
  logout(): Promise<void>
}

export const UserContext = createContext({} as UserContextProps)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      const token = await user?.getIdToken(true)
      setApiToken(token)
      setUser(user)
      setIsLoading(false)
    })

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function singUp(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      location.reload()
    } catch (error) {}
  }

  async function singIn(email: string, password: string) {
    try {
      console.log(email, password)
      await signInWithEmailAndPassword(auth, email, password)
      location.reload()
    } catch (error) {}
  }

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()

    provider.setCustomParameters({ login_hint: 'usuario@exemplo.com' })

    try {
      await signInWithPopup(auth, provider)
      location.reload()
    } catch (error) {}
  }

  async function logout() {
    await signOut(auth)
    location.reload()
  }

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, logout, signInWithGoogle, singIn, singUp }}
    >
      {children}
    </UserContext.Provider>
  )
}
