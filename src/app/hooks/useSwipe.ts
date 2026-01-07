'use client';

import { useRef } from 'react';

type UseSwipeOptions = {
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
    threshold?: number;
    disabled?: boolean;
}

type UseSwipeReturn = {
    handleTouchStart: ( e: React.TouchEvent ) => void;
    handleTouchEnd: ( e: React.TouchEvent ) => void;
}

export const useSwipe = ( {
    onSwipeLeft
    , onSwipeRight
    , threshold = 50
    , disabled = false
}: UseSwipeOptions ): UseSwipeReturn => {
    const touchStartRef = useRef<number | null>( null );

    const handleTouchStart = ( e: React.TouchEvent ) => {
        touchStartRef.current = e.touches[ 0 ].clientX;
    };

    const handleTouchEnd = ( e: React.TouchEvent ) => {
        if ( touchStartRef.current === null || disabled ) return;

        const touchEnd = e.changedTouches[ 0 ].clientX;
        const diff = touchStartRef.current - touchEnd;

        if ( Math.abs( diff ) > threshold ) {
            if ( diff > 0 ) {
                onSwipeLeft();
            } else {
                onSwipeRight();
            }
        }

        touchStartRef.current = null;
    };

    return {
        handleTouchStart
        , handleTouchEnd
    };
};
