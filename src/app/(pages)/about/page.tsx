import { CMS_URL } from '@/app/constants/apiContants';
import { makeApiCall } from '@/app/utils/apiUtils';
import { MarchingShowsResponse } from '@/app/types/marchingShows';

const AboutPage = async () => {
    const data = await makeApiCall( {
        url: `${ CMS_URL }/marching-shows`
        , schema: {} as MarchingShowsResponse
        , queryParams: { populate: '*' }
        , options: {
            headers: {
                Authorization: `Bearer ${ process.env.CMS_API_TOKEN }`
            }
        }
    } );

    console.log( JSON.stringify( data, null, 2 ) );

    return (
        <div>
            hey
        </div>
    );
};

export default AboutPage;
