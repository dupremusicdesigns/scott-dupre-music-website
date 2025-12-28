'use client';

import { ReactNode } from 'react';
import { AudioProvider } from '../../context/AudioContext';

type CategoryListsWrapperProps = {
    children: ReactNode;
}

export const CategoryListsWrapper = ( { children }: CategoryListsWrapperProps ) => {
    return (
        <AudioProvider>
            { children }
        </AudioProvider>
    );
};
