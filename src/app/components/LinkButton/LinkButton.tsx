'use client';

import Link from 'next/link';
import { Button } from '../Button/Button';
import { ComponentProps } from 'react';

type LinkButtonProps = {
    href: string;
    variant: ComponentProps<typeof Button>['variant'];
    size: ComponentProps<typeof Button>['size'];
    rounded?: ComponentProps<typeof Button>['rounded'];
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
    <Button
        render={
            props => (
                <Link
                    href={ href }
                    { ...props }
                />
            )
        }
        nativeButton={ false }
        variant={ variant }
        size={ size }
        rounded={ rounded }
        className={ className }
    >
        { children }
    </Button>
);
