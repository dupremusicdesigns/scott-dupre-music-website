import { CMS_URL } from '../constants/apiContants';
import { makeApiCall } from '../utils/apiUtils';
import { ServicesResponse, SingleServiceResponse } from '../types';

const authHeaders = {
    headers: {
        Authorization: `Bearer ${ process.env.CMS_API_TOKEN }`
    }
};

export const getServices = async (): Promise<ServicesResponse> => {
    return makeApiCall<ServicesResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/services`
        , queryParams: { populate: '*' }
        , options: authHeaders
    } );
};

export const getServiceByDocumentId = async (
    documentId: string
): Promise<SingleServiceResponse> => {
    return makeApiCall<SingleServiceResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/services/${ documentId }`
        , queryParams: { populate: '*' }
        , options: authHeaders
    } );
};
