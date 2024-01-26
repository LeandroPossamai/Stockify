import { env } from '@/env'
import { cookies } from '@/lib/cookies'
import axios from 'axios'

export const api = getApiClient()

export function getApiClient() {
  const idToken = cookies.get('idToken')

  const api = axios.create({
    baseURL: env.NEXT_PUBLIC_API_BASE_URL
  })

  if (idToken) {
    api.defaults.headers.Authorization = idToken
  }

  return api
}
