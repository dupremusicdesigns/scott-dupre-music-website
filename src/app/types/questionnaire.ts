export type QuestionnaireView = {
    school: string;
    season: string;
    answered: boolean;
    lastUpdated: string | null;
    updatedBy: string;
    instruments: { label: string; countKey: string; ratingKey: string }[];
    prompts: { key: string; prompt: string; hint?: string }[];
    values: Record<string, string>;
}

export type QuestionnaireFailure =
    | { kind: 'invalid'; field?: string; message: string }
    | { kind: 'not-found' }
    | { kind: 'network' };

export type QuestionnaireApiResult =
    | { ok: true; questionnaire: QuestionnaireView }
    | { ok: false; failure: QuestionnaireFailure };
