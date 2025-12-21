'use client';

import Link from 'next/link';
import { Button } from '../Button/Button';
import { ComponentProps } from 'react';

type LinkButtonProps = {
    href: string;
    variant: ComponentProps<typeof Button>['variant'];
    size: ComponentProps<typeof Button>['size'];
    className?: string;
    children: React.ReactNode;
}

export const LinkButton = ( {
    href
    , variant
    , size
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
        className={ className }
    >
        { children }
    </Button>
);
