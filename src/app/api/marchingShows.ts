import {
    CMS_URL
    , AUTH_HEADERS
} from '../constants/apiContants';
import { makeApiCall } from '../utils/apiUtils';
import {
    MarchingShow
    , MarchingShowsResponse
    , SingleMarchingShowResponse
} from '../types';
import { generateSlug } from '../utils/generalUtils';

export const getMarchingShows = async (): Promise<MarchingShowsResponse> => {
    return makeApiCall<MarchingShowsResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/marching-shows`
        , queryParams: {
            'populate[0]': 'showArtwork'
            , 'populate[1]': 'showSections'
            , 'populate[2]': 'otherCollaborators'
            , 'populate[3]': 'audioPreviews.audioFile'
        }
        , options: AUTH_HEADERS
    } );
};

export const getMarchingShowByDocumentId = async (
    documentId: string
): Promise<SingleMarchingShowResponse> => {
    return makeApiCall<SingleMarchingShowResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/marching-shows/${ documentId }`
        , queryParams: {
            'populate[0]': 'showArtwork'
            , 'populate[1]': 'showSections'
            , 'populate[2]': 'otherCollaborators'
            , 'populate[3]': 'audioPreviews.audioFile'
        }
        , options: AUTH_HEADERS
    } );
};

export const getMarchingShowBySlug = async (
    slug: string
): Promise<MarchingShow | null> => {
    const { data: shows } = await getMarchingShows();
    return shows.find( show => generateSlug( show.showTitle ) === slug ) || null;
};
