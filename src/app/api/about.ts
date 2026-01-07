import {
    CMS_URL
    , AUTH_HEADERS
} from '../constants/apiConstants';
import { makeApiCall } from '../utils/apiUtils';
import { cacheImage } from '../utils/assetCache';
import { AboutResponse } from '../types';

export const getAbout = async (): Promise<AboutResponse> => {
    const response = await makeApiCall<AboutResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/about`
        , queryParams: { populate: '*' }
        , options: AUTH_HEADERS
    } );

    if ( response.data ) {
        response.data.heroImage = await cacheImage( response.data.heroImage );
        response.data.imageTop = await cacheImage( response.data.imageTop );
        response.data.imageBottom = await cacheImage( response.data.imageBottom );
    }

    return response;
};
