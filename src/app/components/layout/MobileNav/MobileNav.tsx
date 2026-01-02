'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Dialog } from '@base-ui/react';
import { css } from '../../../../../styled-system/css';
import { flex } from '../../../../../styled-system/patterns';
import { HamburgerIcon } from '../../icons/HamburgerIcon/HamburgerIcon';
import { CloseIcon } from '../../icons/CloseIcon/CloseIcon';
import { Button } from '../../Button/Button';
import { navigationRoutes } from '../../../routes/routes';

export const MobileNav = () => {
    const [ open, setOpen ] = useState( false );
    const [ musicExpanded, setMusicExpanded ] = useState( false );

    const closeDrawer = () => {
        setOpen( false );
        setMusicExpanded( false );
    };

    return (
        <Dialog.Root
            open={ open }
            onOpenChange={ setOpen }
        >
            <Dialog.Trigger
                className={
                    css( {
                        display: 'flex'
                        , alignItems: 'center'
                        , justifyContent: 'center'
                        , width: '44px'
                        , height: '44px'
                        , backgroundColor: 'transparent'
                        , border: 'none'
                        , cursor: 'pointer'
                        , color: 'text.primary'
                        , lg: { display: 'none' }
                    } )
                }
            >
                <HamburgerIcon size={ 28 } />
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Backdrop
                    className={
                        css( {
                            position: 'fixed'
                            , inset: 0
                            , backgroundColor: 'overlay.medium'
                            , zIndex: 999
                            , '&[data-open]': {
                                animation: 'backdropFadeIn 0.3s ease-out forwards'
                            }
                            , '&[data-closed]': {
                                animation: 'backdropFadeOut 0.3s ease-out forwards'
                            }
                        } )
                    }
                />
                <Dialog.Popup
                    className={
                        css( {
                            position: 'fixed'
                            , top: 0
                            , right: 0
                            , width: '280px'
                            , height: '100vh'
                            , backgroundColor: 'background.primary'
                            , boxShadow: 'nav'
                            , zIndex: 1000
                            , overflowY: 'auto'
                            , '&[data-open]': {
                                animation: 'drawerSlideIn 0.3s ease-out forwards'
                            }
                            , '&[data-closed]': {
                                animation: 'drawerSlideOut 0.3s ease-out forwards'
                            }
                        } )
                    }
                >
                    <div
                        className={
                            css( {
                                display: 'flex'
                                , justifyContent: 'flex-end'
                                , padding: 'md'
                            } )
                        }
                    >
                        <Dialog.Close
                            className={
                                css( {
                                    display: 'flex'
                                    , alignItems: 'center'
                                    , justifyContent: 'center'
                                    , width: '44px'
                                    , height: '44px'
                                    , backgroundColor: 'transparent'
                                    , border: 'none'
                                    , cursor: 'pointer'
                                    , color: 'text.primary'
                                } )
                            }
                        >
                            <CloseIcon size={ 28 } />
                        </Dialog.Close>
                    </div>
                    <nav
                        className={
                            flex( {
                                flexDirection: 'column'
                                , paddingX: 'lg'
                                , paddingBottom: 'xl'
                            } )
                        }
                    >
                        {
                            navigationRoutes.map( route => {
                                if ( route.hasDropdown && route.submenu ) {
                                    return (
                                        <div key={ route.label }>
                                            <button
                                                onClick={ () => setMusicExpanded( !musicExpanded ) }
                                                className={
                                                    css( {
                                                        display: 'flex'
                                                        , alignItems: 'center'
                                                        , justifyContent: 'space-between'
                                                        , width: '100%'
                                                        , paddingY: 'md'
                                                        , backgroundColor: 'transparent'
                                                        , border: 'none'
                                                        , cursor: 'pointer'
                                                        , fontSize: 'lg'
                                                        , fontWeight: 'black'
                                                        , color: 'text.primary'
                                                        , textTransform: 'uppercase'
                                                        , textAlign: 'left'
                                                    } )
                                                }
                                            >
                                                { route.label }
                                                <svg
                                                    width='20'
                                                    height='20'
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                    stroke='currentColor'
                                                    strokeWidth='2'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    className={
                                                        css( {
                                                            transition: 'transform 0.2s'
                                                            , transform: musicExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                                                        } )
                                                    }
                                                >
                                                    <polyline points='6 9 12 15 18 9' />
                                                </svg>
                                            </button>
                                            {
                                                musicExpanded && (
                                                    <div
                                                        className={
                                                            flex( {
                                                                flexDirection: 'column'
                                                                , paddingLeft: 'md'
                                                                , gap: 'xs'
                                                            } )
                                                        }
                                                    >
                                                        {
                                                            route.submenu.map( submenuItem => (
                                                                <Link
                                                                    key={ submenuItem.label }
                                                                    href={ submenuItem.href }
                                                                    onClick={ closeDrawer }
                                                                    className={
                                                                        css( {
                                                                            paddingY: 'sm'
                                                                            , fontSize: 'base'
                                                                            , fontWeight: 'semibold'
                                                                            , color: 'text.secondary'
                                                                            , textDecoration: 'none'
                                                                            , transition: 'color 0.2s'
                                                                            , _hover: {
                                                                                color: 'text.primary'
                                                                            }
                                                                        } )
                                                                    }
                                                                >
                                                                    { submenuItem.label }
                                                                </Link>
                                                            ) )
                                                        }
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
                                        onClick={ closeDrawer }
                                        className={
                                            css( {
                                                paddingY: 'md'
                                                , fontSize: 'lg'
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
                        <div className={ css( { marginTop: 'lg' } ) }>
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
                                fullWidth
                                onClick={ closeDrawer }
                            >
                                Contact
                            </Button>
                        </div>
                    </nav>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
