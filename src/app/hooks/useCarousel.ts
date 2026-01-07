'use client';

import {
    useState
    , useEffect
    , useRef
} from 'react';

type SwipeDirection = 'left' | 'right' | null;

type UseCarouselOptions = {
    itemCount: number;
    interval?: number;
    transitionDuration?: number;
}

type UseCarouselReturn = {
    currentIndex: number;
    isTransitioning: boolean;
    swipeDirection: SwipeDirection;
    goToSlide: ( index: number, fast?: boolean, direction?: SwipeDirection ) => void;
}

export const useCarousel = ( {
    itemCount
    , interval = 8000
    , transitionDuration = 800
}: UseCarouselOptions ): UseCarouselReturn => {
    const [ currentIndex, setCurrentIndex ] = useState( 0 );
    const [ isTransitioning, setIsTransitioning ] = useState( false );
    const [ swipeDirection, setSwipeDirection ] = useState<SwipeDirection>( null );
    const timerRef = useRef<ReturnType<typeof setInterval> | null>( null );

    const startTimer = () => {
        if ( timerRef.current ) clearInterval( timerRef.current );
        if ( itemCount <= 1 ) return;

        timerRef.current = setInterval( () => {
            setSwipeDirection( null );
            setIsTransitioning( true );
            setTimeout( () => {
                setCurrentIndex( prev => ( prev + 1 ) % itemCount );
                setIsTransitioning( false );
            }, transitionDuration );
        }, interval );
    };

    useEffect( () => {
        startTimer();
        return () => {
            if ( timerRef.current ) clearInterval( timerRef.current );
        };
    }, [ itemCount ] );

    const goToSlide = ( index: number, fast = false, direction: SwipeDirection = null ) => {
        if ( index === currentIndex || isTransitioning ) return;
        setSwipeDirection( direction );
        setIsTransitioning( true );
        setTimeout( () => {
            setCurrentIndex( index );
            setIsTransitioning( false );
            setSwipeDirection( null );
            startTimer();
        }, fast ? 250 : transitionDuration );
    };

    return {
        currentIndex
        , isTransitioning
        , swipeDirection
        , goToSlide
    };
};
