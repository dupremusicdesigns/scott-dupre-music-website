import { notFound } from 'next/navigation';
import Image from 'next/image';
import { css } from '../../../../../styled-system/css';
import { flex } from '../../../../../styled-system/patterns';
import { getMarchingShowBySlug, getMarchingShows } from '../../../api/marchingShows';
import { generateSlug } from '../../../utils/generalUtils';
import { getFallbackGradient } from '../../../utils/imageUtils';
import { BackButton } from '../../../components/BackButton/BackButton';
import { AudioTrackPlayer } from '../../../components/AudioTrackPlayer/AudioTrackPlayer';
import { LinkButton } from '../../../components/LinkButton/LinkButton';
import { Footer } from '../../../components/layout/Footer/Footer';

type PageProps = {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams () {
    const { data: shows } = await getMarchingShows();
    return shows.map( show => ( {
        slug: generateSlug( show.showTitle )
    } ) );
}

export default async function MarchingShowPage ( { params }: PageProps ) {
    const { slug } = await params;
    const show = await getMarchingShowBySlug( slug );

    if ( !show ) {
        notFound();
    }

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
                        , position: 'relative'
                        , minHeight: '789px'
                    } )
                }
            >
                <div
                    className={
                        css( {
                            position: 'absolute'
                            , left: 0
                            , top: 0
                            , width: '213px'
                            , height: '608px'
                            , borderBottomRightRadius: 'lg'
                            , overflow: 'hidden'
                            , marginTop: '81px'
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
                </div>

                <div
                    className={
                        css( {
                            paddingLeft: '242px'
                            , paddingRight: '7%'
                            , paddingTop: '2xl'
                            , paddingBottom: '3xl'
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
                                    flex: 1
                                } )
                            }
                        >
                            <div
                                className={
                                    flex( {
                                        alignItems: 'flex-start'
                                        , gap: 'md'
                                        , marginBottom: 'sm'
                                    } )
                                }
                            >
                                <BackButton href='/marching-band' />
                                <div>
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
                                        Commissioned by { show.commisionedBy }
                                    </p>
                                </div>
                            </div>

                            {
                                show.showSections && show.showSections.length > 0 && (
                                    <div
                                        className={
                                            css( {
                                                marginTop: 'xl'
                                                , marginLeft: '79px'
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
                                                            Part { index + 1 }
                                                        </p>
                                                        <p
                                                            className={
                                                                css( {
                                                                    fontSize: 'md'
                                                                    , fontWeight: 'medium'
                                                                } )
                                                            }
                                                        >
                                                            { section.sectionName }
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
                                                , marginLeft: '79px'
                                            } )
                                        }
                                    >
                                        <p
                                            className={
                                                css( {
                                                    fontSize: 'base'
                                                    , fontWeight: 'medium'
                                                } )
                                            }
                                        >
                                            Arrangements by Scott Dupre
                                        </p>
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
                                                    { collaborator.role }: { collaborator.collaboratorName }
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
                                        , borderRadius: 'lg'
                                        , padding: 'lg'
                                    } )
                                }
                            >
                                <div
                                    className={
                                        flex( {
                                            flexDirection: 'column'
                                            , gap: 'md'
                                        } )
                                    }
                                >
                                    {
                                        show.audioPreviews && show.audioPreviews.length > 0 ? (
                                            show.audioPreviews.map( ( preview, index ) => (
                                                <AudioTrackPlayer
                                                    key={ preview.id }
                                                    partNumber={ index + 1 }
                                                    trackName={ preview.trackName }
                                                    audioUrl={ preview.audioFile.url }
                                                />
                                            ) )
                                        ) : (
                                            <p
                                                className={
                                                    css( {
                                                        textAlign: 'center'
                                                        , color: 'text.secondary'
                                                        , padding: 'xl'
                                                    } )
                                                }
                                            >
                                                Audio previews coming soon
                                            </p>
                                        )
                                    }
                                </div>
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
                </div>
            </main>

            <section
                className={
                    css( {
                        width: '100%'
                        , backgroundColor: 'background.dark'
                        , paddingY: '3xl'
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
                                , marginBottom: 'lg'
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
                                , lineHeight: 'relaxed'
                                , paddingLeft: 'lg'
                                , listStyleType: 'decimal'
                            } )
                        }
                    >
                        <li>All arrangements can be custom tailored to your students.</li>
                        <li>All of the music listed is copyrighted by the respective copyright owners and will require licensing prior to the creation of arrangement for your ensemble.</li>
                        <li>Copyright fees are not included in the price of the arrangement and need to be obtained by the client before creating a custom arrangement.</li>
                        <li>Clients receive a score and parts with limited percussion cues. XML files are available to pass on to percussion arrangers if needed.</li>
                        <li>Percussion and sound design arrangements are available directly through the original creator. Contact information can be available upon request.</li>
                    </ol>
                </div>
            </section>

            <Footer />
        </>
    );
}
