import {
    CMS_URL
    , AUTH_HEADERS
} from '../constants/apiConstants';
import { makeApiCall } from '../utils/apiUtils';
import { cacheImage } from '../utils/assetCache';
import { ArticlesResponse } from '../types';

export const getArticles = async (): Promise<ArticlesResponse> => {
    const response = await makeApiCall<ArticlesResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/articles`
        , queryParams: { populate: '*' }
        , options: AUTH_HEADERS
    } );

    response.data = await Promise.all(
        response.data.map( async article => ( {
            ...article
            , cover: await cacheImage( article.cover )
        } ) )
    );

    return response;
};
