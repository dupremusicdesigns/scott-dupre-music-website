import {
    useEffect
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
    useEffect( () => {
        const audio = audioRef.current;

        if ( !audio ) return;

        const controller = new AbortController();
        const { signal } = controller;

        const handleDurationChange = () => {
            if ( onDurationChange && Number.isFinite( audio.duration ) ) {
                onDurationChange( audio.duration );
            }
        };

        if ( audio.readyState >= 1 ) {
            handleDurationChange();
        }

        if ( onPlay ) audio.addEventListener( 'play', onPlay, { signal } );
        if ( onPause ) audio.addEventListener( 'pause', onPause, { signal } );
        if ( onEnded ) audio.addEventListener( 'ended', onEnded, { signal } );
        if ( onTimeUpdate ) {
            audio.addEventListener( 'timeupdate', onTimeUpdate, { signal } );
        }
        if ( onDurationChange ) {
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
        }

        return () => controller.abort();
    }, [
        audioRef
        , onPlay
        , onPause
        , onEnded
        , onTimeUpdate
        , onDurationChange
    ] );
};
