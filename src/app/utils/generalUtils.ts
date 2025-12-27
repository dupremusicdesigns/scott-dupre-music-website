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

export const sortMarchingShows = ( shows: MarchingShow[] ): MarchingShow[] => {
    return [ ...shows ].sort( ( a, b ) => {
        const aPriority = a.priorityWeight ?? Infinity;
        const bPriority = b.priorityWeight ?? Infinity;

        if ( aPriority !== bPriority ) return aPriority - bPriority;

        const aIsNew = a.isNew ?? false;
        const bIsNew = b.isNew ?? false;

        if ( aIsNew !== bIsNew ) return aIsNew ? -1 : 1;

        return a.showTitle.localeCompare( b.showTitle );
    } );
};
