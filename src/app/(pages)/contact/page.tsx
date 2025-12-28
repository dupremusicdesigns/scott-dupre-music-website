import Link from 'next/link';
import { css } from '../../../../styled-system/css';
import { flex } from '../../../../styled-system/patterns';
import { FacebookIcon } from '../../components/icons/FacebookIcon/FacebookIcon';
import { InstagramIcon } from '../../components/icons/InstagramIcon/InstagramIcon';
import { ContactFormEmbed } from '../../components/contact/ContactFormEmbed/ContactFormEmbed';
import { getGlobal } from '../../api/global';

export default async function ContactPage () {
    const { data: global } = await getGlobal();

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
                        maxWidth: '1120px'
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
                                , textAlign: 'center'
                            } )
                        }
                    >
                        Contact
                    </h1>
                    <p
                        className={
                            css( {
                                fontSize: 'lg'
                                , fontWeight: 'medium'
                                , color: 'text.primary'
                                , textAlign: 'center'
                                , marginTop: 'xs'
                            } )
                        }
                    >
                        Have questions? I would love to help!
                    </p>

                    <div
                        className={
                            flex( {
                                justifyContent: 'space-between'
                                , alignItems: 'flex-start'
                                , marginTop: 'xl'
                            } )
                        }
                    >
                        <div>
                            <p
                                className={
                                    css( {
                                        fontSize: 'base'
                                        , fontWeight: 'bold'
                                        , color: 'text.primary'
                                        , textTransform: 'uppercase'
                                    } )
                                }
                            >
                                Email
                            </p>
                            {
                                global.defaultContactEmail && (
                                    <Link
                                        href={ `mailto:${ global.defaultContactEmail }` }
                                        className={
                                            css( {
                                                fontSize: 'base'
                                                , fontWeight: 'medium'
                                                , color: 'text.primary'
                                                , textDecoration: 'underline'
                                                , marginTop: 'xs'
                                                , display: 'block'
                                            } )
                                        }
                                    >
                                        { global.defaultContactEmail }
                                    </Link>
                                )
                            }
                        </div>
                        <div
                            className={
                                css( {
                                    textAlign: 'right'
                                } )
                            }
                        >
                            <p
                                className={
                                    css( {
                                        fontSize: 'base'
                                        , fontWeight: 'bold'
                                        , color: 'text.primary'
                                        , textTransform: 'uppercase'
                                    } )
                                }
                            >
                                Social Media
                            </p>
                            <div
                                className={
                                    flex( {
                                        gap: 'md'
                                        , marginTop: 'xs'
                                        , justifyContent: 'flex-end'
                                    } )
                                }
                            >
                                {
                                    global.facebookLink && (
                                        <Link
                                            href={ global.facebookLink }
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className={
                                                css( {
                                                    color: 'text.primary'
                                                    , _hover: {
                                                        color: 'text.secondary'
                                                    }
                                                    , transition: 'color 0.2s'
                                                } )
                                            }
                                        >
                                            <FacebookIcon />
                                        </Link>
                                    )
                                }
                                {
                                    global.instagramLink && (
                                        <Link
                                            href={ global.instagramLink }
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className={
                                                css( {
                                                    color: 'text.primary'
                                                    , _hover: {
                                                        color: 'text.secondary'
                                                    }
                                                    , transition: 'color 0.2s'
                                                } )
                                            }
                                        >
                                            <InstagramIcon />
                                        </Link>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className={
                        css( {
                            marginTop: 'xl'
                            , marginLeft: '7%'
                            , marginRight: '6%'
                        } )
                    }
                >
                    <div
                        className={
                            css( {
                                border: '2px solid'
                                , borderColor: 'text.primary'
                                , borderRadius: 'md'
                                , padding: 'xl'
                            } )
                        }
                    >
                        <ContactFormEmbed />
                    </div>
                </section>
            </div>
        </main>
    );
}
