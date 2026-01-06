import Image from 'next/image';
import { css } from '../../../../styled-system/css';
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
                        , paddingTop: 'xl'
                        , md: { paddingTop: '2xl' }
                        , '2xl': { maxWidth: '1600px' }
                    } )
                }
            >
                <h1
                    className={
                        css( {
                            fontSize: '3xl'
                            , fontWeight: 'black'
                            , lineHeight: 'tight'
                            , textTransform: 'uppercase'
                            , color: 'text.primary'
                            , sm: { fontSize: '4xl' }
                            , md: { fontSize: '5xl' }
                        } )
                    }
                >
                    Build Your Own Show
                </h1>
                <p
                    className={
                        css( {
                            fontSize: 'lg'
                            , fontWeight: 'medium'
                            , lineHeight: 'normal'
                            , color: 'text.primary'
                            , marginTop: 'sm'
                            , maxWidth: '884px'
                            , sm: { fontSize: 'xl' }
                            , md: { fontSize: '2xl' }
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
                        , marginTop: 'xl'
                        , md: { marginTop: '3xl' }
                        , '2xl': { maxWidth: '1600px' }
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
                            , sm: { fontSize: '3xl' }
                            , md: { fontSize: '4xl' }
                        } )
                    }
                >
                    Step 1 - Listen to Music
                </h2>
                <CategoryListsWrapper>
                    <div
                        className={
                            css( {
                                display: 'grid'
                                , gridTemplateColumns: '1fr'
                                , gap: 'md'
                                , marginTop: 'lg'
                                , md: {
                                    gridTemplateColumns: 'repeat(2, 1fr)'
                                    , gap: 'lg'
                                }
                                , xl: {
                                    gridTemplateColumns: 'repeat(4, 1fr)'
                                    , gap: '30px'
                                    , marginTop: 'xl'
                                }
                            } )
                        }
                    >
                        <CategorySectionList
                            title='Intros'
                            items={ categorizedSections.intros }
                            imageIndex={ 1 }
                        />
                        <CategorySectionList
                            title='Openers'
                            items={ categorizedSections.openers }
                            imageIndex={ 2 }
                        />
                        <CategorySectionList
                            title='Ballads'
                            items={ categorizedSections.ballads }
                            imageIndex={ 3 }
                        />
                        <CategorySectionList
                            title='Closers'
                            items={ categorizedSections.closers }
                            imageIndex={ 4 }
                        />
                    </div>
                </CategoryListsWrapper>
            </section>

            <section
                className={
                    css( {
                        maxWidth: '1440px'
                        , marginX: 'auto'
                        , marginTop: 'xl'
                        , paddingX: '7%'
                        , md: { marginTop: '3xl' }
                        , '2xl': { maxWidth: '1600px' }
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
                            , sm: { fontSize: '3xl' }
                            , md: { fontSize: '4xl' }
                        } )
                    }
                >
                    Step 2 - Pick Your Music
                </h2>
                <div
                    className={
                        css( {
                            display: 'flex'
                            , marginTop: 'lg'
                            , gap: '0'
                            , md: { marginTop: 'xl' }
                        } )
                    }
                >
                    <div
                        className={
                            css( {
                                flex: '1'
                                , minHeight: '500px'
                                , border: '2px solid'
                                , borderColor: 'text.primary'
                                , borderRadius: 'md'
                                , padding: 'md'
                                , sm: { padding: 'lg' }
                                , md: {
                                    padding: 'xl'
                                    , minHeight: '800px'
                                }
                                , lg: {
                                    flex: '0 0 57%'
                                }
                            } )
                        }
                    >
                        <BuildYourOwnShowForm />
                    </div>
                    <div
                        className={
                            css( {
                                display: 'none'
                                , lg: {
                                    display: 'block'
                                    , position: 'relative'
                                    , flex: '1'
                                    , minHeight: '800px'
                                    , overflow: 'hidden'
                                    , marginLeft: 'md'
                                    , borderTopLeftRadius: 'md'
                                    , borderBottomLeftRadius: 'md'
                                }
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
                        , marginTop: 'xl'
                        , paddingY: 'xl'
                        , marginBottom: '2px'
                        , md: {
                            marginTop: '3xl'
                            , paddingY: '3xl'
                        }
                    } )
                }
            >
                <div
                    className={
                        css( {
                            maxWidth: '1440px'
                            , marginX: 'auto'
                            , paddingX: '7%'
                            , '2xl': { maxWidth: '1600px' }
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
                                , sm: { fontSize: '3xl' }
                            } )
                        }
                    >
                        Additional Information
                    </h2>
                    <ol
                        className={
                            css( {
                                marginTop: 'md'
                                , paddingLeft: 'lg'
                                , listStyleType: 'decimal'
                                , md: {
                                    marginTop: 'lg'
                                    , paddingLeft: 'xl'
                                }
                            } )
                        }
                    >
                        {
                            additionalInfo.map( ( item, index ) => (
                                <li
                                    key={ index }
                                    className={
                                        css( {
                                            fontSize: 'sm'
                                            , fontWeight: 'medium'
                                            , lineHeight: 'relaxed'
                                            , color: 'text.inverse'
                                            , marginBottom: 'xs'
                                            , sm: { fontSize: 'md' }
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
