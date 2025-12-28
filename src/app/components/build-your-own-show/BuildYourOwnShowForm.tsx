'use client';

import Script from 'next/script';

export const BuildYourOwnShowForm = () => {
    return (
        <>
            <iframe
                name='lc_contact_form'
                frameBorder='0'
                width='100%'
                height='600'
                src='https://683148.17hats.com/p#/embed/srgkvdwkzskwwdtzzcsdxhkvfhnfkphc'
            />
            <Script
                src='https://683148.17hats.com/vendor/iframeSizer.min.js'
                strategy='lazyOnload'
            />
        </>
    );
};
