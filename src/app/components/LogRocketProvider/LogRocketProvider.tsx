'use client';

import { useEffect } from 'react';
import LogRocket from 'logrocket';

export const LogRocketProvider = () => {
    useEffect( () => {
        if ( process.env.NODE_ENV === 'production' ) {
            LogRocket.init( 'dupre-music-designs/dmd-website' );
        }
    }, [] );

    return null;
};
