import { css } from '../../../../styled-system/css';

type SkeletonProps = {
    width?: string;
    height?: string;
    borderRadius?: 'sm' | 'md' | 'lg' | 'full';
}

export const Skeleton = ( {
    width = '100%'
    , height = '20px'
    , borderRadius = 'sm'
}: SkeletonProps ) => (
    <div
        className={
            css( {
                backgroundColor: 'gray.200'
                , borderRadius
                , animation: 'skeletonPulse 1.5s ease-in-out infinite'
            } )
        }
        style={
            {
                width
                , height
            }
        }
    />
);
