import {
    buildText
    , clip
    , firstName
} from './leadEmails';
import type { OutgoingEmail } from './sendEmail';
import type { ShowInquiry } from './showInquiry';
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

const buildDetails = ( values: ShowInquiry, includeContact: boolean ): EmailDetail[] => {
    return [
        {
            label: 'Name'
            , value: values.name
        }
        , {
            label: 'School'
            , value: values.school
        }
        , ...( includeContact
            ? [ {
                label: 'Email'
                , value: values.email
                , href: `mailto:${ values.email }`
            } ]
            : [] )
        , {
            label: 'Movement 1'
            , value: values.movement1
        }
        , {
            label: 'Movement 2'
            , value: values.movement2
        }
        , {
            label: 'Movement 3'
            , value: values.movement3
        }
        , ...( values.extra
            ? [ {
                label: 'Additional selection'
                , value: values.extra
            } ]
            : [] )
        , ...( values.contactTime
            ? [ {
                label: 'Best time to contact'
                , value: values.contactTime
            } ]
            : [] )
    ];
};

const detailLines = ( values: ShowInquiry, includeContact: boolean ): string[] => {
    return buildDetails( values, includeContact ).map( detail => `${ detail.label }: ${ detail.value }` );
};

export const buildShowClientConfirmation = (
    values: ShowInquiry
    , replyTo: string
): OutgoingEmail => {
    const name = firstName( values.name );
    const body = [
        renderParagraph( 'I have your show selections and will reply to you personally as soon as I can. Here is a copy of what you sent.' )
        , spacer( 28 )
        , renderDetails( buildDetails( values, false ) )
        , spacer( 28 )
        , renderMessageBlock( 'Your vision', clip( values.vision ) )
        , spacer( 28 )
        , renderParagraph( 'Need to change a selection or add something? Just reply to this email and it goes straight to me.' )
        , spacer( 28 )
        , `${ renderButton( 'Listen to previous work', `${ SITE_URL }/marching-band`, true ) }${ renderButton( 'Build your own show', `${ SITE_URL }/build-your-own-show`, false ) }`
    ].join( '' );

    return {
        to: values.email
        , replyTo
        , subject: `Thanks for building a show, ${ name }`
        , html: renderEmailShell( {
            title: 'We got your show'
            , preheader: 'I have your show selections and will reply soon.'
            , heading: `Thank you, ${ name }.`
            , body
        } )
        , text: buildText( [
            `Hi ${ name },`
            , ''
            , 'I have your show selections and will reply to you personally as soon as I can. Here is a copy of what you sent.'
            , ''
            , ...detailLines( values, false )
            , ''
            , clip( values.vision )
            , ''
            , 'Need to change a selection or add something? Just reply to this email and it goes straight to me.'
            , ''
            , 'Scott Dupre, Arranger & Composer'
            , SITE_URL
        ] )
    };
};

export const buildShowScottNotification = (
    values: ShowInquiry
    , to: string
): OutgoingEmail => {
    const name = firstName( values.name );
    const body = [
        renderParagraph( `${ values.name } from ${ values.school } built a show through your website.` )
        , spacer( 28 )
        , renderDetails( buildDetails( values, true ) )
        , spacer( 28 )
        , renderMessageBlock( 'Artistic vision', values.vision )
        , spacer( 28 )
        , renderParagraph( 'Reply to this email to answer them directly. They were sent a confirmation.' )
        , spacer( 28 )
        , renderButton( `Reply to ${ name }`, `mailto:${ values.email }?subject=${ encodeURIComponent( 'Re: Your show' ) }`, true )
    ].join( '' );

    return {
        to
        , replyTo: values.email
        , subject: `LEAD: ${ values.school } (Build Your Own Show)`
        , html: renderEmailShell( {
            title: 'New show lead'
            , preheader: `${ values.name } from ${ values.school } picked ${ values.movement1 }, ${ values.movement2 } and ${ values.movement3 }.`
            , heading: 'New show lead'
            , body
        } )
        , text: buildText( [
            `${ values.name } from ${ values.school } built a show through your website.`
            , ''
            , ...detailLines( values, true )
            , ''
            , values.vision
            , ''
            , 'Reply to this email to answer them directly. They were sent a confirmation.'
        ] )
    };
};
