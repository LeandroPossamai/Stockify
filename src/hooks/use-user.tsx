import { UserContext } from '@/providers/user-provider'
import { useContext } from 'react'

export function useUser() {
  return useContext(UserContext)
}
