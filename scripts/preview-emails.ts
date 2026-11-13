import {
    mkdirSync
    , writeFileSync
} from 'fs';
import { resolve } from 'path';
import {
    EMAIL_LOGO_BASE64
    , EMAIL_LOGO_CID
} from '../netlify/lib/emailLogo';
import {
    buildClientConfirmation
    , buildScottNotification
} from '../netlify/lib/leadEmails';
import type { LeadInquiry } from '../netlify/lib/leadInquiry';

const outputDirectory = resolve( process.argv[ 2 ] ?? '.email-preview' );
const logoSource = `data:image/png;base64,${ EMAIL_LOGO_BASE64 }`;

const sample: LeadInquiry = {
    name: 'Dana Whitfield'
    , school: 'Cedar Ridge High School'
    , location: 'Tulsa, OK'
    , email: 'dana.whitfield@cedarridge.example'
    , phone: '(918) 555-0142'
    , service: 'Music for my marching band'
    , message: 'We are planning our 2027 marching show and love the Nimitz arrangements.\n\nCould we talk about a custom show for about 90 members, and what the timeline would look like?'
};

const files = [
    [ 'client-confirmation.html', buildClientConfirmation( sample, 'dupremusicdesigns@gmail.com' ) ]
    , [ 'scott-notification.html', buildScottNotification( sample, 'dupremusicdesigns@gmail.com' ) ]
] as const;

mkdirSync( outputDirectory, { recursive: true } );

for ( const [ name, email ] of files ) {
    writeFileSync(
        resolve( outputDirectory, name )
        , email.html.replace( `cid:${ EMAIL_LOGO_CID }`, logoSource )
    );
}

console.log( outputDirectory );
