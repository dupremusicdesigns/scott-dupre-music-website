'use client';

import {
    useEffect
    , useRef
} from 'react';
import { usePathname } from 'next/navigation';
import LogRocket from 'logrocket';

export const LogRocketProvider = () => {
    const pathname = usePathname();
    const started = useRef( false );

    useEffect( () => {
        if ( started.current || pathname === '/quote' || pathname.startsWith( '/quote/' ) ) {
            return;
        }

        if ( process.env.NODE_ENV === 'production' ) {
            started.current = true;
            LogRocket.init( 'dupre-music-designs/dmd-website', { dom: { inputSanitizer: true } } );
        }
    }, [ pathname ] );

    return null;
};
