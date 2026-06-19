import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const focusVisibleClassName =
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current';
