import {
    CMS_URL
    , AUTH_HEADERS
} from '../constants/apiContants';
import { makeApiCall } from '../utils/apiUtils';
import {
    ServicesResponse
    , SingleServiceResponse
} from '../types';

export const getServices = async (): Promise<ServicesResponse> => {
    return makeApiCall<ServicesResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/services`
        , queryParams: { populate: '*' }
        , options: AUTH_HEADERS
    } );
};

export const getServiceByDocumentId = async (
    documentId: string
): Promise<SingleServiceResponse> => {
    return makeApiCall<SingleServiceResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/services/${ documentId }`
        , queryParams: { populate: '*' }
        , options: AUTH_HEADERS
    } );
};
