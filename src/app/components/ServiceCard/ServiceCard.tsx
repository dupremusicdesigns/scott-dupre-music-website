'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { css } from '../../../../styled-system/css';

type ServiceCardProps = {
    title: string;
    description: string;
    icon: ReactNode;
    href: string;
}

export const ServiceCard = ( {
    title
    , description
    , icon
    , href
}: ServiceCardProps ) => (
    <Link
        href={ href }
        className={
            css( {
                display: 'flex'
                , alignItems: 'flex-start'
                , gap: 'md'
                , padding: 'lg'
                , border: '2px solid'
                , borderColor: 'brand.black'
                , borderRadius: 'md'
                , textDecoration: 'none'
                , transition: 'all 0.2s'
                , _hover: {
                    backgroundColor: 'rgba(0, 0, 0, 0.03)'
                }
            } )
        }
    >
        <div
            className={
                css( {
                    flexShrink: 0
                    , color: 'text.primary'
                } )
            }
        >
            { icon }
        </div>
        <div>
            <h3
                className={
                    css( {
                        fontSize: 'md'
                        , fontWeight: 'bold'
                        , color: 'text.primary'
                        , textTransform: 'uppercase'
                        , lineHeight: 'tight'
                    } )
                }
            >
                { title }
            </h3>
            <p
                className={
                    css( {
                        fontSize: 'sm'
                        , fontWeight: 'medium'
                        , color: 'text.primary'
                        , lineHeight: 'normal'
                        , marginTop: 'xs'
                    } )
                }
            >
                { description }
            </p>
        </div>
    </Link>
);
