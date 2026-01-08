import {
    CMS_URL
    , AUTH_HEADERS
} from '../constants/apiConstants';
import { makeApiCall } from '../utils/apiUtils';
import { cacheImage } from '../utils/assetCache';
import { BuildYourOwnShowResponse } from '../types';

export const getBuildYourOwnShow = async (): Promise<BuildYourOwnShowResponse> => {
    const response = await makeApiCall<BuildYourOwnShowResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/build-your-own-show`
        , queryParams: { populate: '*' }
        , options: AUTH_HEADERS
    } );

    if ( response.data ) {
        response.data.asideImage = await cacheImage( response.data.asideImage );
    }

    return response;
};
