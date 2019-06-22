import "jest";
import { bool, number } from "../src/decoder";

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
  for (const value of ["", {}, [], null, undefined]) {
    expect(() => number.run(value)).toThrow();
  }
});
