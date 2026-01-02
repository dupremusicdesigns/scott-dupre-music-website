'use client';

import {
    useRef
    , useState
    , useEffect
    , type MouseEvent
} from 'react';
import { Button } from '@base-ui/react';
import { css } from '../../../../styled-system/css';
import { useAudio } from '../../context/AudioContext';
import { useAudioListeners } from '../../hooks/useAudioListeners';
import { PlayIcon } from '../icons/PlayIcon/PlayIcon';
import { PauseIcon } from '../icons/PauseIcon/PauseIcon';

type CategoryAudioPlayerProps = {
    trackId: string;
    sectionName: string;
    composer: string | null;
    audioUrl: string;
}

export const CategoryAudioPlayer = ( {
    trackId
    , sectionName
    , composer
    , audioUrl
}: CategoryAudioPlayerProps ) => {
    const audioRef = useRef<HTMLAudioElement>( null );
    const containerRef = useRef<HTMLDivElement>( null );
    const progressRef = useRef<HTMLDivElement>( null );
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
        const progressBar = progressRef.current;

        if ( !audio || !progressBar ) return;

        const handleTimeUpdate = () => {
            if ( audio.duration ) {
                const progress = ( audio.currentTime / audio.duration ) * 100;
                progressBar.style.width = `${ progress }%`;
            }
        };

        audio.addEventListener( 'timeupdate', handleTimeUpdate );

        return () => {
            audio.removeEventListener( 'timeupdate', handleTimeUpdate );
        };
    }, [] );

    const handlePlay = () => setIsPlaying( true );
    const handlePause = () => setIsPlaying( false );
    const handleEnded = () => {
        setIsPlaying( false );
        if ( progressRef.current ) {
            progressRef.current.style.width = '0%';
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
                    , paddingY: 'sm'
                    , position: 'relative'
                    , cursor: 'pointer'
                    , _after: {
                        content: '""'
                        , position: 'absolute'
                        , bottom: 0
                        , left: 0
                        , right: 0
                        , height: '2px'
                        , backgroundColor: 'gray.200'
                    }
                } )
            }
        >
            <div
                ref={ progressRef }
                className={
                    css( {
                        position: 'absolute'
                        , bottom: 0
                        , left: 0
                        , width: 0
                        , height: '2px'
                        , backgroundColor: 'brand.black'
                        , transition: 'width 0.1s linear'
                        , zIndex: 1
                    } )
                }
            />
            <Button
                onClick={ togglePlay }
                className={
                    css( {
                        display: 'flex'
                        , alignItems: 'center'
                        , justifyContent: 'center'
                        , width: '40px'
                        , height: '40px'
                        , borderRadius: 'full'
                        , backgroundColor: 'brand.black'
                        , flexShrink: 0
                        , cursor: 'pointer'
                        , border: 'none'
                        , transition: 'transform 0.2s'
                        , _hover: {
                            transform: 'scale(1.05)'
                        }
                    } )
                }
            >
                <audio
                    ref={ audioRef }
                    src={ audioUrl }
                />
                {
                    isPlaying
                        ? (
                            <PauseIcon
                                className={
                                    css( {
                                        color: 'white'
                                        , width: '12px'
                                        , height: '12px'
                                    } )
                                }
                            />
                        )
                        : (
                            <PlayIcon
                                className={
                                    css( {
                                        color: 'white'
                                        , width: '12px'
                                        , height: '12px'
                                        , marginLeft: '2px'
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
                        , flex: 1
                        , minWidth: 0
                    } )
                }
            >
                <span
                    title={ sectionName }
                    className={
                        css( {
                            fontSize: 'sm'
                            , fontWeight: 'bold'
                            , color: 'text.primary'
                            , overflow: 'hidden'
                            , textOverflow: 'ellipsis'
                            , whiteSpace: 'nowrap'
                        } )
                    }
                >
                    { sectionName }
                </span>
                {
                    composer && (
                        <span
                            title={ composer }
                            className={
                                css( {
                                    fontSize: 'xs'
                                    , fontWeight: 'medium'
                                    , fontStyle: 'italic'
                                    , color: 'text.secondary'
                                    , overflow: 'hidden'
                                    , textOverflow: 'ellipsis'
                                    , whiteSpace: 'nowrap'
                                } )
                            }
                        >
                            { composer }
                        </span>
                    )
                }
            </div>
        </div>
    );
};
