'use client';

import { useState } from 'react';
import { css } from '../../../../../styled-system/css';
import type {
    QuoteAcceptanceInput
    , QuoteFailure
    , QuoteView
} from '../../../types';
import { QuoteAcceptForm } from '../QuoteAcceptForm/QuoteAcceptForm';
import { QuoteBanner } from '../QuoteBanner/QuoteBanner';
import { QuoteExtras } from '../QuoteExtras/QuoteExtras';
import { QuoteHero } from '../QuoteHero/QuoteHero';
import { QuoteItems } from '../QuoteItems/QuoteItems';
import { QuoteSummary } from '../QuoteSummary/QuoteSummary';

type QuoteReadyProps = {
    quote: QuoteView;
    heroImageUrl: string | null;
    busy: boolean;
    failure: QuoteFailure | null;
    onAccept: ( input: QuoteAcceptanceInput ) => void;
}

export const QuoteReady = ( {
    quote
    , heroImageUrl
    , busy
    , failure
    , onAccept
}: QuoteReadyProps ) => {
    const [ selectedIds, setSelectedIds ] = useState<ReadonlySet<string>>( new Set() );
    const editable = quote.status === 'Sent';
    const preview = quote.preview === true;
    const toggle = ( optionId: string ) => {
        setSelectedIds( current => {
            const next = new Set( current );

            if ( next.has( optionId ) ) {
                next.delete( optionId );
            } else {
                next.add( optionId );
            }

            return next;
        } );
    };

    return (
        <>
            {
                preview && (
                    <p
                        role='status'
                        className={
                            css( {
                                paddingX: '16px'
                                , paddingY: '6px'
                                , textAlign: 'center'
                                , fontSize: '12px'
                                , fontWeight: 'extrabold'
                                , letterSpacing: '0.08em'
                                , textTransform: 'uppercase'
                                , color: '#8a5a00'
                                , backgroundColor: '#fcf3e0'
                                , borderBottom: '2px solid #8a5a00'
                            } )
                        }
                    >
                        Preview · nothing here is saved or sent · accepting is turned off
                    </p>
                )
            }
            <QuoteBanner imageUrl={ heroImageUrl }>
                <QuoteHero quote={ quote } />
            </QuoteBanner>
            <div
                className={
                    css( {
                        maxWidth: '1080px'
                        , marginX: 'auto'
                        , paddingX: '16px'
                        , paddingTop: '44px'
                        , paddingBottom: '64px'
                        , sm: { paddingX: '28px' }
                    } )
                }
            >
                <div
                    className={
                        css( {
                            display: 'grid'
                            , gap: '32px'
                            , alignItems: 'start'
                            , '@media (min-width: 861px)': {
                                gridTemplateColumns: 'minmax(0, 1fr) 340px'
                                , gap: '44px'
                            }
                        } )
                    }
                >
                    <div
                        className={
                            css( {
                                display: 'grid'
                                , gap: '40px'
                            } )
                        }
                    >
                        <QuoteItems quote={ quote } />
                        {
                            quote.kind !== 'Clinic' && quote.options.length > 0 && (
                                <QuoteExtras
                                    options={ quote.options }
                                    selectedIds={ selectedIds }
                                    status={ quote.status }
                                    editable={ editable }
                                    onToggle={ toggle }
                                />
                            )
                        }
                    </div>
                    <QuoteSummary
                        quote={ quote }
                        selectedIds={ selectedIds }
                        editable={ editable }
                    >
                        {
                            !preview && (
                                <QuoteAcceptForm
                                    quote={ quote }
                                    busy={ busy }
                                    failure={ failure }
                                    onSubmit={
                                        details => onAccept( {
                                            ...details
                                            , addOnIds: [ ...selectedIds ]
                                        } )
                                    }
                                />
                            )
                        }
                    </QuoteSummary>
                </div>
            </div>
        </>
    );
};
