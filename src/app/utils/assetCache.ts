/* eslint-disable react-hooks/rules-of-hooks */
import fs from 'fs/promises';
import {
    readFileSync
    , existsSync
} from 'fs';
import path from 'path';
import crypto from 'crypto';
import { StrapiImage } from '../types';
import {
    AudioFile
    , ShowArtwork
} from '../types/marchingShows';
import { CoverImage } from '../types/articles';

const CACHE_DIR = path.join( process.cwd(), 'public', 'cms-assets' );
const URL_MAP_PATH = path.join( CACHE_DIR, 'url-map.json' );
const isCachingEnabled = () => process.env.ENABLE_ASSET_CACHE === 'true';
const useCachedUrls = () => process.env.USE_CACHED_URLS === 'true';

let urlMap: Record<string, string> | null = null;

const initUrlMap = () => {
    if ( urlMap === null && existsSync( URL_MAP_PATH ) ) {
        urlMap = JSON.parse( readFileSync( URL_MAP_PATH, 'utf-8' ) );
    }
};

if ( typeof process !== 'undefined' && process.env.USE_CACHED_URLS === 'true' ) {
    initUrlMap();
}

const loadUrlMap = (): Record<string, string> => {
    if ( urlMap ) return urlMap;

    return {};
};

const saveUrlMap = async () => {
    if ( urlMap ) {
        await fs.writeFile( URL_MAP_PATH, JSON.stringify( urlMap, null, 2 ) );
    }
};

const getExtension = ( url: string ): string => {
    try {
        return path.extname( new URL( url ).pathname ) || '.bin';
    } catch {
        return '.bin';
    }
};

const getCachedPath = ( url: string ): string => {
    if ( urlMap && urlMap[ url ] ) return urlMap[ url ];

    const ext = getExtension( url );
    const hash = crypto.createHash( 'md5' ).update( url ).digest( 'hex' );
    const localPath = `/cms-assets/${ hash }${ ext }`;

    if ( !urlMap ) urlMap = {};

    urlMap[ url ] = localPath;

    return localPath;
};

export { saveUrlMap };

const downloadAsset = async ( url: string ): Promise<string> => {
    const localPath = getCachedPath( url );

    if ( useCachedUrls() ) return localPath;

    const filename = localPath.replace( '/cms-assets/', '' );
    const fullPath = path.join( CACHE_DIR, filename );

    try {
        await fs.access( fullPath );
        return localPath;
    } catch {
        // File doesn't exist, need to download
    }

    await fs.mkdir( CACHE_DIR, { recursive: true } );

    const response = await fetch( url );

    if ( !response.ok ) {
        console.error( `Failed to download asset: ${ url }` );

        return url;
    }

    const buffer = Buffer.from( await response.arrayBuffer() );
    await fs.writeFile( fullPath, buffer );

    return localPath;
};

type ImageFormats = StrapiImage['formats'];

const cacheImageFormats = async ( formats: ImageFormats ): Promise<ImageFormats> => {
    if ( !formats ) return null;

    const cached = { ...formats };

    for ( const key of Object.keys( cached ) as ( keyof NonNullable<ImageFormats> )[] ) {
        const format = cached[ key ];

        if ( format?.url ) {
            cached[ key ] = {
                ...format
                , url: await downloadAsset( format.url )
            };
        }
    }

    return cached;
};

const rewriteImageUrls = <T extends StrapiImage | ShowArtwork | CoverImage>( image: T ): T => {
    const map = urlMap || {};

    return {
        ...image
        , url: map[ image.url ] || image.url
    } as T;
};

export const cacheImage = async <T extends StrapiImage | ShowArtwork | CoverImage | null | undefined>(
    image: T
): Promise<T> => {
    if ( !image || !isCachingEnabled() ) return image;
    if ( useCachedUrls() ) return rewriteImageUrls( image ) as T;

    return {
        ...image
        , url: await downloadAsset( image.url )
        , formats: await cacheImageFormats( image.formats )
    } as T;
};

export const cacheAudioFile = async <T extends AudioFile | null | undefined>(
    audio: T
): Promise<T> => {
    if ( !audio || !isCachingEnabled() ) return audio;

    if ( useCachedUrls() ) {
        const map = loadUrlMap();
        return {
            ...audio
            , url: map[ audio.url ] || audio.url
        } as T;
    }

    return {
        ...audio
        , url: await downloadAsset( audio.url )
    } as T;
};
