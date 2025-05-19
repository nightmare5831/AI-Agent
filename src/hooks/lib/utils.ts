import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string): string => {
  if (!name) return '';

  const nameParts: string[] = name.split(' ').filter((part) => part.length > 0);

  const initials: string = nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

  return initials;
};

export const capitalizeFirst = (str: string) => {
  if (!str) return '';

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
