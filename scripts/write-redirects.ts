import {
    mkdirSync
    , writeFileSync
} from 'fs';

const quoteApiOrigin = process.env.QUOTE_API_ORIGIN?.replace( /\/+$/, '' );

const rules = [
    ...( quoteApiOrigin
        ? [ `/quote-api/*  ${ quoteApiOrigin }/api/public/quotes/:splat  200!` ]
        : [] )
    , '/quote/*  /quote/view.html  200'
];

mkdirSync( 'out', { recursive: true } );
writeFileSync( 'out/_redirects', `${ rules.join( '\n' ) }\n` );
