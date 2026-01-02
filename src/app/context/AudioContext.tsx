'use client';

import {
    createContext
    , useContext
    , useRef
    , ReactNode
} from 'react';

type AudioContextType = {
    playAudio: ( audio: HTMLAudioElement ) => void;
    registerAudio: ( id: string, audio: HTMLAudioElement ) => void;
    unregisterAudio: ( id: string ) => void;
    playNext: ( currentId: string ) => void;
}

const AudioContext = createContext<AudioContextType | null>( null );

export const AudioProvider = ( { children }: { children: ReactNode } ) => {
    const currentlyPlayingRef = useRef<HTMLAudioElement | null>( null );
    const audioMapRef = useRef<Map<string, HTMLAudioElement>>( new Map() );
    const orderRef = useRef<string[]>( [] );

    const playAudio = ( audio: HTMLAudioElement ) => {
        if ( currentlyPlayingRef.current && currentlyPlayingRef.current !== audio ) {
            currentlyPlayingRef.current.pause();
            currentlyPlayingRef.current.currentTime = 0;
        }

        currentlyPlayingRef.current = audio;

        audio.play();
    };

    const registerAudio = ( id: string, audio: HTMLAudioElement ) => {
        audioMapRef.current.set( id, audio );

        if ( !orderRef.current.includes( id ) ) {
            orderRef.current.push( id );
        }
    };

    const unregisterAudio = ( id: string ) => {
        audioMapRef.current.delete( id );
        orderRef.current = orderRef.current.filter( orderId => orderId !== id );
    };

    const playNext = ( currentId: string ) => {
        const currentIndex = orderRef.current.indexOf( currentId );

        if ( currentIndex === -1 || currentIndex >= orderRef.current.length - 1 ) {
            return;
        }

        const nextId = orderRef.current[ currentIndex + 1 ];
        const nextAudio = audioMapRef.current.get( nextId );

        if ( nextAudio ) playAudio( nextAudio );
    };

    return (
        <AudioContext.Provider
            value={
                {
                    playAudio
                    , registerAudio
                    , unregisterAudio
                    , playNext
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
