'use client';

import {
    useCallback
    , useEffect
    , useRef
    , useState
} from 'react';
import {
    acceptQuote
    , fetchQuote
    , unlockQuote
} from '../api/quoteApi';
import type {
    QuoteAcceptanceInput
    , QuoteFailure
    , QuoteView
} from '../types';
import {
    clearGrant
    , getQuoteToken
    , readStoredGrant
    , storeGrant
} from '../utils/quoteUtils';

export type QuotePhase =
    | { name: 'loading' }
    | { name: 'missing' }
    | { name: 'pin' }
    | { name: 'failed' }
    | { name: 'ready'; quote: QuoteView };

export const useQuote = () => {
    const [ phase, setPhase ] = useState<QuotePhase>( { name: 'loading' } );
    const [ pinFailure, setPinFailure ] = useState<QuoteFailure | null>( null );
    const [ acceptFailure, setAcceptFailure ] = useState<QuoteFailure | null>( null );
    const [ busy, setBusy ] = useState( false );
    const tokenRef = useRef( '' );
    const grantRef = useRef( '' );
    const inFlightRef = useRef( false );

    const load = useCallback( async () => {
        const result = await fetchQuote( tokenRef.current, grantRef.current );

        if ( result.ok ) {
            setPhase( {
                name: 'ready'
                , quote: result.data.quote
            } );

            return;
        }

        setPinFailure( result.failure.kind === 'unauthorized' ? { kind: 'unauthorized' } : null );

        if ( result.failure.kind === 'network' ) {
            setPhase( { name: 'failed' } );

            return;
        }

        clearGrant( tokenRef.current );
        grantRef.current = '';
        setPhase( result.failure.kind === 'not-found' ? { name: 'missing' } : { name: 'pin' } );
    }, [] );

    useEffect( () => {
        tokenRef.current = getQuoteToken( window.location.pathname );

        if ( !tokenRef.current ) {
            setPhase( { name: 'missing' } );

            return;
        }

        grantRef.current = readStoredGrant( tokenRef.current );

        if ( grantRef.current ) {
            void load();

            return;
        }

        setPhase( { name: 'pin' } );
    }, [ load ] );

    const submitPin = useCallback( async ( pin: string ) => {
        if ( inFlightRef.current ) {
            return;
        }

        inFlightRef.current = true;
        setBusy( true );
        setPinFailure( null );

        const result = await unlockQuote( tokenRef.current, pin );

        if ( result.ok ) {
            grantRef.current = result.data.grant;
            storeGrant( tokenRef.current, result.data );
            await load();
        } else if ( result.failure.kind === 'not-found' ) {
            setPhase( { name: 'missing' } );
        } else {
            setPinFailure( result.failure );
        }

        inFlightRef.current = false;
        setBusy( false );
    }, [ load ] );

    const submitAcceptance = useCallback( async ( input: QuoteAcceptanceInput ) => {
        if ( inFlightRef.current ) {
            return;
        }

        inFlightRef.current = true;
        setBusy( true );
        setAcceptFailure( null );

        const result = await acceptQuote( tokenRef.current, grantRef.current, input );

        if ( result.ok ) {
            setPhase( {
                name: 'ready'
                , quote: result.data.quote
            } );
        } else if ( result.failure.kind === 'unauthorized' ) {
            clearGrant( tokenRef.current );
            grantRef.current = '';
            setPinFailure( { kind: 'unauthorized' } );
            setPhase( { name: 'pin' } );
        } else if ( result.failure.kind === 'not-found' ) {
            setPhase( { name: 'missing' } );
        } else if ( result.failure.kind === 'not-open' ) {
            await load();
        } else {
            setAcceptFailure( result.failure );
        }

        inFlightRef.current = false;
        setBusy( false );
    }, [ load ] );

    return {
        phase
        , pinFailure
        , acceptFailure
        , busy
        , submitPin
        , submitAcceptance
    };
};
