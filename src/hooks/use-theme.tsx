import { ThemeContext } from '@/providers/theme-provider'
import { useContext } from 'react'

export function useTheme() {
  const { theme } = useContext(ThemeContext)
  return theme
}
