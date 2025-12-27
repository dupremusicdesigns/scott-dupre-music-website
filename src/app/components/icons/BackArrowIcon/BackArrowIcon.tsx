type BackArrowIconProps = {
    className?: string;
}

export const BackArrowIcon = ( { className }: BackArrowIconProps ) => (
    <svg
        width='20'
        height='29'
        viewBox='0 0 20 29'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={ className }
    >
        <path
            d='M15.9497 3.5L4.94964 14.5001L15.9497 25.5001'
            stroke='currentColor'
            strokeWidth='7'
            strokeLinecap='round'
        />
    </svg>
);
