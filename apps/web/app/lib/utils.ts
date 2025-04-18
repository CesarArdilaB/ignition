import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Helper function to create a JSON Response.
 * @param data The data to serialize as JSON.
 * @param init Optional ResponseInit options (e.g., status, headers).
 * @returns A Response object with JSON body.
 */
export function jsonResponse<T>(data: T, init?: ResponseInit): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
    },
  });
}
