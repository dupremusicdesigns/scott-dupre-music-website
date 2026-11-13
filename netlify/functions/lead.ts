import {
    buildClientConfirmation
    , buildScottNotification
} from '../lib/leadEmails';
import {
    filledTooFast
    , isSameOrigin
} from '../lib/leadGuards';
import { parseLeadInquiry } from '../lib/leadInquiry';
import { claimSlot } from '../lib/leadLimits';
import { createNetlifyCounterStore } from '../lib/netlifyCounterStore';
import { sendEmail } from '../lib/sendEmail';

const JSON_HEADERS = {
    'Content-Type': 'application/json'
    , 'Cache-Control': 'no-store'
    , 'Referrer-Policy': 'no-referrer'
    , 'X-Robots-Tag': 'noindex, nofollow'
};

const reply = ( body: unknown, status = 200 ): Response => {
    return new Response( JSON.stringify( body ), {
        status
        , headers: JSON_HEADERS
    } );
};

const readJsonObject = async ( request: Request ): Promise<Record<string, unknown> | null> => {
    try {
        const body: unknown = await request.json();

        return body && typeof body === 'object' && !Array.isArray( body )
            ? body as Record<string, unknown>
            : null;
    } catch {
        return null;
    }
};

const handler = async ( request: Request ): Promise<Response> => {
    const contentType = request.headers.get( 'Content-Type' ) ?? '';

    if ( !contentType.includes( 'application/json' ) || request.headers.get( 'X-Lead-Form' ) !== '1' ) {
        return reply( { error: 'invalid' }, 400 );
    }

    if ( !isSameOrigin( request ) ) {
        return reply( { error: 'invalid' }, 403 );
    }

    const body = await readJsonObject( request );

    if ( !body ) {
        return reply( { error: 'invalid' }, 400 );
    }

    if ( typeof body.website === 'string' && body.website.trim() ) {
        return reply( { ok: true } );
    }

    if ( filledTooFast( body.elapsed ) ) {
        return reply( { ok: true } );
    }

    const parsed = parseLeadInquiry( body );

    if ( !parsed.ok ) {
        return reply( {
            error: 'invalid'
            , field: parsed.field
            , message: parsed.error
        }, 400 );
    }

    const scottEmail = process.env.LEAD_NOTIFY_EMAIL;

    if ( !scottEmail ) {
        console.error( 'lead: LEAD_NOTIFY_EMAIL is not set' );

        return reply( { error: 'failed' }, 500 );
    }

    try {
        const slot = await claimSlot( createNetlifyCounterStore(), parsed.values.email );

        if ( slot === 'email-limit' ) {
            return reply( { error: 'throttled' }, 429 );
        }

        if ( slot === 'total-limit' ) {
            return reply( { error: 'unavailable' }, 503 );
        }
    } catch ( error ) {
        console.error( 'lead: could not check the daily limits', error );
    }

    const notification = await sendEmail( buildScottNotification( parsed.values, scottEmail ) );

    if ( notification !== 'sent' ) {
        console.error( `lead: notification email ${ notification }` );

        return reply( { error: 'failed' }, 500 );
    }

    const confirmation = await sendEmail( buildClientConfirmation( parsed.values, scottEmail ) );

    if ( confirmation !== 'sent' ) {
        console.error( `lead: confirmation email ${ confirmation }` );
    }

    return reply( { ok: true } );
};

export default handler;

export const config = {
    path: '/lead-api'
    , method: 'POST'
    , rateLimit: {
        windowLimit: 5
        , windowSize: 60
        , aggregateBy: [ 'ip', 'domain' ]
    }
};
