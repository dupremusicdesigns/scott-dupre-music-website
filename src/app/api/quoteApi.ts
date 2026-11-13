import {
    QUOTE_API_PATH
    , QUOTE_GRANT_HEADER
} from '../constants/quoteConstants';
import type {
    QuoteAcceptanceInput
    , QuoteApiResult
    , QuoteFailure
    , QuoteUnlockResponse
    , QuoteView
} from '../types';

type ErrorBody = {
    error?: string;
    attemptsLeft?: number;
    retryAfterSeconds?: number;
    field?: string;
    message?: string;
};

const toFailure = ( body: ErrorBody ): QuoteFailure => {
    switch ( body.error ) {
        case 'wrong-pin':
            return {
                kind: 'wrong-pin'
                , attemptsLeft: body.attemptsLeft ?? 0
            };
        case 'locked':
            return {
                kind: 'locked'
                , retryAfterSeconds: body.retryAfterSeconds ?? 900
            };
        case 'unauthorized':
            return { kind: 'unauthorized' };
        case 'not-open':
            return { kind: 'not-open' };
        case 'invalid':
            return {
                kind: 'invalid'
                , field: body.field === 'name' || body.field === 'email' ? body.field : undefined
                , message: body.message ?? 'Please check your details and try again.'
            };
        case 'not-found':
            return { kind: 'not-found' };
        default:
            return { kind: 'network' };
    }
};

const send = async <T>(
    token: string
    , action: string
    , init: RequestInit
): Promise<QuoteApiResult<T>> => {
    try {
        const response = await fetch(
            `${ QUOTE_API_PATH }/${ encodeURIComponent( token ) }${ action }`
            , {
                cache: 'no-store'
                , referrerPolicy: 'no-referrer'
                , ...init
            }
        );
        const body = await response.json().catch( () => ( {} ) );

        return response.ok
            ? {
                ok: true
                , data: body as T
            }
            : {
                ok: false
                , failure: toFailure( body as ErrorBody )
            };
    } catch {
        return {
            ok: false
            , failure: { kind: 'network' }
        };
    }
};

const jsonInit = ( body: unknown, grant?: string ): RequestInit => ( {
    method: 'POST'
    , headers: {
        'Content-Type': 'application/json'
        , ...( grant ? { [ QUOTE_GRANT_HEADER ]: grant } : {} )
    }
    , body: JSON.stringify( body )
} );

export const unlockQuote = (
    token: string
    , pin: string
): Promise<QuoteApiResult<QuoteUnlockResponse>> => {
    return send( token, '/unlock', jsonInit( { pin } ) );
};

export const fetchQuote = (
    token: string
    , grant: string
): Promise<QuoteApiResult<{ quote: QuoteView }>> => {
    return send( token, '', { headers: { [ QUOTE_GRANT_HEADER ]: grant } } );
};

export const acceptQuote = (
    token: string
    , grant: string
    , input: QuoteAcceptanceInput
): Promise<QuoteApiResult<{ quote: QuoteView }>> => {
    return send( token, '/accept', jsonInit( input, grant ) );
};
