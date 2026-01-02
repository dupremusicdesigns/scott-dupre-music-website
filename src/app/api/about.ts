import {
    CMS_URL
    , AUTH_HEADERS
} from '../constants/apiConstants';
import { makeApiCall } from '../utils/apiUtils';
import { AboutResponse } from '../types';

export const getAbout = async (): Promise<AboutResponse> => {
    return makeApiCall<AboutResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/about`
        , queryParams: { populate: '*' }
        , options: AUTH_HEADERS
    } );
};
