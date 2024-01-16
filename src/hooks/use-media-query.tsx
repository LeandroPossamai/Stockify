'use client'

import { useEffect, useState } from 'react'

import { isServer } from '@/lib/assertions'

const sizes = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

interface UseMediaQueryProps {
  size?: keyof typeof sizes | number
}

export interface UseMediaQueryResponse {
  matches: boolean
  systemTheme: 'light' | 'dark'
}

function getSystemTheme() {
  if (isServer) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getScreenMatch(size: keyof typeof sizes | number) {
  if (isServer || !size) return false
  const screenSize = typeof size === 'number' ? size : sizes[size]
  const mql = window.matchMedia(`(max-width: ${screenSize}px)`)
  return mql.matches
}

export function useMediaQuery({ size = 0 }: UseMediaQueryProps = { size: 0 }): UseMediaQueryResponse {
  const [systemTheme, setSystemTheme] = useState<UseMediaQueryResponse['systemTheme']>(getSystemTheme())
  const [matches, setMatches] = useState(getScreenMatch(size))

  useEffect(() => {
    function handleSystemThemeChange(e: MediaQueryListEvent) {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    const isSystemDarkMQ = window.matchMedia('(prefers-color-scheme: dark)')
    isSystemDarkMQ.addEventListener('change', handleSystemThemeChange)

    return () => {
      isSystemDarkMQ.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  useEffect(() => {
    const screenSize = typeof size === 'number' ? size : sizes[size]
    const mql = window.matchMedia(`(max-width: ${screenSize}px)`)

    mql.addEventListener('change', resize)

    function resize(e: MediaQueryListEvent) {
      setMatches(e.matches)
    }

    return () => {
      mql.removeEventListener('change', resize)
    }
  }, [size])

  return { systemTheme, matches }
}
