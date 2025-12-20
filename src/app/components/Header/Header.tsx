'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { css } from '../../../../styled-system/css';
import {
    flex
    , hstack
} from '../../../../styled-system/patterns';
import { Button } from '../Button/Button';
import { navigationRoutes } from '../../routes/routes';

export const Header = () => {
    const [ musicMenuOpen, setMusicMenuOpen ] = useState( false );

    return (
        <header
            className={
                css( {
                    position: 'relative'
                    , width: '100%'
                    , height: 'headerHeight'
                    , backgroundColor: 'background.primary'
                    , zIndex: 100
                } )
            }
        >
            <div
                className={
                    css( {
                        width: '100%'
                        , height: '100%'
                        , paddingLeft: '7%'
                        , paddingRight: '6%'
                        , position: 'relative'
                    } )
                }
            >
                <div
                    className={
                        flex( {
                            alignItems: 'center'
                            , justifyContent: 'space-between'
                            , height: '100%'
                        } )
                    }
                >
                    <Link
                        href='/'
                        className={
                            css( {
                                textDecoration: 'none'
                                , display: 'flex'
                                , flexDirection: 'column'
                                , gap: '0'
                                , lineHeight: 'normal'
                            } )
                        }
                    >
                        <span
                            className={
                                css( {
                                    fontSize: 'md'
                                    , fontWeight: 'black'
                                    , color: 'text.primary'
                                    , letterSpacing: 'tight'
                                } )
                            }
                        >
                            SCOTT DUPRE
                        </span>
                        <span
                            className={
                                css( {
                                    fontSize: 'xs'
                                    , fontWeight: 'semibold'
                                    , color: 'text.primary'
                                    , letterSpacing: 'tight'
                                } )
                            }
                        >
                            ARRANGER & COMPOSER
                        </span>
                    </Link>
                    <nav
                        className={
                            hstack( {
                                gap: '2xl'
                                , alignItems: 'center'
                            } )
                        }
                    >
                        {
                            navigationRoutes.map( route => {
                                if ( route.hasDropdown ) {
                                    return (
                                        <div
                                            key={ route.label }
                                            className={
                                                css( {
                                                    position: 'relative'
                                                    , display: 'inline-block'
                                                } )
                                            }
                                            onMouseEnter={ () => setMusicMenuOpen( true ) }
                                            onMouseLeave={ () => setMusicMenuOpen( false ) }
                                        >
                                            <Link
                                                href={ route.href }
                                                className={
                                                    css( {
                                                        fontSize: 'base'
                                                        , fontWeight: 'black'
                                                        , color: 'text.primary'
                                                        , textTransform: 'uppercase'
                                                        , textDecoration: 'none'
                                                        , transition: 'color 0.2s'
                                                        , _hover: {
                                                            color: 'text.secondary'
                                                        }
                                                    } )
                                                }
                                            >
                                                { route.label }
                                            </Link>
                                            {
                                                musicMenuOpen && route.submenu && (
                                                    <div
                                                        className={
                                                            css( {
                                                                position: 'absolute'
                                                                , top: '100%'
                                                                , left: '50%'
                                                                , transform: 'translateX(-50%)'
                                                                , paddingTop: 'sm'
                                                                , width: 'dropdownWidth'
                                                                , zIndex: 200
                                                            } )
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                css( {
                                                                    backgroundColor: 'background.primary'
                                                                    , borderBottomLeftRadius: 'md'
                                                                    , borderBottomRightRadius: 'md'
                                                                    , paddingY: 'md'
                                                                    , paddingX: 'lg'
                                                                    , display: 'flex'
                                                                    , flexDirection: 'column'
                                                                    , gap: 'sm'
                                                                    , boxShadow: 'dropdown'
                                                                    , animation: 'dropdownFadeIn 0.2s ease-out'
                                                                } )
                                                            }
                                                            style={ { animationFillMode: 'both' } }
                                                        >
                                                            {
                                                                route.submenu.map( ( submenuItem, index ) => (
                                                                    <React.Fragment key={ submenuItem.label }>
                                                                        <Link
                                                                            href={ submenuItem.href }
                                                                            className={
                                                                                css( {
                                                                                    fontSize: 'base'
                                                                                    , fontWeight: 'black'
                                                                                    , color: 'text.primary'
                                                                                    , textTransform: 'uppercase'
                                                                                    , textDecoration: 'none'
                                                                                    , textAlign: 'center'
                                                                                    , whiteSpace: 'nowrap'
                                                                                    , transition: 'color 0.2s'
                                                                                    , _hover: {
                                                                                        color: 'text.secondary'
                                                                                    }
                                                                                } )
                                                                            }
                                                                        >
                                                                            { submenuItem.label }
                                                                        </Link>
                                                                        {
                                                                            route.submenu && index < route.submenu.length - 1 && (
                                                                                <div
                                                                                    className={
                                                                                        css( {
                                                                                            height: '1px'
                                                                                            , backgroundColor: 'brand.black'
                                                                                            , width: '100%'
                                                                                        } )
                                                                                    }
                                                                                />
                                                                            )
                                                                        }
                                                                    </React.Fragment>
                                                                ) )
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    );
                                }
                                return (
                                    <Link
                                        key={ route.label }
                                        href={ route.href }
                                        className={
                                            css( {
                                                fontSize: 'base'
                                                , fontWeight: 'black'
                                                , color: 'text.primary'
                                                , textTransform: 'uppercase'
                                                , textDecoration: 'none'
                                                , transition: 'color 0.2s'
                                                , _hover: {
                                                    color: 'text.secondary'
                                                }
                                            } )
                                        }
                                    >
                                        { route.label }
                                    </Link>
                                );
                            } )
                        }
                        <Button
                            render={
                                props => (
                                    <Link
                                        href='/contact'
                                        { ...props }
                                    />
                                )
                            }
                            nativeButton={ false }
                            variant='primary'
                            size='md'
                        >
                            Contact
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    );
};
