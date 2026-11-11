'use client';

import { css } from '../../../../../styled-system/css';
import { useQuote } from '../../../hooks/useQuote';
import { QuoteMessage } from '../QuoteMessage/QuoteMessage';
import { QuotePinForm } from '../QuotePinForm/QuotePinForm';
import { QuoteReady } from '../QuoteReady/QuoteReady';

export const QuoteExperience = () => {
    const {
        phase
        , pinFailure
        , acceptFailure
        , busy
        , submitPin
        , submitAcceptance
    } = useQuote();

    return (
        <main
            className={
                css( {
                    width: '100%'
                    , minHeight: '60vh'
                    , backgroundColor: 'background.primary'
                } )
            }
        >
            {
                phase.name === 'loading' && (
                    <QuoteMessage title='One moment'>
                        Loading your quote.
                    </QuoteMessage>
                )
            }
            {
                phase.name === 'missing' && (
                    <QuoteMessage title='Quote not found'>
                        This link is not valid anymore. Please contact Scott for a new one.
                    </QuoteMessage>
                )
            }
            {
                phase.name === 'failed' && (
                    <QuoteMessage title='Something went wrong'>
                        We could not load your quote. Please check your connection and refresh the page.
                    </QuoteMessage>
                )
            }
            {
                phase.name === 'pin' && (
                    <QuotePinForm
                        busy={ busy }
                        failure={ pinFailure }
                        onSubmit={ submitPin }
                    />
                )
            }
            {
                phase.name === 'ready' && (
                    <QuoteReady
                        quote={ phase.quote }
                        busy={ busy }
                        failure={ acceptFailure }
                        onAccept={ submitAcceptance }
                    />
                )
            }
        </main>
    );
};
