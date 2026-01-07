'use client';

import Image from 'next/image';
import { css } from '../../../../styled-system/css';
import { StrapiImage } from '../../types';

type ClientCmsImageProps = {
    image: StrapiImage | null;
    fallbackAlt: string;
    priority?: boolean;
    objectPosition?: string;
    className?: string;
    sizes?: string;
}

export const ClientCmsImage = ( {
    image
    , fallbackAlt
    , priority = false
    , objectPosition = 'center'
    , className
    , sizes = '100vw'
}: ClientCmsImageProps ) => {
    if ( !image ) return null;

    return (
        <Image
            src={ image.url }
            alt={ image.alternativeText || fallbackAlt }
            fill
            sizes={ sizes }
            priority={ priority }
            className={
                className || css( {
                    objectFit: 'cover'
                    , objectPosition
                } )
            }
        />
    );
};
