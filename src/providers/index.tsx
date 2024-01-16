'use client'
import { NextUIProvider } from '@nextui-org/react'
import { ReactNode } from 'react'
import { UserProvider } from './user-provider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider className="h-full">
      <UserProvider> {children} </UserProvider>
    </NextUIProvider>
  )
}
