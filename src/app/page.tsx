'use client';

import Image from 'next/image';
import Link from 'next/link';
import { css } from '../../styled-system/css';
import { flex } from '../../styled-system/patterns';
import { Button } from './components/Button/Button';

export default function Home () {
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
                <Image
                    src='/images/hero-bg.jpg'
                    alt='Marching band on football field'
                    fill
                    priority
                    className={
                        css( {
                            objectFit: 'cover'
                            , objectPosition: 'center top'
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
                        <Button
                            render={
                                props => (
                                    <Link
                                        href='/contact'
                                        { ...props }
                                    />
                                )
                            }
                            nativeButton={ false }
                            variant='secondary'
                            size='md'
                        >
                            Contact
                        </Button>
                        <Button
                            render={
                                props => (
                                    <Link
                                        href='/music'
                                        { ...props }
                                    />
                                )
                            }
                            nativeButton={ false }
                            variant='outline'
                            size='md'
                        >
                            Music
                        </Button>
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
                            &ldquo;Working with Scott Dupre makes not only my life easier but also our kids lives. Scott goes above and beyond to make sure that the students have everything they need to be successful and works diligently to make sure that the entire staff has what they need in a timely fashion! From a design team standpoint, Scott does an excellent job of supporting everyone on the team and works towards making sure that the entire program has everything they need!&rdquo;
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
                                } )
                            }
                        >
                            <p className={ css( { fontWeight: 'black' } ) }>
                                Taylor Smith
                            </p>
                            <p>
                                Director of Bands
                            </p>
                            <p>
                                William B. Travis H.S.
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
                    <Image
                        src='/images/testimonial-photo.jpg'
                        alt='Taylor Smith'
                        fill
                        className={
                            css( {
                                objectFit: 'cover'
                                , objectPosition: 'center'
                            } )
                        }
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
                        className={
                            css( {
                                objectFit: 'cover'
                                , objectPosition: 'center'
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
                    <Image
                        src='/images/about-scott.jpg'
                        alt='Scott Dupre'
                        fill
                        className={
                            css( {
                                objectFit: 'cover'
                                , objectPosition: 'center'
                            } )
                        }
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
                    <div
                        className={
                            css( {
                                fontSize: 'lg'
                                , fontWeight: 'normal'
                                , lineHeight: 'normal'
                                , color: 'text.primary'
                                , marginTop: 'lg'
                                , maxWidth: '560px'
                            } )
                        }
                    >
                        <p>
                            Scott Dupre is an arranger and composer in the Dallas/Ft. Worth metroplex, writing for both high school marching productions and collegiate halftime shows. Scott is actively involved with over 30 programs across the nation, offering services from original marching band arrangements to education and adjudication. Scott&apos;s marching productions have finished as UIL state finalists, BOA finalists, and BOA regional champions around the nation. Scott brings a wealth of experience to his compositions and arrangements through his involvement with the Bluecoats Drum and Bugle Corps and experience in public school education.
                        </p>
                        <p className={ css( { marginTop: 'md' } ) }>
                            Through Scott&apos;s teaching, judging, and performing experiences, he has developed a skill for writing and arranging music to highlight a specific ensemble&apos;s strengths and skill sets. Scott&apos;s goal in creating Dupre Music Designs is to set up every student for success through effective arranging and composing.
                        </p>
                    </div>
                    <Button
                        render={
                            props => (
                                <Link
                                    href='/about'
                                    { ...props }
                                />
                            )
                        }
                        nativeButton={ false }
                        variant='outlineDark'
                        size='md'
                        className={ css( { marginTop: 'xl' } ) }
                    >
                        Read More
                    </Button>
                </div>
            </section>
        </main>
    );
}
