import { css } from '../../../../styled-system/css';

export const contactLabelStyles = css( {
    display: 'flex'
    , flexDirection: 'column'
    , gap: 'xs'
    , fontSize: 'md'
    , fontWeight: 'medium'
    , color: 'text.primary'
} );

export const contactOptionalStyles = css( {
    fontSize: 'sm'
    , fontWeight: 'medium'
    , textTransform: 'uppercase'
    , color: 'text.secondary'
    , marginLeft: 'xs'
} );

export const contactControlStyles = css( {
    width: '100%'
    , padding: 'xs'
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

export const contactErrorStyles = css( {
    fontSize: 'base'
    , fontWeight: 'bold'
    , color: 'red.600'
} );

export const contactTrapStyles = css( {
    position: 'absolute'
    , left: '-10000px'
    , width: '1px'
    , height: '1px'
    , overflow: 'hidden'
} );
