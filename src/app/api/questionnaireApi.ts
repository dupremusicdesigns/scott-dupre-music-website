import { QUESTIONNAIRE_API_PATH } from '../constants/questionnaireConstants';
import type {
    QuestionnaireApiResult
    , QuestionnaireView
} from '../types';

type Body = {
    questionnaire?: QuestionnaireView;
    error?: string;
    field?: string;
    message?: string;
};

const send = async ( token: string, init: RequestInit ): Promise<QuestionnaireApiResult> => {
    try {
        const response = await fetch( `${ QUESTIONNAIRE_API_PATH }/${ encodeURIComponent( token ) }`, {
            cache: 'no-store'
            , referrerPolicy: 'no-referrer'
            , ...init
        } );
        const body = ( await response.json().catch( () => ( {} ) ) ) as Body;

        if ( response.ok && body.questionnaire ) {
            return {
                ok: true
                , questionnaire: body.questionnaire
            };
        }

        if ( body.error === 'not-found' ) {
            return {
                ok: false
                , failure: { kind: 'not-found' }
            };
        }

        if ( body.error === 'invalid' ) {
            return {
                ok: false
                , failure: {
                    kind: 'invalid'
                    , field: body.field
                    , message: body.message ?? 'Please check your answers and try again.'
                }
            };
        }

        return {
            ok: false
            , failure: { kind: 'network' }
        };
    } catch {
        return {
            ok: false
            , failure: { kind: 'network' }
        };
    }
};

export const fetchQuestionnaire = ( token: string ): Promise<QuestionnaireApiResult> => {
    return send( token, {} );
};

export const saveQuestionnaire = (
    token: string
    , answers: Record<string, string>
): Promise<QuestionnaireApiResult> => {
    return send( token, {
        method: 'POST'
        , headers: { 'Content-Type': 'application/json' }
        , body: JSON.stringify( answers )
    } );
};
