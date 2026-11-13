import { css } from '../../../../styled-system/css';

export const selectTriggerStyles = css( {
    display: 'flex'
    , alignItems: 'center'
    , justifyContent: 'space-between'
    , gap: 'xs'
    , width: '100%'
    , padding: 'xs'
    , fontSize: 'md'
    , fontWeight: 'medium'
    , textAlign: 'left'
    , color: 'text.primary'
    , backgroundColor: 'background.primary'
    , border: '2px solid'
    , borderColor: 'border.default'
    , borderRadius: 'sm'
    , cursor: 'pointer'
    , outline: 'none'
    , transition: 'border-color 0.2s'
    , '&[data-popup-open]': { borderColor: 'border.dark' }
    , '&[data-placeholder]': { color: 'text.secondary' }
    , _focusVisible: {
        outline: '2px solid'
        , outlineColor: 'brand.black'
        , outlineOffset: '2px'
    }
    , _disabled: {
        cursor: 'not-allowed'
        , opacity: 0.5
    }
    , '&[aria-invalid=true]': { borderColor: 'red.600' }
} );

export const selectIconStyles = css( {
    display: 'flex'
    , flexShrink: 0
    , transition: 'transform 0.2s ease'
    , '[data-popup-open] > &': { transform: 'rotate(180deg)' }
} );

export const selectPositionerStyles = css( {
    zIndex: 50
    , width: 'var(--anchor-width)'
} );

export const selectPopupStyles = css( {
    maxHeight: 'var(--available-height)'
    , overflowY: 'auto'
    , paddingY: '4px'
    , backgroundColor: 'background.primary'
    , border: '2px solid'
    , borderColor: 'border.dark'
    , borderRadius: 'sm'
    , boxShadow: 'dropdown'
    , transformOrigin: 'var(--transform-origin)'
    , transition: 'opacity 0.15s ease, transform 0.15s ease'
    , '&[data-starting-style], &[data-ending-style]': {
        opacity: 0
        , transform: 'translateY(-4px) scale(0.98)'
    }
} );

export const selectItemStyles = css( {
    display: 'flex'
    , alignItems: 'center'
    , justifyContent: 'space-between'
    , gap: 'xs'
    , paddingX: 'xs'
    , paddingY: '10px'
    , fontSize: 'md'
    , fontWeight: 'medium'
    , color: 'text.primary'
    , cursor: 'pointer'
    , outline: 'none'
    , '&[data-highlighted]': {
        backgroundColor: 'text.primary'
        , color: 'background.primary'
    }
    , '&[data-selected]': { fontWeight: 'bold' }
} );
