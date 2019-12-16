import "jest";
import {
  boolean,
  number,
  string,
  optional,
  array,
  object,
  oneOf,
  map
} from "../src/decoder";

test("boolean decoder", () => {
  const decoder = boolean;
  for (const value of [true, false]) {
    expect(decoder.run(value)).toBe(value);
  }
  for (const value of [1, "", {}, [], null, undefined]) {
    expect(() => decoder.run(value)).toThrow();
  }
});

test("number decoder", () => {
  const decoder = number();
  for (const value of [-1, 0, 1, Infinity, -Infinity]) {
    expect(decoder.run(value)).toBe(value);
  }
  for (const value of [true, "", {}, [], null, undefined]) {
    expect(() => decoder.run(value)).toThrow();
  }
});

test("string decoder", () => {
  const decoder = string();
  for (const value of [""]) {
    expect(decoder.run(value)).toBe(value);
  }
  for (const value of [true, 1, {}, [], null, undefined]) {
    expect(() => decoder.run(value)).toThrow();
  }
});

test("optional decoder", () => {
  const decoder = optional(string());
  for (const value of ["", null, undefined]) {
    expect(decoder.run(value)).toBe(value);
  }
  for (const value of [true, 1, {}, []]) {
    expect(() => decoder.run(value)).toThrow();
  }
});

test("array decoder", () => {
  const decoder = array(number());
  for (const value of [[], [1], [0, 1]]) {
    expect(decoder.run(value)).toEqual(value);
  }
  for (const value of [true, 1, "", {}, null, undefined]) {
    expect(() => decoder.run(value)).toThrow();
  }
});

test("object decoder", () => {
  const decoder = object({
    n: number(),
    s: string()
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

test("oneOf decoder", () => {
  const decoder = oneOf<boolean | number | string[]>([
    boolean,
    number(),
    array(string())
  ]);
  for (const value of [true, 1, [], [""]]) {
    expect(decoder.run(value)).toEqual(value);
  }
  for (const value of ["", null, undefined, [1], {}]) {
    expect(() => decoder.run(value)).toThrow();
  }
});

test("map decoder", () => {
  const f = (n: number) => String(n);
  const decoder = map(f, number());
  for (const value of [1]) {
    expect(decoder.run(value)).toEqual(f(value));
  }
  for (const value of [true, "", null, undefined, [1], {}]) {
    expect(() => decoder.run(value)).toThrow();
  }
});
