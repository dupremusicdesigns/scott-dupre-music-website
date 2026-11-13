export type LeadInquiry = {
    name: string;
    school: string;
    location: string;
    email: string;
    phone: string;
    service: string;
    message: string;
};

export type LeadInquiryField = keyof LeadInquiry;

export type LeadInquiryParse =
    | {
        ok: true;
        values: LeadInquiry;
    }
    | {
        ok: false;
        field: LeadInquiryField;
        error: string;
    };

import {
    containsLink
    , normalizeLine
    , normalizeMessage
} from './leadGuards';

const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const readText = (
    source: Record<string, unknown>
    , key: string
    , normalize: ( text: string ) => string = normalizeLine
): string => {
    const value = source[ key ];

    return typeof value === 'string' ? normalize( value ) : '';
};

const LINK_ERROR = 'Please leave links out of the form. Reply to the confirmation email if you want to share one.';

export const parseLeadInquiry = ( source: Record<string, unknown> ): LeadInquiryParse => {
    const values: LeadInquiry = {
        name: readText( source, 'name' )
        , school: readText( source, 'school' )
        , location: readText( source, 'location' )
        , email: readText( source, 'email' )
        , phone: readText( source, 'phone' )
        , service: readText( source, 'service' )
        , message: readText( source, 'message', normalizeMessage )
    };

    const linkField = ( [ 'name', 'school', 'location', 'phone', 'service', 'message' ] as const )
        .find( field => containsLink( values[ field ] ) );

    if ( linkField ) {
        return {
            ok: false
            , field: linkField
            , error: LINK_ERROR
        };
    }

    if ( !values.name || values.name.length > 200 ) {
        return {
            ok: false
            , field: 'name'
            , error: 'Enter your name.'
        };
    }

    if ( !values.school || values.school.length > 200 ) {
        return {
            ok: false
            , field: 'school'
            , error: 'Enter your school or organization.'
        };
    }

    if ( !values.location || values.location.length > 200 ) {
        return {
            ok: false
            , field: 'location'
            , error: 'Enter where your school is located.'
        };
    }

    if ( !EMAIL_SHAPE.test( values.email ) || values.email.length > 254 ) {
        return {
            ok: false
            , field: 'email'
            , error: 'Enter a valid email address.'
        };
    }

    if ( values.phone.length > 64 ) {
        return {
            ok: false
            , field: 'phone'
            , error: 'Keep the phone number under 64 characters.'
        };
    }

    if ( !values.service || values.service.length > 200 ) {
        return {
            ok: false
            , field: 'service'
            , error: 'Choose a service.'
        };
    }

    if ( values.message.length > 5000 ) {
        return {
            ok: false
            , field: 'message'
            , error: 'Keep the message under 5,000 characters.'
        };
    }

    return {
        ok: true
        , values
    };
};
