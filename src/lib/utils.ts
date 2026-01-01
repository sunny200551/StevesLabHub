
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/StevesLabHub' : '';

export function getAssetPath(path: string) {
  if (path.startsWith('http')) {
    return path;
  }
  // Ensure the path starts with a single slash
  return `${basePath}${path.startsWith('/') ? '' : '/'}${path}`;
}
