export const CMS_URL = 'https://thoughtful-splendor-6f87cc3087.strapiapp.com/api';

export const AUTH_HEADERS = {
    headers: {
        Authorization: `Bearer ${ process.env.CMS_API_TOKEN }`
    }
};
