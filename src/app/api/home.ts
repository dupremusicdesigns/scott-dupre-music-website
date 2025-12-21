import {
    CMS_URL
    , AUTH_HEADERS
} from '../constants/apiContants';
import { makeApiCall } from '../utils/apiUtils';
import { HomeResponse } from '../types';

export const getHome = async (): Promise<HomeResponse> => {
    return makeApiCall<HomeResponse, unknown, Record<string, string>>( {
        url: `${ CMS_URL }/home`
        , queryParams: {
            'populate[0]': 'heroImage'
            , 'populate[1]': 'bioImage'
            , 'populate[2]': 'primaryTestimonial.image'
            , 'populate[3]': 'additionalTestimonials.image'
            , 'populate[4]': 'actionButtonPrimary'
            , 'populate[5]': 'actionButtonSecondary'
        }
        , options: AUTH_HEADERS
    } );
};
