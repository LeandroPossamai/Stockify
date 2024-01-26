import { LiteralUnion } from 'react-hook-form'

import { CookieAttr } from 'cookies'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

import { tryParseJSON } from './object'

export type Cookie = LiteralUnion<'callbackUrl' | 'idToken', string>
export type CookieOptions = CookieAttr
export type RequestCookie = {
  name: Cookie
  value: any
}

export const defaultCookieOptions: CookieOptions = {
  path: '/',
  secure: true,
  sameSite: 'strict'
}

export function cookies(): RequestCookie[] {
  const cookies = parseCookies()
  return Object.entries(cookies || {}).map(([name, value]) => ({ name, value: tryParseJSON(value) }))
}

function set(name: Cookie, value: any, options: CookieOptions = {}) {
  if (!options.expires) {
    defaultCookieOptions.maxAge = 60 * 60 * 24 * 30 // Default to 30 days
  }

  return setCookie(undefined, name, typeof value === 'string' ? value : JSON.stringify(value), {
    ...defaultCookieOptions,
    ...options
  })
}

function get(name: Cookie) {
  return cookies().find(cookie => cookie.name === name)?.value
}

function destroy(name: Cookie) {
  return destroyCookie(undefined, name)
}

cookies.set = set
cookies.get = get
cookies.delete = destroy
