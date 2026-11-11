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
        <div
            className={
                css( {
                    display: 'grid'
                    , gap: 'sm'
                } )
            }
        >
            {
                options.map( option => {
                    const selected = editable
                        ? selectedIds.has( option.id )
                        : status === 'Approved' ? option.approved === true : option.selected;
                    const interactive = editable && !option.included;

                    return (
                        <label
                            key={ option.id }
                            className={
                                css( {
                                    display: 'grid'
                                    , gridTemplateColumns: editable ? 'auto minmax(0, 1fr) auto' : 'minmax(0, 1fr) auto'
                                    , alignItems: 'start'
                                    , columnGap: 'sm'
                                    , rowGap: '4px'
                                    , padding: 'sm'
                                    , border: '2px solid'
                                    , borderColor: selected ? 'border.dark' : 'border.default'
                                    , borderRadius: 'sm'
                                    , backgroundColor: option.included ? 'background.secondary' : 'background.primary'
                                    , cursor: interactive ? 'pointer' : 'default'
                                    , _hover: interactive ? { borderColor: 'border.dark' } : {}
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
                                                width: '20px'
                                                , height: '20px'
                                                , marginTop: '2px'
                                                , accentColor: 'black'
                                            } )
                                        }
                                    />
                                )
                            }
                            <strong
                                className={
                                    css( {
                                        fontSize: 'md'
                                        , fontWeight: 'black'
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
                                        fontSize: 'md'
                                        , fontWeight: 'black'
                                        , whiteSpace: 'nowrap'
                                        , color: 'text.primary'
                                    } )
                                }
                            >
                                { formatMoney( option.price ) }
                            </strong>
                            <span
                                className={
                                    css( {
                                        gridColumn: editable ? '2 / -1' : '1 / -1'
                                        , fontSize: 'base'
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
                            {
                                !editable && (
                                    <span
                                        className={
                                            css( {
                                                gridColumn: '1 / -1'
                                                , fontSize: 'base'
                                                , fontWeight: 'bold'
                                                , color: 'text.primary'
                                            } )
                                        }
                                    >
                                        { describeOutcome( option, status, selected ) }
                                    </span>
                                )
                            }
                        </label>
                    );
                } )
            }
        </div>
    </section>
);
