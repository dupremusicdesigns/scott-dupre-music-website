'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { css } from '../../../../styled-system/css';
import { Button } from '../Button/Button';
import { MarchingShow } from '../../types';
import { SHOWS_PER_PAGE } from '../../constants/uiConstants';
import { getFallbackGradient } from '../../utils/imageUtils';
import { slugify } from '../../utils/generalUtils';

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
                    css( {
                        display: 'grid'
                        , gridTemplateColumns: '1fr'
                        , columnGap: 'sm'
                        , rowGap: 'sm'
                        , sm: {
                            gridTemplateColumns: 'repeat(2, 1fr)'
                        }
                        , md: {
                            gridTemplateColumns: 'repeat(3, 1fr)'
                            , columnGap: '30px'
                            , rowGap: '39px'
                        }
                    } )
                }
            >
                {
                    visibleShows.map( ( show, index ) => (
                        <Link
                            key={ show.documentId }
                            href={ `/marching-band/${ slugify( show.showTitle ) }` }
                            className={
                                css( {
                                    display: 'block'
                                    , position: 'relative'
                                    , aspectRatio: '393/350'
                                    , borderRadius: 'md'
                                    , overflow: 'hidden'
                                    , transition: 'transform 0.2s, box-shadow 0.2s'
                                    , md: {
                                        _hover: {
                                            transform: 'scale(1.02)'
                                            , boxShadow: 'lg'
                                            , '& .card-overlay': {
                                                opacity: 1
                                            }
                                            , '& .card-gradient': {
                                                opacity: 0
                                            }
                                            , '& .card-title': {
                                                bottom: '50%'
                                                , transform: 'translateY(50%)'
                                                , fontSize: '3xl'
                                            }
                                        }
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
                                    `card-overlay ${ css( {
                                        position: 'absolute'
                                        , inset: 0
                                        , backgroundColor: 'rgba(0, 0, 0, 0.5)'
                                        , opacity: 0
                                        , transition: 'opacity 0.3s ease'
                                    } ) }`
                                }
                            />
                            <div
                                className={
                                    `card-gradient ${ css( {
                                        position: 'absolute'
                                        , bottom: 0
                                        , left: 0
                                        , right: 0
                                        , height: '50%'
                                        , background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)'
                                        , borderBottomLeftRadius: 'md'
                                        , borderBottomRightRadius: 'md'
                                        , transition: 'opacity 0.3s ease'
                                    } ) }`
                                }
                            />
                            {
                                show.comingSoon && (
                                    <div
                                        className={
                                            css( {
                                                position: 'absolute'
                                                , top: '20px'
                                                , right: '-28px'
                                                , width: '130px'
                                                , backgroundColor: 'gray.600'
                                                , color: 'white'
                                                , fontSize: '10px'
                                                , fontWeight: 'bold'
                                                , display: 'flex'
                                                , justifyContent: 'center'
                                                , alignItems: 'center'
                                                , textTransform: 'uppercase'
                                                , letterSpacing: '0.02em'
                                                , paddingY: '6px'
                                                , transform: 'rotate(45deg)'
                                                , transformOrigin: 'center'
                                                , boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                                            } )
                                        }
                                    >
                                        Coming Soon
                                    </div>
                                )
                            }
                            {
                                show.isNew && !show.comingSoon && (
                                    <div
                                        className={
                                            css( {
                                                position: 'absolute'
                                                , top: '16px'
                                                , right: '-32px'
                                                , width: '120px'
                                                , backgroundColor: 'brand.black'
                                                , color: 'white'
                                                , fontSize: 'sm'
                                                , fontWeight: 'bold'
                                                , textAlign: 'center'
                                                , textTransform: 'uppercase'
                                                , letterSpacing: '0.1em'
                                                , paddingY: '6px'
                                                , transform: 'rotate(45deg)'
                                                , boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                                            } )
                                        }
                                    >
                                        New
                                    </div>
                                )
                            }
                            <span
                                className={
                                    `card-title ${ css( {
                                        position: 'absolute'
                                        , bottom: 'md'
                                        , left: 0
                                        , right: 0
                                        , textAlign: 'center'
                                        , color: 'white'
                                        , fontSize: 'lg'
                                        , fontWeight: 'black'
                                        , textTransform: 'uppercase'
                                        , transition: 'all 0.3s ease'
                                    } ) }`
                                }
                            >
                                { show.showTitle }
                            </span>
                        </Link>
                    ) )
                }
            </div>

            {
                shows.length > SHOWS_PER_PAGE && (
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
                                    width: '100%'
                                    , md: { width: '394px' }
                                } )
                            }
                        >
                            { hasMore ? 'View More' : 'Show Less' }
                        </Button>
                    </div>
                )
            }
        </>
    );
};
