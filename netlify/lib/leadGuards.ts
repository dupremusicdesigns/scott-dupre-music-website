const LINK_PATTERN = /(https?:\/\/|ftp:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|edu|info|biz|io|co|us|ru|cn|xyz|top|shop|site|online|click|link)\b)/i;

export const MIN_FILL_MILLISECONDS = 3000;

export const containsLink = ( text: string ): boolean => LINK_PATTERN.test( text );

const isHiddenCharacter = ( code: number ): boolean => {
    return ( code >= 0x200B && code <= 0x200F )
        || ( code >= 0x202A && code <= 0x202E )
        || code === 0x2060
        || code === 0xFEFF;
};

const isControlCharacter = ( code: number ): boolean => code < 0x20 || code === 0x7F;

const replaceCharacters = (
    text: string
    , replace: ( character: string, code: number ) => string
): string => {
    return Array.from( text )
        .map( character => replace( character, character.codePointAt( 0 ) ?? 0 ) )
        .join( '' );
};

export const normalizeLine = ( text: string ): string => {
    return replaceCharacters( text, ( character, code ) => {
        return isControlCharacter( code ) || isHiddenCharacter( code ) ? ' ' : character;
    } )
        .replace( /\s+/g, ' ' )
        .trim();
};

export const normalizeMessage = ( text: string ): string => {
    return replaceCharacters( text.replace( /\r\n?/g, '\n' ), ( character, code ) => {
        if ( character === '\n' || character === '\t' ) {
            return character;
        }

        return isControlCharacter( code ) || isHiddenCharacter( code ) ? '' : character;
    } )
        .replace( /\n{3,}/g, '\n\n' )
        .trim();
};

export const isSameOrigin = ( request: Request ): boolean => {
    const origin = request.headers.get( 'Origin' );

    if ( !origin ) {
        return false;
    }

    try {
        return new URL( origin ).host === new URL( request.url ).host;
    } catch {
        return false;
    }
};

export const filledTooFast = ( elapsed: unknown ): boolean => {
    return typeof elapsed !== 'number' || !Number.isFinite( elapsed ) || elapsed < MIN_FILL_MILLISECONDS;
};
