import { createHash } from 'crypto';

export type CounterStore = {
    read: ( key: string ) => Promise<number>;
    write: ( key: string, value: number ) => Promise<void>;
};

export type SlotResult = 'ok' | 'email-limit' | 'total-limit';

export const DAILY_LIMIT_TOTAL = 100;
export const DAILY_LIMIT_PER_EMAIL = 3;

const dayKey = ( now: Date ): string => now.toISOString().slice( 0, 10 );

const hashEmail = ( email: string ): string => {
    return createHash( 'sha256' ).update( email.trim().toLowerCase() ).digest( 'hex' ).slice( 0, 24 );
};

export const claimSlot = async (
    store: CounterStore
    , email: string
    , now: Date = new Date()
): Promise<SlotResult> => {
    const day = dayKey( now );
    const totalKey = `total:${ day }`;
    const emailKey = `email:${ hashEmail( email ) }:${ day }`;
    const [ total, perEmail ] = await Promise.all( [ store.read( totalKey ), store.read( emailKey ) ] );

    if ( total >= DAILY_LIMIT_TOTAL ) {
        return 'total-limit';
    }

    if ( perEmail >= DAILY_LIMIT_PER_EMAIL ) {
        return 'email-limit';
    }

    await Promise.all( [ store.write( totalKey, total + 1 ), store.write( emailKey, perEmail + 1 ) ] );

    return 'ok';
};
