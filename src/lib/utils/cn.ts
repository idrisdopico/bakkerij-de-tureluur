import { type ClassValue, clsx } from 'clsx';

/**
 * Merges class names, filtering out falsy values.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(...inputs);
}
