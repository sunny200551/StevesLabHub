import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAssetPath(path: string) {
  // This function constructs the correct path for assets (like PDFs)
  // to work both in local development and on GitHub Pages.
  if (path.startsWith('http')) {
    return path;
  }
  
  // In production, Next.js automatically handles the base path for assets in the public folder.
  // We just need to ensure the path starts with a forward slash.
  return path.startsWith('/') ? path : `/${path}`;
}
