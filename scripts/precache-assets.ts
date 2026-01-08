import { config } from 'dotenv';
config();

const precacheAssets = async () => {
    const { getHome } = await import( '../src/app/api/home' );
    const { getAbout } = await import( '../src/app/api/about' );
    const { getMarchingShows } = await import( '../src/app/api/marchingShows' );
    const { getServices } = await import( '../src/app/api/services' );
    const { getGlobal } = await import( '../src/app/api/global' );
    const { saveUrlMap } = await import( '../src/app/utils/assetCache' );

    console.log( 'Pre-caching assets...' );

    const results = await Promise.allSettled( [
        getHome().then( () => console.log( '✓ Home assets cached' ) )
        , getAbout().then( () => console.log( '✓ About assets cached' ) )
        , getMarchingShows().then( () => console.log( '✓ Marching shows assets cached' ) )
        , getServices().then( () => console.log( '✓ Services assets cached' ) )
        , getGlobal().then( () => console.log( '✓ Global assets cached' ) )
    ] );

    const failed = results.filter( r => r.status === 'rejected' );
    if ( failed.length > 0 ) {
        console.error( `${ failed.length } API calls failed:` );

        failed.forEach( r => {
            if ( r.status === 'rejected' ) console.error( r.reason );
        } );
    }

    await saveUrlMap();

    console.log( '✓ URL map saved' );
    console.log( 'Asset pre-caching complete!' );
};

precacheAssets();
