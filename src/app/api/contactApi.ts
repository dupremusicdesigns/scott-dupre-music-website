import {
    LEAD_API_PATH
    , LEAD_FORM_HEADER
} from '../constants/contactConstants';
import type {
    ContactFormField
    , ContactFormValues
    , ContactSubmitResult
} from '../types';

type ErrorBody = {
    error?: string;
    field?: string;
    message?: string;
};

const fields: ContactFormField[] = [
    'name'
    , 'school'
    , 'location'
    , 'email'
    , 'phone'
    , 'service'
    , 'message'
];

export const submitContactForm = async (
    values: ContactFormValues
    , website: string
): Promise<ContactSubmitResult> => {
    try {
        const response = await fetch( LEAD_API_PATH, {
            method: 'POST'
            , cache: 'no-store'
            , referrerPolicy: 'no-referrer'
            , headers: {
                'Content-Type': 'application/json'
                , [ LEAD_FORM_HEADER ]: '1'
            }
            , body: JSON.stringify( {
                ...values
                , website
            } )
        } );

        if ( response.ok ) {
            return { ok: true };
        }

        const body = ( await response.json().catch( () => ( {} ) ) ) as ErrorBody;

        if ( body.error === 'invalid' ) {
            return {
                ok: false
                , failure: {
                    kind: 'invalid'
                    , field: fields.find( field => field === body.field )
                    , message: body.message ?? 'Please check your details and try again.'
                }
            };
        }

        return {
            ok: false
            , failure: { kind: body.error === 'throttled' ? 'throttled' : 'failed' }
        };
    } catch {
        return {
            ok: false
            , failure: { kind: 'failed' }
        };
    }
};
