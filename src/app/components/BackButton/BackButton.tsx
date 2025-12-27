'use client';

import Link from 'next/link';
import { css } from '../../../../styled-system/css';

type BackButtonProps = {
    href: string;
}

export const BackButton = ( { href }: BackButtonProps ) => (
    <Link
        href={ href }
        className={
            css( {
                display: 'flex'
                , alignItems: 'center'
                , justifyContent: 'center'
                , width: '63px'
                , height: '63px'
                , borderRadius: 'full'
                , border: '2px solid'
                , borderColor: 'brand.black'
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
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M10 12L6 8L10 4'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    </Link>
);
