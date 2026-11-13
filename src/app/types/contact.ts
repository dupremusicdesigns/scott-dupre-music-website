export type ContactFormValues = {
    name: string;
    school: string;
    location: string;
    email: string;
    phone: string;
    service: string;
    message: string;
};

export type ContactFormField = keyof ContactFormValues;

export type ShowFormValues = {
    name: string;
    school: string;
    email: string;
    movement1: string;
    movement2: string;
    movement3: string;
    extra: string;
    vision: string;
    contactTime: string;
};

export type ShowFormField = keyof ShowFormValues;

export type LeadFailure<Field extends string> =
    | {
        kind: 'invalid';
        field?: Field;
        message: string;
    }
    | { kind: 'throttled' }
    | { kind: 'unavailable' }
    | { kind: 'failed' };

export type LeadSubmitResult<Field extends string> =
    | { ok: true }
    | {
        ok: false;
        failure: LeadFailure<Field>;
    };

export type ContactFailure = LeadFailure<ContactFormField>;

export type ContactSubmitResult = LeadSubmitResult<ContactFormField>;
