import Image from 'next/image';
import { css } from '../../../../styled-system/css';
import { grid } from '../../../../styled-system/patterns';
import { BuildYourOwnShowForm } from '../../components/build-your-own-show/BuildYourOwnShowForm';

const categories = [
    {
        title: 'Intros & Openers'
        , image: '/images/category-intros.jpg'
    }
    , {
        title: 'Ballads'
        , image: '/images/category-ballads.jpg'
    }
    , {
        title: 'Closers'
        , image: '/images/category-closers.jpg'
    }
];

const additionalInfo = [
    'All arrangements can be custom tailored to your students.'
    , 'All of the music listed is copyrighted by the respective copyright owners and will require licensing prior to the creation of arrangement for your ensemble.'
    , 'Copyright fees are not included in the price of the arrangement and need to be obtained by the client before creating a custom arrangement.'
    , 'Clients receive a score and parts with limited percussion cues. XML files are available to pass on to percussion arrangers if needed.'
    , 'Percussion and sound design arrangements are available directly through the original creator. Contact information can be available upon request.'
];

const BuildYourOwnShowPage = () => {
    return (
        <main
            className={
                css( {
                    width: '100%'
                    , backgroundColor: 'background.primary'
                } )
            }
        >
            <section
                className={
                    css( {
                        maxWidth: '1440px'
                        , marginX: 'auto'
                        , paddingX: '7%'
                        , paddingTop: '2xl'
                    } )
                }
            >
                <h1
                    className={
                        css( {
                            fontSize: '5xl'
                            , fontWeight: 'black'
                            , lineHeight: 'tight'
                            , textTransform: 'uppercase'
                            , color: 'text.primary'
                        } )
                    }
                >
                    Build Your Own Show
                </h1>
                <p
                    className={
                        css( {
                            fontSize: '2xl'
                            , fontWeight: 'medium'
                            , lineHeight: 'normal'
                            , color: 'text.primary'
                            , marginTop: 'sm'
                            , maxWidth: '884px'
                        } )
                    }
                >
                    In just 2 steps, use previously commissioned arrangements to craft a custom marching show that fits your ensemble.
                </p>
            </section>

            <section
                className={
                    css( {
                        maxWidth: '1440px'
                        , marginX: 'auto'
                        , paddingX: '7%'
                        , marginTop: '3xl'
                    } )
                }
            >
                <h2
                    className={
                        css( {
                            fontSize: '4xl'
                            , fontWeight: 'black'
                            , lineHeight: 'tight'
                            , color: 'text.primary'
                        } )
                    }
                >
                    Step 1 - Listen to Music
                </h2>
                <div
                    className={
                        grid( {
                            columns: 3
                            , gap: '30px'
                            , marginTop: 'xl'
                        } )
                    }
                >
                    {
                        categories.map( ( category, index ) => (
                            <div
                                key={ category.title }
                                className={
                                    css( {
                                        position: 'relative'
                                        , aspectRatio: '393/350'
                                        , borderRadius: 'md'
                                        , overflow: 'hidden'
                                    } )
                                }
                            >
                                <Image
                                    src={ `/gradient-${ index + 1 }.png` }
                                    alt={ category.title }
                                    fill
                                    sizes='(max-width: 768px) 100vw, 33vw'
                                    className={
                                        css( {
                                            objectFit: 'cover'
                                        } )
                                    }
                                />
                                <div
                                    className={
                                        css( {
                                            position: 'absolute'
                                            , bottom: 0
                                            , left: 0
                                            , right: 0
                                            , height: '50%'
                                            , background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)'
                                            , borderBottomLeftRadius: 'md'
                                            , borderBottomRightRadius: 'md'
                                        } )
                                    }
                                />
                                <span
                                    className={
                                        css( {
                                            position: 'absolute'
                                            , bottom: 'md'
                                            , left: 0
                                            , right: 0
                                            , textAlign: 'center'
                                            , color: 'white'
                                            , fontSize: 'lg'
                                            , fontWeight: 'black'
                                            , textTransform: 'uppercase'
                                        } )
                                    }
                                >
                                    { category.title }
                                </span>
                            </div>
                        ) )
                    }
                </div>
            </section>

            <section
                className={
                    css( {
                        maxWidth: '1440px'
                        , marginX: 'auto'
                        , paddingX: '7%'
                        , marginTop: '3xl'
                    } )
                }
            >
                <h2
                    className={
                        css( {
                            fontSize: '4xl'
                            , fontWeight: 'black'
                            , lineHeight: 'tight'
                            , color: 'text.primary'
                        } )
                    }
                >
                    Step 2 - Pick Your Music
                </h2>
                <div
                    className={
                        css( {
                            display: 'flex'
                            , marginTop: 'xl'
                            , gap: '0'
                        } )
                    }
                >
                    <div
                        className={
                            css( {
                                flex: '0 0 57%'
                                , minHeight: '800px'
                                , border: '2px solid'
                                , borderColor: 'text.primary'
                                , borderRadius: 'md'
                                , borderTopRightRadius: '0'
                                , borderBottomRightRadius: '0'
                                , padding: 'xl'
                            } )
                        }
                    >
                        <BuildYourOwnShowForm />
                    </div>
                    <div
                        className={
                            css( {
                                position: 'relative'
                                , flex: '0 0 43%'
                                , minHeight: '800px'
                                , borderTopLeftRadius: 'md'
                                , borderBottomLeftRadius: 'md'
                                , overflow: 'hidden'
                            } )
                        }
                    >
                        <Image
                            src='/gradient-4.png'
                            alt='Colorful gradient'
                            fill
                            sizes='50vw'
                            className={
                                css( {
                                    objectFit: 'cover'
                                } )
                            }
                        />
                    </div>
                </div>
            </section>

            <section
                className={
                    css( {
                        backgroundColor: 'background.dark'
                        , marginTop: '3xl'
                        , paddingY: '3xl'
                    } )
                }
            >
                <div
                    className={
                        css( {
                            maxWidth: '1440px'
                            , marginX: 'auto'
                            , paddingX: '7%'
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
                        Additional Information
                    </h2>
                    <ol
                        className={
                            css( {
                                marginTop: 'lg'
                                , paddingLeft: 'xl'
                                , listStyleType: 'decimal'
                            } )
                        }
                    >
                        {
                            additionalInfo.map( ( item, index ) => (
                                <li
                                    key={ index }
                                    className={
                                        css( {
                                            fontSize: 'md'
                                            , fontWeight: 'medium'
                                            , lineHeight: 'relaxed'
                                            , color: 'text.inverse'
                                            , marginBottom: 'xs'
                                        } )
                                    }
                                >
                                    { item }
                                </li>
                            ) )
                        }
                    </ol>
                </div>
            </section>
        </main>
    );
};

export default BuildYourOwnShowPage;
