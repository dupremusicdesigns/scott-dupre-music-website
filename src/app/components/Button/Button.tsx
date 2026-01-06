'use client';

import React from 'react';
import { Button as BaseButton } from '@base-ui/react';
import { cx } from '../../../../styled-system/css';
import { buttonStyles } from './buttonStyles';

export type ButtonProps = {
    variant?: 'primary' | 'secondary' | 'outline' | 'outlineDark';
    size?: 'sm' | 'md' | 'lg' | 'footer';
    rounded?: 'sm' | 'md';
    fullWidth?: boolean;
    className?: string;
    children?: React.ReactNode;
} & React.ComponentProps<typeof BaseButton>;

export const Button = ( {
    variant
    , size
    , rounded
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
                    , rounded
                    , fullWidth
                } ), className )
            }
            { ...props }
        >
            { children }
        </BaseButton>
    );
};
