import Image from 'next/image';
import { css } from '../../../../styled-system/css';
import { StrapiImage } from '../../types';
import { getImageBlurURL } from '../../utils/imageUtils';

type CmsImageProps = {
    image: StrapiImage | null;
    fallbackAlt: string;
    priority?: boolean;
    objectPosition?: string;
    className?: string;
}

export const CmsImage = async ( {
    image
    , fallbackAlt
    , priority = false
    , objectPosition = 'center'
    , className
}: CmsImageProps ) => {
    if ( !image ) return null;

    const blurURL = await getImageBlurURL( image.formats, image.url );

    return (
        <Image
            src={ image.url }
            alt={ image.alternativeText || fallbackAlt }
            fill
            priority={ priority }
            placeholder='blur'
            blurDataURL={ blurURL }
            className={
                className || css( {
                    objectFit: 'cover'
                    , objectPosition
                } )
            }
        />
    );
};
