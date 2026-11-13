import { css } from '../../../../../styled-system/css';
import type { QuoteView } from '../../../types';

type QuoteHeroProps = {
    quote: QuoteView;
}

const describeKind = ( quote: QuoteView ): string => {
    if ( quote.kind === 'Clinic' ) {
        return 'Clinic quote';
    }

    if ( quote.show.type === 'Full Custom' ) {
        return `${ quote.show.product } custom show`;
    }

    if ( quote.show.type === 'Resale' ) {
        return `${ quote.show.product } resale · ${ quote.show.resaleScope }`;
    }

    return 'Services';
};

const describeStatus = ( quote: QuoteView ): string => {
    if ( quote.status === 'Sent' ) {
        return quote.kind === 'Clinic'
            ? 'Here is your clinic quote. Review it, then accept.'
            : 'Here is your quote. Add any extras you would like below, then accept. The total updates as you go.';
    }

    return quote.status === 'Approved'
        ? 'Thank you. Scott has confirmed your quote.'
        : 'Thank you. Here is the quote as accepted.';
};

export const QuoteHero = ( { quote }: QuoteHeroProps ) => (
    <header
        className={
            css( {
                maxWidth: '620px'
            } )
        }
    >
        <p
            className={
                css( {
                    fontSize: 'base'
                    , fontWeight: 'extrabold'
                    , textTransform: 'uppercase'
                    , letterSpacing: 'tight'
                    , color: 'text.inverse'
                } )
            }
        >
            { describeKind( quote ) }
        </p>
        <h1
            className={
                css( {
                    marginTop: 'xs'
                    , fontSize: '3xl'
                    , fontWeight: 'black'
                    , lineHeight: 'tight'
                    , textTransform: 'uppercase'
                    , color: 'text.inverse'
                    , textWrap: 'balance'
                    , sm: { fontSize: '4xl' }
                    , md: { fontSize: '5xl' }
                } )
            }
        >
            { quote.school }
            { ' ' }
            { quote.show.season }
        </h1>
        <p
            className={
                css( {
                    maxWidth: '56ch'
                    , marginTop: 'sm'
                    , fontSize: 'md'
                    , fontWeight: 'medium'
                    , color: 'text.inverse'
                    , sm: { fontSize: 'lg' }
                } )
            }
        >
            { describeStatus( quote ) }
        </p>
    </header>
);
