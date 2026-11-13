import { css } from '../../../../../styled-system/css';
import type { QuoteOption } from '../../../types';
import { formatMoney } from '../../../utils/quoteUtils';
import { sectionHeadingStyles } from '../quoteStyles';

type QuoteExtrasProps = {
    options: QuoteOption[];
    selectedIds: ReadonlySet<string>;
    status: 'Sent' | 'Pending Approval' | 'Approved';
    editable: boolean;
    onToggle: ( optionId: string ) => void;
}

const describeOutcome = (
    option: QuoteOption
    , status: QuoteExtrasProps['status']
    , selected: boolean
): string => {
    if ( option.included ) {
        return 'Already added';
    }

    if ( status === 'Approved' ) {
        if ( option.approved === true ) {
            return 'Added';
        }

        return selected ? 'Scott will follow up' : 'Not added';
    }

    return selected ? 'Selected' : 'Not selected';
};

export const QuoteExtras = ( {
    options
    , selectedIds
    , status
    , editable
    , onToggle
}: QuoteExtrasProps ) => (
    <section>
        <h2 className={ sectionHeadingStyles }>
            Add to your season
        </h2>
        <p
            className={
                css( {
                    marginTop: '-4px'
                    , marginBottom: '14px'
                    , fontSize: 'base'
                    , color: 'text.secondary'
                } )
            }
        >
            Each is an additional charge, invoiced in full after delivery. None are part of the show price.
        </p>
        <div
            className={
                css( {
                    display: 'grid'
                    , gap: '12px'
                } )
            }
        >
            {
                options.map( option => {
                    const selected = editable
                        ? selectedIds.has( option.id )
                        : status === 'Approved' ? option.approved === true : option.selected;
                    const interactive = editable && !option.included;
                    const pillText = interactive
                        ? selected ? 'Added ✓' : 'Add'
                        : describeOutcome( option, status, selected );

                    return (
                        <label
                            key={ option.id }
                            className={
                                css( {
                                    display: 'grid'
                                    , gridTemplateColumns: 'minmax(0, 1fr) auto'
                                    , columnGap: '18px'
                                    , rowGap: '4px'
                                    , position: 'relative'
                                    , padding: '16px'
                                    , border: '2px solid'
                                    , borderColor: option.included ? 'border.default' : selected ? 'border.dark' : 'gray.300'
                                    , boxShadow: selected && !option.included ? 'inset 0 0 0 1px {colors.brand.black}' : 'none'
                                    , borderRadius: '16px'
                                    , backgroundColor: option.included ? 'background.secondary' : 'background.primary'
                                    , cursor: interactive ? 'pointer' : 'default'
                                    , _hover: interactive ? { borderColor: 'border.dark' } : {}
                                    , '&:has(input:focus-visible)': {
                                        outline: '2px solid'
                                        , outlineColor: 'brand.black'
                                        , outlineOffset: '3px'
                                    }
                                    , sm: { padding: '18px 20px' }
                                } )
                            }
                        >
                            {
                                editable && (
                                    <input
                                        type='checkbox'
                                        checked={ selected }
                                        disabled={ !interactive }
                                        onChange={ () => onToggle( option.id ) }
                                        className={
                                            css( {
                                                position: 'absolute'
                                                , opacity: 0
                                                , pointerEvents: 'none'
                                            } )
                                        }
                                    />
                                )
                            }
                            <strong
                                className={
                                    css( {
                                        fontSize: 'lg'
                                        , fontWeight: 'black'
                                        , letterSpacing: '0.02em'
                                        , textTransform: 'uppercase'
                                        , color: 'text.primary'
                                    } )
                                }
                            >
                                { option.name }
                            </strong>
                            <strong
                                className={
                                    css( {
                                        fontSize: 'lg'
                                        , fontWeight: 'black'
                                        , whiteSpace: 'nowrap'
                                        , textAlign: 'right'
                                        , color: 'text.primary'
                                    } )
                                }
                            >
                                { formatMoney( option.price ) }
                            </strong>
                            <span
                                className={
                                    css( {
                                        fontSize: 'base'
                                        , color: 'text.secondary'
                                    } )
                                }
                            >
                                {
                                    option.included
                                        ? 'Already on your season, billed on its own.'
                                        : option.description || 'Additional service, invoiced after delivery.'
                                }
                            </span>
                            <span
                                className={
                                    css( {
                                        gridColumn: 2
                                        , gridRow: 2
                                        , justifySelf: 'end'
                                        , alignSelf: 'end'
                                        , paddingX: '14px'
                                        , paddingY: '5px'
                                        , fontSize: '11.5px'
                                        , fontWeight: 'black'
                                        , letterSpacing: '0.08em'
                                        , textTransform: 'uppercase'
                                        , whiteSpace: 'nowrap'
                                        , border: '2px solid'
                                        , borderColor: option.included || ( !selected && !interactive ) ? 'gray.300' : 'border.dark'
                                        , borderRadius: 'lg'
                                        , color: selected && !option.included ? 'text.inverse' : option.included ? 'text.secondary' : 'text.primary'
                                        , backgroundColor: selected && !option.included ? 'brand.black' : 'transparent'
                                    } )
                                }
                            >
                                { pillText }
                            </span>
                        </label>
                    );
                } )
            }
        </div>
    </section>
);
