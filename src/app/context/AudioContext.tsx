'use client';

import {
    createContext
    , useContext
    , useRef
    , useCallback
    , ReactNode
} from 'react';

type AudioContextType = {
    playAudio: ( audio: HTMLAudioElement ) => void;
}

const AudioContext = createContext<AudioContextType | null>( null );

export const AudioProvider = ( { children }: { children: ReactNode } ) => {
    const currentlyPlayingRef = useRef<HTMLAudioElement | null>( null );

    const playAudio = useCallback( ( audio: HTMLAudioElement ) => {
        if ( currentlyPlayingRef.current && currentlyPlayingRef.current !== audio ) {
            currentlyPlayingRef.current.pause();
            currentlyPlayingRef.current.currentTime = 0;
        }

        currentlyPlayingRef.current = audio;

        audio.play();
    }, [] );

    return (
        <AudioContext.Provider
            value={
                {
                    playAudio
                }
            }
        >
            { children }
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext( AudioContext );

    if ( !context ) {
        throw new Error( 'useAudio must be used within an AudioProvider' );
    }

    return context;
};
