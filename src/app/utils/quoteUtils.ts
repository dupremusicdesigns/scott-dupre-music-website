import {
    QUOTE_BASE_PATH
    , QUOTE_GRANT_STORAGE_PREFIX
} from '../constants/quoteConstants';
import type { QuoteView } from '../types';

type StoredGrant = {
    grant: string;
    expiresAt: number;
};

export const getQuoteToken = ( pathname: string ): string => {
    const [ , base, token ] = pathname.split( '/' );

    if ( `/${ base }` !== QUOTE_BASE_PATH || !token ) {
        return '';
    }

    try {
        return decodeURIComponent( token );
    } catch {
        return '';
    }
};

export const formatMoney = ( value: number ): string => {
    const hasCents = !Number.isInteger( value );

    return new Intl.NumberFormat( 'en-US', {
        style: 'currency'
        , currency: 'USD'
        , minimumFractionDigits: hasCents ? 2 : 0
        , maximumFractionDigits: 2
    } ).format( value );
};

export const formatQuoteDate = ( value: string ): string => {
    const date = new Date( `${ value.slice( 0, 10 ) }T00:00:00` );

    return Number.isNaN( date.getTime() )
        ? value
        : date.toLocaleDateString( 'en-US', {
            month: 'short'
            , day: 'numeric'
            , year: 'numeric'
        } );
};

export const normalizePin = ( value: string ): string => value.replace( /\D/g, '' );

export const calculateQuoteTotal = (
    quote: QuoteView
    , selectedIds: ReadonlySet<string>
): number => {
    const base = quote.items.reduce( ( sum, item ) => sum + item.amount, 0 );
    const extras = quote.options
        .filter( option => selectedIds.has( option.id ) )
        .reduce( ( sum, option ) => sum + option.price, 0 );

    return base + extras;
};

export const readStoredGrant = ( token: string ): string => {
    try {
        const raw = window.sessionStorage.getItem( `${ QUOTE_GRANT_STORAGE_PREFIX }${ token }` );
        const stored = raw ? JSON.parse( raw ) as StoredGrant : null;

        return stored && stored.expiresAt > Date.now() ? stored.grant : '';
    } catch {
        return '';
    }
};

export const storeGrant = ( token: string, grant: StoredGrant ): void => {
    try {
        window.sessionStorage.setItem(
            `${ QUOTE_GRANT_STORAGE_PREFIX }${ token }`
            , JSON.stringify( grant )
        );
    } catch {
        return;
    }
};

export const clearGrant = ( token: string ): void => {
    try {
        window.sessionStorage.removeItem( `${ QUOTE_GRANT_STORAGE_PREFIX }${ token }` );
    } catch {
        return;
    }
};
