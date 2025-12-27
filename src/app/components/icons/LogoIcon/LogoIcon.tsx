import Image from 'next/image';

type LogoIconProps = {
    width?: number;
    height?: number;
    className?: string;
}

export const LogoIcon = ( {
    width = 40
    , height = 43
    , className
}: LogoIconProps ) => (
    <Image
        src='/logo.svg'
        alt='Scott Dupre Logo'
        width={ width }
        height={ height }
        className={ className }
    />
);
