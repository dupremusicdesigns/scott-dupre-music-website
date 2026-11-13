import { EMAIL_LOGO_CID } from './emailLogo';

export const SITE_URL = ( process.env.SITE_URL || 'https://dupremusicdesigns.com' ).replace( /\/+$/, '' );

const FONT = 'Inter, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Helvetica, Arial, sans-serif';

export const escapeHtml = ( value: string ): string => {
    return value
        .replace( /&/g, '&amp;' )
        .replace( /</g, '&lt;' )
        .replace( />/g, '&gt;' )
        .replace( /"/g, '&quot;' )
        .replace( /'/g, '&#39;' );
};

export type EmailDetail = {
    label: string;
    value: string;
    href?: string;
};

export const renderDetails = ( details: EmailDetail[] ): string => {
    const rows = details.map( ( detail, index ) => {
        const value = detail.href
            ? `<a href="${ escapeHtml( detail.href ) }" style="color:#000000;text-decoration:underline;">${ escapeHtml( detail.value ) }</a>`
            : escapeHtml( detail.value );
        const divider = index === 0 ? '' : 'border-top:1px solid #E5E5E5;';

        return `<tr><td style="padding:16px 20px;${ divider }"><div style="font-family:${ FONT };font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#525252;">${ escapeHtml( detail.label ) }</div><div style="font-family:${ FONT };font-size:16px;font-weight:500;line-height:1.4;color:#000000;padding-top:4px;">${ value }</div></td></tr>`;
    } );

    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:2px solid #000000;border-radius:10px;border-collapse:separate;">${ rows.join( '' ) }</table>`;
};

export const renderMessageBlock = ( label: string, message: string ): string => {
    return `<div style="font-family:${ FONT };font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#525252;padding-bottom:8px;">${ escapeHtml( label ) }</div><div style="font-family:${ FONT };font-size:16px;font-weight:500;line-height:1.6;color:#000000;border-left:3px solid #000000;padding:2px 0 2px 16px;white-space:pre-wrap;">${ escapeHtml( message ) }</div>`;
};

export const renderParagraph = ( text: string ): string => {
    return `<p style="margin:0;font-family:${ FONT };font-size:16px;font-weight:500;line-height:1.6;color:#000000;">${ escapeHtml( text ) }</p>`;
};

export const renderButton = (
    label: string
    , href: string
    , filled: boolean
): string => {
    const colors = filled
        ? 'background-color:#000000;color:#FFFFFF;border:2px solid #000000;'
        : 'background-color:#FFFFFF;color:#000000;border:2px solid #000000;';

    return `<a href="${ escapeHtml( href ) }" style="display:inline-block;font-family:${ FONT };font-size:13px;font-weight:900;letter-spacing:0.06em;text-transform:uppercase;text-decoration:none;border-radius:10px;padding:14px 22px;margin:0 8px 12px 0;${ colors }">${ escapeHtml( label ) }</a>`;
};

export const spacer = ( height: number ): string => {
    return `<div style="height:${ height }px;line-height:${ height }px;font-size:1px;">&nbsp;</div>`;
};

type ShellOptions = {
    title: string;
    preheader: string;
    heading: string;
    body: string;
};

export const renderEmailShell = ( {
    title
    , preheader
    , heading
    , body
}: ShellOptions ): string => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${ escapeHtml( title ) }</title>
</head>
<body style="margin:0;padding:0;background-color:#FFFFFF;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${ escapeHtml( preheader ) }</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;">
<tr><td style="background-color:#FFFFFF;border-radius:20px 20px 0 0;padding:24px 32px;border-bottom:3px solid #000000;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td style="padding-right:12px;"><a href="${ SITE_URL }" style="text-decoration:none;"><img src="cid:${ EMAIL_LOGO_CID }" width="41" height="43" alt="Dupre Music Designs" style="display:block;border:0;"></a></td>
<td style="font-family:${ FONT };"><div style="font-size:16px;font-weight:900;letter-spacing:0.02em;text-transform:uppercase;color:#000000;">Scott Dupre</div><div style="font-size:11px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#000000;">Arranger &amp; Composer</div></td>
</tr></table>
</td></tr>
<tr><td style="background-color:#FFFFFF;padding:40px 32px 40px 32px;">
<h1 style="margin:0 0 24px 0;font-family:${ FONT };font-size:40px;font-weight:900;line-height:1;letter-spacing:0.01em;text-transform:uppercase;color:#000000;">${ escapeHtml( heading ) }</h1>
${ body }
</td></tr>
<tr><td style="background-color:#151414;border-radius:0 0 20px 20px;padding:32px;">
<div style="font-family:${ FONT };font-size:28px;font-weight:900;line-height:1;letter-spacing:0.01em;text-transform:uppercase;color:#FFFFFF;">Scott Dupre</div>
<div style="font-family:${ FONT };font-size:14px;font-weight:500;letter-spacing:0.02em;text-transform:uppercase;color:#FFFFFF;padding-top:6px;">Arranger &amp; Composer</div>
${ spacer( 20 ) }
<div style="font-family:${ FONT };font-size:13px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;"><a href="${ SITE_URL }" style="color:#FFFFFF;text-decoration:underline;">dupremusicdesigns.com</a></div>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
};
