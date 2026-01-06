import { css } from '../../../../styled-system/css';
import { CmsImage } from '../CmsImage/CmsImage';
import { Testimonial } from '../../types';

type MobileTestimonialsProps = {
    primaryTestimonial: Testimonial | null;
    additionalTestimonial: Testimonial;
}

export const MobileTestimonials = ( {
    primaryTestimonial
    , additionalTestimonial
}: MobileTestimonialsProps ) => (
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
                <CmsImage
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
                <h2
                    className={
                        css( {
                            fontSize: '2xl'
                            , fontWeight: 'black'
                            , lineHeight: 'tight'
                            , color: 'text.inverse'
                        } )
                    }
                >
                    What People Say
                </h2>
                <blockquote
                    className={
                        css( {
                            fontSize: 'md'
                            , fontWeight: 'semibold'
                            , lineHeight: 'normal'
                            , color: 'text.inverse'
                            , marginTop: 'md'
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
        >
            <div
                className={
                    css( {
                        position: 'absolute'
                        , top: 0
                        , left: 0
                        , width: '100%'
                        , height: '140%'
                    } )
                }
            >
                <CmsImage
                    image={ additionalTestimonial.image }
                    fallbackAlt={ additionalTestimonial.personName }
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
                        , paddingTop: '70px'
                        , paddingX: '7%'
                    } )
                }
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
                    { additionalTestimonial.content }
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
                    { additionalTestimonial.personName }
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
                    { additionalTestimonial.personPositionTitle }
                    { ' | ' }
                    { additionalTestimonial.personOrganizationName }
                </p>
            </div>
        </div>
    </>
);
