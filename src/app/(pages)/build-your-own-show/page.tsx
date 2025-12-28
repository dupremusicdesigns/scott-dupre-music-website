import Image from 'next/image';
import { css } from '../../../../styled-system/css';
import { grid } from '../../../../styled-system/patterns';
import { BuildYourOwnShowForm } from '../../components/build-your-own-show/BuildYourOwnShowForm';
import { CategorySectionList } from '../../components/build-your-own-show/CategorySectionList';
import { CategoryListsWrapper } from '../../components/build-your-own-show/CategoryListsWrapper';
import { getMarchingShows } from '../../api/marchingShows';
import { groupShowsBySection } from '../../utils/generalUtils';

const additionalInfo = [
    'All arrangements can be custom tailored to your students.'
    , 'All of the music listed is copyrighted by the respective copyright owners and will require licensing prior to the creation of arrangement for your ensemble.'
    , 'Copyright fees are not included in the price of the arrangement and need to be obtained by the client before creating a custom arrangement.'
    , 'Clients receive a score and parts with limited percussion cues. XML files are available to pass on to percussion arrangers if needed.'
    , 'Percussion and sound design arrangements are available directly through the original creator. Contact information can be available upon request.'
];

const BuildYourOwnShowPage = async () => {
    const { data: shows } = await getMarchingShows();
    const categorizedSections = groupShowsBySection( shows );

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
                <CategoryListsWrapper>
                    <div
                        className={
                            grid( {
                                columns: 3
                                , gap: '30px'
                                , marginTop: 'xl'
                            } )
                        }
                    >
                        <CategorySectionList
                            title='Intros & Openers'
                            items={ categorizedSections.introsAndOpeners }
                            imageIndex={ 1 }
                        />
                        <CategorySectionList
                            title='Ballads'
                            items={ categorizedSections.ballads }
                            imageIndex={ 2 }
                        />
                        <CategorySectionList
                            title='Closers'
                            items={ categorizedSections.closers }
                            imageIndex={ 3 }
                        />
                    </div>
                </CategoryListsWrapper>
            </section>

            <section
                className={
                    css( {
                        marginTop: '3xl'
                        , '3xl': {
                            maxWidth: '1440px'
                            , marginX: 'auto'
                            , paddingX: '7%'
                        }
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
                            , paddingX: '7%'
                            , '3xl': {
                                paddingX: '0'
                            }
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
                                , padding: 'xl'
                                , marginLeft: '7%'
                                , '3xl': {
                                    marginLeft: '0'
                                }
                            } )
                        }
                    >
                        <BuildYourOwnShowForm />
                    </div>
                    <div
                        className={
                            css( {
                                position: 'relative'
                                , flex: '1'
                                , minHeight: '800px'
                                , overflow: 'hidden'
                                , marginLeft: 'md'
                                , borderTopLeftRadius: 'md'
                                , borderBottomLeftRadius: 'md'
                                , '3xl': {
                                    borderRadius: 'md'
                                }
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
                        , marginBottom: '2px'
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
