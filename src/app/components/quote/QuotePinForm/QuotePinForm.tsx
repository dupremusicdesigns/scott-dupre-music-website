'use client';

import {
    useEffect
    , useState
} from 'react';
import { css } from '../../../../../styled-system/css';
import { Button } from '../../Button/Button';
import { QUOTE_PIN_LENGTH } from '../../../constants/quoteConstants';
import type { QuoteFailure } from '../../../types';
import { normalizePin } from '../../../utils/quoteUtils';
import {
    errorTextStyles
    , fieldLabelStyles
} from '../quoteStyles';

type QuotePinFormProps = {
    busy: boolean;
    failure: QuoteFailure | null;
    onSubmit: ( pin: string ) => void;
}

const describeFailure = ( failure: QuoteFailure | null ): string => {
    if ( !failure ) {
        return '';
    }

    if ( failure.kind === 'wrong-pin' ) {
        return failure.attemptsLeft === 1
            ? 'That PIN is not right. You have 1 try left.'
            : `That PIN is not right. You have ${ failure.attemptsLeft } tries left.`;
    }

    if ( failure.kind === 'unauthorized' ) {
        return 'Your session ended. Please enter your PIN again.';
    }

    if ( failure.kind === 'locked' ) {
        const minutes = Math.max( 1, Math.ceil( failure.retryAfterSeconds / 60 ) );

        return `Too many tries. Please wait ${ minutes } ${ minutes === 1 ? 'minute' : 'minutes' } and try again, or ask Scott for a new PIN.`;
    }

    return 'Something went wrong. Please try again.';
};

export const QuotePinForm = ( {
    busy
    , failure
    , onSubmit
}: QuotePinFormProps ) => {
    const [ pin, setPin ] = useState( '' );
    const [ clearedFailure, setClearedFailure ] = useState<typeof failure>( null );
    const locked = failure?.kind === 'locked' && clearedFailure !== failure;
    const message = describeFailure( failure );

    useEffect( () => {
        if ( failure?.kind !== 'locked' ) {
            return;
        }

        const timer = window.setTimeout( () => setClearedFailure( failure ), failure.retryAfterSeconds * 1000 );

        return () => window.clearTimeout( timer );
    }, [ failure ] );

    return (
        <section
            className={
                css( {
                    maxWidth: '520px'
                    , marginX: 'auto'
                    , paddingX: 'md'
                    , paddingY: 'xl'
                } )
            }
        >
            <h1
                className={
                    css( {
                        fontSize: '3xl'
                        , fontWeight: 'black'
                        , lineHeight: 'tight'
                        , textTransform: 'uppercase'
                        , textAlign: 'center'
                        , color: 'text.primary'
                        , md: { fontSize: '4xl' }
                    } )
                }
            >
                Your quote
            </h1>
            <p
                className={
                    css( {
                        marginTop: 'sm'
                        , textAlign: 'center'
                        , fontSize: 'md'
                        , fontWeight: 'medium'
                        , color: 'text.secondary'
                    } )
                }
            >
                Enter the 6-digit PIN Scott sent you with this link.
            </p>
            <form
                onSubmit={
                    event => {
                        event.preventDefault();

                        if ( pin.length === QUOTE_PIN_LENGTH && !locked ) {
                            onSubmit( pin );
                        }
                    }
                }
                className={
                    css( {
                        display: 'flex'
                        , flexDirection: 'column'
                        , gap: 'sm'
                        , marginTop: 'lg'
                        , padding: 'md'
                        , border: '2px solid'
                        , borderColor: 'border.dark'
                        , borderRadius: 'md'
                    } )
                }
            >
                <label className={ fieldLabelStyles }>
                    PIN
                    <input
                        name='pin'
                        value={ pin }
                        onChange={ event => setPin( normalizePin( event.target.value ).slice( 0, QUOTE_PIN_LENGTH ) ) }
                        inputMode='numeric'
                        autoComplete='one-time-code'
                        autoFocus
                        required
                        disabled={ locked }
                        aria-invalid={ failure?.kind === 'wrong-pin' }
                        aria-describedby='quote-pin-message'
                        className={
                            css( {
                                width: '100%'
                                , padding: '14px'
                                , fontSize: '2xl'
                                , fontWeight: 'black'
                                , letterSpacing: '0.4em'
                                , textAlign: 'center'
                                , color: 'text.primary'
                                , border: '2px solid'
                                , borderColor: 'border.default'
                                , borderRadius: 'sm'
                                , outline: 'none'
                                , _focus: { borderColor: 'border.dark' }
                                , _focusVisible: {
                                    outline: '2px solid'
                                    , outlineColor: 'brand.black'
                                    , outlineOffset: '2px'
                                }
                                , _disabled: { opacity: 0.5 }
                            } )
                        }
                    />
                </label>
                <p
                    id='quote-pin-message'
                    role='alert'
                    className={ errorTextStyles }
                >
                    { message }
                </p>
                <Button
                    type='submit'
                    variant='primary'
                    size='lg'
                    rounded='sm'
                    fullWidth
                    disabled={ busy || locked || pin.length !== QUOTE_PIN_LENGTH }
                >
                    { busy ? 'Checking' : 'View quote' }
                </Button>
            </form>
        </section>
    );
};
