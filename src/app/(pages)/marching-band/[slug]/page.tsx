import { notFound } from 'next/navigation';
import Image from 'next/image';
import { css } from '../../../../../styled-system/css';
import { flex } from '../../../../../styled-system/patterns';
import {
    getMarchingShowBySlug
    , getMarchingShows
} from '../../../api/marchingShows';
import {
    groupSectionsByAudio
    , slugify
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

    if ( show.comingSoon ) {
        return (
            <main
                className={
                    css( {
                        width: '100%'
                        , maxWidth: '1440px'
                        , marginX: 'auto'
                        , paddingY: 'xl'
                        , paddingX: '7%'
                        , paddingBottom: '3xl'
                        , md: {
                            paddingY: '3xl'
                            , paddingBottom: '100px'
                        }
                    } )
                }
            >
                <div
                    className={
                        flex( {
                            flexDirection: 'column'
                            , alignItems: 'center'
                            , gap: 'xl'
                        } )
                    }
                >
                    <div
                        className={
                            css( {
                                position: 'relative'
                                , width: '100%'
                                , maxWidth: '500px'
                                , aspectRatio: '1/1'
                                , borderRadius: 'md'
                                , overflow: 'hidden'
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
                                textAlign: 'center'
                                , maxWidth: '600px'
                            } )
                        }
                    >
                        <h1
                            className={
                                css( {
                                    fontSize: '2xl'
                                    , fontWeight: 'black'
                                    , lineHeight: 'tight'
                                    , sm: { fontSize: '3xl' }
                                    , md: { fontSize: '4xl' }
                                } )
                            }
                        >
                            { show.showTitle }
                        </h1>
                        {
                            show.commissionedBy && (
                                <p
                                    className={
                                        css( {
                                            fontSize: 'md'
                                            , fontWeight: 'medium'
                                            , marginTop: 'xs'
                                            , sm: { fontSize: 'lg' }
                                            , md: { fontSize: 'xl' }
                                        } )
                                    }
                                >
                                    Commissioned by
                                    { ' ' }
                                    { show.commissionedBy }
                                </p>
                            )
                        }

                        <div
                            className={
                                css( {
                                    marginTop: 'xl'
                                    , padding: 'lg'
                                    , backgroundColor: 'gray.100'
                                    , borderRadius: 'md'
                                    , md: { padding: 'xl' }
                                } )
                            }
                        >
                            <p
                                className={
                                    css( {
                                        fontSize: 'xl'
                                        , fontWeight: 'black'
                                        , textTransform: 'uppercase'
                                        , letterSpacing: '0.05em'
                                        , sm: { fontSize: '2xl' }
                                    } )
                                }
                            >
                                Coming Soon
                            </p>
                            <p
                                className={
                                    css( {
                                        fontSize: 'md'
                                        , fontWeight: 'medium'
                                        , marginTop: 'sm'
                                        , color: 'text.secondary'
                                    } )
                                }
                            >
                                Contact us to learn more or express your interest.
                            </p>
                            <div
                                className={
                                    css( {
                                        marginTop: 'lg'
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
                                            width: '100%'
                                            , sm: { width: 'auto' }
                                        } )
                                    }
                                >
                                    Get In Touch
                                </LinkButton>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <>
            <main
                className={
                    css( {
                        width: '100%'
                        , maxWidth: '1440px'
                        , marginX: 'auto'
                        , paddingY: 'xl'
                        , paddingX: '7%'
                        , lg: {
                            paddingY: '3xl'
                            , paddingX: 0
                            , paddingRight: 'lg'
                        }
                        , '2xl': {
                            maxWidth: '1600px'
                        }
                    } )
                }
            >
                <div
                    className={
                        flex( {
                            flexDirection: 'column'
                            , gap: 'lg'
                            , lg: {
                                flexDirection: 'row'
                                , gap: 'xl'
                            }
                        } )
                    }
                >
                    <div
                        className={
                            css( {
                                position: 'relative'
                                , width: '100%'
                                , aspectRatio: '1/1'
                                , borderRadius: 'md'
                                , overflow: 'hidden'
                                , lg: {
                                    width: '280px'
                                    , height: '608px'
                                    , aspectRatio: 'auto'
                                    , flexShrink: 0
                                    , marginLeft: '-80px'
                                    , borderRadius: 0
                                    , borderTopRightRadius: 'md'
                                    , borderBottomRightRadius: 'md'
                                }
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
                                        fontSize: '2xl'
                                        , fontWeight: 'black'
                                        , lineHeight: 'tight'
                                        , sm: { fontSize: '3xl' }
                                        , md: { fontSize: '4xl' }
                                    } )
                                }
                            >
                                { show.showTitle }
                            </h1>
                            <p
                                className={
                                    css( {
                                        fontSize: 'md'
                                        , fontWeight: 'medium'
                                        , marginTop: 'xs'
                                        , sm: { fontSize: 'lg' }
                                        , md: { fontSize: 'xl' }
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
                                                        { section.partNumber ?? index + 1 }
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
                                                        {
                                                            section.composer && (
                                                                <span
                                                                    className={
                                                                        css( {
                                                                            fontStyle: 'italic'
                                                                            , color: 'text.secondary'
                                                                        } )
                                                                    }
                                                                >
                                                                    { ' ' }
                                                                    by
                                                                    { ' ' }
                                                                    { section.composer }
                                                                </span>
                                                            )
                                                        }
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
                                                {
                                                    collaborator.websiteUrl
                                                        ? (
                                                            <a
                                                                href={ collaborator.websiteUrl }
                                                                target='_blank'
                                                                rel='noopener noreferrer'
                                                                className={
                                                                    css( {
                                                                        textDecoration: 'underline'
                                                                        , _hover: { opacity: 0.7 }
                                                                    } )
                                                                }
                                                            >
                                                                { collaborator.collaboratorName }
                                                            </a>
                                                        )
                                                        : (
                                                            collaborator.collaboratorName
                                                        )
                                                }
                                                {
                                                    collaborator.role && (
                                                        <span
                                                            className={
                                                                css( {
                                                                    fontWeight: 'normal'
                                                                    , color: 'text.secondary'
                                                                } )
                                                            }
                                                        >
                                                            { ': ' }
                                                            { collaborator.role }
                                                        </span>
                                                    )
                                                }
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
                                width: '100%'
                                , lg: {
                                    width: '534px'
                                    , flexShrink: 0
                                }
                            } )
                        }
                    >
                        <div
                            className={
                                css( {
                                    border: '2px solid'
                                    , borderColor: 'brand.black'
                                    , borderRadius: 'md'
                                    , padding: 'md'
                                    , sm: { padding: 'lg' }
                                } )
                            }
                        >
                            <AudioTrackList
                                tracks={ groupSectionsByAudio( show.showSections || [] ) }
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
                                            width: '100%'
                                            , sm: { width: '251px' }
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
                        , paddingY: 'xl'
                        , marginBottom: '2px'
                        , md: {
                            paddingTop: '55px'
                            , paddingBottom: '55px'
                        }
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
                                fontSize: '2xl'
                                , fontWeight: 'black'
                                , color: 'text.inverse'
                                , lineHeight: 'tight'
                                , marginBottom: 'md'
                                , sm: { fontSize: '3xl' }
                            } )
                        }
                    >
                        Additional Information
                    </h2>
                    <ol
                        className={
                            css( {
                                color: 'text.inverse'
                                , fontSize: 'sm'
                                , fontWeight: 'medium'
                                , lineHeight: 'relaxed'
                                , paddingLeft: 'lg'
                                , listStyleType: 'decimal'
                                , sm: { fontSize: 'md' }
                                , md: { lineHeight: 'list' }
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
