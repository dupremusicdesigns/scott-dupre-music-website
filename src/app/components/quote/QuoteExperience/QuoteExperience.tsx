'use client';

import { css } from '../../../../../styled-system/css';
import { useQuote } from '../../../hooks/useQuote';
import { QuoteBanner } from '../QuoteBanner/QuoteBanner';
import { QuoteMessage } from '../QuoteMessage/QuoteMessage';
import { QuotePinForm } from '../QuotePinForm/QuotePinForm';
import { QuoteReady } from '../QuoteReady/QuoteReady';

type QuoteExperienceProps = {
    heroImageUrl: string | null;
}

export const QuoteExperience = ( { heroImageUrl }: QuoteExperienceProps ) => {
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
                phase.name !== 'ready' && (
                    <QuoteBanner
                        imageUrl={ heroImageUrl }
                        compact
                    />
                )
            }
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
                        This link is not valid anymore. Please contact me for a new one.
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
                        heroImageUrl={ heroImageUrl }
                        busy={ busy }
                        failure={ acceptFailure }
                        onAccept={ submitAcceptance }
                    />
                )
            }
        </main>
    );
};
