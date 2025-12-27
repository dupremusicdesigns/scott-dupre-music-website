'use client';

import {
    useRef
    , useState
    , useCallback
} from 'react';
import { Button } from '@base-ui/react';
import { css } from '../../../../styled-system/css';
import { useAudio } from '../../context/AudioContext';
import { useAudioListeners } from '../../hooks/useAudioListeners';

type AudioTrackPlayerProps = {
    partNumber: number;
    trackName: string;
    audioUrl: string;
}

export const AudioTrackPlayer = ( {
    partNumber
    , trackName
    , audioUrl
}: AudioTrackPlayerProps ) => {
    const audioRef = useRef<HTMLAudioElement>( null );
    const [ isPlaying, setIsPlaying ] = useState( false );

    const { playAudio } = useAudio();

    const handlePlay = useCallback( () => setIsPlaying( true ), [] );
    const handlePause = useCallback( () => setIsPlaying( false ), [] );

    useAudioListeners( {
        audioRef
        , onPlay: handlePlay
        , onPause: handlePause
    } );

    const togglePlay = () => {
        if ( !audioRef.current ) return;

        if ( isPlaying ) {
            audioRef.current.pause();
        } else {
            playAudio( audioRef.current );
        }
    };

    return (
        <Button
            onClick={ togglePlay }
            className={
                css( {
                    display: 'flex'
                    , alignItems: 'center'
                    , gap: 'md'
                    , width: '100%'
                    , height: '95px'
                    , paddingX: 'md'
                    , border: '2px solid'
                    , borderColor: 'brand.black'
                    , borderRadius: '100px'
                    , backgroundColor: 'transparent'
                    , cursor: 'pointer'
                    , transition: 'all 0.2s'
                    , _hover: {
                        backgroundColor: 'gray.100'
                    }
                } )
            }
        >
            <audio
                ref={ audioRef }
                src={ audioUrl }
            />
            <div
                className={
                    css( {
                        display: 'flex'
                        , alignItems: 'center'
                        , justifyContent: 'center'
                        , width: '63px'
                        , height: '63px'
                        , borderRadius: 'full'
                        , backgroundColor: 'brand.black'
                        , flexShrink: 0
                    } )
                }
            >
                {
                    isPlaying
                        ? (
                            <svg
                                width='20'
                                height='26'
                                viewBox='0 0 20 26'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <rect
                                    x='0'
                                    y='0'
                                    width='6'
                                    height='26'
                                    fill='white'
                                />
                                <rect
                                    x='14'
                                    y='0'
                                    width='6'
                                    height='26'
                                    fill='white'
                                />
                            </svg>
                        )
                        : (
                            <svg
                                width='22'
                                height='26'
                                viewBox='0 0 22 26'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                className={
                                    css( {
                                        marginLeft: '4px'
                                    } )
                                }
                            >
                                <path
                                    d='M22 13L0 26V0L22 13Z'
                                    fill='white'
                                />
                            </svg>
                        )
                }
            </div>
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
                            fontSize: 'md'
                            , fontWeight: 'black'
                            , color: 'text.primary'
                        } )
                    }
                >
                    PART
                    { ' ' }
                    { partNumber }
                </span>
                <span
                    className={
                        css( {
                            fontSize: 'md'
                            , fontWeight: 'medium'
                            , color: 'text.primary'
                        } )
                    }
                >
                    { trackName }
                </span>
            </div>
        </Button>
    );
};
