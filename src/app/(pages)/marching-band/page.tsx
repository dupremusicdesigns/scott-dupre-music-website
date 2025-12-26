import Link from 'next/link';
import { css } from '../../../../styled-system/css';
import { grid } from '../../../../styled-system/patterns';
import { LinkButton } from '../../components/LinkButton/LinkButton';
import { Button } from '../../components/Button/Button';

const mockShows = [
    {
        id: 1
        , name: 'Echoes of Eternity'
    }
    , {
        id: 2
        , name: 'Rise of the Phoenix'
    }
    , {
        id: 3
        , name: 'Midnight Symphony'
    }
    , {
        id: 4
        , name: 'Crimson Tide'
    }
    , {
        id: 5
        , name: 'Into the Storm'
    }
    , {
        id: 6
        , name: 'Legacy'
    }
    , {
        id: 7
        , name: 'The Awakening'
    }
    , {
        id: 8
        , name: 'Vanguard'
    }
    , {
        id: 9
        , name: 'Fractured Light'
    }
];

const MarchingBandPage = () => {
    return (
        <main
            className={
                css( {
                    width: '100%'
                    , maxWidth: '1440px'
                    , marginX: 'auto'
                    , paddingX: '7%'
                    , paddingTop: '2xl'
                    , paddingBottom: '120px'
                } )
            }
        >
            <div
                className={
                    css( {
                        display: 'flex'
                        , justifyContent: 'space-between'
                        , alignItems: 'flex-start'
                        , marginBottom: '2xl'
                    } )
                }
            >
                <div>
                    <h1
                        className={
                            css( {
                                fontSize: '5xl'
                                , fontWeight: 'black'
                                , lineHeight: 'tight'
                                , textTransform: 'uppercase'
                            } )
                        }
                    >
                        Marching Band
                    </h1>
                    <p
                        className={
                            css( {
                                fontSize: '28px'
                                , fontWeight: 'medium'
                            } )
                        }
                    >
                        Previous Full Arrangements
                    </p>
                </div>
                <LinkButton
                    href='/build-your-own-show'
                    variant='outlineDark'
                    size='lg'
                    rounded='md'
                >
                    Build Your Own Show
                </LinkButton>
            </div>

            <div
                className={
                    grid( {
                        columns: 3
                        , columnGap: '30px'
                        , rowGap: '39px'
                    } )
                }
            >
                {
                    mockShows.map( show => (
                        <Link
                            key={ show.id }
                            href={ `/marching-band/${ show.id }` }
                            className={
                                css( {
                                    display: 'block'
                                    , position: 'relative'
                                    , aspectRatio: '393/350'
                                    , borderRadius: 'md'
                                    , overflow: 'hidden'
                                    , transition: 'transform 0.2s, box-shadow 0.2s'
                                    , _hover: {
                                        transform: 'scale(1.02)'
                                        , boxShadow: 'lg'
                                    }
                                } )
                            }
                        >
                            <div
                                className={
                                    css( {
                                        position: 'absolute'
                                        , inset: 0
                                        , backgroundColor: 'gray.300'
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
                                { show.name }
                            </span>
                        </Link>
                    ) )
                }
            </div>

            <div
                className={
                    css( {
                        display: 'flex'
                        , justifyContent: 'center'
                        , marginTop: '3xl'
                    } )
                }
            >
                <Button
                    variant='outlineDark'
                    size='lg'
                    rounded='md'
                    className={
                        css( {
                            width: '394px'
                        } )
                    }
                >
                    View More
                </Button>
            </div>
        </main>
    );
};

export default MarchingBandPage;
