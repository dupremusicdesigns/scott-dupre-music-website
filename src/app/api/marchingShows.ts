import {
    CMS_URL
    , AUTH_HEADERS
} from '../constants/apiConstants';
import { makeApiCall } from '../utils/apiUtils';
import {
    cacheImage
    , cacheAudioFile
} from '../utils/assetCache';
import {
    MarchingShow
    , MarchingShowsResponse
    , SingleMarchingShowResponse
} from '../types';
import { slugify } from '../utils/generalUtils';

const cacheShowAssets = async ( show: MarchingShow ): Promise<MarchingShow> => ( {
    ...show
    , showArtwork: await cacheImage( show.showArtwork )
    , showSections: await Promise.all(
        show.showSections.map( async section => ( {
            ...section
            , audioFile: await cacheAudioFile( section.audioFile )
        } ) )
    )
    , audioPreviews: await Promise.all(
        show.audioPreviews.map( async preview => ( {
            ...preview
            , audioFile: await cacheAudioFile( preview.audioFile )
        } ) )
    )
} );

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

    let allData = firstPage.data;

    if ( pageCount > 1 ) {
        const remainingPages = await Promise.all(
            Array.from( { length: pageCount - 1 }, ( _, i ) => fetchMarchingShowsPage( i + 2 ) )
        );
        allData = [
            ...allData
            , ...remainingPages.flatMap( page => page.data )
        ];
    }

    const cachedData = await Promise.all( allData.map( cacheShowAssets ) );

    return {
        data: cachedData
        , meta: {
            pagination: {
                ...firstPage.meta.pagination
                , total
                , pageCount: 1
                , pageSize: cachedData.length
            }
        }
    };
};

export const getMarchingShowByDocumentId = async (
    documentId: string
): Promise<SingleMarchingShowResponse> => {
    const response = await makeApiCall<SingleMarchingShowResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/marching-shows/${ documentId }`
        , queryParams: {
            'populate[0]': 'showArtwork'
            , 'populate[1]': 'showSections.audioFile'
            , 'populate[2]': 'otherCollaborators'
            , 'populate[3]': 'audioPreviews.audioFile'
        }
        , options: AUTH_HEADERS
    } );

    response.data = await cacheShowAssets( response.data );

    return response;
};

export const getMarchingShowBySlug = async (
    slug: string
): Promise<MarchingShow | null> => {
    const { data: shows } = await getMarchingShows();
    return shows.find( show => slugify( show.showTitle ) === slug ) || null;
};
