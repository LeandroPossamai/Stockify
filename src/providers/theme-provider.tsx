'use client'

import { useIsMounted } from '@/hooks/use-is-mounted'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { UseMediaQueryResponse, useMediaQuery } from '@/hooks/use-media-query'
import { ReactNode, createContext, useEffect, useMemo } from 'react'

export const defaultThemes = ['light', 'dark'] as const
export type Theme = (typeof defaultThemes)[number] | (string & {})
export type ThemeWithSystem = Theme | 'system'
export type SystemTheme = UseMediaQueryResponse['systemTheme']

export interface ThemeContextProps {
  theme: {
    list: Theme[]
    selected: Theme
    system: boolean
    set(theme: ThemeWithSystem): void
  }
}

export interface ThemeProviderProps {
  children: ReactNode
  additionalThemes?: string[]
}

export const ThemeContext = createContext({} as ThemeContextProps)

export function ThemeProvider({ children, additionalThemes = [] }: ThemeProviderProps) {
  const isMounted = useIsMounted()
  const { systemTheme } = useMediaQuery()
  const [theme, setTheme, removeStoredTheme] = useLocalStorage<ThemeWithSystem>('theme', 'system')
  const isSystem = theme === 'system'
  const themes = useMemo(() => [...defaultThemes, ...additionalThemes], [additionalThemes])

  useEffect(() => {
    document.documentElement.classList.remove(...themes)
    const selectedTheme = theme === 'system' ? systemTheme : theme

    if (themes.includes(selectedTheme)) {
      document.documentElement.classList.add(selectedTheme)
      setTheme(theme)
    } else {
      removeStoredTheme()
    }
  }, [theme, systemTheme, themes, setTheme, removeStoredTheme])

  return (
    <ThemeContext.Provider
      value={{
        theme: {
          list: themes,
          selected: isSystem ? systemTheme : theme,
          system: isSystem,
          set: setTheme
        }
      }}
    >
      {isMounted && children}
    </ThemeContext.Provider>
  )
}
