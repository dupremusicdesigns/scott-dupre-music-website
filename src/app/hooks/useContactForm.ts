'use client';

import {
    useCallback
    , useRef
    , useState
} from 'react';
import { submitContactForm } from '../api/contactApi';
import type {
    ContactFailure
    , ContactFormField
    , ContactFormValues
} from '../types';

export const emptyContactValues: ContactFormValues = {
    name: ''
    , school: ''
    , location: ''
    , email: ''
    , phone: ''
    , service: ''
    , message: ''
};

export const useContactForm = () => {
    const [ values, setValues ] = useState<ContactFormValues>( emptyContactValues );
    const [ website, setWebsite ] = useState( '' );
    const [ failure, setFailure ] = useState<ContactFailure | null>( null );
    const [ busy, setBusy ] = useState( false );
    const [ sent, setSent ] = useState( false );
    const inFlight = useRef( false );
    const [ openedAt ] = useState( () => Date.now() );

    const setValue = useCallback( ( field: ContactFormField, value: string ) => {
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

        const result = await submitContactForm( values, website, Date.now() - openedAt );

        if ( result.ok ) {
            setSent( true );
        } else {
            setFailure( result.failure );
        }

        inFlight.current = false;
        setBusy( false );
    }, [ values, website, openedAt ] );

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
