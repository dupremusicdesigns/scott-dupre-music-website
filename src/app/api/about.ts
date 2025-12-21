import { CMS_URL } from '../constants/apiContants';
import { makeApiCall } from '../utils/apiUtils';
import { AboutResponse } from '../types';

export const getAbout = async (): Promise<AboutResponse> => {
    return makeApiCall<AboutResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/about`
        , queryParams: { populate: '*' }
        , options: {
            headers: {
                Authorization: `Bearer ${ process.env.CMS_API_TOKEN }`
            }
        }
    } );
};
