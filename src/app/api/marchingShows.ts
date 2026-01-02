import {
    CMS_URL
    , AUTH_HEADERS
} from '../constants/apiConstants';
import { makeApiCall } from '../utils/apiUtils';
import {
    MarchingShow
    , MarchingShowsResponse
    , SingleMarchingShowResponse
} from '../types';
import { slugify } from '../utils/generalUtils';

const fetchMarchingShowsPage = async ( page: number ): Promise<MarchingShowsResponse> => {
    return makeApiCall<MarchingShowsResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/marching-shows`
        , queryParams: {
            'populate[0]': 'showArtwork'
            , 'populate[1]': 'showSections.audioFile'
            , 'populate[2]': 'otherCollaborators'
            , 'populate[3]': 'audioPreviews.audioFile'
            , 'pagination[page]': String( page )
            , 'pagination[pageSize]': '100'
        }
        , options: AUTH_HEADERS
    } );
};

export const getMarchingShows = async (): Promise<MarchingShowsResponse> => {
    const firstPage = await fetchMarchingShowsPage( 1 );

    const {
        pageCount
        , total
    } = firstPage.meta.pagination;

    if ( pageCount <= 1 ) return firstPage;

    const remainingPages = await Promise.all(
        Array.from( { length: pageCount - 1 }, ( _, i ) => fetchMarchingShowsPage( i + 2 ) )
    );

    const allData = [
        ...firstPage.data
        , ...remainingPages.flatMap( page => page.data )
    ];

    return {
        data: allData
        , meta: {
            pagination: {
                ...firstPage.meta.pagination
                , total
                , pageCount: 1
                , pageSize: allData.length
            }
        }
    };
};

export const getMarchingShowByDocumentId = async (
    documentId: string
): Promise<SingleMarchingShowResponse> => {
    return makeApiCall<SingleMarchingShowResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/marching-shows/${ documentId }`
        , queryParams: {
            'populate[0]': 'showArtwork'
            , 'populate[1]': 'showSections.audioFile'
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
    return shows.find( show => slugify( show.showTitle ) === slug ) || null;
};
