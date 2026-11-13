import { css } from '../../../../../styled-system/css';
import type { QuoteView } from '../../../types';
import {
    formatMoney
    , formatQuoteDate
} from '../../../utils/quoteUtils';
import { sectionHeadingStyles } from '../quoteStyles';

type QuoteItemsProps = {
    quote: QuoteView;
}

const describeItem = ( quote: QuoteView, index: number ): string => {
    if ( quote.kind === 'Clinic' && quote.clinic ) {
        const date = quote.clinic.date ? ` · ${ formatQuoteDate( quote.clinic.date ) }` : '';
        const unit = quote.clinic.hours === 1 ? 'hour' : 'hours';

        return `${ date } · ${ quote.clinic.hours } ${ unit } at ${ formatMoney( quote.clinic.rate ) }/hr`;
    }

    return index === 0
        ? ` · ${ quote.show.product }${ quote.show.type === 'Resale' ? ` · ${ quote.show.resaleScope }` : '' }`
        : '';
};

export const QuoteItems = ( { quote }: QuoteItemsProps ) => (
    <section>
        <h2 className={ sectionHeadingStyles }>
            Your
            { ' ' }
            { quote.kind === 'Clinic' ? 'clinic' : 'show' }
        </h2>
        {
            quote.items.map( ( item, index ) => (
                <div
                    key={ `${ item.description }-${ index }` }
                    className={
                        css( {
                            display: 'grid'
                            , gridTemplateColumns: 'minmax(0, 1fr) auto'
                            , columnGap: 'sm'
                            , rowGap: '4px'
                            , paddingY: '16px'
                            , borderBottom: '1px solid'
                            , borderColor: 'border.default'
                        } )
                    }
                >
                    <strong
                        className={
                            css( {
                                fontSize: 'lg'
                                , fontWeight: 'extrabold'
                                , color: 'text.primary'
                            } )
                        }
                    >
                        { quote.kind === 'Clinic' && quote.clinic ? quote.clinic.description : item.description }
                    </strong>
                    <strong
                        className={
                            css( {
                                fontSize: 'lg'
                                , fontWeight: 'black'
                                , whiteSpace: 'nowrap'
                                , color: 'text.primary'
                            } )
                        }
                    >
                        { formatMoney( item.amount ) }
                    </strong>
                    <span
                        className={
                            css( {
                                gridColumn: '1 / -1'
                                , fontSize: 'base'
                                , color: 'text.secondary'
                            } )
                        }
                    >
                        <span
                            className={
                                css( {
                                    fontSize: 'xs'
                                    , fontWeight: 'black'
                                    , letterSpacing: '0.08em'
                                    , textTransform: 'uppercase'
                                } )
                            }
                        >
                            { `● Your ${ quote.kind === 'Clinic' ? 'clinic' : 'show' }` }
                        </span>
                        { describeItem( quote, index ) }
                    </span>
                </div>
            ) )
        }
        {
            quote.kind !== 'Clinic' && quote.show.type === 'Resale' && quote.movements.length > 0 && (
                <ul
                    className={
                        css( {
                            display: 'flex'
                            , flexWrap: 'wrap'
                            , gap: '6px'
                            , marginTop: '8px'
                            , listStyle: 'none'
                            , padding: '0'
                        } )
                    }
                >
                    {
                        quote.movements.map( ( movement, index ) => (
                            <li
                                key={ `${ movement }-${ index }` }
                                className={
                                    css( {
                                        paddingX: '10px'
                                        , paddingY: '2px'
                                        , fontSize: 'sm'
                                        , fontWeight: 'bold'
                                        , border: '1.5px solid'
                                        , borderColor: 'gray.300'
                                        , borderRadius: 'lg'
                                    } )
                                }
                            >
                                { `${ index + 1 }. ${ movement }` }
                            </li>
                        ) )
                    }
                </ul>
            )
        }
    </section>
);
