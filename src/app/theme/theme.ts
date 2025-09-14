import type { ExtendableTheme } from '@pandacss/types';

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
                primary: {
                    main: { value: '#578685' }
                }
                , gray: {

                }
            }
            , spacing: {
                xs: { value: '0.5rem' }
                , sm: { value: '1rem' }
                , md: { value: '1.5rem' }
                , lg: { value: '2rem' }
                , xl: { value: '3rem' }
            }
            , radii: {
                sm: { value: '0.25rem' }
                , md: { value: '0.5rem' }
                , lg: { value: '0.75rem' }
                , xl: { value: '1rem' }
            }
            , fontSizes: {
                sm: { value: '0.875rem' }
                , base: { value: '1rem' }
                , lg: { value: '1.125rem' }
            }
        }
    }
};

export { theme };
