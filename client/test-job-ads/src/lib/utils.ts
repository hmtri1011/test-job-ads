import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getStorage = (key: string) => {
  return localStorage.getItem(key)
}

export const setStorage = (key: string, value: string) => {
  return localStorage.setItem(key, value)
}

export const removeStorage = (key: string) => {
  return localStorage.removeItem(key)
}
