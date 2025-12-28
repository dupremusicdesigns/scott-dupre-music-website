'use client';

import { useState } from 'react';
import Script from 'next/script';
import { css } from '../../../../../styled-system/css';
import { ContactFormSkeleton } from '../ContactFormSkeleton/ContactFormSkeleton';

export const ContactFormEmbed = () => {
    const [ isLoading, setIsLoading ] = useState( true );

    return (
        <div
            className={
                css( {
                    position: 'relative'
                    , minHeight: '600px'
                } )
            }
        >
            {
                isLoading && (
                    <div
                        className={
                            css( {
                                position: 'absolute'
                                , inset: 0
                            } )
                        }
                    >
                        <ContactFormSkeleton />
                    </div>
                )
            }
            <iframe
                name='lc_contact_form'
                width='100%'
                height='600'
                src='https://683148.17hats.com/p#/embed/kfddpcsddtgznsbrzscdctssndrxxtkh'
                onLoad={ () => setIsLoading( false ) }
                className={
                    css( {
                        border: 'none'
                        , minHeight: '600px'
                        , opacity: isLoading ? 0 : 1
                        , transition: 'opacity 0.3s ease-in-out'
                    } )
                }
            />
            <Script
                src='https://683148.17hats.com/vendor/iframeSizer.min.js'
                strategy='lazyOnload'
            />
        </div>
    );
};
