import {
    CMS_URL
    , AUTH_HEADERS
} from '../constants/apiContants';
import { makeApiCall } from '../utils/apiUtils';
import { ArticlesResponse } from '../types';

export const getArticles = async (): Promise<ArticlesResponse> => {
    return makeApiCall<ArticlesResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/articles`
        , queryParams: { populate: '*' }
        , options: AUTH_HEADERS
    } );
};
