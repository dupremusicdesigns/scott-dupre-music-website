import Link from 'next/link';
import { css } from '../../../../../styled-system/css';
import {
    flex
    , hstack
} from '../../../../../styled-system/patterns';
import { LinkButton } from '../../LinkButton/LinkButton';
import { FacebookIcon } from '../../icons/FacebookIcon/FacebookIcon';
import { InstagramIcon } from '../../icons/InstagramIcon/InstagramIcon';
import { getGlobal } from '../../../api/global';

const socialLinkStyles = css( {
    color: 'text.inverse'
    , transition: 'opacity 0.2s'
    , _hover: {
        opacity: 0.7
    }
} );

export const Footer = async () => {
    const { data: global } = await getGlobal();

    return (
        <footer
            className={
                css( {
                    width: '100%'
                    , backgroundColor: 'background.dark'
                    , paddingY: 'xl'
                } )
            }
        >
            <div
                className={
                    css( {
                        width: '100%'
                        , maxWidth: '1440px'
                        , marginX: 'auto'
                        , paddingLeft: '7%'
                        , paddingRight: '6%'
                    } )
                }
            >
                <div
                    className={
                        flex( {
                            flexDirection: 'column'
                            , gap: 'xl'
                        } )
                    }
                >
                    <div
                        className={
                            css( {
                                display: 'flex'
                                , flexDirection: 'column'
                                , gap: '0'
                            } )
                        }
                    >
                        <span
                            className={
                                css( {
                                    fontSize: '4xl'
                                    , fontWeight: 'black'
                                    , color: 'text.inverse'
                                    , lineHeight: 'normal'
                                } )
                            }
                        >
                            SCOTT DUPRE
                        </span>
                        <span
                            className={
                                css( {
                                    fontSize: '2xl'
                                    , fontWeight: 'semibold'
                                    , color: 'text.inverse'
                                    , lineHeight: 'normal'
                                } )
                            }
                        >
                            ARRANGER & COMPOSER
                        </span>
                    </div>
                    <div
                        className={
                            hstack( {
                                gap: 'md'
                                , flexWrap: 'wrap'
                            } )
                        }
                    >
                        <LinkButton
                            href='/about'
                            variant='outline'
                            size='footer'
                            rounded='sm'
                            className={ css( { flex: 1 } ) }
                        >
                            Learn more about Scott Dupre
                        </LinkButton>
                        <LinkButton
                            href='/marching-band'
                            variant='outline'
                            size='footer'
                            rounded='sm'
                            className={
                                css( {
                                    flex: 1
                                    , flexDirection: 'column'
                                    , gap: '0'
                                    , lineHeight: 'tight'
                                } )
                            }
                        >
                            <span>
                                Listen to music:
                            </span>
                            <span>
                                Previous Commissions
                            </span>
                        </LinkButton>
                        <LinkButton
                            href='/build-your-own-show'
                            variant='outline'
                            size='footer'
                            rounded='sm'
                            className={ css( { flex: 1 } ) }
                        >
                            Build Your Own Show
                        </LinkButton>
                        <LinkButton
                            href='/contact'
                            variant='secondary'
                            size='footer'
                            rounded='sm'
                            className={ css( { flex: 1 } ) }
                        >
                            Contact
                        </LinkButton>
                    </div>
                    <div
                        className={
                            hstack( {
                                gap: 'lg'
                                , alignItems: 'center'
                            } )
                        }
                    >
                        {
                            global?.facebookLink && (
                                <Link
                                    href={ global.facebookLink }
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className={ socialLinkStyles }
                                    aria-label='Facebook'
                                >
                                    <FacebookIcon />
                                </Link>
                            )
                        }
                        {
                            global?.instagramLink && (
                                <Link
                                    href={ global.instagramLink }
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className={ socialLinkStyles }
                                    aria-label='Instagram'
                                >
                                    <InstagramIcon />
                                </Link>
                            )
                        }
                        {
                            global?.defaultContactEmail && (
                                <Link
                                    href={ `mailto:${ global.defaultContactEmail }` }
                                    className={
                                        css( {
                                            fontSize: 'base'
                                            , fontWeight: 'medium'
                                            , color: 'text.inverse'
                                            , textDecoration: 'underline'
                                            , textTransform: 'uppercase'
                                            , transition: 'opacity 0.2s'
                                            , _hover: {
                                                opacity: 0.7
                                            }
                                        } )
                                    }
                                >
                                    { global.defaultContactEmail }
                                </Link>
                            )
                        }
                    </div>
                    <span
                        className={
                            css( {
                                fontSize: 'xs'
                                , color: 'text.inverse'
                                , opacity: 0.35
                                , marginTop: 'md'
                            } )
                        }
                    >
                        ©
                        { new Date().getFullYear() }
                        { ' ' }
                        Website by
                        { ' ' }
                        <Link
                            href='https://alexjohnson.netlify.app'
                            target='_blank'
                            rel='noopener noreferrer'
                            className={
                                css( {
                                    textDecoration: 'underline'
                                    , _hover: { opacity: 0.7 }
                                } )
                            }
                        >
                            Alex Johnson Web Development
                        </Link>
                    </span>
                </div>
            </div>
        </footer>
    );
};
