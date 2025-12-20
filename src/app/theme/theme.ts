import type { ExtendableTheme } from '@pandacss/types';
import { colors } from './colors';

const theme: ExtendableTheme = {
    breakpoints: {
        xs: '480px'
        , sm: '640px'
        , md: '768px'
        , lg: '1024px'
        , xl: '1280px'
    }
    , extend: {
        tokens: {
            colors: {
                brand: {
                    black: { value: colors.black }
                    , white: { value: colors.white }
                    , olive: { value: colors.olive }
                }
                , gray: {
                    50: { value: colors.gray50 }
                    , 100: { value: colors.gray100 }
                    , 200: { value: colors.gray200 }
                    , 300: { value: colors.gray300 }
                    , 400: { value: colors.gray400 }
                    , 500: { value: colors.gray500 }
                    , 600: { value: colors.gray600 }
                    , 700: { value: colors.gray700 }
                    , 800: { value: colors.gray800 }
                    , 900: { value: colors.gray900 }
                    , 950: { value: colors.gray950 }
                }
                , gradient: {
                    pink: { value: colors.gradientPink }
                    , purple: { value: colors.gradientPurple }
                    , blue: { value: colors.gradientBlue }
                    , orange: { value: colors.gradientOrange }
                    , yellow: { value: colors.gradientYellow }
                }
                , background: {
                    primary: { value: colors.white }
                    , secondary: { value: colors.gray100 }
                    , dark: { value: colors.dark }
                    , overlay: { value: 'rgba(21, 20, 20, 0.6)' }
                }
                , text: {
                    primary: { value: colors.black }
                    , secondary: { value: colors.gray600 }
                    , muted: { value: colors.gray500 }
                    , inverse: { value: colors.white }
                }
                , border: {
                    default: { value: colors.gray200 }
                    , dark: { value: colors.black }
                    , light: { value: colors.white }
                }
                , button: {
                    primary: { value: colors.black }
                    , primaryText: { value: colors.white }
                    , secondary: { value: colors.white }
                    , secondaryText: { value: colors.black }
                    , tertiary: { value: colors.olive }
                    , tertiaryText: { value: colors.white }
                }
            }
            , spacing: {
                xs: { value: '0.5rem' }
                , sm: { value: '1rem' }
                , md: { value: '1.5rem' }
                , lg: { value: '2rem' }
                , xl: { value: '3rem' }
                , '2xl': { value: '4rem' }
                , '3xl': { value: '6rem' }
            }
            , radii: {
                none: { value: '0' }
                , sm: { value: '0.25rem' }
                , md: { value: '0.5rem' }
                , lg: { value: '0.75rem' }
                , xl: { value: '1rem' }
                , '2xl': { value: '1.5rem' }
                , full: { value: '9999px' }
            }
            , fontSizes: {
                xs: { value: '0.75rem' }
                , sm: { value: '0.875rem' }
                , base: { value: '1rem' }
                , lg: { value: '1.125rem' }
                , xl: { value: '1.25rem' }
                , '2xl': { value: '1.5rem' }
                , '3xl': { value: '1.875rem' }
                , '4xl': { value: '2.25rem' }
                , '5xl': { value: '3rem' }
                , '6xl': { value: '3.75rem' }
            }
            , fontWeights: {
                normal: { value: '400' }
                , medium: { value: '500' }
                , semibold: { value: '600' }
                , bold: { value: '700' }
                , extrabold: { value: '800' }
            }
            , lineHeights: {
                tight: { value: '1.25' }
                , normal: { value: '1.5' }
                , relaxed: { value: '1.75' }
            }
        }
    }
};

export { theme };
