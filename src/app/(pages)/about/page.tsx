'use client';

import Image from 'next/image';
import Link from 'next/link';
import { css } from '../../../../styled-system/css';
import { Button } from '../../components/Button/Button';

export default function AboutPage () {
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
            <div
                className={
                    css( {
                        maxWidth: '1440px'
                        , marginX: 'auto'
                        , position: 'relative'
                    } )
                }
            >
                <section
                    className={
                        css( {
                            paddingLeft: '7%'
                            , paddingRight: '6%'
                            , paddingTop: 'xl'
                        } )
                    }
                >
                    <h1
                        className={
                            css( {
                                fontSize: '6xl'
                                , fontWeight: 'black'
                                , lineHeight: 'tight'
                                , color: 'text.primary'
                                , textTransform: 'uppercase'
                            } )
                        }
                    >
                        About
                    </h1>
                </section>

                <section
                    className={
                        css( {
                            position: 'relative'
                            , marginTop: 'xl'
                            , marginLeft: '7%'
                            , marginRight: '6%'
                            , height: '407px'
                            , borderRadius: 'md'
                            , overflow: 'hidden'
                        } )
                    }
                >
                    <Image
                        src='/images/about-hero.jpg'
                        alt='Marching band on football field'
                        fill
                        priority
                        className={
                            css( {
                                objectFit: 'cover'
                                , objectPosition: 'center'
                            } )
                        }
                    />
                </section>

                <section
                    className={
                        css( {
                            position: 'relative'
                            , marginTop: '80px'
                            , marginLeft: '7%'
                            , marginRight: '6%'
                            , display: 'flex'
                            , gap: 'xl'
                        } )
                    }
                >
                    <div
                        className={
                            css( {
                                flex: 1
                            } )
                        }
                    >
                        <div className={ css( { lineHeight: 'tight' } ) }>
                            <h2
                                className={
                                    css( {
                                        fontSize: '3xl'
                                        , fontWeight: 'black'
                                        , color: 'text.primary'
                                    } )
                                }
                            >
                                Scott Dupre
                            </h2>
                            <p
                                className={
                                    css( {
                                        fontSize: 'lg'
                                        , fontWeight: 'medium'
                                        , color: 'text.primary'
                                        , lineHeight: 'normal'
                                        , marginTop: 'xs'
                                    } )
                                }
                            >
                                Arranger/Creator of Dupre Music Designs
                            </p>
                        </div>
                        <div
                            className={
                                css( {
                                    fontSize: 'lg'
                                    , fontWeight: 'normal'
                                    , lineHeight: 'normal'
                                    , color: 'text.primary'
                                    , marginTop: 'lg'
                                } )
                            }
                        >
                            <p>
                                Scott Dupre is an accomplished composer and arranger with a distinct focus on high school and collegiate marching bands. His extensive involvement as an adjudicator for marching bands throughout the state of Texas underscores his dedication to music education. Drawing upon his background in music education and experience gained from his involvement with the Bluecoats Drum and Bugle Corps, Scott brings a unique and insightful perspective in creating customized musical arrangements tailored to the unique talents of each group&apos;s performers.
                            </p>
                            <p className={ css( { marginTop: 'md' } ) }>
                                Scott received his Masters of Music Education from Southern Methodist University in 2017, and his bachelor&apos;s degree in music education at the University of Houston in 2012. There he had the privilege of studying composition under the mentorship of Dr. Marcus Maroney and Dr. Robert Smith. Before arranging and composing full time, Scott built a noteworthy career in music education, serving as a band director for over a decade including a tenure as the Associate Director of Bands at both Richland High School and North Ridge Middle School. Additionally, he has been an active educator with Drum Corps International for over a decade, currently serving on the brass staff at the Bluecoats Drum and Bugle Corps since 2015. Prior to 2015, he served on the Santa Clara Vanguard Brass staff for 2 seasons.
                            </p>
                        </div>
                    </div>
                    <div
                        className={
                            css( {
                                position: 'relative'
                                , width: '37%'
                                , aspectRatio: '1'
                                , borderTopLeftRadius: 'md'
                                , borderBottomLeftRadius: 'md'
                                , overflow: 'hidden'
                                , flexShrink: 0
                            } )
                        }
                    >
                        <Image
                            src='/images/about-family-portrait.jpg'
                            alt='Scott Dupre with family'
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
                            , marginTop: '80px'
                            , marginLeft: '7%'
                            , marginRight: '6%'
                            , display: 'flex'
                            , gap: 'xl'
                        } )
                    }
                >
                    <div
                        className={
                            css( {
                                position: 'relative'
                                , width: '55%'
                                , aspectRatio: '676/436'
                                , borderRadius: 'md'
                                , overflow: 'hidden'
                                , flexShrink: 0
                            } )
                        }
                    >
                        <Image
                            src='/images/about-family-outdoor.jpg'
                            alt='Scott Dupre family outdoor'
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
                                , fontSize: 'lg'
                                , fontWeight: 'normal'
                                , lineHeight: 'normal'
                                , color: 'text.primary'
                            } )
                        }
                    >
                        <p>
                            In 2013, Scott married his college sweetheart, Katie, and together they are the loving parents of two children, Connor and Madelyn. They reside in Fort Worth, TX with their 2 dogs, Case and Lucy. Outside of the world of music composition and instruction, Scott enjoys cycling, running, following college football, and spending time with family and friends.
                        </p>
                        <p className={ css( { marginTop: 'md' } ) }>
                            Scott&apos;s mission with Dupre Music Designs is to draw from his educational experience and leverage his expertise in arranging and composing to ensure that every member of every musical ensemble is positioned for success. By attentively listening to and comprehensively understanding the unique strengths and weaknesses of each musical group, Scott crafts a marching show that lays the foundation for both the individual growth of students and the overall success of the musical program.
                        </p>
                    </div>
                </section>

                <section
                    className={
                        css( {
                            display: 'flex'
                            , justifyContent: 'center'
                            , marginTop: '80px'
                            , paddingLeft: '7%'
                            , paddingRight: '6%'
                        } )
                    }
                >
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
                        variant='outlineDark'
                        size='lg'
                        className={
                            css( {
                                width: '100%'
                                , maxWidth: '676px'
                            } )
                        }
                    >
                        LET&apos;S LISTEN TO MUSIC
                    </Button>
                </section>
            </div>
        </main>
    );
}
