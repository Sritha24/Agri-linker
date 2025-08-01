import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parsePrice = (priceString: string): number => {
  if (!priceString) return 0;
  // Removes currency symbols and '/kg' text, then converts to a number
  return parseFloat(priceString.replace(/[^0-9.]/g, ''));
};
