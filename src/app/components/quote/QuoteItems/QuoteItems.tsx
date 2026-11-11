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

        return `Your clinic${ date } · ${ quote.clinic.hours } ${ unit } at ${ formatMoney( quote.clinic.rate ) }/hr`;
    }

    const detail = index === 0
        ? ` · ${ quote.show.product }${ quote.show.type === 'Resale' ? ` · ${ quote.show.resaleScope }` : '' }`
        : '';

    return `Your show${ detail }`;
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
                            , paddingY: 'sm'
                            , borderBottom: '1px solid'
                            , borderColor: 'border.default'
                        } )
                    }
                >
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
                        { quote.kind === 'Clinic' && quote.clinic ? quote.clinic.description : item.description }
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
                            , gap: 'xs'
                            , marginTop: 'sm'
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
                                        paddingX: 'sm'
                                        , paddingY: '4px'
                                        , fontSize: 'base'
                                        , fontWeight: 'bold'
                                        , border: '2px solid'
                                        , borderColor: 'border.dark'
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
