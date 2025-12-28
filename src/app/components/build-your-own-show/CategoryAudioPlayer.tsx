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
import { PlayIcon } from '../icons/PlayIcon/PlayIcon';
import { PauseIcon } from '../icons/PauseIcon/PauseIcon';

type CategoryAudioPlayerProps = {
    sectionName: string;
    showTitle: string;
    audioUrl: string;
}

export const CategoryAudioPlayer = ( {
    sectionName
    , showTitle
    , audioUrl
}: CategoryAudioPlayerProps ) => {
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
        <div
            className={
                css( {
                    display: 'flex'
                    , alignItems: 'center'
                    , gap: 'sm'
                    , width: '100%'
                    , paddingY: 'sm'
                    , borderBottom: '1px solid'
                    , borderColor: 'gray.200'
                } )
            }
        >
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
                <span
                    title={ showTitle }
                    className={
                        css( {
                            fontSize: 'xs'
                            , fontWeight: 'medium'
                            , color: 'text.secondary'
                            , overflow: 'hidden'
                            , textOverflow: 'ellipsis'
                            , whiteSpace: 'nowrap'
                        } )
                    }
                >
                    { showTitle }
                </span>
            </div>
        </div>
    );
};
