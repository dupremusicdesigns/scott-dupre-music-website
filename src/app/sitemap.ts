import { MetadataRoute } from 'next';

// eslint-disable-next-line import/no-default-export
export default function sitemap (): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.dupremusicdesigns.com';
    const currentDate = new Date();

    return [
        {
            url: baseUrl
            , lastModified: currentDate
            , changeFrequency: 'monthly'
            , priority: 1
        }
        , {
            url: `${ baseUrl }/about`
            , lastModified: currentDate
            , changeFrequency: 'monthly'
            , priority: 0.8
        }
        , {
            url: `${ baseUrl }/services`
            , lastModified: currentDate
            , changeFrequency: 'monthly'
            , priority: 0.9
        }
        , {
            url: `${ baseUrl }/marching-band`
            , lastModified: currentDate
            , changeFrequency: 'weekly'
            , priority: 0.9
        }
        , {
            url: `${ baseUrl }/build-your-own-show`
            , lastModified: currentDate
            , changeFrequency: 'monthly'
            , priority: 0.8
        }
        , {
            url: `${ baseUrl }/contact`
            , lastModified: currentDate
            , changeFrequency: 'yearly'
            , priority: 0.6
        }
    ];
}
