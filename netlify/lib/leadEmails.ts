import type { LeadInquiry } from './leadInquiry';
import type { OutgoingEmail } from './sendEmail';
import {
    renderButton
    , renderDetails
    , renderEmailShell
    , renderMessageBlock
    , renderParagraph
    , SITE_URL
    , spacer
    , type EmailDetail
} from './emailLayout';

const CONFIRMATION_MESSAGE_LIMIT = 600;

export const clip = ( text: string ): string => {
    return text.length > CONFIRMATION_MESSAGE_LIMIT
        ? `${ text.slice( 0, CONFIRMATION_MESSAGE_LIMIT ).trimEnd() }...`
        : text;
};

export const firstName = ( name: string ): string => name.split( /\s+/ )[ 0 ] || name;

const buildDetails = ( values: LeadInquiry, includeContact: boolean ): EmailDetail[] => {
    return [
        {
            label: 'Name'
            , value: values.name
        }
        , {
            label: 'School / Organization'
            , value: values.school
        }
        , {
            label: 'Location'
            , value: values.location
        }
        , ...( includeContact
            ? [
                {
                    label: 'Email'
                    , value: values.email
                    , href: `mailto:${ values.email }`
                }
                , ...( values.phone
                    ? [ {
                        label: 'Phone'
                        , value: values.phone
                        , href: `tel:${ values.phone.replace( /[^\d+]/g, '' ) }`
                    } ]
                    : [] )
            ]
            : [] )
        , {
            label: 'Services'
            , value: values.service
        }
    ];
};

export const buildText = ( lines: string[] ): string => {
    return lines
        .filter( ( line, index, all ) => line !== '' || all[ index - 1 ] !== '' )
        .join( '\n' )
        .trim();
};

export const buildClientConfirmation = (
    values: LeadInquiry
    , replyTo: string
): OutgoingEmail => {
    const name = firstName( values.name );
    const body = [
        renderParagraph( 'I have your message and will reply to you personally as soon as I can. Here is a copy of what you sent.' )
        , spacer( 28 )
        , renderDetails( buildDetails( values, false ) )
        , ...( values.message
            ? [
                spacer( 28 )
                , renderMessageBlock( 'Your message', clip( values.message ) )
            ]
            : [] )
        , spacer( 28 )
        , renderParagraph( 'Need to add something? Just reply to this email and it goes straight to me.' )
        , spacer( 28 )
        , `${ renderButton( 'Listen to previous work', `${ SITE_URL }/marching-band`, true ) }${ renderButton( 'Build your own show', `${ SITE_URL }/build-your-own-show`, false ) }`
    ].join( '' );

    return {
        to: values.email
        , replyTo
        , subject: `Thanks for reaching out, ${ name }`
        , html: renderEmailShell( {
            title: 'We got your message'
            , preheader: 'I have your message and will reply soon.'
            , heading: `Thank you, ${ name }.`
            , body
        } )
        , text: buildText( [
            `Hi ${ name },`
            , ''
            , 'I have your message and will reply to you personally as soon as I can. Here is a copy of what you sent.'
            , ''
            , `Name: ${ values.name }`
            , `School / Organization: ${ values.school }`
            , `Location: ${ values.location }`
            , `Services: ${ values.service }`
            , ...( values.message ? [ '', clip( values.message ) ] : [] )
            , ''
            , 'Need to add something? Just reply to this email and it goes straight to me.'
            , ''
            , 'Scott Dupre, Arranger & Composer'
            , SITE_URL
        ] )
    };
};

export const buildScottNotification = (
    values: LeadInquiry
    , to: string
): OutgoingEmail => {
    const name = firstName( values.name );
    const body = [
        renderParagraph( `${ values.name } from ${ values.school } sent a lead through your website.` )
        , spacer( 28 )
        , renderDetails( buildDetails( values, true ) )
        , ...( values.message
            ? [
                spacer( 28 )
                , renderMessageBlock( 'Message', values.message )
            ]
            : [] )
        , spacer( 28 )
        , renderParagraph( 'Reply to this email to answer them directly. They were sent a confirmation.' )
        , spacer( 28 )
        , renderButton( `Reply to ${ name }`, `mailto:${ values.email }?subject=${ encodeURIComponent( 'Re: Your inquiry' ) }`, true )
    ].join( '' );

    return {
        to
        , replyTo: values.email
        , subject: `LEAD: ${ values.school }`
        , html: renderEmailShell( {
            title: 'New lead'
            , preheader: `${ values.name } from ${ values.school } (${ values.location }) is interested in ${ values.service }.`
            , heading: 'New lead'
            , body
        } )
        , text: buildText( [
            `${ values.name } from ${ values.school } sent a lead through your website.`
            , ''
            , `Name: ${ values.name }`
            , `School / Organization: ${ values.school }`
            , `Location: ${ values.location }`
            , `Email: ${ values.email }`
            , ...( values.phone ? [ `Phone: ${ values.phone }` ] : [] )
            , `Services: ${ values.service }`
            , ...( values.message ? [ '', values.message ] : [] )
            , ''
            , 'Reply to this email to answer them directly. They were sent a confirmation.'
        ] )
    };
};
