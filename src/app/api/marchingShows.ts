import { CMS_URL } from '../constants/apiContants';
import { makeApiCall } from '../utils/apiUtils';
import {
    MarchingShowsResponse
    , SingleMarchingShowResponse
} from '../types';

const authHeaders = {
    headers: {
        Authorization: `Bearer ${ process.env.CMS_API_TOKEN }`
    }
};

export const getMarchingShows = async (): Promise<MarchingShowsResponse> => {
    return makeApiCall<MarchingShowsResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/marching-shows`
        , queryParams: { populate: '*' }
        , options: authHeaders
    } );
};

export const getMarchingShowByDocumentId = async (
    documentId: string
): Promise<SingleMarchingShowResponse> => {
    return makeApiCall<SingleMarchingShowResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/marching-shows/${ documentId }`
        , queryParams: { populate: '*' }
        , options: authHeaders
    } );
};
