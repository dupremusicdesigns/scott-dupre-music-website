'use client';

import {
    useCallback
    , useEffect
    , useRef
    , useState
} from 'react';
import {
    fetchQuestionnaire
    , saveQuestionnaire
} from '../api/questionnaireApi';
import { QUESTIONNAIRE_BASE_PATH } from '../constants/questionnaireConstants';
import type {
    QuestionnaireFailure
    , QuestionnaireView
} from '../types';

export type QuestionnairePhase =
    | { name: 'loading' }
    | { name: 'missing' }
    | { name: 'failed' }
    | { name: 'ready'; questionnaire: QuestionnaireView };

const readToken = ( pathname: string ): string => {
    const [ , base, token ] = pathname.split( '/' );

    if ( `/${ base }` !== QUESTIONNAIRE_BASE_PATH || !token ) {
        return '';
    }

    try {
        return decodeURIComponent( token );
    } catch {
        return '';
    }
};

export const useQuestionnaire = () => {
    const [ phase, setPhase ] = useState<QuestionnairePhase>( { name: 'loading' } );
    const [ failure, setFailure ] = useState<QuestionnaireFailure | null>( null );
    const [ saved, setSaved ] = useState( false );
    const [ busy, setBusy ] = useState( false );
    const tokenRef = useRef( '' );
    const inFlightRef = useRef( false );

    useEffect( () => {
        tokenRef.current = readToken( window.location.pathname );

        if ( !tokenRef.current ) {
            setPhase( { name: 'missing' } );

            return;
        }

        fetchQuestionnaire( tokenRef.current ).then( result => {
            if ( result.ok ) {
                setPhase( {
                    name: 'ready'
                    , questionnaire: result.questionnaire
                } );
            } else {
                setPhase( result.failure.kind === 'not-found' ? { name: 'missing' } : { name: 'failed' } );
            }
        } );
    }, [] );

    const submit = useCallback( async ( answers: Record<string, string> ) => {
        if ( inFlightRef.current ) {
            return;
        }

        inFlightRef.current = true;
        setBusy( true );
        setFailure( null );
        setSaved( false );

        const result = await saveQuestionnaire( tokenRef.current, answers );

        if ( result.ok ) {
            setPhase( {
                name: 'ready'
                , questionnaire: result.questionnaire
            } );
            setSaved( true );
        } else if ( result.failure.kind === 'not-found' ) {
            setPhase( { name: 'missing' } );
        } else {
            setFailure( result.failure );
        }

        inFlightRef.current = false;
        setBusy( false );
    }, [] );

    return {
        phase
        , failure
        , saved
        , busy
        , submit
    };
};
