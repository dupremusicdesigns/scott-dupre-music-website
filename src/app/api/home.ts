import {
    CMS_URL
    , AUTH_HEADERS
} from '../constants/apiContants';
import { makeApiCall } from '../utils/apiUtils';
import { HomeResponse } from '../types';

export const getHome = async (): Promise<HomeResponse> => {
    return makeApiCall<HomeResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/home`
        , queryParams: { populate: '*' }
        , options: AUTH_HEADERS
    } );
};
