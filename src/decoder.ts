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
