'use client';

import Link from 'next/link';
import { cx } from '../../../../styled-system/css';
import { buttonStyles } from '../Button/buttonStyles';

type LinkButtonProps = {
    href: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'outlineDark' | 'white';
    size?: 'sm' | 'md' | 'lg' | 'footer';
    rounded?: 'sm' | 'md';
    className?: string;
    children: React.ReactNode;
}

export const LinkButton = ( {
    href
    , variant
    , size
    , rounded
    , className
    , children
}: LinkButtonProps ) => (
    <Link
        href={ href }
        className={
            cx( buttonStyles( {
                variant
                , size
                , rounded
            } ), className )
        }
    >
        { children }
    </Link>
);
