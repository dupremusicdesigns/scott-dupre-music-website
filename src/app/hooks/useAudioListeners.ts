import {
    useEffect
    , RefObject
} from 'react';

type UseAudioListenersOptions = {
    audioRef: RefObject<HTMLAudioElement | null>;
    onPlay?: () => void;
    onPause?: () => void;
    onEnded?: () => void;
}

/**
 * Hook that attaches event listeners to an HTMLAudioElement.
 *
 * This hook manages the lifecycle of event listeners for 'play', 'pause', and 'ended' events
 * on a provided audio reference. It automatically adds listeners when the component mounts
 * or dependencies change, and cleans them up when the component unmounts or dependencies update.
 *
 * @param options - The configuration object for the audio listeners.
 * @param options.audioRef - A React RefObject pointing to the HTMLAudioElement.
 * @param options.onPlay - Optional callback function to execute when the 'play' event fires.
 * @param options.onPause - Optional callback function to execute when the 'pause' event fires.
 * @param options.onEnded - Optional callback function to execute when the 'ended' event fires.
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
}: UseAudioListenersOptions ) => {
    useEffect( () => {
        const audio = audioRef.current;

        if ( !audio ) return;

        const controller = new AbortController();
        const { signal } = controller;

        if ( onPlay ) audio.addEventListener( 'play', onPlay, { signal } );
        if ( onPause ) audio.addEventListener( 'pause', onPause, { signal } );
        if ( onEnded ) audio.addEventListener( 'ended', onEnded, { signal } );

        return () => controller.abort();
    }, [ audioRef, onPlay, onPause, onEnded ] );
};
