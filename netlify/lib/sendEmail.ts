import { createTransport } from 'nodemailer';

export type OutgoingEmail = {
    to: string;
    subject: string;
    text: string;
    html: string;
    replyTo?: string;
};

export type EmailResult = 'sent' | 'skipped' | 'failed';

const SENDER_NAME = 'Dupre Music Designs';

const sendWithResend = async (
    message: OutgoingEmail
    , apiKey: string
    , from: string
): Promise<EmailResult> => {
    try {
        const response = await fetch( 'https://api.resend.com/emails', {
            method: 'POST'
            , headers: {
                Authorization: `Bearer ${ apiKey }`
                , 'Content-Type': 'application/json'
            }
            , body: JSON.stringify( {
                from
                , to: [ message.to ]
                , subject: message.subject
                , text: message.text
                , html: message.html
                , ...( message.replyTo ? { reply_to: message.replyTo } : {} )
            } )
            , signal: AbortSignal.timeout( 8000 )
        } );

        return response.ok ? 'sent' : 'failed';
    } catch {
        return 'failed';
    }
};

const sendWithGmail = async (
    message: OutgoingEmail
    , user: string
    , pass: string
): Promise<EmailResult> => {
    try {
        const transport = createTransport( {
            host: 'smtp.gmail.com'
            , port: 465
            , secure: true
            , auth: {
                user
                , pass
            }
            , connectionTimeout: 8000
            , greetingTimeout: 8000
            , socketTimeout: 8000
        } );

        await transport.sendMail( {
            from: `${ SENDER_NAME } <${ user }>`
            , to: message.to
            , subject: message.subject
            , text: message.text
            , html: message.html
            , ...( message.replyTo ? { replyTo: message.replyTo } : {} )
        } );

        return 'sent';
    } catch {
        return 'failed';
    }
};

export const sendEmail = ( message: OutgoingEmail ): Promise<EmailResult> | EmailResult => {
    const {
        RESEND_API_KEY
        , EMAIL_FROM
        , GMAIL_USER
        , GMAIL_APP_PASSWORD
    } = process.env;

    if ( RESEND_API_KEY && EMAIL_FROM ) {
        return sendWithResend( message, RESEND_API_KEY, EMAIL_FROM );
    }

    if ( GMAIL_USER && GMAIL_APP_PASSWORD ) {
        return sendWithGmail( message, GMAIL_USER, GMAIL_APP_PASSWORD );
    }

    return 'skipped';
};
