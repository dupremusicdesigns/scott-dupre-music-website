'use client';

import {
    useCallback
    , useRef
    , useState
} from 'react';
import type {
    LeadFailure
    , LeadSubmitResult
} from '../types';

export const useLeadForm = <Field extends string>(
    emptyValues: Record<Field, string>
    , send: ( values: Record<Field, string>, website: string, elapsed: number ) => Promise<LeadSubmitResult<Field>>
) => {
    const [ values, setValues ] = useState<Record<Field, string>>( emptyValues );
    const [ website, setWebsite ] = useState( '' );
    const [ failure, setFailure ] = useState<LeadFailure<Field> | null>( null );
    const [ busy, setBusy ] = useState( false );
    const [ sent, setSent ] = useState( false );
    const inFlight = useRef( false );
    const [ openedAt ] = useState( () => Date.now() );

    const setValue = useCallback( ( field: Field, value: string ) => {
        setValues( current => ( {
            ...current
            , [ field ]: value
        } ) );
    }, [] );

    const submit = useCallback( async () => {
        if ( inFlight.current ) {
            return;
        }

        inFlight.current = true;
        setBusy( true );
        setFailure( null );

        const result = await send( values, website, Date.now() - openedAt );

        if ( result.ok ) {
            setSent( true );
        } else {
            setFailure( result.failure );
        }

        inFlight.current = false;
        setBusy( false );
    }, [ send, values, website, openedAt ] );

    return {
        values
        , setValue
        , website
        , setWebsite
        , failure
        , busy
        , sent
        , submit
    };
};
