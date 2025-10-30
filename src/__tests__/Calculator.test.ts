/**
 * Unit Tests for Calculator Class
 *
 * These tests demonstrate:
 * - Testing class instances
 * - Using beforeEach for test setup
 * - Testing state management
 * - Testing method chaining
 * - Testing error throwing
 * - Organizing tests with describe blocks
 */

import { Calculator } from "../Calculator";

describe("Calculator", () => {
  let calculator: Calculator;

  // Run before each test to get a fresh calculator instance
  beforeEach(() => {
    calculator = new Calculator();
  });

  describe("initialization", () => {
    test("starts with zero as default value", () => {
      expect(calculator.getValue()).toBe(0);
    });

    test("can be initialized with a custom value", () => {
      const calc = new Calculator(10);
      expect(calc.getValue()).toBe(10);
    });
  });

  describe("add", () => {
    test("adds positive numbers", () => {
      calculator.add(5);
      expect(calculator.getValue()).toBe(5);
    });

    test("adds multiple times", () => {
      calculator.add(5).add(3);
      expect(calculator.getValue()).toBe(8);
    });

    test("adds negative numbers", () => {
      calculator.add(-5);
      expect(calculator.getValue()).toBe(-5);
    });

    test("supports method chaining", () => {
      const result = calculator.add(5).add(3).getValue();
      expect(result).toBe(8);
    });
  });

  describe("subtract", () => {
    test("subtracts positive numbers", () => {
      calculator.add(10).subtract(3);
      expect(calculator.getValue()).toBe(7);
    });

    test("can result in negative values", () => {
      calculator.subtract(5);
      expect(calculator.getValue()).toBe(-5);
    });

    test("supports method chaining", () => {
      const result = calculator.add(10).subtract(3).subtract(2).getValue();
      expect(result).toBe(5);
    });
  });

  describe("multiply", () => {
    test("multiplies values", () => {
      calculator.add(5).multiply(3);
      expect(calculator.getValue()).toBe(15);
    });

    test("multiplying by zero gives zero", () => {
      calculator.add(5).multiply(0);
      expect(calculator.getValue()).toBe(0);
    });

    test("handles negative multiplication", () => {
      calculator.add(5).multiply(-2);
      expect(calculator.getValue()).toBe(-10);
    });

    test("supports method chaining", () => {
      const result = calculator.add(2).multiply(3).multiply(2).getValue();
      expect(result).toBe(12);
    });
  });

  describe("divide", () => {
    test("divides values", () => {
      calculator.add(10).divide(2);
      expect(calculator.getValue()).toBe(5);
    });

    test("handles decimal division", () => {
      calculator.add(10).divide(3);
      expect(calculator.getValue()).toBeCloseTo(3.333, 2);
    });

    test("throws error when dividing by zero", () => {
      calculator.add(10);
      expect(() => calculator.divide(0)).toThrow("Division by zero");
    });

    test("supports method chaining", () => {
      const result = calculator.add(20).divide(2).divide(2).getValue();
      expect(result).toBe(5);
    });
  });

  describe("complex operations", () => {
    test("performs chained calculations", () => {
      const result = calculator
        .add(10)
        .multiply(2)
        .subtract(5)
        .divide(3)
        .getValue();
      expect(result).toBeCloseTo(5, 2);
    });

    test("maintains state across operations", () => {
      calculator.add(5);
      expect(calculator.getValue()).toBe(5);

      calculator.multiply(2);
      expect(calculator.getValue()).toBe(10);

      calculator.subtract(3);
      expect(calculator.getValue()).toBe(7);
    });
  });

  describe("reset", () => {
    test("resets value to zero", () => {
      calculator.add(10).multiply(5);
      calculator.reset();
      expect(calculator.getValue()).toBe(0);
    });

    test("can continue operations after reset", () => {
      calculator.add(10);
      calculator.reset();
      calculator.add(5);
      expect(calculator.getValue()).toBe(5);
    });
  });

  describe("setValue", () => {
    test("sets value directly", () => {
      calculator.setValue(42);
      expect(calculator.getValue()).toBe(42);
    });

    test("supports method chaining", () => {
      const result = calculator.setValue(10).add(5).getValue();
      expect(result).toBe(15);
    });
  });

  describe("isEven", () => {
    test("returns true for even numbers", () => {
      calculator.setValue(4);
      expect(calculator.isEven()).toBe(true);
    });

    test("returns false for odd numbers", () => {
      calculator.setValue(5);
      expect(calculator.isEven()).toBe(false);
    });

    test("returns true for zero", () => {
      expect(calculator.isEven()).toBe(true);
    });

    test("handles negative even numbers", () => {
      calculator.setValue(-4);
      expect(calculator.isEven()).toBe(true);
    });
  });

  describe("isPositive", () => {
    test("returns true for positive numbers", () => {
      calculator.setValue(5);
      expect(calculator.isPositive()).toBe(true);
    });

    test("returns false for negative numbers", () => {
      calculator.setValue(-5);
      expect(calculator.isPositive()).toBe(false);
    });

    test("returns false for zero", () => {
      expect(calculator.isPositive()).toBe(false);
    });
  });
});
