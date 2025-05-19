import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const themes = {
  light: "Light",
  dark: "Dark",
  system: "System"
} as const

export type Theme = keyof typeof themes