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
