'use client';

import Image from 'next/image';
import { css } from '../../../../styled-system/css';
import { AudioProvider } from '../../context/AudioContext';
import { CategoryAudioPlayer } from './CategoryAudioPlayer';

type CategoryItem = {
    sectionName: string;
    composer: string | null;
    audioUrl: string | null;
}

type CategorySectionListProps = {
    title: string;
    items: CategoryItem[];
    imageIndex: number;
}

export const CategorySectionList = ( {
    title
    , items
    , imageIndex
}: CategorySectionListProps ) => {
    const itemsWithAudio = items.filter( item => item.audioUrl );

    return (
        <div
            className={
                css( {
                    position: 'relative'
                    , borderRadius: 'md'
                    , overflow: 'hidden'
                    , height: '350px'
                    , display: 'flex'
                    , flexDirection: 'column'
                } )
            }
        >
            <div
                className={
                    css( {
                        position: 'absolute'
                        , inset: 0
                        , zIndex: 0
                    } )
                }
            >
                <Image
                    src={ `/gradient-${ imageIndex }.png` }
                    alt={ title }
                    fill
                    sizes='(max-width: 768px) 100vw, 33vw'
                    className={
                        css( {
                            objectFit: 'cover'
                        } )
                    }
                />
            </div>
            <div
                className={
                    css( {
                        position: 'absolute'
                        , inset: 0
                        , backgroundColor: 'rgba(255, 255, 255, 0.85)'
                        , zIndex: 1
                    } )
                }
            />
            <div
                className={
                    css( {
                        position: 'relative'
                        , zIndex: 2
                        , display: 'flex'
                        , flexDirection: 'column'
                        , height: '100%'
                    } )
                }
            >
                <div
                    className={
                        css( {
                            padding: 'md'
                            , borderBottom: '2px solid'
                            , borderColor: 'gray.200'
                        } )
                    }
                >
                    <h3
                        className={
                            css( {
                                fontSize: 'lg'
                                , fontWeight: 'black'
                                , textTransform: 'uppercase'
                                , color: 'text.primary'
                            } )
                        }
                    >
                        { title }
                    </h3>
                </div>
                <div
                    className={
                        css( {
                            flex: 1
                            , overflowY: 'auto'
                            , paddingX: 'md'
                            , paddingBottom: 'md'
                            , '&::-webkit-scrollbar': {
                                width: '6px'
                            }
                            , '&::-webkit-scrollbar-track': {
                                backgroundColor: 'transparent'
                            }
                            , '&::-webkit-scrollbar-thumb': {
                                backgroundColor: 'gray.300'
                                , borderRadius: 'full'
                            }
                            , '&::-webkit-scrollbar-thumb:hover': {
                                backgroundColor: 'gray.400'
                            }
                        } )
                    }
                >
                    {
                        itemsWithAudio.length > 0
                            ? (
                                <AudioProvider>
                                    {
                                        itemsWithAudio.map( ( item, index ) => (
                                            <CategoryAudioPlayer
                                                key={ `${ item.sectionName }-${ index }` }
                                                trackId={ `${ title }-${ index }` }
                                                sectionName={ item.sectionName }
                                                composer={ item.composer }
                                                audioUrl={ item.audioUrl! }
                                            />
                                        ) )
                                    }
                                </AudioProvider>
                            )
                            : (
                                <p
                                    className={
                                        css( {
                                            fontSize: 'sm'
                                            , color: 'text.secondary'
                                            , paddingY: 'md'
                                            , textAlign: 'center'
                                        } )
                                    }
                                >
                                    No audio previews available
                                </p>
                            )
                    }
                </div>
            </div>
        </div>
    );
};
