import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { StrapiImage } from '../types';
import {
    AudioFile
    , ShowArtwork
} from '../types/marchingShows';
import { CoverImage } from '../types/articles';
import { AUTH_HEADERS } from '../constants/apiConstants';

const CACHING_ENABLED = process.env.ENABLE_ASSET_CACHE === 'true';
const CACHE_DIR = path.join( process.cwd(), 'public', 'cms-assets' );

const getFileHash = ( url: string ): string =>
    crypto.createHash( 'md5' ).update( url ).digest( 'hex' );

const getExtension = ( url: string ): string => {
    try {
        return path.extname( new URL( url ).pathname ) || '.bin';
    } catch {
        return '.bin';
    }
};

const downloadAsset = async ( url: string ): Promise<string> => {
    const ext = getExtension( url );
    const hash = getFileHash( url );
    const filename = `${ hash }${ ext }`;
    const localPath = `/cms-assets/${ filename }`;
    const fullPath = path.join( CACHE_DIR, filename );

    try {
        await fs.access( fullPath );
        return localPath;
    } catch {
        // File doesn't exist, need to download
    }

    await fs.mkdir( CACHE_DIR, { recursive: true } );

    const response = await fetch( url, AUTH_HEADERS );
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

export const cacheImage = async <T extends StrapiImage | ShowArtwork | CoverImage | null | undefined>(
    image: T
): Promise<T> => {
    if ( !image || !CACHING_ENABLED ) return image;

    return {
        ...image
        , url: await downloadAsset( image.url )
        , formats: await cacheImageFormats( image.formats )
    } as T;
};

export const cacheAudioFile = async <T extends AudioFile | null | undefined>(
    audio: T
): Promise<T> => {
    if ( !audio || !CACHING_ENABLED ) return audio;

    return {
        ...audio
        , url: await downloadAsset( audio.url )
    } as T;
};
