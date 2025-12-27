import { MarchingShow } from '../types';

export const isObject = ( value: unknown ): value is Record<string, unknown> => {
    return typeof value === 'object' && value != null && !Array.isArray( value );
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
