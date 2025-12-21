import { CMS_URL } from '../constants/apiContants';
import { makeApiCall } from '../utils/apiUtils';
import { HomeResponse } from '../types';

export const getHome = async (): Promise<HomeResponse> => {
    return makeApiCall<HomeResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/home`
        , queryParams: { populate: '*' }
        , options: {
            headers: {
                Authorization: `Bearer ${ process.env.CMS_API_TOKEN }`
            }
        }
    } );
};
