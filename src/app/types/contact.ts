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

export type ContactFailure =
    | {
        kind: 'invalid';
        field?: ContactFormField;
        message: string;
    }
    | { kind: 'throttled' }
    | { kind: 'unavailable' }
    | { kind: 'failed' };

export type ContactSubmitResult =
    | { ok: true }
    | {
        ok: false;
        failure: ContactFailure;
    };
