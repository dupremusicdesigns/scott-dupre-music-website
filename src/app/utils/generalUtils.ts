import { MarchingShow } from '../types';

export const isObject = ( value: unknown ): value is Record<string, unknown> => {
    return typeof value === 'object' && value != null && !Array.isArray( value );
};

/**
 * Creates a URL-friendly slug from a given title string.
 */
export const slugify = ( title: string ): string => {
    return title
        .toLowerCase()
        .replace( /[^a-z0-9\s-]/g, '' )
        .replace( /\s+/g, '-' )
        .replace( /-+/g, '-' )
        .trim();
};

/**
 * Removes a "Part X - " prefix from a given string.
 *
 * This function looks for a pattern starting with "Part" (case-insensitive),
 * optionally followed by numbers (including patterns like "1 & 2" or "1, 2 & 3"),
 * and ending with a hyphen and optional whitespace.
 *
 * @param name - The original string containing the prefix to be removed.
 * @returns The string with the matching prefix removed, or the original string if no match is found.
 *
 * @example
 * stripPartPrefix("Part 1 - Introduction"); // Returns "Introduction"
 * stripPartPrefix("Part 1 & 2 - Medley"); // Returns "Medley"
 * stripPartPrefix("part - Conclusion"); // Returns "Conclusion"
 */
export const stripPartPrefix = ( name: string ): string => {
    return name.replace( /^Part\s*[\d\s,&]*\s*-\s*/i, '' );
};

/**
 * Sorts marching shows based on a multi-level sorting criteria.
 *
 * The sorting priority is as follows:
 * 1. Shows with a year are sorted before shows without a year
 * 2. Among shows with years, they are sorted in descending order by year (newest first)
 * 3. Shows with a priority weight are sorted before shows without a priority weight
 * 4. Among shows with priority weights, they are sorted in ascending order by priority weight
 * 5. Finally, shows are sorted alphabetically by show title using locale-aware comparison
 *
 * @param shows - The array of MarchingShow objects to sort
 * @returns A new sorted array of MarchingShow objects (does not mutate the original array)
 */
export const sortMarchingShows = ( shows: MarchingShow[] ): MarchingShow[] => {
    return [ ...shows ].sort( ( a, b ) => {
        const aHasYear = a.year != null;
        const bHasYear = b.year != null;

        if ( aHasYear !== bHasYear ) return aHasYear ? -1 : 1;

        if ( aHasYear && bHasYear ) {
            if ( a.year !== b.year ) return b.year! - a.year!;
        }

        const aHasPriority = a.priorityWeight != null;
        const bHasPriority = b.priorityWeight != null;

        if ( aHasPriority !== bHasPriority ) return aHasPriority ? -1 : 1;

        if ( aHasPriority && bHasPriority ) {
            if ( a.priorityWeight !== b.priorityWeight ) {
                return a.priorityWeight! - b.priorityWeight!;
            }
        }

        return a.showTitle.localeCompare( b.showTitle );
    } );
};
