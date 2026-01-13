import { css } from '../../../../styled-system/css';
import { LinkButton } from '../../components/LinkButton/LinkButton';
import { CmsImage } from '../../components/CmsImage/CmsImage';
import { getAbout } from '../../api/about';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About'
};

export default async function AboutPage () {
    const { data: about } = await getAbout();

    if ( !about ) {
        throw new Error( 'Failed to fetch about data' );
    }

    return (
        <main
            className={
                css( {
                    position: 'relative'
                    , width: '100%'
                    , backgroundColor: 'background.primary'
                    , paddingBottom: '2xl'
                    , md: { paddingBottom: '100px' }
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
                                fontSize: '4xl'
                                , fontWeight: 'black'
                                , lineHeight: 'tight'
                                , color: 'text.primary'
                                , textTransform: 'uppercase'
                                , sm: { fontSize: '5xl' }
                                , md: { fontSize: '6xl' }
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
                            , marginTop: 'lg'
                            , marginLeft: '7%'
                            , marginRight: '6%'
                            , height: '200px'
                            , borderRadius: 'md'
                            , overflow: 'hidden'
                            , sm: { height: '280px' }
                            , md: {
                                height: '350px'
                                , marginTop: 'xl'
                            }
                            , lg: { height: '407px' }
                        } )
                    }
                >
                    <CmsImage
                        image={ about.heroImage }
                        fallbackAlt='Marching band on football field'
                        priority
                    />
                </section>
                <section
                    className={
                        css( {
                            position: 'relative'
                            , marginTop: 'xl'
                            , marginLeft: '7%'
                            , marginRight: '6%'
                            , display: 'flex'
                            , flexDirection: 'column'
                            , gap: 'lg'
                            , md: {
                                flexDirection: 'row'
                                , gap: 'xl'
                                , marginTop: '80px'
                            }
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
                                        fontSize: '2xl'
                                        , fontWeight: 'black'
                                        , color: 'text.primary'
                                        , sm: { fontSize: '3xl' }
                                    } )
                                }
                            >
                                Scott Dupre
                            </h2>
                            <p
                                className={
                                    css( {
                                        fontSize: 'base'
                                        , fontWeight: 'medium'
                                        , color: 'text.primary'
                                        , lineHeight: 'normal'
                                        , marginTop: 'xs'
                                        , sm: { fontSize: 'lg' }
                                    } )
                                }
                            >
                                Arranger/Creator of Dupre Music Designs
                            </p>
                        </div>
                        <div
                            className={
                                css( {
                                    fontSize: 'base'
                                    , fontWeight: 'normal'
                                    , lineHeight: 'normal'
                                    , color: 'text.primary'
                                    , marginTop: 'lg'
                                    , whiteSpace: 'pre-line'
                                    , sm: { fontSize: 'lg' }
                                } )
                            }
                        >
                            { about.bioTop }
                        </div>
                    </div>
                    <div
                        className={
                            css( {
                                position: 'relative'
                                , width: '100%'
                                , aspectRatio: '1'
                                , borderRadius: 'md'
                                , overflow: 'hidden'
                                , flexShrink: 0
                                , md: {
                                    width: '37%'
                                    , borderRadius: '0'
                                    , borderTopLeftRadius: 'md'
                                    , borderBottomLeftRadius: 'md'
                                }
                            } )
                        }
                    >
                        <CmsImage
                            image={ about.imageTop }
                            fallbackAlt='Scott Dupre with family'
                        />
                    </div>
                </section>
                <section
                    className={
                        css( {
                            position: 'relative'
                            , marginTop: 'xl'
                            , marginLeft: '7%'
                            , marginRight: '6%'
                            , display: 'flex'
                            , flexDirection: 'column-reverse'
                            , gap: 'lg'
                            , md: {
                                flexDirection: 'row'
                                , gap: 'xl'
                                , marginTop: '80px'
                            }
                        } )
                    }
                >
                    <div
                        className={
                            css( {
                                position: 'relative'
                                , width: '100%'
                                , aspectRatio: '676/436'
                                , borderRadius: 'md'
                                , overflow: 'hidden'
                                , flexShrink: 0
                                , md: {
                                    width: '55%'
                                    , borderRadius: '0'
                                    , borderTopRightRadius: 'md'
                                    , borderBottomRightRadius: 'md'
                                }
                            } )
                        }
                    >
                        <CmsImage
                            image={ about.imageBottom }
                            fallbackAlt='Scott Dupre family outdoor'
                        />
                    </div>
                    <div
                        className={
                            css( {
                                flex: 1
                                , fontSize: 'base'
                                , fontWeight: 'normal'
                                , lineHeight: 'normal'
                                , color: 'text.primary'
                                , whiteSpace: 'pre-line'
                                , sm: { fontSize: 'lg' }
                            } )
                        }
                    >
                        { about.bioBottom }
                    </div>
                </section>
                <section
                    className={
                        css( {
                            display: 'flex'
                            , justifyContent: 'center'
                            , marginTop: 'xl'
                            , paddingLeft: '7%'
                            , paddingRight: '6%'
                            , md: { marginTop: '80px' }
                        } )
                    }
                >
                    <LinkButton
                        href='/marching-band'
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
                    </LinkButton>
                </section>
            </div>
        </main>
    );
}
