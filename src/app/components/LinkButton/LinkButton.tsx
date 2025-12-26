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

/**
 * A wrapper component that combines the visual styling of a `Button` with the navigation capabilities of a Next.js `Link`.
 *
 * This component renders a `Button` but delegates the underlying DOM element to a `Link` via the `render` prop,
 * ensuring client-side transitions while maintaining button aesthetics.
 *
 * @param props - The properties for the LinkButton.
 * @param props.href - The URL path or object to navigate to.
 * @param props.variant - The visual style variant of the button (e.g., 'primary', 'secondary').
 * @param props.size - The size of the button.
 * @param props.rounded - Whether the button should have rounded corners.
 * @param props.className - Additional CSS classes to apply to the button.
 * @param props.children - The content to display inside the button.
 *
 * @returns A styled button that functions as a navigation link.
 */
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
