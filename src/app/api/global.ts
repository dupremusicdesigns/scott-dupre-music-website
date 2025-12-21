import { CMS_URL } from '../constants/apiContants';
import { makeApiCall } from '../utils/apiUtils';
import { GlobalResponse } from '../types';

export const getGlobal = async (): Promise<GlobalResponse> => {
    return makeApiCall<GlobalResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/global`
        , queryParams: { populate: '*' }
        , options: {
            headers: {
                Authorization: `Bearer ${ process.env.CMS_API_TOKEN }`
            }
        }
    } );
};
