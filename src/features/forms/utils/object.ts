/**
 * Creates a nested object from an array of keys, assigning the provided default value
 * to the deepest key.
 *
 * @example
 * ```ts
 * createNestedObject(["user", "profile", "name"], "John Doe");
 * // Returns: { user: { profile: { name: "John Doe" } } }
 * ```
 *
 * @template TValue - The type of the default value.
 * @param keys - An array of keys representing the path for the nested object.
 * @param defaultValue - The value to assign at the deepest level.
 * @returns A nested object structure.
 */
export const createNestedObject = <TValue>(
  keys: string[],
  defaultValue: TValue,
): any => {
  return keys.reduceRight<Record<string, unknown>>(
    (acc, key) => ({ [key]: acc }),
    defaultValue as any,
  )
}

/**
 * Converts a dot/bracket notation string into an array of path segments.
 *
 * This function is useful for handling nested object paths, such as:
 * - `"customer.address[0].street"` → `["customer", "address", "0", "street"]`
 * - `"user['profile'].name"` → `["user", "profile", "name"]`
 *
 * @param input - The path string to convert.
 * @returns An array of string path segments.
 */
export const stringToPath = (input: string): string[] =>
  input
    .replace(/["|']|\]/g, '')
    .split(/\.|\[/)
    .filter(Boolean)

/**
 * Safely retrieves a nested value from an object using a string path.
 *
 * This function supports dot (`.`) and bracket (`[]`) notation for accessing deep properties.
 * If the path is invalid or the value is `undefined`, a default value is returned.
 *
 * @example
 * ```ts
 * const data = { user: { profile: { name: "John Doe" } } };
 * getValue(data, "user.profile.name"); // "John Doe"
 * getValue(data, "user.profile.age", 30); // 30 (default)
 * ```
 *
 * @template T - The object type.
 * @template TResult - The expected return type.
 * @param object - The object to retrieve the value from.
 * @param path - A string representing the path to the nested property.
 * @param defaultValue - A fallback value if the property is not found.
 * @returns The retrieved value or the default value.
 */
export const getValue = <T extends object, TResult = unknown>(
  object?: T,
  path?: string | null,
  defaultValue?: TResult,
): TResult | undefined => {
  if (!path || typeof object !== 'object' || object === null) {
    return defaultValue
  }

  const result = path
    .replace(/["|']|\]/g, '')
    .split(/\.|\[/)
    .filter(Boolean)
    .reduce(
      (acc: any, key) =>
        acc && typeof acc === 'object' ? acc[key as keyof T] : undefined,
      object,
    )

  return result === undefined ? defaultValue : (result as TResult)
}
