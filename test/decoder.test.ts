import "jest";
import { bool } from "../src/decoder";

test("boolean decoder", () => {
  for (const value of [true, false]) {
    expect(bool.run(value)).toBe(value);
  }
  for (const value of [1, "", {}, [], null, undefined]) {
    expect(() => bool.run(value)).toThrow();
  }
});
