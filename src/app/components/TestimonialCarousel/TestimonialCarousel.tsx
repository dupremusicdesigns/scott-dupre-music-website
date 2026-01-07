'use client';

import { css } from '../../../../styled-system/css';
import { Testimonial } from '../../types';
import { ClientCmsImage } from '../CmsImage/ClientCmsImage';
import { useCarousel } from '../../hooks/useCarousel';

type TestimonialCarouselProps = {
    testimonials: Testimonial[];
    interval?: number;
}

export const TestimonialCarousel = ( {
    testimonials
    , interval = 8000
}: TestimonialCarouselProps ) => {
    const {
        currentIndex
        , isTransitioning
        , goToSlide
    } = useCarousel( {
        itemCount: testimonials.length
        , interval
    } );

    const current = testimonials[ currentIndex ];

    if ( !current ) return null;

    return (
        <section
            className={
                css( {
                    display: 'none'
                    , md: {
                        position: 'relative'
                        , display: 'flex'
                        , flexDirection: 'row'
                        , marginTop: '100px'
                        , gap: 'xl'
                    }
                } )
            }
        >
            <div
                className={
                    css( {
                        width: '457px'
                        , paddingLeft: '7%'
                        , paddingRight: '0'
                        , flexShrink: 0
                    } )
                }
            >
                <h2
                    className={
                        css( {
                            fontSize: '3xl'
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
                            height: '350px'
                            , overflow: 'hidden'
                            , opacity: isTransitioning ? 0 : 1
                            , transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)'
                            , transition: 'opacity 1.2s ease, transform 1.2s ease'
                        } )
                    }
                >
                    <p
                        className={
                            css( {
                                fontSize: 'md'
                                , fontWeight: 'normal'
                                , color: 'text.primary'
                            } )
                        }
                    >
                        &ldquo;
                        { current.content }
                        &rdquo;
                    </p>
                    <div
                        className={
                            css( {
                                lineHeight: 'tight'
                                , marginTop: 'md'
                            } )
                        }
                    >
                        <p
                            className={
                                css( {
                                    fontSize: 'xl'
                                    , fontWeight: 'black'
                                    , color: 'text.primary'
                                } )
                            }
                        >
                            { current.personName }
                        </p>
                        {
                            current.personPositionTitle && (
                                <p
                                    className={
                                        css( {
                                            fontSize: 'sm'
                                            , fontWeight: 'medium'
                                            , color: 'text.primary'
                                            , lineHeight: 'list'
                                        } )
                                    }
                                >
                                    { current.personPositionTitle }
                                </p>
                            )
                        }
                        {
                            current.personOrganizationName && (
                                <p
                                    className={
                                        css( {
                                            fontSize: 'sm'
                                            , fontWeight: 'medium'
                                            , color: 'text.primary'
                                            , lineHeight: 'tight'
                                        } )
                                    }
                                >
                                    { current.personOrganizationName }
                                </p>
                            )
                        }
                    </div>
                </div>
                {
                    testimonials.length > 1 && (
                        <div
                            className={
                                css( {
                                    display: 'flex'
                                    , gap: 'xs'
                                    , marginTop: 'lg'
                                } )
                            }
                        >
                            {
                                testimonials.map( ( _, index ) => (
                                    <button
                                        key={ index }
                                        onClick={ () => goToSlide( index ) }
                                        className={
                                            css( {
                                                width: '8px'
                                                , height: '8px'
                                                , borderRadius: 'full'
                                                , backgroundColor: index === currentIndex
                                                    ? 'text.primary'
                                                    : 'gray.300'
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
            <div
                className={
                    css( {
                        position: 'relative'
                        , flex: 1
                        , minHeight: '200px'
                        , overflow: 'hidden'
                        , borderTopLeftRadius: 'md'
                        , borderBottomLeftRadius: 'md'
                        , opacity: isTransitioning ? 0 : 1
                        , transition: 'opacity 1.2s ease'
                    } )
                }
            >
                <ClientCmsImage
                    image={ current.image }
                    fallbackAlt={ current.personName }
                    className={
                        css( {
                            objectFit: 'cover'
                            , objectPosition: 'center center'
                        } )
                    }
                />
            </div>
        </section>
    );
};
