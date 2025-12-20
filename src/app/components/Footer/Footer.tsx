'use client';

import Link from 'next/link';
import { css } from '../../../../styled-system/css';
import {
    flex
    , hstack
} from '../../../../styled-system/patterns';
import { Button } from '../Button/Button';
import { FacebookIcon } from '../FacebookIcon/FacebookIcon';
import { InstagramIcon } from '../InstagramIcon/InstagramIcon';

const footerButtons = [
    {
        href: '/about'
        , variant: 'outline' as const
        , children: 'Learn more about Scott Dupre'
    }
    , {
        href: '/music'
        , variant: 'outline' as const
        , children: (
            <>
                <span>
                    Listen to music:
                </span>
                <span>
                    Previous Commissions
                </span>
            </>
        )
        , extraStyles: {
            flexDirection: 'column'
            , gap: '0'
            , lineHeight: 'tight'
        }
    }
    , {
        href: '/build-your-own-show'
        , variant: 'outline' as const
        , children: 'Build Your Own Show'
    }
    , {
        href: '/contact'
        , variant: 'secondary' as const
        , children: 'Contact'
    }
];

export const Footer = () => {
    return (
        <footer
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
                        {
                            footerButtons.map( ( button, index ) => (
                                <Button
                                    key={ index }
                                    render={
                                        props => (
                                            <Link
                                                href={ button.href }
                                                { ...props }
                                            />
                                        )
                                    }
                                    nativeButton={ false }
                                    variant={ button.variant }
                                    size='footer'
                                    rounded='sm'
                                    className={
                                        css( {
                                            flex: 1
                                            , ...( button.extraStyles || {} )
                                        } )
                                    }
                                >
                                    { button.children }
                                </Button>
                            ) )
                        }
                    </div>
                    <div
                        className={
                            hstack( {
                                gap: 'lg'
                                , alignItems: 'center'
                            } )
                        }
                    >
                        <Link
                            href='https://facebook.com'
                            target='_blank'
                            rel='noopener noreferrer'
                            className={
                                css( {
                                    color: 'text.inverse'
                                    , transition: 'opacity 0.2s'
                                    , _hover: {
                                        opacity: 0.7
                                    }
                                } )
                            }
                            aria-label='Facebook'
                        >
                            <FacebookIcon />
                        </Link>
                        <Link
                            href='https://instagram.com'
                            target='_blank'
                            rel='noopener noreferrer'
                            className={
                                css( {
                                    color: 'text.inverse'
                                    , transition: 'opacity 0.2s'
                                    , _hover: {
                                        opacity: 0.7
                                    }
                                } )
                            }
                            aria-label='Instagram'
                        >
                            <InstagramIcon />
                        </Link>
                        <Link
                            href='mailto:dupremusicdesigns@gmail.com'
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
                            Dupremusicdesigns@gmail.com
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
