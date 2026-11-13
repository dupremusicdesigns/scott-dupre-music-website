import { css } from '../../../../../styled-system/css';
import type { QuoteView } from '../../../types';
import {
    calculateQuoteTotal
    , formatMoney
    , formatQuoteDate
} from '../../../utils/quoteUtils';
import { summaryHeadingStyles } from '../quoteStyles';

type QuoteSummaryProps = {
    quote: QuoteView;
    selectedIds: ReadonlySet<string>;
    editable: boolean;
    children?: React.ReactNode;
}

const lineStyles = css( {
    display: 'flex'
    , justifyContent: 'space-between'
    , gap: '14px'
    , paddingY: '5px'
    , fontSize: '14.5px'
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
    const showAmount = quote.items.reduce( ( sum, item ) => sum + item.amount, 0 );
    const depositAmount = Math.round( showAmount * ( quote.depositPercent ?? 0 ) ) / 100;
    const addedOptions = quote.options.filter( option => shownIds.has( option.id ) && !option.included );

    return (
        <aside
            className={
                css( {
                    padding: '22px'
                    , border: '2px solid'
                    , borderColor: 'border.dark'
                    , borderRadius: 'md'
                    , md: {
                        position: 'sticky'
                        , top: '20px'
                    }
                } )
            }
        >
            <h2 className={ summaryHeadingStyles }>
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
                        , marginTop: '10px'
                        , paddingTop: '12px'
                        , borderTop: '4px solid'
                        , borderColor: 'border.dark'
                    } )
                }
            >
                <span
                    className={
                        css( {
                            fontSize: '12px'
                            , fontWeight: 'black'
                            , letterSpacing: '0.1em'
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
                            fontSize: '34px'
                            , fontWeight: 'black'
                            , letterSpacing: '-0.02em'
                            , lineHeight: 'normal'
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
                        , gap: '6px'
                        , marginTop: '8px'
                        , marginBottom: '18px'
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
                                            % deposit (
                                            { formatMoney( depositAmount ) }
                                            ) is due at signing, and the balance at final delivery.
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
