'use client';

import type { FormEvent } from 'react';
import { css } from '../../../../styled-system/css';
import { LEAD_FAILURE_TEXT } from '../../constants/contactConstants';
import { useShowForm } from '../../hooks/useShowForm';
import type { ShowFormField } from '../../types';
import { Button } from '../Button/Button';
import { ContactFormField } from '../contact/ContactFormField/ContactFormField';
import {
    contactControlStyles
    , contactErrorStyles
    , contactTrapStyles
} from '../contact/contactFormStyles';

type TextField = {
    name: ShowFormField;
    label: string;
    type?: string;
    autoComplete?: string;
    optional?: boolean;
};

const textFields: TextField[] = [
    {
        name: 'name'
        , label: 'Name'
        , autoComplete: 'name'
    }
    , {
        name: 'school'
        , label: 'School Name'
        , autoComplete: 'organization'
    }
    , {
        name: 'email'
        , label: 'Directors Email Address'
        , type: 'email'
        , autoComplete: 'email'
    }
    , {
        name: 'movement1'
        , label: 'Movement 1 Selection'
    }
    , {
        name: 'movement2'
        , label: 'Movement 2 Selection'
    }
    , {
        name: 'movement3'
        , label: 'Movement 3 Selection'
    }
    , {
        name: 'extra'
        , label: 'Optional Additional Selection (Intro or Postlude)'
        , optional: true
    }
];

export const BuildYourOwnShowForm = () => {
    const {
        values
        , setValue
        , website
        , setWebsite
        , failure
        , busy
        , sent
        , submit
    } = useShowForm();

    const handleSubmit = ( event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        void submit();
    };

    const fieldError = ( field: ShowFormField ) => {
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
                <h3
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
                </h3>
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
                    Your show is on its way to me. Check your email for a confirmation.
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
            {
                textFields.map( field => (
                    <ContactFormField
                        key={ field.name }
                        label={ field.label }
                        optional={ field.optional }
                        error={ fieldError( field.name ) }
                    >
                        <input
                            name={ field.name }
                            type={ field.type ?? 'text' }
                            autoComplete={ field.autoComplete }
                            required={ !field.optional }
                            value={ values[ field.name ] }
                            onChange={ event => setValue( field.name, event.target.value ) }
                            className={ contactControlStyles }
                        />
                    </ContactFormField>
                ) )
            }
            <ContactFormField
                label='Share your artistic vision for this marching production.'
                error={ fieldError( 'vision' ) }
            >
                <textarea
                    name='vision'
                    rows={ 5 }
                    required
                    value={ values.vision }
                    onChange={ event => setValue( 'vision', event.target.value ) }
                    className={ contactControlStyles }
                />
            </ContactFormField>
            <ContactFormField
                label='What is the best time of day to contact you?'
                optional
                error={ fieldError( 'contactTime' ) }
            >
                <input
                    name='contactTime'
                    type='text'
                    value={ values.contactTime }
                    onChange={ event => setValue( 'contactTime', event.target.value ) }
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
                        { LEAD_FAILURE_TEXT[ failure.kind ] }
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
