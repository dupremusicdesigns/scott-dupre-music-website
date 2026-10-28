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

/**
 * Hook that attaches event listeners to an HTMLAudioElement.
 *
 * This hook manages the lifecycle of event listeners for 'play', 'pause', 'ended',
 * 'timeupdate', 'emptied', 'loadedmetadata', and 'durationchange' events on a provided
 * audio reference. It automatically adds listeners when the component mounts and cleans
 * them up when the component unmounts.
 *
 * @param options - The configuration object for the audio listeners.
 * @param options.audioRef - A React RefObject pointing to the HTMLAudioElement.
 * @param options.onPlay - Optional callback function to execute when the 'play' event fires.
 * @param options.onPause - Optional callback function to execute when the 'pause' event fires.
 * @param options.onEnded - Optional callback function to execute when the 'ended' event fires.
 * @param options.onTimeUpdate - Optional callback function to execute when the 'timeupdate' event fires.
 * @param options.onDurationChange - Optional callback function to execute when the audio duration is loaded or changes.
 *
 * @example
 * ```tsx
 * const audioRef = useRef<HTMLAudioElement>(null);
 *
 * useAudioListeners({
 *   audioRef,
 *   onPlay: () => console.log('Audio started'),
 *   onPause: () => console.log('Audio paused'),
 *   onEnded: () => console.log('Audio finished')
 * });
 * ```
 */
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
