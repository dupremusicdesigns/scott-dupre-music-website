'use client';

import Link from 'next/link';
import { Button } from '@base-ui/react';
import { css } from '../../../../styled-system/css';

type BackButtonProps = {
    href: string;
}

export const BackButton = ( { href }: BackButtonProps ) => (
    <Button
        render={ <Link href={ href } /> }
        nativeButton={ false }
        className={
            css( {
                display: 'flex'
                , alignItems: 'center'
                , justifyContent: 'center'
                , width: '63px'
                , height: '63px'
                , borderRadius: 'full'
                , backgroundColor: 'white'
                , transition: 'all 0.2s'
                , _hover: {
                    backgroundColor: 'brand.black'
                    , color: 'text.inverse'
                }
            } )
        }
        aria-label='Go back'
    >
        <svg
            width='20'
            height='29'
            viewBox='0 0 20 29'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M15.9497 3.5L4.94964 14.5001L15.9497 25.5001'
                stroke='currentColor'
                strokeWidth='7'
                strokeLinecap='round'
            />
        </svg>
    </Button>
);
