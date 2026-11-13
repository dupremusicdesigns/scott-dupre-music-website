import { css } from '../../../../styled-system/css';

const sectionHeadingBase = {
    fontSize: 'sm'
    , fontWeight: 'black'
    , letterSpacing: '0.1em'
    , textTransform: 'uppercase'
    , color: 'text.primary'
    , paddingBottom: '10px'
    , borderBottom: '4px solid'
    , borderColor: 'border.dark'
    , marginBottom: '14px'
} as const;

export const sectionHeadingStyles = css( sectionHeadingBase );

export const summaryHeadingStyles = css( sectionHeadingBase, { borderBottom: '2px solid' } );

export const fieldLabelStyles = css( {
    display: 'flex'
    , flexDirection: 'column'
    , gap: '6px'
    , fontSize: '11.5px'
    , fontWeight: 'black'
    , letterSpacing: '0.08em'
    , textTransform: 'uppercase'
    , color: 'text.primary'
} );

export const fieldInputStyles = css( {
    width: '100%'
    , padding: '11px 12px'
    , fontSize: '15px'
    , fontWeight: 'normal'
    , textTransform: 'none'
    , letterSpacing: 'normal'
    , color: 'text.primary'
    , backgroundColor: 'background.primary'
    , border: '1.5px solid'
    , borderColor: 'gray.300'
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
