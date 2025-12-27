import Image from 'next/image';
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
                    , paddingBottom: '100px'
                } )
            }
        >
            <section
                className={
                    css( {
                        position: 'relative'
                        , height: '54vw'
                        , maxHeight: '778px'
                        , width: '100%'
                        , overflow: 'hidden'
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
                            , objectPosition: 'center top'
                            , '3xl': {
                                objectPosition: 'center 20%'
                            }
                        } )
                    }
                />
                <div
                    className={
                        css( {
                            position: 'absolute'
                            , top: 0
                            , left: 0
                            , width: '70%'
                            , height: '100%'
                            , background: 'linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0))'
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
                                fontSize: '6xl'
                                , fontWeight: 'black'
                                , lineHeight: 'tight'
                                , color: 'text.inverse'
                                , textTransform: 'uppercase'
                                , maxWidth: '750px'
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
                                fontSize: '2xl'
                                , fontWeight: 'bold'
                                , lineHeight: 'tight'
                                , color: 'text.inverse'
                                , maxWidth: '583px'
                                , marginTop: 'xl'
                            } )
                        }
                    >
                        Music designed to help students learn efficiently, perform confidently, and succeed on the field.
                    </p>
                    <div
                        className={
                            flex( {
                                gap: 'md'
                                , marginTop: 'xl'
                            } )
                        }
                    >
                        {
                            home.actionButtonPrimary?.slug && (
                                <LinkButton
                                    href={ home.actionButtonPrimary.slug }
                                    variant='secondary'
                                    size='md'
                                    className={ css( { width: '197px' } ) }
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
                                    className={ css( { width: '197px' } ) }
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
                        , marginTop: '91px'
                    } )
                }
            >
                <div
                    className={
                        css( {
                            position: 'relative'
                            , width: '93%'
                            , height: '287px'
                            , backgroundColor: 'background.dark'
                            , borderTopRightRadius: 'md'
                            , borderBottomRightRadius: 'md'
                            , display: 'flex'
                            , flexDirection: 'column'
                            , justifyContent: 'center'
                            , paddingLeft: '7%'
                            , paddingRight: '350px'
                        } )
                    }
                >
                    <h2
                        className={
                            css( {
                                fontSize: '3xl'
                                , fontWeight: 'black'
                                , lineHeight: 'tight'
                                , color: 'text.inverse'
                            } )
                        }
                    >
                        What People Say
                    </h2>
                    <div
                        className={
                            css( {
                                display: 'flex'
                                , marginTop: 'lg'
                                , gap: '68px'
                                , alignItems: 'flex-start'
                            } )
                        }
                    >
                        <blockquote
                            className={
                                css( {
                                    fontSize: 'md'
                                    , fontWeight: 'normal'
                                    , lineHeight: '19px'
                                    , color: 'text.inverse'
                                    , width: '638px'
                                    , flexShrink: 0
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
                                    , width: '252px'
                                    , flexShrink: 0
                                    , whiteSpace: 'pre-line'
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
                            position: 'absolute'
                            , top: 0
                            , right: '7%'
                            , width: '282px'
                            , height: '287px'
                            , borderTopRightRadius: 'md'
                            , borderBottomRightRadius: 'md'
                            , overflow: 'hidden'
                        } )
                    }
                >
                    <CmsImage
                        image={ home.primaryTestimonial?.image || null }
                        fallbackAlt={ home.primaryTestimonial?.personName || 'Testimonial' }
                    />
                </div>
            </section>

            <section
                className={
                    css( {
                        position: 'relative'
                        , display: 'flex'
                        , marginTop: '100px'
                        , gap: 'xl'
                    } )
                }
            >
                <div
                    className={
                        css( {
                            width: '457px'
                            , paddingLeft: '7%'
                            , flexShrink: 0
                        } )
                    }
                >
                    <div className={ css( { lineHeight: 'tight' } ) }>
                        <p
                            className={
                                css( {
                                    fontSize: '2xl'
                                    , fontWeight: 'black'
                                    , color: 'text.primary'
                                } )
                            }
                        >
                            Quote 1 Name
                        </p>
                        <p
                            className={
                                css( {
                                    fontSize: 'md'
                                    , fontWeight: 'medium'
                                    , color: 'text.primary'
                                    , lineHeight: 'list'
                                } )
                            }
                        >
                            Director of Bands
                        </p>
                        <p
                            className={
                                css( {
                                    fontSize: 'md'
                                    , fontWeight: 'medium'
                                    , color: 'text.primary'
                                    , lineHeight: 'tight'
                                } )
                            }
                        >
                            High School Name
                        </p>
                    </div>
                    <p
                        className={
                            css( {
                                fontSize: 'lg'
                                , fontWeight: 'normal'
                                , lineHeight: 'normal'
                                , color: 'text.primary'
                                , marginTop: 'md'
                            } )
                        }
                    >
                        &ldquo;This will be where quote 1 will go. This is filler text that will be replaced. This will be where quote 1 will go. This is filler text that will be replaced. This will be where quote 1 will go. This is filler text that will be replaced. This will be where quote 1 will go.&rdquo;
                    </p>
                </div>
                <div
                    className={
                        css( {
                            position: 'relative'
                            , flex: 1
                            , height: '260px'
                            , borderTopLeftRadius: 'md'
                            , borderBottomLeftRadius: 'md'
                            , overflow: 'hidden'
                        } )
                    }
                >
                    <Image
                        src='/images/testimonial-secondary.jpg'
                        alt='Marching band performance'
                        fill
                        sizes='(max-width: 1024px) 100vw, 50vw'
                        className={
                            css( {
                                objectFit: 'cover'
                                , objectPosition: 'right center'
                            } )
                        }
                    />
                </div>
            </section>

            <section
                className={
                    css( {
                        position: 'relative'
                        , width: '100%'
                        , marginTop: '100px'
                        , display: 'flex'
                    } )
                }
            >
                <div
                    className={
                        css( {
                            position: 'relative'
                            , width: '46%'
                            , aspectRatio: '664/519'
                            , borderTopRightRadius: 'md'
                            , borderBottomRightRadius: 'md'
                            , flexShrink: 0
                            , overflow: 'hidden'
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
                            flex: 1
                            , paddingLeft: 'xl'
                            , paddingRight: '6%'
                            , paddingTop: 'sm'
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
                            } )
                        }
                    >
                        About Scott Dupre
                    </h2>
                    <p
                        className={
                            css( {
                                fontSize: 'lg'
                                , fontWeight: 'normal'
                                , lineHeight: 'normal'
                                , color: 'text.primary'
                                , marginTop: 'lg'
                                , maxWidth: '560px'
                                , whiteSpace: 'pre-line'
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
                                marginTop: 'xl'
                                , width: '197px'
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
