'use client'
import { cookies } from '@/lib/cookies'
import { api, setApiToken } from '@/services/axios'
import { auth } from '@/services/firebase'
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
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
      cookies.set('idToken', token)
      setUser(user)
      setIsLoading(false)
    })

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function singUp(email: string, password: string) {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await api.post('api/users', user)
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

    try {
      const userCredential = await signInWithPopup(auth, provider)
      const userInfo = getAdditionalUserInfo(userCredential)
      if (userInfo?.isNewUser) {
        await api.post('api/users', userCredential.user)
      }
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
