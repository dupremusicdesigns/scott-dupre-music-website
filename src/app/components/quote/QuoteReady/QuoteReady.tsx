'use client';

import { useState } from 'react';
import { css } from '../../../../../styled-system/css';
import type {
    QuoteAcceptanceInput
    , QuoteFailure
    , QuoteView
} from '../../../types';
import { QuoteAcceptForm } from '../QuoteAcceptForm/QuoteAcceptForm';
import { QuoteExtras } from '../QuoteExtras/QuoteExtras';
import { QuoteHero } from '../QuoteHero/QuoteHero';
import { QuoteItems } from '../QuoteItems/QuoteItems';
import { QuoteSummary } from '../QuoteSummary/QuoteSummary';

type QuoteReadyProps = {
    quote: QuoteView;
    busy: boolean;
    failure: QuoteFailure | null;
    onAccept: ( input: QuoteAcceptanceInput ) => void;
}

export const QuoteReady = ( {
    quote
    , busy
    , failure
    , onAccept
}: QuoteReadyProps ) => {
    const [ selectedIds, setSelectedIds ] = useState<ReadonlySet<string>>( new Set() );
    const editable = quote.status === 'Sent';
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
        <div
            className={
                css( {
                    maxWidth: '1120px'
                    , marginX: 'auto'
                    , paddingX: 'md'
                    , paddingBottom: '2xl'
                    , md: { paddingX: '7%' }
                } )
            }
        >
            <QuoteHero quote={ quote } />
            <div
                className={
                    css( {
                        display: 'grid'
                        , gap: 'lg'
                        , marginTop: 'xl'
                        , alignItems: 'start'
                        , md: { gridTemplateColumns: 'minmax(0, 1fr) 340px' }
                    } )
                }
            >
                <div
                    className={
                        css( {
                            display: 'grid'
                            , gap: 'lg'
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
                </QuoteSummary>
            </div>
        </div>
    );
};
