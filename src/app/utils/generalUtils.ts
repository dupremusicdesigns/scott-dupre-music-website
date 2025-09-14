/**
 * Checks if the given value is an object and not null or an array.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is an object, not null, and not an array.
 * @typeParam Record<string, unknown> - Type guard to narrow the type to an object with string keys.
 */
export const isObject = ( value: unknown ): value is Record<string, unknown> => {
    return typeof value === 'object' && value != null && !Array.isArray( value );
};
