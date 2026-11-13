import {
    containsLink
    , normalizeLine
    , normalizeMessage
} from './leadGuards';

export type ShowInquiry = {
    name: string;
    school: string;
    email: string;
    movement1: string;
    movement2: string;
    movement3: string;
    extra: string;
    vision: string;
    contactTime: string;
};

export type ShowInquiryField = keyof ShowInquiry;

export type ShowInquiryParse =
    | {
        ok: true;
        values: ShowInquiry;
    }
    | {
        ok: false;
        field: ShowInquiryField;
        error: string;
    };

const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LINK_ERROR = 'Please leave links out of the form. Reply to the confirmation email if you want to share one.';

const readText = (
    source: Record<string, unknown>
    , key: string
    , normalize: ( text: string ) => string = normalizeLine
): string => {
    const value = source[ key ];

    return typeof value === 'string' ? normalize( value ) : '';
};

const requiredLines: [ ShowInquiryField, string ][] = [
    [ 'name', 'Enter your name.' ]
    , [ 'school', 'Enter your school name.' ]
    , [ 'movement1', 'Enter your first movement selection.' ]
    , [ 'movement2', 'Enter your second movement selection.' ]
    , [ 'movement3', 'Enter your third movement selection.' ]
];

export const parseShowInquiry = ( source: Record<string, unknown> ): ShowInquiryParse => {
    const values: ShowInquiry = {
        name: readText( source, 'name' )
        , school: readText( source, 'school' )
        , email: readText( source, 'email' )
        , movement1: readText( source, 'movement1' )
        , movement2: readText( source, 'movement2' )
        , movement3: readText( source, 'movement3' )
        , extra: readText( source, 'extra' )
        , vision: readText( source, 'vision', normalizeMessage )
        , contactTime: readText( source, 'contactTime' )
    };

    const linkField = ( Object.keys( values ) as ShowInquiryField[] )
        .find( field => field !== 'email' && containsLink( values[ field ] ) );

    if ( linkField ) {
        return {
            ok: false
            , field: linkField
            , error: LINK_ERROR
        };
    }

    for ( const [ field, error ] of requiredLines ) {
        if ( !values[ field ] || values[ field ].length > 200 ) {
            return {
                ok: false
                , field
                , error
            };
        }
    }

    if ( !EMAIL_SHAPE.test( values.email ) || values.email.length > 254 ) {
        return {
            ok: false
            , field: 'email'
            , error: 'Enter a valid email address.'
        };
    }

    if ( values.extra.length > 200 ) {
        return {
            ok: false
            , field: 'extra'
            , error: 'Keep the additional selection under 200 characters.'
        };
    }

    if ( !values.vision || values.vision.length > 5000 ) {
        return {
            ok: false
            , field: 'vision'
            , error: values.vision ? 'Keep this under 5,000 characters.' : 'Share a little about your vision.'
        };
    }

    if ( values.contactTime.length > 200 ) {
        return {
            ok: false
            , field: 'contactTime'
            , error: 'Keep this under 200 characters.'
        };
    }

    return {
        ok: true
        , values
    };
};
