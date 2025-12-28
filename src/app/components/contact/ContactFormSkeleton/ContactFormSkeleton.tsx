import { css } from '../../../../../styled-system/css';
import { Skeleton } from '../../Skeleton/Skeleton';

export const ContactFormSkeleton = () => (
    <div
        className={
            css( {
                display: 'flex'
                , flexDirection: 'column'
                , gap: 'lg'
                , padding: 'md'
            } )
        }
    >
        <Skeleton
            width='80px'
            height='16px'
        />
        <Skeleton
            height='45px'
            borderRadius='md'
        />
        <Skeleton
            width='140px'
            height='16px'
        />
        <Skeleton
            height='45px'
            borderRadius='md'
        />
        <Skeleton
            width='260px'
            height='16px'
        />
        <Skeleton
            height='45px'
            borderRadius='md'
        />
        <Skeleton
            width='100px'
            height='16px'
        />
        <Skeleton
            height='45px'
            borderRadius='md'
        />
        <Skeleton
            width='120px'
            height='16px'
        />
        <Skeleton
            height='45px'
            borderRadius='md'
        />
        <Skeleton
            width='220px'
            height='16px'
        />
        <Skeleton
            height='45px'
            borderRadius='md'
        />
        <Skeleton
            width='180px'
            height='16px'
        />
        <Skeleton
            height='120px'
            borderRadius='md'
        />
        <div
            className={
                css( {
                    display: 'flex'
                    , justifyContent: 'center'
                    , marginTop: 'md'
                } )
            }
        >
            <Skeleton
                width='180px'
                height='44px'
                borderRadius='md'
            />
        </div>
    </div>
);
