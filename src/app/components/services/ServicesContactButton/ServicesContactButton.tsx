'use client';

import Link from 'next/link';
import { css } from '../../../../../styled-system/css';
import { Button } from '../../Button/Button';

type ServicesContactButtonProps = {
    size?: 'sm' | 'md' | 'lg' | 'footer';
}

export const ServicesContactButton = ( { size = 'lg' }: ServicesContactButtonProps ) => (
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
        size={ size }
        className={
            css( {
                width: '100%'
                , md: {
                    width: 'auto'
                    , paddingX: '3xl'
                }
            } )
        }
    >
        Contact
    </Button>
);
