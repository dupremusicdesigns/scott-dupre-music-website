import {
    CMS_URL
    , AUTH_HEADERS
} from '../constants/apiConstants';
import { makeApiCall } from '../utils/apiUtils';
import { GlobalResponse } from '../types';

export const getGlobal = async (): Promise<GlobalResponse> => {
    return makeApiCall<GlobalResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/global`
        , queryParams: { populate: '*' }
        , options: AUTH_HEADERS
    } );
};
