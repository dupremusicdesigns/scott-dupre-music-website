import {
    useEffect
    , useRef
    , RefObject
} from 'react';

type UseAudioListenersOptions = {
    audioRef: RefObject<HTMLAudioElement | null>;
    onPlay?: () => void;
    onPause?: () => void;
    onEnded?: () => void;
    onTimeUpdate?: () => void;
    onDurationChange?: ( duration: number ) => void;
}

export const useAudioListeners = ( {
    audioRef
    , onPlay
    , onPause
    , onEnded
    , onTimeUpdate
    , onDurationChange
}: UseAudioListenersOptions ) => {
    const callbacksRef = useRef<Omit<UseAudioListenersOptions, 'audioRef'>>( {
        onPlay
        , onPause
        , onEnded
        , onTimeUpdate
        , onDurationChange
    } );

    useEffect( () => {
        callbacksRef.current = {
            onPlay
            , onPause
            , onEnded
            , onTimeUpdate
            , onDurationChange
        };
    } );

    useEffect( () => {
        const audio = audioRef.current;

        if ( !audio ) return;

        const controller = new AbortController();
        const { signal } = controller;

        const handlePlay = () => callbacksRef.current.onPlay?.();
        const handlePause = () => callbacksRef.current.onPause?.();
        const handleEnded = () => callbacksRef.current.onEnded?.();
        const handleTimeUpdate = () => callbacksRef.current.onTimeUpdate?.();
        const handleDurationChange = () => {
            callbacksRef.current.onDurationChange?.(
                Number.isFinite( audio.duration ) ? audio.duration : 0
            );
        };
        const handleEmptied = () => {
            callbacksRef.current.onPause?.();
            handleTimeUpdate();
            handleDurationChange();
        };

        if ( audio.readyState >= 1 ) {
            handleDurationChange();
        }

        audio.addEventListener( 'play', handlePlay, { signal } );
        audio.addEventListener( 'pause', handlePause, { signal } );
        audio.addEventListener( 'ended', handleEnded, { signal } );
        audio.addEventListener( 'timeupdate', handleTimeUpdate, { signal } );
        audio.addEventListener( 'emptied', handleEmptied, { signal } );
        audio.addEventListener(
            'loadedmetadata'
            , handleDurationChange
            , { signal }
        );
        audio.addEventListener(
            'durationchange'
            , handleDurationChange
            , { signal }
        );

        return () => controller.abort();
    }, [ audioRef ] );
};
