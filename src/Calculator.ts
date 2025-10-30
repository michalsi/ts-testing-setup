/**
 * Calculator Class
 * 
 * A simple calculator class that demonstrates:
 * - Class-based testing
 * - State management
 * - Method chaining
 * - Error handling
 * - Using beforeEach for test setup
 */

export class Calculator {
  private value: number;

  /**
   * Creates a new Calculator instance
   * 
   * @param initialValue - Starting value (default: 0)
   */
  constructor(initialValue: number = 0) {
    this.value = initialValue;
  }

  /**
   * Adds a number to the current value
   * 
   * @param n - Number to add
   * @returns This calculator instance (for chaining)
   */
  add(n: number): this {
    this.value += n;
    return this;
  }

  /**
   * Subtracts a number from the current value
   * 
   * @param n - Number to subtract
   * @returns This calculator instance (for chaining)
   */
  subtract(n: number): this {
    this.value -= n;
    return this;
  }

  /**
   * Multiplies the current value by a number
   * 
   * @param n - Number to multiply by
   * @returns This calculator instance (for chaining)
   */
  multiply(n: number): this {
    this.value *= n;
    return this;
  }

  /**
   * Divides the current value by a number
   * 
   * @param n - Number to divide by
   * @returns This calculator instance (for chaining)
   * @throws Error if attempting to divide by zero
   */
  divide(n: number): this {
    if (n === 0) {
      throw new Error("Division by zero");
    }
    this.value /= n;
    return this;
  }

  /**
   * Gets the current value
   * 
   * @returns Current calculator value
   */
  getValue(): number {
    return this.value;
  }

  /**
   * Resets the calculator to zero
   */
  reset(): void {
    this.value = 0;
  }

  /**
   * Sets the calculator to a specific value
   * 
   * @param n - New value
   * @returns This calculator instance (for chaining)
   */
  setValue(n: number): this {
    this.value = n;
    return this;
  }

  /**
   * Checks if the current value is even
   * 
   * @returns True if value is even
   */
  isEven(): boolean {
    return this.value % 2 === 0;
  }

  /**
   * Checks if the current value is positive
   * 
   * @returns True if value is greater than zero
   */
  isPositive(): boolean {
    return this.value > 0;
  }
}
