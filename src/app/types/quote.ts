export type QuoteStatus = 'Sent' | 'Pending Approval' | 'Approved';

export type QuoteItem = {
    description: string;
    amount: number;
};

export type QuoteOption = {
    id: string;
    name: string;
    description: string;
    price: number;
    included: boolean;
    selected: boolean;
    approved: boolean | null;
};

export type QuoteClinic = {
    description: string;
    date: string;
    hours: number;
    rate: number;
};

export type QuoteView = {
    status: QuoteStatus;
    kind: 'Show' | 'Clinic';
    school: string;
    show: {
        title: string;
        type: string;
        product: string;
        resaleScope: string;
        season: string;
    };
    clinic: QuoteClinic | null;
    items: QuoteItem[];
    movements: string[];
    options: QuoteOption[];
    total: number;
    depositPercent: number | null;
    accepted: {
        by: string;
        date: string;
    } | null;
    prefill: {
        name: string;
        email: string;
    };
    preview?: boolean;
};

export type QuoteAcceptanceInput = {
    name: string;
    email: string;
    addOnIds: string[];
};

export type QuoteUnlockResponse = {
    grant: string;
    expiresAt: number;
};

export type QuoteFailure =
    | { kind: 'not-found' }
    | { kind: 'wrong-pin'; attemptsLeft: number }
    | { kind: 'locked'; retryAfterSeconds: number }
    | { kind: 'unauthorized' }
    | { kind: 'not-open' }
    | { kind: 'invalid'; field?: 'name' | 'email'; message: string }
    | { kind: 'network' };

export type QuoteApiResult<T> =
    | { ok: true; data: T }
    | { ok: false; failure: QuoteFailure };
