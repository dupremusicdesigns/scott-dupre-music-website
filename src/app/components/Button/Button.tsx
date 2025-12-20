'use client';

import React from 'react';
import { Button as BaseButton } from '@base-ui/react';
import {
    cva
    , cx
} from '../../../../styled-system/css';

const buttonStyles = cva( {
    base: {
        display: 'inline-flex'
        , alignItems: 'center'
        , justifyContent: 'center'
        , gap: 'sm'
        , borderRadius: 'md'
        , textTransform: 'uppercase'
        , fontWeight: 'extrabold'
        , lineHeight: 'normal'
        , cursor: 'pointer'
        , transition: 'all 0.2s'
        , outline: 'none'
        , border: 'none'
        , _disabled: {
            cursor: 'not-allowed'
            , opacity: 0.5
        }
        , _focusVisible: {
            outline: '2px solid'
            , outlineColor: 'brand.black'
            , outlineOffset: '2px'
        }
    }
    , variants: {
        variant: {
            primary: {
                backgroundColor: 'button.primary'
                , color: 'button.primaryText'
                , _hover: {
                    backgroundColor: 'button.primaryHover'
                }
                , _active: {
                    transform: 'scale(0.98)'
                }
            }
            , secondary: {
                backgroundColor: 'button.secondary'
                , color: 'button.secondaryText'
                , _hover: {
                    backgroundColor: 'button.secondaryHover'
                }
                , _active: {
                    transform: 'scale(0.98)'
                }
            }
            , outline: {
                backgroundColor: 'transparent'
                , color: 'button.outlineText'
                , border: '2px solid'
                , borderColor: 'button.outlineBorder'
                , _hover: {
                    backgroundColor: 'button.outlineHover'
                }
                , _active: {
                    transform: 'scale(0.98)'
                }
            }
            , outlineDark: {
                backgroundColor: 'transparent'
                , color: 'text.primary'
                , border: '2px solid'
                , borderColor: 'border.dark'
                , _hover: {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)'
                }
                , _active: {
                    transform: 'scale(0.98)'
                }
            }
        }
        , size: {
            sm: {
                height: '44px'
                , px: 'md'
                , fontSize: 'base'
            }
            , md: {
                height: '51px'
                , px: 'lg'
                , fontSize: 'base'
            }
            , lg: {
                height: '63px'
                , px: 'xl'
                , fontSize: 'lg'
            }
        }
        , fullWidth: {
            true: { width: '100%' }
        }
    }
    , defaultVariants: {
        variant: 'primary'
        , size: 'md'
    }
} );

export type ButtonProps = {
    variant?: 'primary' | 'secondary' | 'outline' | 'outlineDark';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    className?: string;
    children?: React.ReactNode;
} & React.ComponentProps<typeof BaseButton>;

export const Button = ( {
    variant
    , size
    , fullWidth
    , className
    , children
    , ref
    , ...props
}: ButtonProps ) => {
    return (
        <BaseButton
            ref={ ref }
            className={
                cx( buttonStyles( {
                    variant
                    , size
                    , fullWidth
                } ), className )
            }
            { ...props }
        >
            { children }
        </BaseButton>
    );
};
