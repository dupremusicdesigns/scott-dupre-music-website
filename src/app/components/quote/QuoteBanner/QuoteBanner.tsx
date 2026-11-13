'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { css } from '../../../../../styled-system/css';

type QuoteBannerProps = {
    imageUrl: string | null;
    imageAlt?: string;
    compact?: boolean;
    children?: ReactNode;
}

export const QuoteBanner = ( {
    imageUrl
    , imageAlt = ''
    , compact = false
    , children
}: QuoteBannerProps ) => (
    <section
        className={
            css( {
                position: 'relative'
                , width: '100%'
                , minHeight: compact ? '160px' : '380px'
                , overflow: 'hidden'
                , backgroundColor: 'brand.black'
                , display: 'flex'
                , flexDirection: 'column'
                , justifyContent: 'center'
                , sm: { minHeight: compact ? '200px' : '420px' }
                , md: { minHeight: compact ? '240px' : '480px' }
            } )
        }
    >
        {
            imageUrl && (
                <Image
                    src={ imageUrl }
                    alt={ imageAlt }
                    fill
                    priority
                    sizes='100vw'
                    className={
                        css( {
                            objectFit: 'cover'
                            , objectPosition: '60% top'
                            , md: { objectPosition: 'center top' }
                        } )
                    }
                />
            )
        }
        <div
            aria-hidden='true'
            className={
                css( {
                    position: 'absolute'
                    , inset: 0
                    , background: 'linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.75))'
                } )
            }
        />
        {
            children && (
                <div
                    className={
                        css( {
                            position: 'relative'
                            , maxWidth: '1120px'
                            , width: '100%'
                            , marginX: 'auto'
                            , paddingX: 'md'
                            , paddingY: 'xl'
                            , md: { paddingX: '7%' }
                        } )
                    }
                >
                    { children }
                </div>
            )
        }
    </section>
);
