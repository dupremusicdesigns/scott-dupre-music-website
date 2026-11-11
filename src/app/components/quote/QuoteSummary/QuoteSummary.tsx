import { css } from '../../../../../styled-system/css';
import type { QuoteView } from '../../../types';
import {
    calculateQuoteTotal
    , formatMoney
    , formatQuoteDate
} from '../../../utils/quoteUtils';
import { sectionHeadingStyles } from '../quoteStyles';

type QuoteSummaryProps = {
    quote: QuoteView;
    selectedIds: ReadonlySet<string>;
    editable: boolean;
    children?: React.ReactNode;
}

const lineStyles = css( {
    display: 'flex'
    , justifyContent: 'space-between'
    , gap: 'sm'
    , paddingY: '6px'
    , fontSize: 'base'
    , color: 'text.primary'
} );

const describeAcceptance = ( quote: QuoteView ): string => {
    if ( quote.status === 'Pending Approval' ) {
        const first = quote.accepted ? quote.accepted.by.split( ' ' )[ 0 ] : '';
        const date = quote.accepted ? formatQuoteDate( quote.accepted.date ) : '';

        return `Thanks${ first ? `, ${ first }` : '' }. Scott has your acceptance from ${ date } and will confirm shortly.`;
    }

    return quote.kind === 'Clinic'
        ? 'Scott confirmed your clinic. See you there.'
        : 'Scott confirmed your quote. The agreement comes next.';
};

export const QuoteSummary = ( {
    quote
    , selectedIds
    , editable
    , children
}: QuoteSummaryProps ) => {
    const shownIds = new Set(
        editable
            ? selectedIds
            : quote.options
                .filter( option => quote.status === 'Approved' ? option.approved === true : option.selected )
                .map( option => option.id )
    );
    const total = editable ? calculateQuoteTotal( quote, selectedIds ) : quote.total;
    const addedOptions = quote.options.filter( option => shownIds.has( option.id ) && !option.included );

    return (
        <aside
            className={
                css( {
                    padding: 'md'
                    , border: '2px solid'
                    , borderColor: 'border.dark'
                    , borderRadius: 'md'
                    , md: {
                        position: 'sticky'
                        , top: 'md'
                    }
                } )
            }
        >
            <h2 className={ sectionHeadingStyles }>
                Summary
            </h2>
            {
                quote.items.map( ( item, index ) => (
                    <div
                        key={ `${ item.description }-${ index }` }
                        className={ lineStyles }
                    >
                        <span>
                            { quote.kind === 'Clinic' && quote.clinic ? quote.clinic.description : item.description }
                        </span>
                        <strong>
                            { formatMoney( item.amount ) }
                        </strong>
                    </div>
                ) )
            }
            {
                addedOptions.map( option => (
                    <div
                        key={ option.id }
                        className={ lineStyles }
                    >
                        <span>
                            { option.name }
                        </span>
                        <strong>
                            { formatMoney( option.price ) }
                        </strong>
                    </div>
                ) )
            }
            <div
                className={
                    css( {
                        display: 'flex'
                        , justifyContent: 'space-between'
                        , alignItems: 'baseline'
                        , marginTop: 'xs'
                        , paddingTop: 'sm'
                        , borderTop: '2px solid'
                        , borderColor: 'border.dark'
                    } )
                }
            >
                <span
                    className={
                        css( {
                            fontSize: 'base'
                            , fontWeight: 'black'
                            , textTransform: 'uppercase'
                        } )
                    }
                >
                    Total
                </span>
                <strong
                    aria-live='polite'
                    className={
                        css( {
                            fontSize: '3xl'
                            , fontWeight: 'black'
                            , lineHeight: 'tight'
                        } )
                    }
                >
                    { formatMoney( total ) }
                </strong>
            </div>
            <div
                className={
                    css( {
                        display: 'grid'
                        , gap: 'xs'
                        , marginTop: 'sm'
                        , fontSize: 'sm'
                        , color: 'text.secondary'
                    } )
                }
            >
                {
                    quote.kind === 'Clinic'
                        ? (
                            <p>
                                The clinic is invoiced in full after it takes place.
                            </p>
                        )
                        : (
                            <>
                                {
                                    quote.depositPercent !== null && (
                                        <p>
                                            A
                                            { ' ' }
                                            { quote.depositPercent }
                                            % deposit is due at signing, and the balance at final delivery.
                                        </p>
                                    )
                                }
                                {
                                    addedOptions.length > 0 && (
                                        <p>
                                            Added services are invoiced in full after delivery.
                                        </p>
                                    )
                                }
                                <p>
                                    Each copyrighted piece needs a license for your program, arranged by your program.
                                </p>
                            </>
                        )
                }
            </div>
            {
                editable
                    ? children
                    : (
                        <div
                            role='status'
                            className={ css( { marginTop: 'md' } ) }
                        >
                            <strong
                                className={
                                    css( {
                                        fontSize: 'md'
                                        , fontWeight: 'black'
                                        , textTransform: 'uppercase'
                                    } )
                                }
                            >
                                { quote.status === 'Pending Approval' ? 'Accepted' : 'Confirmed' }
                            </strong>
                            <p
                                className={
                                    css( {
                                        marginTop: 'xs'
                                        , fontSize: 'base'
                                        , color: 'text.secondary'
                                    } )
                                }
                            >
                                { describeAcceptance( quote ) }
                            </p>
                        </div>
                    )
            }
        </aside>
    );
};
