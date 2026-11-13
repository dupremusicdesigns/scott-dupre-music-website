import {
    mkdirSync
    , writeFileSync
} from 'fs';

const quoteApiOrigin = process.env.QUOTE_API_ORIGIN?.replace( /\/+$/, '' );

if ( !quoteApiOrigin && process.env.NETLIFY ) {
    throw new Error( 'QUOTE_API_ORIGIN is required for Netlify builds' );
}

const rules = [
    ...( quoteApiOrigin
        ? [
            `/quote-api/*  ${ quoteApiOrigin }/api/public/quotes/:splat  200!`
            , `/lead-api  ${ quoteApiOrigin }/api/public/leads  200!`
        ]
        : [] )
    , '/quote/*  /quote/view.html  200'
];

mkdirSync( 'out', { recursive: true } );
writeFileSync( 'out/_redirects', `${ rules.join( '\n' ) }\n` );
