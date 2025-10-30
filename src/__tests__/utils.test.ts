/**
 * Unit Tests for Utility Functions
 *
 * These tests demonstrate:
 * - Testing pure functions
 * - Using describe and test blocks
 * - Jest matchers (toBe, toEqual, toThrow, etc.)
 * - Testing edge cases
 * - Testing error handling
 */

import {
  add,
  subtract,
  multiply,
  getErrorMessage,
  isValidEmail,
  capitalize,
} from "../utils";

describe("Math Utilities", () => {
  describe("add", () => {
    test("adds two positive numbers", () => {
      expect(add(2, 3)).toBe(5);
    });

    test("adds negative numbers", () => {
      expect(add(-2, -3)).toBe(-5);
    });

    test("adds positive and negative numbers", () => {
      expect(add(5, -3)).toBe(2);
    });

    test("adds zero", () => {
      expect(add(5, 0)).toBe(5);
      expect(add(0, 5)).toBe(5);
    });

    test("adds decimal numbers", () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3); // Use toBeCloseTo for floats
    });
  });

  describe("subtract", () => {
    test("subtracts two positive numbers", () => {
      expect(subtract(5, 3)).toBe(2);
    });

    test("subtracts negative numbers", () => {
      expect(subtract(-5, -3)).toBe(-2);
    });

    test("subtracts to get negative result", () => {
      expect(subtract(3, 5)).toBe(-2);
    });

    test("subtracts zero", () => {
      expect(subtract(5, 0)).toBe(5);
    });
  });

  describe("multiply", () => {
    test("multiplies two positive numbers", () => {
      expect(multiply(3, 4)).toBe(12);
    });

    test("multiplies by zero", () => {
      expect(multiply(5, 0)).toBe(0);
    });

    test("multiplies negative numbers", () => {
      expect(multiply(-3, -4)).toBe(12);
      expect(multiply(-3, 4)).toBe(-12);
    });

    test("multiplies by one", () => {
      expect(multiply(5, 1)).toBe(5);
    });
  });
});

describe("getErrorMessage", () => {
  test("extracts message from Error instance", () => {
    const error = new Error("Something went wrong");
    expect(getErrorMessage(error)).toBe("Something went wrong");
  });

  test("returns string error as-is", () => {
    expect(getErrorMessage("Error string")).toBe("Error string");
  });

  test("extracts message from object with message property", () => {
    const error = { message: "Custom error" };
    expect(getErrorMessage(error)).toBe("Custom error");
  });

  test("returns default message for unknown error types", () => {
    expect(getErrorMessage(null)).toBe("Unknown error");
    expect(getErrorMessage(undefined)).toBe("Unknown error");
    expect(getErrorMessage(123)).toBe("Unknown error");
    expect(getErrorMessage({})).toBe("Unknown error");
  });

  test("handles object with non-string message", () => {
    const error = { message: 404 };
    expect(getErrorMessage(error)).toBe("404");
  });
});

describe("isValidEmail", () => {
  test("validates correct email formats", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("test.user@example.co.uk")).toBe(true);
    expect(isValidEmail("user+tag@example.com")).toBe(true);
  });

  test("rejects invalid email formats", () => {
    expect(isValidEmail("invalid")).toBe(false);
    expect(isValidEmail("@example.com")).toBe(false);
    expect(isValidEmail("user@")).toBe(false);
    expect(isValidEmail("user @example.com")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });

  test("rejects email without domain", () => {
    expect(isValidEmail("user@example")).toBe(false);
  });
});

describe("capitalize", () => {
  test("capitalizes first letter of lowercase string", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  test("leaves already capitalized string unchanged", () => {
    expect(capitalize("Hello")).toBe("Hello");
  });

  test("only capitalizes first letter", () => {
    expect(capitalize("hello world")).toBe("Hello world");
  });

  test("handles empty string", () => {
    expect(capitalize("")).toBe("");
  });

  test("handles single character", () => {
    expect(capitalize("a")).toBe("A");
    expect(capitalize("A")).toBe("A");
  });

  test("handles all uppercase string", () => {
    expect(capitalize("WORLD")).toBe("WORLD");
  });
});
