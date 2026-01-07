import { css } from '../../styled-system/css';
import { flex } from '../../styled-system/patterns';
import { LinkButton } from './components/LinkButton/LinkButton';
import { CmsImage } from './components/CmsImage/CmsImage';
import { MobileTestimonials } from './components/MobileTestimonials/MobileTestimonials';
import { TestimonialCarousel } from './components/TestimonialCarousel/TestimonialCarousel';
import { getHome } from './api/home';

export default async function Home () {
    const { data: home } = await getHome();

    if ( !home ) {
        throw new Error( 'Failed to fetch home data' );
    }

    return (
        <main
            className={
                css( {
                    position: 'relative'
                    , width: '100%'
                    , backgroundColor: 'background.primary'
                    , md: { paddingBottom: '100px' }
                } )
            }
        >
            <section
                className={
                    css( {
                        position: 'relative'
                        , zIndex: 1
                        , height: '140vw'
                        , maxHeight: '553px'
                        , width: '100%'
                        , overflow: 'hidden'
                        , sm: {
                            height: '80vw'
                            , maxHeight: '480px'
                        }
                        , md: {
                            height: '70vw'
                            , maxHeight: '600px'
                        }
                        , lg: {
                            height: '54vw'
                            , maxHeight: '778px'
                        }
                    } )
                }
            >
                <CmsImage
                    image={ home.heroImage }
                    fallbackAlt='Marching band on football field'
                    priority
                    className={
                        css( {
                            objectFit: 'cover'
                            , objectPosition: '60% center'
                            , md: { objectPosition: 'center top' }
                            , '3xl': { objectPosition: 'center 20%' }
                        } )
                    }
                />
                <div
                    className={
                        css( {
                            position: 'absolute'
                            , top: 0
                            , left: 0
                            , width: '100%'
                            , height: '100%'
                            , background: 'linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0))'
                            , borderBottomLeftRadius: '20px'
                            , borderBottomRightRadius: '20px'
                            , md: {
                                width: '70%'
                                , borderBottomLeftRadius: '0'
                                , borderBottomRightRadius: '0'
                            }
                        } )
                    }
                />
                <div
                    className={
                        css( {
                            position: 'relative'
                            , height: '100%'
                            , paddingLeft: '7%'
                            , paddingRight: '6%'
                            , display: 'flex'
                            , flexDirection: 'column'
                            , justifyContent: 'flex-end'
                            , paddingBottom: '80px'
                            , sm: {
                                justifyContent: 'center'
                                , paddingBottom: '0'
                            }
                        } )
                    }
                >
                    <h1
                        className={
                            css( {
                                fontSize: '42px'
                                , fontWeight: 'black'
                                , lineHeight: '0.95'
                                , color: 'text.inverse'
                                , textTransform: 'uppercase'
                                , maxWidth: '330px'
                                , sm: {
                                    fontSize: '4xl'
                                    , maxWidth: '750px'
                                }
                                , md: { fontSize: '5xl' }
                                , lg: { fontSize: '6xl' }
                            } )
                        }
                    >
                        <span className={ css( { display: 'block' } ) }>
                            Intentional.
                        </span>
                        <span className={ css( { display: 'block' } ) }>
                            Purposeful.
                        </span>
                        <span className={ css( { display: 'block' } ) }>
                            Effective.
                        </span>
                    </h1>
                    <p
                        className={
                            css( {
                                fontSize: '13px'
                                , fontWeight: 'bold'
                                , lineHeight: '1.2'
                                , color: 'text.inverse'
                                , maxWidth: '238px'
                                , marginTop: 'md'
                                , marginBottom: 'lg'
                                , sm: {
                                    fontSize: 'lg'
                                    , maxWidth: '583px'
                                    , marginBottom: '0'
                                }
                                , md: {
                                    fontSize: 'xl'
                                    , marginTop: 'xl'
                                }
                                , lg: {
                                    fontSize: '2xl'
                                    , lineHeight: 'tight'
                                    , marginTop: 'xl'
                                }
                            } )
                        }
                    >
                        Music designed to help students learn efficiently, perform confidently, and succeed on the field.
                    </p>
                    <div
                        className={
                            flex( {
                                flexDirection: 'column'
                                , alignItems: 'flex-start'
                                , gap: 'sm'
                                , marginTop: 'lg'
                                , sm: {
                                    flexDirection: 'row'
                                    , gap: 'md'
                                    , marginTop: 'xl'
                                }
                            } )
                        }
                    >
                        {
                            home.actionButtonPrimary?.slug && (
                                <LinkButton
                                    href={ home.actionButtonPrimary.slug }
                                    variant='white'
                                    size='md'
                                    className={
                                        css( {
                                            width: '70%'
                                            , height: '45px'
                                            , fontSize: '12px'
                                            , borderRadius: '20px'
                                            , sm: {
                                                width: 'auto'
                                                , minWidth: '500px'
                                                , height: '51px'
                                                , fontSize: 'base'
                                                , borderRadius: 'md'
                                            }
                                        } )
                                    }
                                >
                                    { home.actionButtonPrimary.text }
                                </LinkButton>
                            )
                        }
                    </div>
                </div>
            </section>

            <section
                className={
                    css( {
                        display: 'none'
                        , md: {
                            display: 'block'
                            , position: 'relative'
                            , marginTop: '91px'
                        }
                    } )
                }
            >
                <div
                    className={
                        css( {
                            position: 'relative'
                            , width: '93%'
                            , height: 'auto'
                            , backgroundColor: 'background.dark'
                            , borderTopRightRadius: 'md'
                            , borderBottomRightRadius: 'md'
                            , display: 'flex'
                            , flexDirection: 'column'
                            , justifyContent: 'center'
                            , paddingLeft: '7%'
                            , paddingRight: '6%'
                            , paddingY: 'xl'
                            , xl: {
                                height: '287px'
                                , paddingRight: 'calc(7% + 300px)'
                                , paddingY: '0'
                            }
                        } )
                    }
                >
                    <div>
                        <blockquote
                            className={
                                css( {
                                    fontSize: '32px'
                                    , fontWeight: 'normal'
                                    , lineHeight: 'relaxed'
                                    , color: 'text.inverse'
                                } )
                            }
                        >
                            &ldquo;
                            { home.primaryTestimonial?.content }
                            &rdquo;
                        </blockquote>
                        <div
                            className={
                                css( {
                                    fontSize: 'md'
                                    , fontWeight: 'normal'
                                    , lineHeight: 'normal'
                                    , color: 'text.inverse'
                                    , marginTop: 'md'
                                } )
                            }
                        >
                            <p className={ css( { fontWeight: 'black' } ) }>
                                { home.primaryTestimonial?.personName }
                            </p>
                            <p>
                                { home.primaryTestimonial?.personPositionTitle }
                            </p>
                            <p>
                                { home.primaryTestimonial?.personOrganizationName }
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className={
                        css( {
                            display: 'none'
                            , xl: {
                                display: 'block'
                                , position: 'absolute'
                                , top: 0
                                , right: '7%'
                                , width: '282px'
                                , height: '287px'
                                , borderTopRightRadius: 'md'
                                , borderBottomRightRadius: 'md'
                                , overflow: 'hidden'
                            }
                        } )
                    }
                >
                    <CmsImage
                        image={ home.primaryTestimonial?.image || null }
                        fallbackAlt={ home.primaryTestimonial?.personName || 'Testimonial' }
                    />
                </div>
            </section>

            {
                home.additionalTestimonials?.length > 0 && (
                    <>
                        <MobileTestimonials
                            primaryTestimonial={ home.primaryTestimonial }
                            additionalTestimonials={ home.additionalTestimonials }
                        />
                        <TestimonialCarousel testimonials={ home.additionalTestimonials } />
                    </>
                )
            }

            <section
                className={
                    css( {
                        position: 'relative'
                        , width: '100%'
                        , marginTop: 'xl'
                        , display: 'flex'
                        , flexDirection: 'column-reverse'
                        , md: {
                            flexDirection: 'row'
                            , marginTop: '100px'
                        }
                    } )
                }
            >
                <div
                    className={
                        css( {
                            position: 'relative'
                            , width: '100%'
                            , height: '308px'
                            , overflow: 'hidden'
                            , marginTop: 'lg'
                            , md: {
                                width: '46%'
                                , height: 'auto'
                                , aspectRatio: '664/519'
                                , borderTopRightRadius: 'md'
                                , borderBottomRightRadius: 'md'
                                , flexShrink: 0
                                , marginTop: '0'
                            }
                        } )
                    }
                >
                    <CmsImage
                        image={ home.bioImage }
                        fallbackAlt='Scott Dupre'
                        className={
                            css( {
                                objectFit: 'cover'
                                , objectPosition: 'center'
                                , md: { objectPosition: 'center 30%' }
                                , lg: { objectPosition: 'center' }
                            } )
                        }
                    />
                </div>
                <div
                    className={
                        css( {
                            paddingX: '7%'
                            , md: {
                                flex: 1
                                , paddingLeft: 'xl'
                                , paddingRight: '6%'
                                , paddingTop: 'sm'
                            }
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
                                , md: { fontSize: '3xl' }
                            } )
                        }
                    >
                        About Scott Dupre
                    </h2>
                    <p
                        className={
                            css( {
                                fontSize: 'md'
                                , fontWeight: 'normal'
                                , lineHeight: 'normal'
                                , color: 'text.primary'
                                , marginTop: 'md'
                                , maxWidth: '560px'
                                , whiteSpace: 'pre-line'
                                , md: {
                                    fontSize: 'lg'
                                    , marginTop: 'lg'
                                }
                            } )
                        }
                    >
                        { home.bio }
                    </p>
                    <LinkButton
                        href='/about'
                        variant='outlineDark'
                        size='md'
                        className={
                            css( {
                                marginTop: 'lg'
                                , width: '100%'
                                , sm: { width: '197px' }
                                , md: { marginTop: 'xl' }
                            } )
                        }
                    >
                        Read More
                    </LinkButton>
                </div>
            </section>
        </main>
    );
}
