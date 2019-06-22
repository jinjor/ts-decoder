import "jest";
import { bool, number, string, optional, array, object } from "../src/decoder";

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

test("optional decoder", () => {
  for (const value of ["", null, undefined]) {
    expect(optional(string).run(value)).toBe(value);
  }
  for (const value of [true, 1, {}, []]) {
    expect(() => optional(string).run(value)).toThrow();
  }
});

test("array decoder", () => {
  for (const value of [[], [1], [0, 1]]) {
    expect(array(number).run(value)).toEqual(value);
  }
  for (const value of [true, 1, "", {}, null, undefined]) {
    expect(() => array(number).run(value)).toThrow();
  }
});

test("object decoder", () => {
  const decoder = object({
    n: number,
    s: string
  });
  for (const value of [{ n: 1, s: "" }]) {
    expect(decoder.run(value)).toEqual(value);
  }
  for (const value of [
    true,
    1,
    "",
    null,
    undefined,
    { n: 1 },
    { s: "" },
    { n: "", s: "" },
    { n: 1, s: 1 },
    { n: 1, s: null },
    { n: null, s: "" }
  ]) {
    expect(() => decoder.run(value)).toThrow();
  }
});
