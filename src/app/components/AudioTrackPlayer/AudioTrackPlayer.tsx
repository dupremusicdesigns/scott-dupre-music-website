'use client';

import {
    useRef
    , useState
} from 'react';
import { css } from '../../../../styled-system/css';
import { hstack } from '../../../../styled-system/patterns';

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

    const togglePlay = () => {
        if ( !audioRef.current ) return;

        if ( isPlaying ) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying( !isPlaying );
    };

    const handleEnded = () => {
        setIsPlaying( false );
    };

    return (
        <button
            onClick={ togglePlay }
            className={
                css( {
                    display: 'flex'
                    , alignItems: 'center'
                    , gap: 'md'
                    , width: '100%'
                    , padding: 'md'
                    , border: '2px solid'
                    , borderColor: 'brand.black'
                    , borderRadius: 'full'
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
                onEnded={ handleEnded }
            />
            <div
                className={
                    css( {
                        display: 'flex'
                        , alignItems: 'center'
                        , justifyContent: 'center'
                        , width: '60px'
                        , height: '60px'
                        , flexShrink: 0
                    } )
                }
            >
                <svg
                    width='60'
                    height='60'
                    viewBox='0 0 60 60'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <circle
                        cx='30'
                        cy='30'
                        r='29'
                        stroke='black'
                        strokeWidth='2'
                    />
                    {
                        isPlaying
                            ? (
                                <>
                                    <rect
                                        x='22'
                                        y='20'
                                        width='5'
                                        height='20'
                                        fill='black'
                                    />
                                    <rect
                                        x='33'
                                        y='20'
                                        width='5'
                                        height='20'
                                        fill='black'
                                    />
                                </>
                            )
                            : (
                                <path
                                    d='M24 20L40 30L24 40V20Z'
                                    fill='black'
                                />
                            )
                    }
                </svg>
            </div>
            <div
                className={
                    hstack( {
                        gap: 'lg'
                        , alignItems: 'center'
                        , flex: 1
                    } )
                }
            >
                <div
                    className={
                        css( {
                            display: 'flex'
                            , flexDirection: 'column'
                            , alignItems: 'flex-start'
                            , textAlign: 'left'
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
            </div>
        </button>
    );
};
