'use client'
import { NextUIProvider } from '@nextui-org/react'
import { ReactNode } from 'react'
import { UserProvider } from './user-provider'
import { ThemeProvider } from './theme-provider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <NextUIProvider className="h-full">
        <UserProvider> {children} </UserProvider>
      </NextUIProvider>
    </ThemeProvider>
  )
}
