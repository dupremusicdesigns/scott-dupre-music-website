import { cva } from '../../../../styled-system/css';

export const buttonStyles = cva( {
    base: {
        display: 'inline-flex'
        , alignItems: 'center'
        , justifyContent: 'center'
        , gap: 'sm'
        , textTransform: 'uppercase'
        , fontWeight: 'black'
        , lineHeight: 'normal'
        , cursor: 'pointer'
        , transition: 'all 0.2s'
        , outline: 'none'
        , border: 'none'
        , WebkitTapHighlightColor: 'transparent'
        , touchAction: 'manipulation'
        , _disabled: {
            cursor: 'not-allowed'
            , opacity: 0.5
        }
        , _focusVisible: {
            outline: '2px solid'
            , outlineColor: 'brand.black'
            , outlineOffset: '2px'
        }
    }
    , variants: {
        variant: {
            primary: {
                backgroundColor: 'button.primary'
                , color: 'button.primaryText'
                , border: '2px solid transparent'
                , '&:hover:not(:disabled)': {
                    backgroundColor: 'button.primaryHover'
                    , borderColor: 'border.dark'
                    , color: 'text.primary'
                }
                , '&:active:not(:disabled)': {
                    transform: 'scale(0.98)'
                }
            }
            , secondary: {
                backgroundColor: 'button.secondary'
                , color: 'button.secondaryText'
                , border: '2px solid transparent'
                , '&:hover:not(:disabled)': {
                    backgroundColor: 'button.outlineHover'
                    , borderColor: 'border.light'
                    , color: 'text.inverse'
                }
                , '&:active:not(:disabled)': {
                    transform: 'scale(0.98)'
                }
            }
            , outline: {
                backgroundColor: 'transparent'
                , color: 'button.outlineText'
                , border: '2px solid'
                , borderColor: 'button.outlineBorder'
                , '&:hover:not(:disabled)': {
                    backgroundColor: 'button.outlineHover'
                }
                , '&:active:not(:disabled)': {
                    transform: 'scale(0.98)'
                }
            }
            , outlineDark: {
                backgroundColor: 'transparent'
                , color: 'text.primary'
                , border: '2px solid'
                , borderColor: 'border.dark'
                , '&:hover:not(:disabled)': {
                    backgroundColor: 'button.primaryHover'
                }
                , '&:active:not(:disabled)': {
                    transform: 'scale(0.98)'
                }
            }
            , white: {
                backgroundColor: 'white'
                , color: 'text.primary'
                , border: '2px solid white'
                , '&:hover:not(:disabled)': {
                    backgroundColor: 'gray.100'
                }
                , '&:active:not(:disabled)': {
                    transform: 'scale(0.98)'
                }
            }
        }
        , size: {
            sm: {
                height: '44px'
                , px: 'md'
                , fontSize: 'sm'
            }
            , md: {
                height: '51px'
                , px: 'lg'
                , fontSize: 'base'
            }
            , lg: {
                height: '63px'
                , px: 'xl'
                , fontSize: 'lg'
            }
            , footer: {
                height: '58px'
                , px: 'xl'
                , fontSize: 'sm'
                , minWidth: '200px'
                , whiteSpace: 'nowrap'
            }
        }
        , rounded: {
            sm: { borderRadius: 'sm' }
            , md: { borderRadius: 'md' }
            , lg: { borderRadius: 'lg' }
        }
        , fullWidth: {
            true: { width: '100%' }
        }
    }
    , defaultVariants: {
        variant: 'primary'
        , size: 'md'
        , rounded: 'md'
    }
} );
