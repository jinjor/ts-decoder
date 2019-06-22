interface Decoder<T> {
  run(value: unknown): T;
}

export const bool: Decoder<boolean> = {
  run(value: unknown) {
    if (typeof value !== "boolean") {
      throw new Error(value + " is not a boolean!");
    }
    return value;
  }
};

export const number: Decoder<number> = {
  run(value: unknown) {
    if (typeof value !== "number") {
      throw new Error(value + " is not a nubmer!");
    }
    return value;
  }
};

export const string: Decoder<string> = {
  run(value: unknown) {
    if (typeof value !== "string") {
      throw new Error(value + " is not a string!");
    }
    return value;
  }
};

export function optional<T>(d: Decoder<T>): Decoder<T> {
  return {
    run(value: unknown) {
      if (value === null || value === undefined) {
        return value;
      }
      return d.run(value);
    }
  };
}

export function array<T>(d: Decoder<T>): Decoder<T[]> {
  return {
    run(value: unknown) {
      if (!Array.isArray(value)) {
        throw new Error(value + " is not an array!");
      }
      return value.map(d.run.bind(d));
    }
  };
}

export function object<T>(d: { [K in keyof T]: Decoder<T[K]> }): Decoder<T> {
  return {
    run(value: unknown): T {
      if (typeof value !== "object" || value === null) {
        throw new Error(value + " is not an object!");
      }
      const ret: any = {};
      for (const key in d) {
        ret[key] = d[key].run((value as any)[key]);
      }
      return ret;
    }
  };
}
