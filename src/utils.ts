/**
 * Utility Functions
 * 
 * These are simple pure functions used to demonstrate basic testing.
 * Pure functions are the easiest to test because:
 * - Same input always produces same output
 * - No side effects
 * - No dependencies on external state
 */

/**
 * Adds two numbers together
 * 
 * @param a - First number
 * @param b - Second number
 * @returns Sum of a and b
 * 
 * @example
 * add(2, 3) // returns 5
 */
export function add(a: number, b: number): number {
  return a + b;
}

/**
 * Subtracts second number from first
 * 
 * @param a - Number to subtract from
 * @param b - Number to subtract
 * @returns Difference of a and b
 */
export function subtract(a: number, b: number): number {
  return a - b;
}

/**
 * Multiplies two numbers
 * 
 * @param a - First number
 * @param b - Second number
 * @returns Product of a and b
 */
export function multiply(a: number, b: number): number {
  return a * b;
}

/**
 * Extracts error message from various error types
 * 
 * This function handles different error formats:
 * - Error instances (standard errors)
 * - String errors
 * - Objects with message property
 * - Unknown errors
 * 
 * @param error - Error of unknown type
 * @returns Error message as string
 * 
 * @example
 * getErrorMessage(new Error("Failed")) // returns "Failed"
 * getErrorMessage("Something went wrong") // returns "Something went wrong"
 * getErrorMessage({ message: "Bad request" }) // returns "Bad request"
 * getErrorMessage(null) // returns "Unknown error"
 */
export function getErrorMessage(error: unknown): string {
  // Handle Error instances (most common)
  if (error instanceof Error) {
    return error.message;
  }

  // Handle string errors
  if (typeof error === "string") {
    return error;
  }

  // Handle objects with message property
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }

  // Fallback for unknown error types
  return "Unknown error";
}

/**
 * Checks if a string is a valid email address
 * 
 * This is a simple validation, not production-ready.
 * In real applications, use a proper validation library like Joi or Zod.
 * 
 * @param email - String to validate
 * @returns True if valid email format
 * 
 * @example
 * isValidEmail("user@example.com") // returns true
 * isValidEmail("invalid") // returns false
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Capitalizes first letter of a string
 * 
 * @param str - String to capitalize
 * @returns String with first letter capitalized
 * 
 * @example
 * capitalize("hello") // returns "Hello"
 * capitalize("WORLD") // returns "WORLD"
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
