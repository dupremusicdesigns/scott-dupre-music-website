import {
    CMS_URL
    , AUTH_HEADERS
} from '../constants/apiConstants';
import { makeApiCall } from '../utils/apiUtils';
import { cacheImage } from '../utils/assetCache';
import { GlobalResponse } from '../types';

export const getGlobal = async (): Promise<GlobalResponse> => {
    const response = await makeApiCall<GlobalResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/global`
        , queryParams: { populate: '*' }
        , options: AUTH_HEADERS
    } );

    if ( response.data ) {
        response.data.favicon = await cacheImage( response.data.favicon );
    }

    return response;
};
