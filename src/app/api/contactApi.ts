import {
    LEAD_API_PATH
    , LEAD_FORM_HEADER
} from '../constants/contactConstants';
import type {
    ContactFormField
    , ContactFormValues
    , ContactSubmitResult
    , LeadSubmitResult
    , ShowFormField
    , ShowFormValues
} from '../types';

type ErrorBody = {
    error?: string;
    field?: string;
    message?: string;
};

const contactFields: ContactFormField[] = [
    'name'
    , 'school'
    , 'location'
    , 'email'
    , 'phone'
    , 'service'
    , 'message'
];

const showFields: ShowFormField[] = [
    'name'
    , 'school'
    , 'email'
    , 'movement1'
    , 'movement2'
    , 'movement3'
    , 'extra'
    , 'vision'
    , 'contactTime'
];

const submitLead = async <Field extends string>(
    kind: 'contact' | 'show'
    , values: Record<Field, string>
    , fields: readonly Field[]
    , website: string
    , elapsed: number
): Promise<LeadSubmitResult<Field>> => {
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
                , kind
                , website
                , elapsed
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
            , failure: {
                kind: body.error === 'throttled' || body.error === 'unavailable'
                    ? body.error
                    : 'failed'
            }
        };
    } catch {
        return {
            ok: false
            , failure: { kind: 'failed' }
        };
    }
};

export const submitContactForm = (
    values: ContactFormValues
    , website: string
    , elapsed: number
): Promise<ContactSubmitResult> => {
    return submitLead( 'contact', values, contactFields, website, elapsed );
};

export const submitShowForm = (
    values: ShowFormValues
    , website: string
    , elapsed: number
): Promise<LeadSubmitResult<ShowFormField>> => {
    return submitLead( 'show', values, showFields, website, elapsed );
};
