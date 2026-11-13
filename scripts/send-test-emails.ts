import { config } from 'dotenv';
import {
    buildClientConfirmation
    , buildScottNotification
} from '../netlify/lib/leadEmails';
import type { LeadInquiry } from '../netlify/lib/leadInquiry';
import { sendEmail } from '../netlify/lib/sendEmail';

config( { path: '.env.local' } );

const recipient = process.argv[ 2 ] ?? process.env.TEST_EMAIL_TO;

if ( !recipient ) {
    throw new Error( 'Pass the address to send to, for example: npx jiti scripts/send-test-emails.ts you@gmail.com' );
}

const sample: LeadInquiry = {
    name: 'Dana Whitfield'
    , school: 'Cedar Ridge High School'
    , location: 'Tulsa, OK'
    , email: recipient
    , phone: '(918) 555-0142'
    , service: 'Music for my marching band'
    , message: 'We are planning our 2027 marching show and love the Nimitz arrangements.\n\nCould we talk about a custom show for about 90 members, and what the timeline would look like?'
};

const run = async () => {
    const lead = await sendEmail( buildScottNotification( sample, recipient ) );
    const confirmation = await sendEmail( buildClientConfirmation( sample, recipient ) );

    console.log( `lead email: ${ lead }` );
    console.log( `confirmation email: ${ confirmation }` );
};

void run();
