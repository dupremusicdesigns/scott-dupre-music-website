import {
    CMS_URL
    , AUTH_HEADERS
} from '../constants/apiConstants';
import { makeApiCall } from '../utils/apiUtils';
import { cacheImage } from '../utils/assetCache';
import {
    Service
    , ServicesResponse
    , SingleServiceResponse
} from '../types';

const cacheServiceAssets = async ( service: Service ): Promise<Service> => ( {
    ...service
    , testamonials: await Promise.all(
        service.testamonials.map( async testimonial => ( {
            ...testimonial
            , image: await cacheImage( testimonial.image )
        } ) )
    )
} );

export const getServices = async (): Promise<ServicesResponse> => {
    const response = await makeApiCall<ServicesResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/services`
        , queryParams: { populate: '*' }
        , options: AUTH_HEADERS
    } );

    response.data = await Promise.all( response.data.map( cacheServiceAssets ) );

    return response;
};

export const getServiceByDocumentId = async (
    documentId: string
): Promise<SingleServiceResponse> => {
    const response = await makeApiCall<SingleServiceResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/services/${ documentId }`
        , queryParams: { populate: '*' }
        , options: AUTH_HEADERS
    } );

    if ( response.data ) {
        response.data = await cacheServiceAssets( response.data );
    }

    return response;
};
