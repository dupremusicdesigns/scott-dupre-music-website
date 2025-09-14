/**
 * Validates query parameter string format at compile time.
 *
 * Enforces: `key=value` or `key=value&key2=value2` patterns
 * Rejects: empty keys/values, spaces in keys, unescaped &/= in values
 *
 * @example
 * ```ts
 * const valid: QueryParams<'page=1&limit=10'> = 'page=1&limit=10'; // ✓
 * const invalid: QueryParams<'page='> = 'page='; // ✗ Type error
 * ```
 */
export type QueryParams<T extends string> = ValidQueryString<T> extends never
    ? 'Invalid query string format'
    : T;

///// HELPERS /////
type ValidParam<T extends string> =
    T extends `${ string } ${ string }`
        ? false
        : T extends `${ string }=${ string }`
            ? false
            : T extends `${ string }&${ string }`
                ? false
                : T extends ''
                    ? false
                    : true;

type ValidParamValue<T extends string> =
    T extends `${ string }&${ string }`
        ? false
        : T extends `${ string }=${ string }`
            ? false
            : T extends ''
                ? false
                : true;

type ValidQueryString<T extends string> =
    T extends `${ infer Param }=${ infer Value }&${ infer Rest }`
        ? ValidParam<Param> extends true
            ? ValidParamValue<Value> extends true
                ? ValidQueryString<Rest>
                : never
            : never
        : T extends `${ infer Param }=${ infer Value }`
            ? ValidParam<Param> extends true
                ? ValidParamValue<Value> extends true
                    ? T
                    : never
                : never
                : T extends ''
                    ? T
                    : never;
