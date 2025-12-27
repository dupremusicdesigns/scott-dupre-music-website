import { css } from '../../../../../styled-system/css';

type PlayIconProps = {
    className?: string;
}

export const PlayIcon = ( { className }: PlayIconProps ) => (
    <svg
        width='22'
        height='26'
        viewBox='0 0 22 26'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={
            className || css( {
                marginLeft: '4px'
            } )
        }
    >
        <path
            d='M22 13L0 26V0L22 13Z'
            fill='currentColor'
        />
    </svg>
);
