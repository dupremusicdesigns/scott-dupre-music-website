import { ReactNode } from 'react';
import { PuzzleIcon } from '../components/icons/PuzzleIcon/PuzzleIcon';
import { FolderIcon } from '../components/icons/FolderIcon/FolderIcon';
import { WindIcon } from '../components/icons/WindIcon/WindIcon';
import { HeadphonesIcon } from '../components/icons/HeadphonesIcon/HeadphonesIcon';
import { TrumpetIcon } from '../components/icons/TrumpetIcon/TrumpetIcon';
import { PencilIcon } from '../components/icons/PencilIcon/PencilIcon';

export const SERVICE_ICONS: Record<string, ReactNode> = {
    puzzle: <PuzzleIcon />
    , folder: <FolderIcon />
    , wind: <WindIcon />
    , headphones: <HeadphonesIcon />
    , trumpet: <TrumpetIcon />
    , pencil: <PencilIcon />
};

export const getServiceIcon = ( name: string ): ReactNode => {
    const key = name.toLowerCase().split( ' ' )[ 0 ];

    return SERVICE_ICONS[ key ] || <PuzzleIcon />;
};
