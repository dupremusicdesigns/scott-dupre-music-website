export const getBlurDataURL = async ( imageUrl: string ): Promise<string> => {
    const response = await fetch( imageUrl );
    const buffer = await response.arrayBuffer();

    const base64 = Buffer.from( buffer ).toString( 'base64' );
    const mimeType = response.headers.get( 'content-type' ) || 'image/jpeg';

    return `data:${ mimeType };base64,${ base64 }`;
};

export const getImageBlurURL = async (
    formats: {
        thumbnail?: { url: string };
        small?: { url: string };
    } | null
    , fallbackUrl: string
): Promise<string> => {
    const thumbnailUrl = formats?.thumbnail?.url || formats?.small?.url;

    if ( thumbnailUrl ) return getBlurDataURL( thumbnailUrl );

    return getBlurDataURL( fallbackUrl );
};
