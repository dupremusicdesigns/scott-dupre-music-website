import { css } from '../../../../styled-system/css';
import { LinkButton } from '../../components/LinkButton/LinkButton';
import { CmsImage } from '../../components/CmsImage/CmsImage';
import { getAbout } from '../../api/about';

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
                                    , whiteSpace: 'pre-line'
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
                                , width: '37%'
                                , aspectRatio: '1'
                                , borderTopLeftRadius: 'md'
                                , borderBottomLeftRadius: 'md'
                                , overflow: 'hidden'
                                , flexShrink: 0
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
                                , borderTopRightRadius: 'md'
                                , borderBottomRightRadius: 'md'
                                , overflow: 'hidden'
                                , flexShrink: 0
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
                                , fontSize: 'lg'
                                , fontWeight: 'normal'
                                , lineHeight: 'normal'
                                , color: 'text.primary'
                                , whiteSpace: 'pre-line'
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
                            , marginTop: '80px'
                            , paddingLeft: '7%'
                            , paddingRight: '6%'
                        } )
                    }
                >
                    <LinkButton
                        href='/music'
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
