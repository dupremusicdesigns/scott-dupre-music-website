import { css } from '../../../../../styled-system/css';
import { Skeleton } from '../../Skeleton/Skeleton';

export const ContactFormSkeleton = () => (
    <div
        className={
            css( {
                display: 'flex'
                , flexDirection: 'column'
                , gap: 'md'
            } )
        }
    >
        <Skeleton
            width='80px'
            height='14px'
        />
        <Skeleton
            height='40px'
            borderRadius='md'
        />
        <Skeleton
            width='140px'
            height='14px'
        />
        <Skeleton
            height='40px'
            borderRadius='md'
        />
        <Skeleton
            width='260px'
            height='14px'
        />
        <Skeleton
            height='40px'
            borderRadius='md'
        />
        <Skeleton
            width='100px'
            height='14px'
        />
        <Skeleton
            height='40px'
            borderRadius='md'
        />
        <Skeleton
            width='120px'
            height='14px'
        />
        <Skeleton
            height='40px'
            borderRadius='md'
        />
        <Skeleton
            width='220px'
            height='14px'
        />
        <Skeleton
            height='40px'
            borderRadius='md'
        />
        <Skeleton
            width='180px'
            height='14px'
        />
        <Skeleton
            height='100px'
            borderRadius='md'
        />
        <div
            className={
                css( {
                    display: 'flex'
                    , justifyContent: 'center'
                    , marginTop: 'sm'
                } )
            }
        >
            <Skeleton
                width='180px'
                height='40px'
                borderRadius='md'
            />
        </div>
    </div>
);
