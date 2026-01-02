'use client';

import {
    useRef
    , useState
    , useEffect
    , type MouseEvent
} from 'react';
import { Button } from '@base-ui/react';
import { css } from '../../../../styled-system/css';
import { colors } from '../../theme/colors';
import { useAudio } from '../../context/AudioContext';
import { useAudioListeners } from '../../hooks/useAudioListeners';
import { PlayIcon } from '../icons/PlayIcon/PlayIcon';
import { PauseIcon } from '../icons/PauseIcon/PauseIcon';

type AudioTrackPlayerProps = {
    trackId: string;
    partLabel: string;
    trackName: string;
    audioUrl: string;
}

export const AudioTrackPlayer = ( {
    trackId
    , partLabel
    , trackName
    , audioUrl
}: AudioTrackPlayerProps ) => {
    const audioRef = useRef<HTMLAudioElement>( null );
    const containerRef = useRef<HTMLDivElement>( null );
    const [ isPlaying, setIsPlaying ] = useState( false );

    const {
        playAudio
        , registerAudio
        , unregisterAudio
        , playNext
    } = useAudio();

    useEffect( () => {
        if ( audioRef.current ) {
            registerAudio( trackId, audioRef.current );
        }

        return () => {
            unregisterAudio( trackId );
        };
    }, [ trackId, registerAudio, unregisterAudio ] );

    useEffect( () => {
        const audio = audioRef.current;
        const container = containerRef.current;

        if ( !audio || !container ) return;

        const controller = new AbortController();

        audio.addEventListener( 'timeupdate', () => {
            if ( audio.duration ) {
                const progress = ( audio.currentTime / audio.duration ) * 100;

                container.style.background = progress > 0
                    ? `linear-gradient(to right, ${ colors.gray200 } ${ progress }%, transparent ${ progress }%)`
                    : 'transparent';
            }
        }, { signal: controller.signal } );

        return () => controller.abort();
    }, [] );

    const handlePlay = () => setIsPlaying( true );
    const handlePause = () => setIsPlaying( false );
    const handleEnded = () => {
        setIsPlaying( false );
        if ( containerRef.current ) {
            containerRef.current.style.background = 'transparent';
        }
        playNext( trackId );
    };

    useAudioListeners( {
        audioRef
        , onPlay: handlePlay
        , onPause: handlePause
        , onEnded: handleEnded
    } );

    const togglePlay = ( e: MouseEvent ) => {
        e.stopPropagation();

        if ( !audioRef.current ) return;

        if ( isPlaying ) {
            audioRef.current.pause();
        } else {
            playAudio( audioRef.current );
        }
    };

    const handleSeek = ( e: MouseEvent<HTMLDivElement> ) => {
        if ( !audioRef.current || !containerRef.current ) return;

        const rect = containerRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        const newTime = percentage * audioRef.current.duration;

        if ( !isNaN( newTime ) ) {
            audioRef.current.currentTime = newTime;

            if ( !isPlaying ) {
                playAudio( audioRef.current );
            }
        }
    };

    return (
        <div
            ref={ containerRef }
            onClick={ handleSeek }
            className={
                css( {
                    display: 'flex'
                    , alignItems: 'center'
                    , gap: 'sm'
                    , width: '100%'
                    , height: '80px'
                    , paddingX: 'sm'
                    , border: '2px solid'
                    , borderColor: 'brand.black'
                    , borderRadius: 'lg'
                    , cursor: 'pointer'
                    , transition: 'background 0.1s linear'
                    , _hover: {
                        backgroundColor: 'gray.100'
                    }
                    , sm: {
                        gap: 'md'
                        , height: '95px'
                        , paddingX: 'md'
                    }
                } )
            }
        >
            <audio
                ref={ audioRef }
                src={ audioUrl }
            />
            <Button
                onClick={ togglePlay }
                className={
                    css( {
                        display: 'flex'
                        , alignItems: 'center'
                        , justifyContent: 'center'
                        , width: '50px'
                        , height: '50px'
                        , borderRadius: 'full'
                        , backgroundColor: 'brand.black'
                        , flexShrink: 0
                        , cursor: 'pointer'
                        , border: 'none'
                        , transition: 'transform 0.2s'
                        , _hover: {
                            transform: 'scale(1.05)'
                        }
                        , sm: {
                            width: '63px'
                            , height: '63px'
                        }
                    } )
                }
            >
                {
                    isPlaying
                        ? (
                            <PauseIcon
                                className={
                                    css( {
                                        color: 'white'
                                    } )
                                }
                            />
                        )
                        : (
                            <PlayIcon
                                className={
                                    css( {
                                        color: 'white'
                                        , marginLeft: '4px'
                                    } )
                                }
                            />
                        )
                }
            </Button>
            <div
                className={
                    css( {
                        display: 'flex'
                        , flexDirection: 'column'
                        , alignItems: 'flex-start'
                        , textAlign: 'left'
                        , flex: 1
                    } )
                }
            >
                <span
                    className={
                        css( {
                            fontSize: 'sm'
                            , fontWeight: 'black'
                            , color: 'text.primary'
                            , sm: { fontSize: 'md' }
                        } )
                    }
                >
                    { partLabel }
                </span>
                <span
                    className={
                        css( {
                            fontSize: 'sm'
                            , fontWeight: 'medium'
                            , color: 'text.primary'
                            , sm: { fontSize: 'md' }
                        } )
                    }
                >
                    { trackName }
                </span>
            </div>
        </div>
    );
};
