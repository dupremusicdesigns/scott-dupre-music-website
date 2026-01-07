import {
    CMS_URL
    , AUTH_HEADERS
} from '../constants/apiConstants';
import { makeApiCall } from '../utils/apiUtils';
import { cacheImage } from '../utils/assetCache';
import { HomeResponse } from '../types';

export const getHome = async (): Promise<HomeResponse> => {
    const response = await makeApiCall<HomeResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/home`
        , queryParams: {
            'populate[0]': 'heroImage'
            , 'populate[1]': 'bioImage'
            , 'populate[2]': 'primaryTestimonial.image'
            , 'populate[3]': 'additionalTestimonials.image'
            , 'populate[4]': 'actionButtonPrimary'
        }
        , options: AUTH_HEADERS
    } );

    if ( response.data ) {
        response.data.heroImage = await cacheImage( response.data.heroImage );
        response.data.bioImage = await cacheImage( response.data.bioImage );

        if ( response.data.primaryTestimonial ) {
            response.data.primaryTestimonial.image = await cacheImage(
                response.data.primaryTestimonial.image
            );
        }

        if ( response.data.additionalTestimonials ) {
            response.data.additionalTestimonials = await Promise.all(
                response.data.additionalTestimonials.map( async testimonial => ( {
                    ...testimonial
                    , image: await cacheImage( testimonial.image )
                } ) )
            );
        }
    }

    return response;
};
