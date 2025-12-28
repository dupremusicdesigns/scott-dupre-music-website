import { notFound } from 'next/navigation';
import Image from 'next/image';
import { css } from '../../../../../styled-system/css';
import { flex } from '../../../../../styled-system/patterns';
import {
    getMarchingShowBySlug
    , getMarchingShows
} from '../../../api/marchingShows';
import {
    slugify
    , stripPartPrefix
} from '../../../utils/generalUtils';
import { getFallbackGradient } from '../../../utils/imageUtils';
import { BackButton } from '../../../components/BackButton/BackButton';
import { AudioTrackList } from '../../../components/AudioTrackPlayer/AudioTrackList';
import { LinkButton } from '../../../components/LinkButton/LinkButton';

type PageProps = {
    params: Promise<{ slug: string }>;
}

export const generateStaticParams = async () => {
    const { data: shows } = await getMarchingShows();

    return shows.map( show => ( {
        slug: slugify( show.showTitle )
    } ) );
};

export default async function MarchingShowPage ( { params }: PageProps ) {
    const { slug } = await params;
    const show = await getMarchingShowBySlug( slug );

    if ( !show ) notFound();

    const { data: allShows } = await getMarchingShows();
    const showIndex = allShows.findIndex( s => s.documentId === show.documentId );

    return (
        <>
            <main
                className={
                    css( {
                        width: '100%'
                        , maxWidth: '1440px'
                        , marginX: 'auto'
                        , paddingY: '3xl'
                        , paddingRight: 'lg'
                        , '2xl': {
                            maxWidth: '1600px'
                        }
                    } )
                }
            >
                <div
                    className={
                        flex( {
                            gap: 'xl'
                        } )
                    }
                >
                    <div
                        className={
                            css( {
                                position: 'relative'
                                , width: '280px'
                                , height: '608px'
                                , flexShrink: 0
                                , marginLeft: '-80px'
                                , borderTopRightRadius: 'md'
                                , borderBottomRightRadius: 'md'
                                , overflow: 'hidden'
                                , '3xl': {
                                    width: '450px'
                                    , height: 'auto'
                                    , alignSelf: 'stretch'
                                    , marginLeft: 0
                                    , borderRadius: 'md'
                                }
                            } )
                        }
                    >
                        <Image
                            src={ show.showArtwork?.url || getFallbackGradient( showIndex ) }
                            alt={ show.showArtwork?.alternativeText || show.showTitle }
                            fill
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
                                    , top: 'md'
                                    , right: 'md'
                                } )
                            }
                        >
                            <BackButton href='/marching-band' />
                        </div>
                    </div>

                    <div
                        className={
                            css( {
                                flex: 1
                                , minWidth: 0
                            } )
                        }
                    >
                        <div
                            className={
                                css( {
                                    marginBottom: 'sm'
                                } )
                            }
                        >
                            <h1
                                className={
                                    css( {
                                        fontSize: '4xl'
                                        , fontWeight: 'black'
                                        , lineHeight: 'tight'
                                    } )
                                }
                            >
                                { show.showTitle }
                            </h1>
                            <p
                                className={
                                    css( {
                                        fontSize: 'xl'
                                        , fontWeight: 'medium'
                                        , marginTop: 'xs'
                                    } )
                                }
                            >
                                Commissioned by
                                { ' ' }
                                { show.commissionedBy }
                            </p>
                        </div>

                        {
                            show.showSections && show.showSections.length > 0 && (
                                <div
                                    className={
                                        css( {
                                            marginTop: 'xl'
                                        } )
                                    }
                                >
                                    <p
                                        className={
                                            css( {
                                                fontSize: 'md'
                                                , fontWeight: 'bold'
                                                , marginBottom: 'sm'
                                            } )
                                        }
                                    >
                                        Selections Include:
                                    </p>
                                    <div
                                        className={
                                            flex( {
                                                flexDirection: 'column'
                                                , gap: 'md'
                                            } )
                                        }
                                    >
                                        {
                                            show.showSections.map( ( section, index ) => (
                                                <div key={ section.id }>
                                                    <p
                                                        className={
                                                            css( {
                                                                fontSize: 'md'
                                                                , fontWeight: 'bold'
                                                            } )
                                                        }
                                                    >
                                                        Part
                                                        { ' ' }
                                                        { index + 1 }
                                                    </p>
                                                    <p
                                                        className={
                                                            css( {
                                                                fontSize: 'md'
                                                                , fontWeight: 'medium'
                                                            } )
                                                        }
                                                    >
                                                        { stripPartPrefix( section.sectionName ) }
                                                    </p>
                                                </div>
                                            ) )
                                        }
                                    </div>
                                </div>
                            )
                        }

                        {
                            show.otherCollaborators && show.otherCollaborators.length > 0 && (
                                <div
                                    className={
                                        css( {
                                            marginTop: 'xl'
                                        } )
                                    }
                                >
                                    {
                                        show.otherCollaborators.map( collaborator => (
                                            <p
                                                key={ collaborator.id }
                                                className={
                                                    css( {
                                                        fontSize: 'base'
                                                        , fontWeight: 'medium'
                                                    } )
                                                }
                                            >
                                                { collaborator.collaboratorName }
                                            </p>
                                        ) )
                                    }
                                </div>
                            )
                        }
                    </div>

                    <div
                        className={
                            css( {
                                width: '534px'
                                , flexShrink: 0
                            } )
                        }
                    >
                        <div
                            className={
                                css( {
                                    border: '2px solid'
                                    , borderColor: 'brand.black'
                                    , borderRadius: 'md'
                                    , padding: 'lg'
                                } )
                            }
                        >
                            <AudioTrackList
                                tracks={
                                    ( show.audioPreviews || [] ).map( preview => ( {
                                        id: preview.id
                                        , trackName: stripPartPrefix( preview.trackName || '' )
                                        , audioUrl: preview.audioFile.url
                                    } ) )
                                }
                            />
                            <div
                                className={
                                    css( {
                                        marginTop: 'lg'
                                        , display: 'flex'
                                        , justifyContent: 'center'
                                    } )
                                }
                            >
                                <LinkButton
                                    href='/contact'
                                    variant='primary'
                                    size='md'
                                    rounded='md'
                                    className={
                                        css( {
                                            width: '251px'
                                        } )
                                    }
                                >
                                    Request A Score
                                </LinkButton>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <section
                className={
                    css( {
                        width: '100%'
                        , backgroundColor: 'background.dark'
                        , paddingTop: '55px'
                        , paddingBottom: '55px'
                        , marginBottom: '2px'
                    } )
                }
            >
                <div
                    className={
                        css( {
                            width: '100%'
                            , maxWidth: '1440px'
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
                                , color: 'text.inverse'
                                , lineHeight: 'tight'
                                , marginBottom: 'md'
                            } )
                        }
                    >
                        Additional Information
                    </h2>
                    <ol
                        className={
                            css( {
                                color: 'text.inverse'
                                , fontSize: 'md'
                                , fontWeight: 'medium'
                                , lineHeight: 'list'
                                , paddingLeft: 'lg'
                                , listStyleType: 'decimal'
                            } )
                        }
                    >
                        <li>
                            All arrangements can be custom tailored to your students.
                        </li>
                        <li>
                            All of the music listed is copyrighted by the respective copyright owners and will require licensing prior to the creation of arrangement for your ensemble.
                        </li>
                        <li>
                            Copyright fees are not included in the price of the arrangement and need to be obtained by the client before creating a custom arrangement.
                        </li>
                        <li>
                            Clients receive a score and parts with limited percussion cues. XML files are available to pass on to percussion arrangers if needed.
                        </li>
                        <li>
                            Percussion and sound design arrangements are available directly through the original creator. Contact information can be available upon request.
                        </li>
                    </ol>
                </div>
            </section>
        </>
    );
}
