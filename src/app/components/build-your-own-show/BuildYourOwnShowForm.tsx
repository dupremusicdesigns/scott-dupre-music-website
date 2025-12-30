'use client';

import { useState } from 'react';
import Script from 'next/script';
import { css } from '../../../../styled-system/css';
import { Skeleton } from '../Skeleton/Skeleton';

export const BuildYourOwnShowForm = () => {
    const [ isLoading, setIsLoading ] = useState( true );

    return (
        <div
            className={
                css( {
                    position: 'relative'
                    , minHeight: '400px'
                    , sm: { minHeight: '500px' }
                    , md: { minHeight: '600px' }
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
                        <div
                            className={
                                css( {
                                    display: 'flex'
                                    , flexDirection: 'column'
                                    , gap: 'md'
                                } )
                            }
                        >
                            <Skeleton
                                width='120px'
                                height='14px'
                            />
                            <Skeleton
                                height='40px'
                                borderRadius='md'
                            />
                            <Skeleton
                                width='100px'
                                height='14px'
                            />
                            <Skeleton
                                height='40px'
                                borderRadius='md'
                            />
                            <Skeleton
                                width='80px'
                                height='14px'
                            />
                            <Skeleton
                                height='100px'
                                borderRadius='md'
                            />
                            <div
                                className={
                                    css( {
                                        display: 'flex'
                                        , justifyContent: 'center'
                                        , marginTop: 'sm'
                                    } )
                                }
                            >
                                <Skeleton
                                    width='180px'
                                    height='40px'
                                    borderRadius='md'
                                />
                            </div>
                        </div>
                    </div>
                )
            }
            <iframe
                name='lc_byos_form'
                width='100%'
                height='600'
                src='https://683148.17hats.com/p#/embed/srgkvdwkzskwwdtzzcsdxhkvfhnfkphc'
                onLoad={ () => setIsLoading( false ) }
                className={
                    css( {
                        border: 'none'
                        , minHeight: '400px'
                        , opacity: isLoading ? 0 : 1
                        , transition: 'opacity 0.3s ease-in-out'
                        , sm: { minHeight: '500px' }
                        , md: { minHeight: '600px' }
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
