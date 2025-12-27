type PauseIconProps = {
    className?: string;
}

export const PauseIcon = ( { className }: PauseIconProps ) => (
    <svg
        width='20'
        height='26'
        viewBox='0 0 20 26'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={ className }
    >
        <rect
            x='0'
            y='0'
            width='6'
            height='26'
            fill='currentColor'
        />
        <rect
            x='14'
            y='0'
            width='6'
            height='26'
            fill='currentColor'
        />
    </svg>
);
