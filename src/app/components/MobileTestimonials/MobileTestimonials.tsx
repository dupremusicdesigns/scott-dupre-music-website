'use client';

import { css } from '../../../../styled-system/css';
import { ClientCmsImage } from '../CmsImage/ClientCmsImage';
import { Testimonial } from '../../types';
import { useCarousel } from '../../hooks/useCarousel';
import { useSwipe } from '../../hooks/useSwipe';

type MobileTestimonialsProps = {
    primaryTestimonial: Testimonial | null;
    additionalTestimonials: Testimonial[];
}

export const MobileTestimonials = ( {
    primaryTestimonial
    , additionalTestimonials
}: MobileTestimonialsProps ) => {
    const {
        currentIndex
        , isTransitioning
        , swipeDirection
        , goToSlide
    } = useCarousel( {
        itemCount: additionalTestimonials.length
    } );

    const {
        handleTouchStart
        , handleTouchEnd
    } = useSwipe( {
        onSwipeLeft: () => {
            const nextIndex = ( currentIndex + 1 ) % additionalTestimonials.length;
            goToSlide( nextIndex, true, 'left' );
        }
        , onSwipeRight: () => {
            const prevIndex = ( currentIndex - 1 + additionalTestimonials.length ) % additionalTestimonials.length;
            goToSlide( prevIndex, true, 'right' );
        }
        , disabled: isTransitioning
    } );

    const getSwipeTransform = () => {
        if ( !isTransitioning ) return 'translateX(0)';
        if ( swipeDirection === 'left' ) return 'translateX(-30px)';
        if ( swipeDirection === 'right' ) return 'translateX(30px)';
        return 'translateY(10px)';
    };

    const current = additionalTestimonials[ currentIndex ];

    if ( !current ) return null;

    return (
        <>
            <div
                className={
                    css( {
                        position: 'relative'
                        , zIndex: 1
                        , width: '100%'
                        , height: '480px'
                        , overflow: 'hidden'
                        , borderBottomLeftRadius: 'md'
                        , borderBottomRightRadius: 'md'
                        , marginTop: '-40px'
                        , md: { display: 'none' }
                    } )
                }
            >
                <div
                    className={
                        css( {
                            position: 'absolute'
                            , top: 0
                            , left: 0
                            , width: '100%'
                            , height: '110%'
                        } )
                    }
                >
                    <ClientCmsImage
                        image={ primaryTestimonial?.image || null }
                        fallbackAlt={ primaryTestimonial?.personName || 'Testimonial' }
                        objectPosition='center top'
                    />
                </div>
                <div
                    className={
                        css( {
                            position: 'absolute'
                            , inset: 0
                            , background: 'linear-gradient(180deg, #151414 40%, rgba(0,0,0,0.7) 52%, rgba(0,0,0,0.3) 67%, rgba(0,0,0,0) 82%)'
                            , borderBottomLeftRadius: 'md'
                            , borderBottomRightRadius: 'md'
                        } )
                    }
                />
                <div
                    className={
                        css( {
                            position: 'absolute'
                            , inset: 0
                            , display: 'flex'
                            , flexDirection: 'column'
                            , paddingTop: '40px'
                            , paddingX: '7%'
                        } )
                    }
                >
                    <blockquote
                        className={
                            css( {
                                fontSize: '2xl'
                                , fontWeight: 'semibold'
                                , lineHeight: 'normal'
                                , color: 'text.inverse'
                            } )
                        }
                    >
                        &ldquo;
                        { primaryTestimonial?.content }
                        &rdquo;
                    </blockquote>
                    <div
                        className={
                            css( {
                                width: '71px'
                                , height: '1px'
                                , backgroundColor: 'gray.300'
                                , marginTop: 'md'
                            } )
                        }
                    />
                    <div
                        className={
                            css( {
                                fontSize: 'xs'
                                , fontWeight: 'medium'
                                , color: 'text.inverse'
                                , marginTop: 'sm'
                            } )
                        }
                    >
                        <p className={ css( { fontWeight: 'bold' } ) }>
                            { primaryTestimonial?.personName }
                        </p>
                        <p>
                            { primaryTestimonial?.personPositionTitle }
                        </p>
                        <p>
                            { primaryTestimonial?.personOrganizationName }
                        </p>
                    </div>
                </div>
            </div>
            <div
                className={
                    css( {
                        position: 'relative'
                        , width: '100%'
                        , height: '580px'
                        , overflow: 'hidden'
                        , borderBottomLeftRadius: 'md'
                        , borderBottomRightRadius: 'md'
                        , marginTop: '-30px'
                        , marginBottom: 'xl'
                        , md: { display: 'none' }
                    } )
                }
                onTouchStart={ handleTouchStart }
                onTouchEnd={ handleTouchEnd }
            >
                <div
                    className={
                        css( {
                            position: 'absolute'
                            , top: 0
                            , left: 0
                            , width: '100%'
                            , height: '140%'
                            , opacity: isTransitioning ? 0 : 1
                            , transition: swipeDirection
                                ? 'opacity 0.2s ease'
                                : 'opacity 1.2s ease'
                        } )
                    }
                >
                    <ClientCmsImage
                        image={ current.image }
                        fallbackAlt={ current.personName }
                        objectPosition='center top'
                    />
                </div>
                <div
                    className={
                        css( {
                            position: 'absolute'
                            , inset: 0
                            , background: 'linear-gradient(180deg, #F5F5F5 55%, rgba(245,245,245,0.7) 67%, rgba(245,245,245,0.3) 80%, rgba(245,245,245,0) 93%)'
                            , borderBottomLeftRadius: 'md'
                            , borderBottomRightRadius: 'md'
                        } )
                    }
                />
                <div
                    className={
                        css( {
                            position: 'absolute'
                            , inset: 0
                            , display: 'flex'
                            , flexDirection: 'column'
                            , paddingTop: '60px'
                            , paddingX: '7%'
                        } )
                    }
                >
                    <h2
                        className={
                            css( {
                                fontSize: '2xl'
                                , fontWeight: 'black'
                                , lineHeight: 'tight'
                                , color: 'text.primary'
                                , marginBottom: 'md'
                            } )
                        }
                    >
                        What People Say
                    </h2>
                    <div
                        className={
                            css( {
                                height: '310px'
                                , overflow: 'hidden'
                                , opacity: isTransitioning ? 0 : 1
                                , transition: swipeDirection
                                    ? 'opacity 0.2s ease, transform 0.2s ease'
                                    : 'opacity 1.2s ease, transform 1.2s ease'
                            } )
                        }
                        style={ { transform: getSwipeTransform() } }
                    >
                        <blockquote
                            className={
                                css( {
                                    fontSize: 'md'
                                    , fontWeight: 'normal'
                                    , lineHeight: 'normal'
                                    , color: 'text.primary'
                                } )
                            }
                        >
                            &ldquo;
                            { current.content }
                            &rdquo;
                        </blockquote>
                        <p
                            className={
                                css( {
                                    fontSize: 'xl'
                                    , fontWeight: 'black'
                                    , color: 'text.primary'
                                    , marginTop: 'md'
                                } )
                            }
                        >
                            { current.personName }
                        </p>
                        <p
                            className={
                                css( {
                                    fontSize: 'sm'
                                    , fontWeight: 'medium'
                                    , color: 'text.primary'
                                } )
                            }
                        >
                            { current.personPositionTitle }
                            { current.personPositionTitle && current.personOrganizationName && ' | ' }
                            { current.personOrganizationName }
                        </p>
                    </div>
                </div>
                {
                    additionalTestimonials.length > 1 && (
                        <div
                            className={
                                css( {
                                    position: 'absolute'
                                    , bottom: 'sm'
                                    , left: '7%'
                                    , display: 'flex'
                                    , gap: 'xs'
                                } )
                            }
                        >
                            {
                                additionalTestimonials.map( ( _, index ) => (
                                    <button
                                        key={ index }
                                        onClick={ () => goToSlide( index ) }
                                        className={
                                            css( {
                                                width: '14px'
                                                , height: '14px'
                                                , borderRadius: 'full'
                                                , backgroundColor: index === currentIndex
                                                    ? 'white'
                                                    : 'rgba(255, 255, 255, 0.4)'
                                                , transition: 'background-color 0.8s ease'
                                                , cursor: 'pointer'
                                                , border: 'none'
                                                , padding: 0
                                            } )
                                        }
                                    />
                                ) )
                            }
                        </div>
                    )
                }
            </div>
        </>
    );
};
