import { css } from '../../styled-system/css';
import { flex } from '../../styled-system/patterns';
import { LinkButton } from './components/LinkButton/LinkButton';
import { CmsImage } from './components/CmsImage/CmsImage';
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
                    , paddingBottom: 'xl'
                    , md: { paddingBottom: '100px' }
                } )
            }
        >
            <section
                className={
                    css( {
                        position: 'relative'
                        , height: '100vw'
                        , maxHeight: '420px'
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
                            , objectPosition: 'center center'
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
                            , md: { width: '70%' }
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
                            , justifyContent: 'center'
                        } )
                    }
                >
                    <h1
                        className={
                            css( {
                                fontSize: '3xl'
                                , fontWeight: 'black'
                                , lineHeight: 'tight'
                                , color: 'text.inverse'
                                , textTransform: 'uppercase'
                                , maxWidth: '750px'
                                , sm: { fontSize: '4xl' }
                                , md: { fontSize: '5xl' }
                                , lg: { fontSize: '6xl' }
                            } )
                        }
                    >
                        <span className={ css( { display: 'block' } ) }>
                            Intentional.
                        </span>
                        <span className={ css( { display: 'block' } ) }>
                            Purposeful. Effective.
                        </span>
                    </h1>
                    <p
                        className={
                            css( {
                                fontSize: 'md'
                                , fontWeight: 'bold'
                                , lineHeight: 'normal'
                                , color: 'text.inverse'
                                , maxWidth: '583px'
                                , marginTop: 'md'
                                , sm: { fontSize: 'lg' }
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
                                    variant='secondary'
                                    size='md'
                                    className={
                                        css( {
                                            width: '100%'
                                            , sm: { width: '197px' }
                                        } )
                                    }
                                >
                                    { home.actionButtonPrimary.text }
                                </LinkButton>
                            )
                        }
                        {
                            home.actionButtonSecondary?.slug && (
                                <LinkButton
                                    href={ home.actionButtonSecondary.slug }
                                    variant='outline'
                                    size='md'
                                    className={
                                        css( {
                                            width: '100%'
                                            , sm: { width: '197px' }
                                        } )
                                    }
                                >
                                    { home.actionButtonSecondary.text }
                                </LinkButton>
                            )
                        }
                    </div>
                </div>
            </section>

            <section
                className={
                    css( {
                        position: 'relative'
                        , marginTop: 'xl'
                        , md: { marginTop: '91px' }
                    } )
                }
            >
                <div
                    className={
                        css( {
                            position: 'relative'
                            , width: '100%'
                            , height: 'auto'
                            , backgroundColor: 'background.dark'
                            , borderRadius: '0'
                            , display: 'flex'
                            , flexDirection: 'column'
                            , justifyContent: 'center'
                            , paddingLeft: '7%'
                            , paddingRight: '7%'
                            , paddingY: 'xl'
                            , md: {
                                width: '93%'
                                , borderTopRightRadius: 'md'
                                , borderBottomRightRadius: 'md'
                                , paddingRight: '6%'
                            }
                            , xl: {
                                height: '287px'
                                , paddingRight: '350px'
                                , paddingY: '0'
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
                                , color: 'text.inverse'
                                , md: { fontSize: '3xl' }
                            } )
                        }
                    >
                        What People Say
                    </h2>
                    <div
                        className={
                            css( {
                                display: 'flex'
                                , flexDirection: 'column'
                                , marginTop: 'md'
                                , gap: 'md'
                                , alignItems: 'flex-start'
                                , lg: {
                                    flexDirection: 'row'
                                    , marginTop: 'lg'
                                    , gap: 'xl'
                                }
                                , xl: { gap: '68px' }
                            } )
                        }
                    >
                        <blockquote
                            className={
                                css( {
                                    fontSize: 'sm'
                                    , fontWeight: 'normal'
                                    , lineHeight: 'relaxed'
                                    , color: 'text.inverse'
                                    , md: { fontSize: 'md' }
                                    , lg: {
                                        width: '638px'
                                        , flexShrink: 0
                                        , lineHeight: '19px'
                                    }
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
                                    fontSize: 'sm'
                                    , fontWeight: 'normal'
                                    , lineHeight: 'normal'
                                    , color: 'text.inverse'
                                    , whiteSpace: 'pre-line'
                                    , md: { fontSize: 'md' }
                                    , lg: {
                                        width: '252px'
                                        , flexShrink: 0
                                    }
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
                home.additionalTestimonials?.[ 0 ] && (
                    <section
                        className={
                            css( {
                                position: 'relative'
                                , display: 'flex'
                                , flexDirection: 'column-reverse'
                                , marginTop: 'xl'
                                , gap: 'lg'
                                , md: {
                                    flexDirection: 'row'
                                    , marginTop: '100px'
                                    , gap: 'xl'
                                }
                            } )
                        }
                    >
                        <div
                            className={
                                css( {
                                    paddingX: '7%'
                                    , md: {
                                        width: '457px'
                                        , paddingLeft: '7%'
                                        , paddingRight: '0'
                                        , flexShrink: 0
                                    }
                                } )
                            }
                        >
                            <div className={ css( { lineHeight: 'tight' } ) }>
                                <p
                                    className={
                                        css( {
                                            fontSize: 'xl'
                                            , fontWeight: 'black'
                                            , color: 'text.primary'
                                            , md: { fontSize: '2xl' }
                                        } )
                                    }
                                >
                                    { home.additionalTestimonials[ 0 ].personName }
                                </p>
                                {
                                    home.additionalTestimonials[ 0 ].personPositionTitle && (
                                        <p
                                            className={
                                                css( {
                                                    fontSize: 'sm'
                                                    , fontWeight: 'medium'
                                                    , color: 'text.primary'
                                                    , lineHeight: 'list'
                                                    , md: { fontSize: 'md' }
                                                } )
                                            }
                                        >
                                            { home.additionalTestimonials[ 0 ].personPositionTitle }
                                        </p>
                                    )
                                }
                                {
                                    home.additionalTestimonials[ 0 ].personOrganizationName && (
                                        <p
                                            className={
                                                css( {
                                                    fontSize: 'sm'
                                                    , fontWeight: 'medium'
                                                    , color: 'text.primary'
                                                    , lineHeight: 'tight'
                                                    , md: { fontSize: 'md' }
                                                } )
                                            }
                                        >
                                            { home.additionalTestimonials[ 0 ].personOrganizationName }
                                        </p>
                                    )
                                }
                            </div>
                            <p
                                className={
                                    css( {
                                        fontSize: 'md'
                                        , fontWeight: 'normal'
                                        , lineHeight: 'normal'
                                        , color: 'text.primary'
                                        , marginTop: 'md'
                                        , md: { fontSize: 'lg' }
                                    } )
                                }
                            >
                                &ldquo;
                                { home.additionalTestimonials[ 0 ].content }
                                &rdquo;
                            </p>
                        </div>
                        <div
                            className={
                                css( {
                                    position: 'relative'
                                    , width: '100%'
                                    , height: '200px'
                                    , overflow: 'hidden'
                                    , md: {
                                        flex: 1
                                        , height: '260px'
                                        , borderTopLeftRadius: 'md'
                                        , borderBottomLeftRadius: 'md'
                                    }
                                } )
                            }
                        >
                            <CmsImage
                                image={ home.additionalTestimonials[ 0 ].image }
                                fallbackAlt={ home.additionalTestimonials[ 0 ].personName }
                                className={
                                    css( {
                                        objectFit: 'cover'
                                        , objectPosition: 'center 70%'
                                        , md: { objectPosition: 'right 70%' }
                                    } )
                                }
                            />
                        </div>
                    </section>
                )
            }

            <section
                className={
                    css( {
                        position: 'relative'
                        , width: '100%'
                        , marginTop: 'xl'
                        , display: 'flex'
                        , flexDirection: 'column'
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
                            , height: '300px'
                            , overflow: 'hidden'
                            , md: {
                                width: '46%'
                                , height: 'auto'
                                , aspectRatio: '664/519'
                                , borderTopRightRadius: 'md'
                                , borderBottomRightRadius: 'md'
                                , flexShrink: 0
                            }
                        } )
                    }
                >
                    <CmsImage
                        image={ home.bioImage }
                        fallbackAlt='Scott Dupre'
                    />
                </div>
                <div
                    className={
                        css( {
                            paddingX: '7%'
                            , paddingTop: 'lg'
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
