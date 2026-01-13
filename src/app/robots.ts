import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

// eslint-disable-next-line import/no-default-export
export default function robots (): MetadataRoute.Robots {
    const baseUrl = 'https://www.dupremusicdesigns.com';

    return {
        rules: [
            {
                userAgent: '*'
                , allow: '/'
                , disallow: [
                    '/api/'
                    , '/_next/'
                    , '/cms-assets/'
                ]
            }
        ]
        , sitemap: `${ baseUrl }/sitemap.xml`
        , host: baseUrl
    };
}
