import "jest";
import { bool, number, string } from "../src/decoder";

test("boolean decoder", () => {
  for (const value of [true, false]) {
    expect(bool.run(value)).toBe(value);
  }
  for (const value of [1, "", {}, [], null, undefined]) {
    expect(() => bool.run(value)).toThrow();
  }
});
test("number decoder", () => {
  for (const value of [-1, 0, 1, Infinity, -Infinity]) {
    expect(number.run(value)).toBe(value);
  }
  for (const value of [true, "", {}, [], null, undefined]) {
    expect(() => number.run(value)).toThrow();
  }
});

test("string decoder", () => {
  for (const value of [""]) {
    expect(string.run(value)).toBe(value);
  }
  for (const value of [true, 1, {}, [], null, undefined]) {
    expect(() => string.run(value)).toThrow();
  }
});
