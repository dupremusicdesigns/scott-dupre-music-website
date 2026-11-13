'use client';

import type { FormEvent } from 'react';
import { css } from '../../../../../styled-system/css';
import { CONTACT_SERVICE_OPTIONS } from '../../../constants/contactConstants';
import { useContactForm } from '../../../hooks/useContactForm';
import type { ContactFormField as ContactFormFieldName } from '../../../types';
import { Button } from '../../Button/Button';
import { ContactFormField } from '../ContactFormField/ContactFormField';
import {
    contactControlStyles
    , contactErrorStyles
    , contactTrapStyles
} from '../contactFormStyles';

const failureText = {
    throttled: 'You have sent several messages already. Please wait a bit before sending another.'
    , failed: 'Sorry, that did not go through. Please try again, or email me directly.'
};

export const ContactForm = () => {
    const {
        values
        , setValue
        , website
        , setWebsite
        , failure
        , busy
        , sent
        , submit
    } = useContactForm();

    const handleSubmit = ( event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        void submit();
    };

    const fieldError = ( field: ContactFormFieldName ) => {
        return failure?.kind === 'invalid' && failure.field === field ? failure.message : undefined;
    };

    if ( sent ) {
        return (
            <div
                role='status'
                className={
                    css( {
                        textAlign: 'center'
                        , paddingY: 'lg'
                    } )
                }
            >
                <h2
                    className={
                        css( {
                            fontSize: '2xl'
                            , fontWeight: 'black'
                            , textTransform: 'uppercase'
                            , color: 'text.primary'
                        } )
                    }
                >
                    Thank you
                </h2>
                <p
                    className={
                        css( {
                            fontSize: 'md'
                            , fontWeight: 'medium'
                            , color: 'text.primary'
                            , marginTop: 'xs'
                        } )
                    }
                >
                    Your message is on its way to Scott. Check your email for a confirmation.
                </p>
            </div>
        );
    }

    return (
        <form
            onSubmit={ handleSubmit }
            noValidate
            className={
                css( {
                    display: 'flex'
                    , flexDirection: 'column'
                    , gap: 'md'
                } )
            }
        >
            <ContactFormField
                label='Name'
                error={ fieldError( 'name' ) }
            >
                <input
                    name='name'
                    type='text'
                    autoComplete='name'
                    required
                    value={ values.name }
                    onChange={ event => setValue( 'name', event.target.value ) }
                    className={ contactControlStyles }
                />
            </ContactFormField>
            <ContactFormField
                label='School/Organization'
                error={ fieldError( 'school' ) }
            >
                <input
                    name='school'
                    type='text'
                    autoComplete='organization'
                    required
                    value={ values.school }
                    onChange={ event => setValue( 'school', event.target.value ) }
                    className={ contactControlStyles }
                />
            </ContactFormField>
            <ContactFormField
                label='Where is your school located? (city, state)'
                error={ fieldError( 'location' ) }
            >
                <input
                    name='location'
                    type='text'
                    autoComplete='address-level2'
                    required
                    value={ values.location }
                    onChange={ event => setValue( 'location', event.target.value ) }
                    className={ contactControlStyles }
                />
            </ContactFormField>
            <ContactFormField
                label='Email Address'
                error={ fieldError( 'email' ) }
            >
                <input
                    name='email'
                    type='email'
                    autoComplete='email'
                    inputMode='email'
                    required
                    value={ values.email }
                    onChange={ event => setValue( 'email', event.target.value ) }
                    className={ contactControlStyles }
                />
            </ContactFormField>
            <ContactFormField
                label='Phone Number'
                optional
                error={ fieldError( 'phone' ) }
            >
                <input
                    name='phone'
                    type='tel'
                    autoComplete='tel'
                    value={ values.phone }
                    onChange={ event => setValue( 'phone', event.target.value ) }
                    className={ contactControlStyles }
                />
            </ContactFormField>
            <ContactFormField
                label='What services are you interested in?'
                error={ fieldError( 'service' ) }
            >
                <select
                    name='service'
                    required
                    value={ values.service }
                    onChange={ event => setValue( 'service', event.target.value ) }
                    className={ contactControlStyles }
                >
                    <option value=''>
                        -- Select --
                    </option>
                    {
                        CONTACT_SERVICE_OPTIONS.map( option => (
                            <option
                                key={ option }
                                value={ option }
                            >
                                { option }
                            </option>
                        ) )
                    }
                </select>
            </ContactFormField>
            <ContactFormField
                label='Additional information'
                optional
                error={ fieldError( 'message' ) }
            >
                <textarea
                    name='message'
                    rows={ 5 }
                    value={ values.message }
                    onChange={ event => setValue( 'message', event.target.value ) }
                    className={ contactControlStyles }
                />
            </ContactFormField>
            <div
                aria-hidden='true'
                className={ contactTrapStyles }
            >
                <label>
                    Website
                    <input
                        name='website'
                        type='text'
                        tabIndex={ -1 }
                        autoComplete='off'
                        value={ website }
                        onChange={ event => setWebsite( event.target.value ) }
                    />
                </label>
            </div>
            {
                failure && failure.kind !== 'invalid' && (
                    <p
                        role='alert'
                        className={ contactErrorStyles }
                    >
                        { failureText[ failure.kind ] }
                    </p>
                )
            }
            <div
                className={
                    css( {
                        display: 'flex'
                        , justifyContent: 'center'
                    } )
                }
            >
                <Button
                    type='submit'
                    variant='primary'
                    size='md'
                    rounded='sm'
                    disabled={ busy }
                >
                    { busy ? 'Sending...' : 'Submit' }
                </Button>
            </div>
        </form>
    );
};
