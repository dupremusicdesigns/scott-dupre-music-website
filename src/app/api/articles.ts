import { CMS_URL } from '../constants/apiContants';
import { makeApiCall } from '../utils/apiUtils';
import { ArticlesResponse } from '../types';

export const getArticles = async (): Promise<ArticlesResponse> => {
    return makeApiCall<ArticlesResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/articles`
        , queryParams: { populate: '*' }
        , options: {
            headers: {
                Authorization: `Bearer ${ process.env.CMS_API_TOKEN }`
            }
        }
    } );
};
