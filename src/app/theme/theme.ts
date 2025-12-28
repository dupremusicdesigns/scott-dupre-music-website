import type { ExtendableTheme } from '@pandacss/types';
import { colors } from './colors';

const theme: ExtendableTheme = {
    breakpoints: {
        xs: '480px'
        , sm: '640px'
        , md: '768px'
        , lg: '1024px'
        , xl: '1280px'
        , '2xl': '1440px'
        , '3xl': '1600px'
    }
    , extend: {
        tokens: {
            colors: {
                brand: {
                    black: { value: colors.black }
                    , white: { value: colors.white }
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
                , background: {
                    primary: { value: colors.white }
                    , secondary: { value: colors.gray100 }
                    , dark: { value: colors.dark }
                    , placeholder: { value: colors.placeholder }
                    , page: { value: colors.pageBackground }
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
                    , primaryHover: { value: colors.overlayLight }
                    , secondary: { value: colors.white }
                    , secondaryText: { value: colors.black }
                    , secondaryHover: { value: colors.overlayLight }
                    , outline: { value: 'transparent' }
                    , outlineText: { value: colors.white }
                    , outlineBorder: { value: colors.white }
                    , outlineHover: { value: colors.overlayMedium }
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
                , sm: { value: '10px' }
                , md: { value: '20px' }
                , lg: { value: '100px' }
                , full: { value: '9999px' }
            }
            , fontSizes: {
                xs: { value: '11px' }
                , sm: { value: '13px' }
                , base: { value: '14px' }
                , md: { value: '16px' }
                , lg: { value: '18px' }
                , xl: { value: '20px' }
                , '2xl': { value: '24px' }
                , '3xl': { value: '36px' }
                , '4xl': { value: '48px' }
                , '5xl': { value: '64px' }
                , '6xl': { value: '82px' }
            }
            , fontWeights: {
                normal: { value: '400' }
                , medium: { value: '500' }
                , semibold: { value: '600' }
                , bold: { value: '700' }
                , extrabold: { value: '800' }
                , black: { value: '900' }
            }
            , lineHeights: {
                tight: { value: '0.95' }
                , normal: { value: 'normal' }
                , relaxed: { value: '1.6' }
                , list: { value: '24px' }
            }
            , letterSpacings: {
                tight: { value: '0.02em' }
                , normal: { value: '0' }
            }
            , sizes: {
                headerHeight: { value: '100px' }
                , dropdownWidth: { value: '280px' }
            }
            , shadows: {
                dropdown: { value: '0 4px 16px rgba(0, 0, 0, 0.08)' }
            }
            , durations: {
                fast: { value: '0.2s' }
                , normal: { value: '0.3s' }
            }
        }
    }
};

export { theme };
