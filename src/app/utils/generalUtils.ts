import {
    MarchingShow
    , ShowSection
} from '../types';

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

export type CategoryItem = {
    sectionName: string;
    composer: string | null;
    audioUrl: string | null;
}

export type CategorizedSections = {
    intros: CategoryItem[];
    openers: CategoryItem[];
    ballads: CategoryItem[];
    closers: CategoryItem[];
}

type SectionWithMeta = {
    sectionName: string;
    composer: string | null;
    audioUrl: string;
    type: ShowSection[ 'type' ];
}

export const groupShowsBySection = ( shows: MarchingShow[] ): CategorizedSections => {
    const sectionsWithAudio: SectionWithMeta[] = [];

    shows.forEach( show => {
        show.showSections?.forEach( section => {
            if ( section.audioFile?.url && section.type ) {
                sectionsWithAudio.push( {
                    sectionName: stripPartPrefix( section.sectionName )
                    , composer: section.composer || null
                    , audioUrl: section.audioFile.url
                    , type: section.type
                } );
            }
        } );
    } );

    const groupByAudioAndType = ( sections: SectionWithMeta[] ): CategoryItem[] => {
        const audioGroups = new Map<string, SectionWithMeta[]>();

        sections.forEach( section => {
            const existing = audioGroups.get( section.audioUrl ) || [];
            audioGroups.set( section.audioUrl, [ ...existing, section ] );
        } );

        return Array.from( audioGroups.entries() ).map( ( [ audioUrl, grouped ] ) => {
            const sectionName = grouped.length > 1
                ? grouped.map( s => s.sectionName ).join( ' & ' )
                : grouped[ 0 ].sectionName;

            const composers = [ ...new Set( grouped.map( s => s.composer ).filter( Boolean ) ) ];
            const composer = composers.length > 0 ? composers.join( ' & ' ) : null;

            return {
                sectionName
                , composer
                , audioUrl
            };
        } );
    };

    const intros = sectionsWithAudio.filter( s => s.type === 'intro' );
    const openers = sectionsWithAudio.filter( s => s.type === 'opener' );
    const ballads = sectionsWithAudio.filter( s => s.type === 'ballad' );
    const closers = sectionsWithAudio.filter( s => s.type === 'closer' );

    const sortByName = ( a: CategoryItem, b: CategoryItem ) =>
        a.sectionName.localeCompare( b.sectionName );

    return {
        intros: groupByAudioAndType( intros ).sort( sortByName )
        , openers: groupByAudioAndType( openers ).sort( sortByName )
        , ballads: groupByAudioAndType( ballads ).sort( sortByName )
        , closers: groupByAudioAndType( closers ).sort( sortByName )
    };
};

export type GroupedAudioTrack = {
    id: number;
    partLabel: string;
    trackName: string;
    audioUrl: string;
}

export const groupSectionsByAudio = ( sections: ShowSection[] ): GroupedAudioTrack[] => {
    const sectionsWithAudio = sections.filter( section => section.audioFile?.url );

    const audioGroups = new Map<string, ShowSection[]>();

    sectionsWithAudio.forEach( ( section, index ) => {
        const audioUrl = section.audioFile!.url;
        const existing = audioGroups.get( audioUrl ) || [];

        audioGroups.set( audioUrl, [ ...existing, {
            ...section
            , partNumber: section.partNumber ?? index + 1
        } ] );
    } );

    return Array.from( audioGroups.entries() ).map( ( [ audioUrl, groupedSections ] ) => {
        const partNumbers = groupedSections
            .map( s => s.partNumber! )
            .sort( ( a, b ) => a - b );

        const partLabel = partNumbers.length > 1
            ? `PART ${ partNumbers.join( ' & ' ) }`
            : `PART ${ partNumbers[ 0 ] }`;

        const trackName = groupedSections.length > 1
            ? groupedSections.map( s => s.sectionName ).join( ' & ' )
            : groupedSections[ 0 ].sectionName;

        return {
            id: groupedSections[ 0 ].id
            , partLabel
            , trackName
            , audioUrl
        };
    } );
};
