import {
    existsSync
    , readFileSync
    , statSync
} from 'fs';
import {
    createServer
    , request as httpRequest
    , type IncomingMessage
    , type ServerResponse
} from 'http';
import {
    extname
    , join
    , resolve
} from 'path';
import { config } from 'dotenv';

config( { path: [ '.env.local', '.env' ] } );

const PORT = Number( process.env.LOCAL_SITE_PORT ?? 3001 );
const ADMIN = new URL( process.env.LOCAL_ADMIN_ORIGIN ?? 'http://localhost:44100' );
const OUTPUT = resolve( 'out' );

process.env.EMAIL_OUTBOX_DIR ??= resolve( '.email-outbox' );
process.env.LEAD_NOTIFY_EMAIL ??= 'scott@example.test';

const TYPES: Record<string, string> = {
    '.html': 'text/html; charset=utf-8'
    , '.js': 'text/javascript'
    , '.css': 'text/css'
    , '.png': 'image/png'
    , '.jpg': 'image/jpeg'
    , '.webp': 'image/webp'
    , '.woff2': 'font/woff2'
    , '.json': 'application/json'
    , '.txt': 'text/plain'
    , '.ico': 'image/x-icon'
    , '.svg': 'image/svg+xml'
};

const readBody = ( request: IncomingMessage ): Promise<Buffer> => {
    return new Promise( resolveBody => {
        const chunks: Buffer[] = [];

        request.on( 'data', ( chunk: Buffer ) => chunks.push( chunk ) );
        request.on( 'end', () => resolveBody( Buffer.concat( chunks ) ) );
    } );
};

const sendFile = ( response: ServerResponse, file: string ) => {
    response.writeHead( 200, {
        'Content-Type': TYPES[ extname( file ) ] ?? 'application/octet-stream'
        , 'Cache-Control': 'no-store'
    } );
    response.end( readFileSync( file ) );
};

const proxyToAdmin = ( request: IncomingMessage, response: ServerResponse, path: string ) => {
    const upstream = httpRequest( {
        host: ADMIN.hostname
        , port: ADMIN.port
        , path
        , method: request.method
        , headers: {
            ...request.headers
            , host: ADMIN.host
        }
    }, upstreamResponse => {
        response.writeHead( upstreamResponse.statusCode ?? 502, upstreamResponse.headers );
        upstreamResponse.pipe( response );
    } );

    upstream.on( 'error', () => {
        response.writeHead( 502 );
        response.end( 'The local admin app is not running.' );
    } );
    request.pipe( upstream );
};

const runLeadFunction = async ( request: IncomingMessage, response: ServerResponse ) => {
    const { default: handler } = await import( '../netlify/functions/lead' );
    const body = await readBody( request );
    const headers = new Headers();

    for ( const [ name, value ] of Object.entries( request.headers ) ) {
        if ( typeof value === 'string' ) {
            headers.set( name, value );
        }
    }

    const result = await handler( new Request( `http://${ request.headers.host }/lead-api`, {
        method: request.method
        , headers
        , body: request.method === 'POST' ? new Uint8Array( body ) : undefined
    } ) );

    response.writeHead( result.status, Object.fromEntries( result.headers ) );
    response.end( Buffer.from( await result.arrayBuffer() ) );
};

createServer( ( request, response ) => {
    const url = new URL( request.url ?? '/', 'http://localhost' );

    if ( url.pathname.startsWith( '/quote-api/' ) ) {
        proxyToAdmin( request, response, `${ url.pathname.replace( '/quote-api/', '/api/public/quotes/' ) }${ url.search }` );

        return;
    }

    if ( url.pathname === '/lead-api' && request.method === 'POST' ) {
        void runLeadFunction( request, response );

        return;
    }

    let target = join( OUTPUT, decodeURIComponent( url.pathname ) );

    if ( /^\/quote\/[^/]+$/.test( url.pathname ) && !existsSync( target ) ) {
        target = join( OUTPUT, 'quote/view.html' );
    }

    if ( existsSync( target ) && statSync( target ).isFile() ) {
        sendFile( response, target );

        return;
    }

    if ( existsSync( `${ target }.html` ) ) {
        sendFile( response, `${ target }.html` );

        return;
    }

    response.writeHead( 404 );
    response.end( 'Not found' );
} ).listen( PORT, () => {
    console.log( `Site on http://localhost:${ PORT }, admin at ${ ADMIN.origin }, emails saved to ${ process.env.EMAIL_OUTBOX_DIR }` );
} );
