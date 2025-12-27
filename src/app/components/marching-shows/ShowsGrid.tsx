'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { css } from '../../../../styled-system/css';
import { grid } from '../../../../styled-system/patterns';
import { Button } from '../Button/Button';
import { MarchingShow } from '../../types';
import { SHOWS_PER_PAGE } from '../../constants/uiConstants';
import { getFallbackGradient } from '../../utils/imageUtils';

type ShowsGridProps = {
    shows: MarchingShow[];
}

export const ShowsGrid = ( { shows }: ShowsGridProps ) => {
    const [ visibleCount, setVisibleCount ] = useState( SHOWS_PER_PAGE );

    const visibleShows = shows.slice( 0, visibleCount );
    const hasMore = visibleCount < shows.length;

    const handleViewMore = () => {
        setVisibleCount( prev => Math.min( prev + SHOWS_PER_PAGE, shows.length ) );
    };

    const handleShowLess = () => {
        setVisibleCount( SHOWS_PER_PAGE );
    };

    return (
        <>
            <div
                className={
                    grid( {
                        columns: 3
                        , columnGap: '30px'
                        , rowGap: '39px'
                    } )
                }
            >
                {
                    visibleShows.map( ( show, index ) => (
                        <Link
                            key={ show.documentId }
                            href={ `/marching-band/${ show.documentId }` }
                            className={
                                css( {
                                    display: 'block'
                                    , position: 'relative'
                                    , aspectRatio: '393/350'
                                    , borderRadius: 'md'
                                    , overflow: 'hidden'
                                    , transition: 'transform 0.2s, box-shadow 0.2s'
                                    , _hover: {
                                        transform: 'scale(1.02)'
                                        , boxShadow: 'lg'
                                    }
                                } )
                            }
                        >
                            <Image
                                src={ show.showArtwork?.url || getFallbackGradient( index ) }
                                alt={ show.showArtwork?.alternativeText || show.showTitle }
                                fill
                                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                priority={ index < 3 }
                                className={
                                    css( {
                                        objectFit: 'cover'
                                    } )
                                }
                            />
                            <div
                                className={
                                    css( {
                                        position: 'absolute'
                                        , bottom: 0
                                        , left: 0
                                        , right: 0
                                        , height: '50%'
                                        , background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)'
                                        , borderBottomLeftRadius: 'md'
                                        , borderBottomRightRadius: 'md'
                                    } )
                                }
                            />
                            <span
                                className={
                                    css( {
                                        position: 'absolute'
                                        , bottom: 'md'
                                        , left: 0
                                        , right: 0
                                        , textAlign: 'center'
                                        , color: 'white'
                                        , fontSize: 'lg'
                                        , fontWeight: 'black'
                                        , textTransform: 'uppercase'
                                    } )
                                }
                            >
                                { show.showTitle }
                            </span>
                        </Link>
                    ) )
                }
            </div>

            { shows.length > SHOWS_PER_PAGE && (
                <div
                    className={
                        css( {
                            display: 'flex'
                            , justifyContent: 'center'
                            , marginTop: '3xl'
                        } )
                    }
                >
                    <Button
                        variant='outlineDark'
                        size='lg'
                        rounded='md'
                        onClick={ hasMore ? handleViewMore : handleShowLess }
                        className={
                            css( {
                                width: '394px'
                            } )
                        }
                    >
                        { hasMore ? 'View More' : 'Show Less' }
                    </Button>
                </div>
            ) }
        </>
    );
};
