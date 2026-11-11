'use client';

import { useState } from 'react';
import { css } from '../../../../../styled-system/css';
import { Button } from '../../Button/Button';
import type {
    QuoteFailure
    , QuoteView
} from '../../../types';
import {
    errorTextStyles
    , fieldInputStyles
    , fieldLabelStyles
} from '../quoteStyles';

type QuoteAcceptFormProps = {
    quote: QuoteView;
    busy: boolean;
    failure: QuoteFailure | null;
    onSubmit: ( details: { name: string; email: string } ) => void;
}

const describeFailure = ( failure: QuoteFailure | null ): string => {
    if ( !failure ) {
        return '';
    }

    if ( failure.kind === 'invalid' ) {
        return failure.message;
    }

    return 'Something went wrong. Please check your connection and try again.';
};

export const QuoteAcceptForm = ( {
    quote
    , busy
    , failure
    , onSubmit
}: QuoteAcceptFormProps ) => {
    const [ name, setName ] = useState( quote.prefill.name );
    const [ email, setEmail ] = useState( quote.prefill.email );
    const [ agreed, setAgreed ] = useState( false );
    const fieldFailure = failure?.kind === 'invalid' ? failure.field : undefined;
    const message = describeFailure( failure );

    return (
        <form
            onSubmit={
                event => {
                    event.preventDefault();
                    onSubmit( {
                        name: name.trim()
                        , email: email.trim()
                    } );
                }
            }
            className={
                css( {
                    display: 'flex'
                    , flexDirection: 'column'
                    , gap: 'sm'
                    , marginTop: 'md'
                } )
            }
        >
            <label className={ fieldLabelStyles }>
                Your name
                <input
                    name='name'
                    value={ name }
                    onChange={ event => setName( event.target.value ) }
                    autoComplete='name'
                    required
                    minLength={ 2 }
                    maxLength={ 120 }
                    placeholder='First and last name'
                    aria-invalid={ fieldFailure === 'name' }
                    className={ fieldInputStyles }
                />
            </label>
            <label className={ fieldLabelStyles }>
                Your email
                <input
                    name='email'
                    type='email'
                    value={ email }
                    onChange={ event => setEmail( event.target.value ) }
                    autoComplete='email'
                    required
                    maxLength={ 254 }
                    placeholder='you@school.org'
                    aria-invalid={ fieldFailure === 'email' }
                    className={ fieldInputStyles }
                />
            </label>
            <label
                className={
                    css( {
                        display: 'flex'
                        , alignItems: 'flex-start'
                        , gap: 'xs'
                        , fontSize: 'base'
                        , color: 'text.primary'
                        , cursor: 'pointer'
                    } )
                }
            >
                <input
                    type='checkbox'
                    checked={ agreed }
                    onChange={ event => setAgreed( event.target.checked ) }
                    required
                    className={
                        css( {
                            width: '18px'
                            , height: '18px'
                            , marginTop: '2px'
                            , flexShrink: 0
                            , accentColor: 'brand.black'
                        } )
                    }
                />
                <span>
                    I accept this quote on behalf of
                    { ' ' }
                    { quote.school }
                    . Scott will confirm
                    { quote.kind === 'Clinic' ? ' the clinic.' : ' and send the agreement.' }
                </span>
            </label>
            <p
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
                disabled={ busy }
            >
                { busy ? 'Sending' : 'Accept quote' }
            </Button>
        </form>
    );
};
