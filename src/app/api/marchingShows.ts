import {
    CMS_URL
    , AUTH_HEADERS
} from '../constants/apiContants';
import { makeApiCall } from '../utils/apiUtils';
import {
    MarchingShowsResponse
    , SingleMarchingShowResponse
} from '../types';

export const getMarchingShows = async (): Promise<MarchingShowsResponse> => {
    return makeApiCall<MarchingShowsResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/marching-shows`
        , queryParams: { populate: '*' }
        , options: AUTH_HEADERS
    } );
};

export const getMarchingShowByDocumentId = async (
    documentId: string
): Promise<SingleMarchingShowResponse> => {
    return makeApiCall<SingleMarchingShowResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/marching-shows/${ documentId }`
        , queryParams: { populate: '*' }
        , options: AUTH_HEADERS
    } );
};
