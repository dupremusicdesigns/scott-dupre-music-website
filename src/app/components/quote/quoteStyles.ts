import { css } from '../../../../styled-system/css';

export const sectionHeadingStyles = css( {
    fontSize: 'base'
    , fontWeight: 'black'
    , textTransform: 'uppercase'
    , color: 'text.primary'
    , paddingBottom: 'xs'
    , borderBottom: '2px solid'
    , borderColor: 'border.dark'
    , marginBottom: 'sm'
} );

export const fieldLabelStyles = css( {
    display: 'flex'
    , flexDirection: 'column'
    , gap: '6px'
    , fontSize: 'base'
    , fontWeight: 'bold'
    , color: 'text.primary'
} );

export const fieldInputStyles = css( {
    width: '100%'
    , padding: '12px 14px'
    , fontSize: 'md'
    , fontWeight: 'medium'
    , color: 'text.primary'
    , backgroundColor: 'background.primary'
    , border: '2px solid'
    , borderColor: 'border.default'
    , borderRadius: 'sm'
    , outline: 'none'
    , _focus: { borderColor: 'border.dark' }
    , _focusVisible: {
        outline: '2px solid'
        , outlineColor: 'brand.black'
        , outlineOffset: '2px'
    }
} );

export const errorTextStyles = css( {
    fontSize: 'base'
    , fontWeight: 'bold'
    , color: 'red.600'
} );
