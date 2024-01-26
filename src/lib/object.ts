import { isArray, isObject } from './assertions'

export function tryParseJSON(value: any): any {
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

export function areObjectsEqual(original: any, current: any): boolean {
  if (Array.isArray(original) && Array.isArray(current)) {
    if (original.length !== current.length) {
      return false
    }

    for (let i = 0; i < original.length; i++) {
      if (!areObjectsEqual(original[i], current[i])) {
        return false
      }
    }

    return true
  }

  if (typeof original !== 'object' || typeof current !== 'object' || original === null || current === null) {
    return original === current
  }

  const originalKeys = Object.keys(original)
  const currentKeys = Object.keys(current)

  // Check if the number of keys is different
  if (originalKeys.length !== currentKeys.length) {
    return false
  }

  // Check if each key and its corresponding value has changed
  for (const key of originalKeys) {
    const originalValue = original[key]
    const currentValue = current[key]

    if (currentValue === undefined || typeof originalValue !== typeof currentValue) {
      return false
    }

    if (!areObjectsEqual(originalValue, currentValue)) {
      return false
    }
  }

  return true
}

export function groupBy<T extends { [key: string]: any }, K extends keyof T>(
  array: T[],
  key: K,
  // eslint-disable-next-line no-unused-vars
  initialValue: { [key in T[K]]?: T[] } = {},
  defaultKey?: T[K]
  // eslint-disable-next-line no-unused-vars
): { [key in T[K]]?: T[] } {
  return array.reduce((acc, value) => {
    const keyValue = value[key] || defaultKey!
    acc[keyValue] = acc[keyValue] ?? []
    acc[keyValue]?.push(value)
    return acc
  }, initialValue)
}

export function find<T, K extends keyof T>(array: T[], key: K, value?: T[K] | null) {
  return array.find(item => item[key] === value)
}

export function len(value?: any) {
  if (isArray(value) || typeof value === 'string') {
    return value.length
  }
  if (isObject(value)) {
    return Object.keys(value).length
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size
  }
  return 0
}
