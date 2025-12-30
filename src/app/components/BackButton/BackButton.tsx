'use client';

import Link from 'next/link';
import { Button } from '@base-ui/react';
import { css } from '../../../../styled-system/css';
import { BackArrowIcon } from '../icons/BackArrowIcon/BackArrowIcon';

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
                , width: '48px'
                , height: '48px'
                , borderRadius: 'full'
                , backgroundColor: 'white'
                , transition: 'all 0.2s'
                , _hover: {
                    backgroundColor: 'brand.black'
                    , color: 'text.inverse'
                }
                , sm: {
                    width: '63px'
                    , height: '63px'
                }
            } )
        }
        aria-label='Go back'
    >
        <BackArrowIcon />
    </Button>
);
