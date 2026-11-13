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
            <QuoteBanner imageUrl={ heroImageUrl }>
                <QuoteHero quote={ quote } />
            </QuoteBanner>
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
                {
                    preview && (
                        <p
                            role='status'
                            className={
                                css( {
                                    marginTop: 'md'
                                    , padding: 'sm'
                                    , textAlign: 'center'
                                    , fontSize: 'sm'
                                    , fontWeight: 'bold'
                                    , color: 'text.inverse'
                                    , backgroundColor: 'brand.black'
                                    , borderRadius: 'sm'
                                } )
                            }
                        >
                            Preview of what the school sees. Nothing here is saved or sent.
                        </p>
                    )
                }
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
