export type Dict<T = any> = Record<string, T>

export const isDev = process.env.NODE_ENV !== 'production'
export const isTest = process.env.NODE_ENV === 'test'
export const isServer = typeof window === 'undefined'

export const isArray = <T>(value: any): value is Array<T> => Array.isArray(value)

export const isEmptyArray = (value: any) => !isArray(value) || value.length === 0

export const isObject = (value: any): value is Dict => value !== null && !isArray(value) && typeof value === 'object'

export const isFunction = <T extends Function = Function>(value: any): value is T => typeof value === 'function'

export const isNumeric = (value?: string | number) => value !== '' && value !== null && !isNaN(Number(value))
