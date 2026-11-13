import { getStore } from '@netlify/blobs';
import type { CounterStore } from './leadLimits';

export const createNetlifyCounterStore = (): CounterStore => {
    const store = getStore( 'lead-limits' );

    return {
        read: async key => {
            const value = await store.get( key );
            const count = Number( value );

            return Number.isFinite( count ) ? count : 0;
        }
        , write: async ( key, value ) => {
            await store.set( key, String( value ) );
        }
    };
};
