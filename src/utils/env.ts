/**
 * Returns value of process evnironment variable as string
 * @param key - key of process evnironment variable
 * @returns value of process evnironment variable as string
 */
export function env(key: string): string {
  return process.env[key] as string ;
}