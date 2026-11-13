import { css } from '../../../../styled-system/css';
import { getHome } from '../../api/home';
import { CmsImage } from '../CmsImage/CmsImage';

export const HeroBanner = async () => {
    const { data: home } = await getHome();

    if ( !home?.heroImage ) {
        return null;
    }

    return (
        <div
            aria-hidden='true'
            className={
                css( {
                    position: 'relative'
                    , width: '100%'
                    , height: '40vw'
                    , minHeight: '160px'
                    , maxHeight: '320px'
                    , overflow: 'hidden'
                    , backgroundColor: 'brand.black'
                } )
            }
        >
            <CmsImage
                image={ home.heroImage }
                fallbackAlt=''
                priority
                className={
                    css( {
                        objectFit: 'cover'
                        , objectPosition: 'center 30%'
                    } )
                }
            />
        </div>
    );
};
