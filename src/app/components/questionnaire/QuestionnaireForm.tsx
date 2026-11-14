'use client';

import {
    useState
    , type FormEvent
} from 'react';
import {
    css
    , cx
} from '../../../../styled-system/css';
import type {
    QuestionnaireFailure
    , QuestionnaireView
} from '../../types';
import { Button } from '../Button/Button';
import {
    errorTextStyles
    , fieldInputStyles
    , fieldLabelStyles
    , sectionHeadingStyles
} from '../quote/quoteStyles';

type QuestionnaireFormProps = {
    questionnaire: QuestionnaireView;
    busy: boolean;
    failure: QuestionnaireFailure | null;
    saved: boolean;
    onSubmit: ( answers: Record<string, string> ) => void;
}

const numberStyles = css( {
    width: '100%'
    , padding: '9px 8px'
    , fontSize: '15px'
    , textAlign: 'center'
    , color: 'text.primary'
    , backgroundColor: 'background.primary'
    , border: '1.5px solid'
    , borderColor: 'gray.300'
    , borderRadius: 'sm'
    , outline: 'none'
    , _focus: { borderColor: 'border.dark' }
    , _focusVisible: {
        outline: '2px solid'
        , outlineColor: 'brand.black'
        , outlineOffset: '2px'
    }
} );

const columnHeadingStyles = css( {
    fontSize: '11px'
    , fontWeight: 'black'
    , letterSpacing: '0.08em'
    , textTransform: 'uppercase'
    , textAlign: 'center'
    , color: 'text.primary'
} );

const formatSavedDate = ( value: string ): string => {
    const date = new Date( `${ value.slice( 0, 10 ) }T00:00:00` );

    return Number.isNaN( date.getTime() )
        ? value
        : date.toLocaleDateString( 'en-US', {
            month: 'short'
            , day: 'numeric'
            , year: 'numeric'
        } );
};

export const QuestionnaireForm = ( {
    questionnaire
    , busy
    , failure
    , saved
    , onSubmit
}: QuestionnaireFormProps ) => {
    const [ values, setValues ] = useState<Record<string, string>>( questionnaire.values );
    const [ name, setName ] = useState( questionnaire.updatedBy );
    const total = questionnaire.instruments.reduce( ( sum, item ) => sum + ( Number( values[ item.countKey ] ) || 0 ), 0 );
    const invalid = failure?.kind === 'invalid' ? failure : null;
    const message = invalid
        ? invalid.message
        : failure
            ? 'Something went wrong. Please check your connection and try again.'
            : '';
    const setValue = ( key: string, value: string ) => setValues( current => ( {
        ...current
        , [ key ]: value
    } ) );
    const handleSubmit = ( event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        onSubmit( {
            ...values
            , name: name.trim()
        } );
    };

    return (
        <form
            onSubmit={ handleSubmit }
            className={
                css( {
                    maxWidth: '760px'
                    , marginX: 'auto'
                    , paddingX: 'md'
                    , paddingY: 'xl'
                    , display: 'flex'
                    , flexDirection: 'column'
                    , gap: 'lg'
                } )
            }
        >
            <section>
                <h2 className={ sectionHeadingStyles }>
                    Your winds
                </h2>
                <p
                    className={
                        css( {
                            marginBottom: 'sm'
                            , fontSize: 'base'
                            , color: 'text.secondary'
                        } )
                    }
                >
                    Enter the number of each instrument you plan to march next season and the overall section strength from 1 to 10.
                </p>
                <div
                    className={
                        css( {
                            display: 'grid'
                            , gridTemplateColumns: 'minmax(0, 1fr) 84px 84px'
                            , gap: '8px'
                            , alignItems: 'center'
                            , sm: { gridTemplateColumns: 'minmax(0, 1fr) 110px 110px' }
                        } )
                    }
                >
                    <span />
                    <span className={ columnHeadingStyles }>
                        How many
                    </span>
                    <span className={ columnHeadingStyles }>
                        Strength 1-10
                    </span>
                    {
                        questionnaire.instruments.map( item => (
                            <div
                                key={ item.countKey }
                                className={ css( { display: 'contents' } ) }
                            >
                                <span
                                    className={
                                        css( {
                                            fontSize: '15px'
                                            , fontWeight: 'bold'
                                            , color: 'text.primary'
                                        } )
                                    }
                                >
                                    { item.label }
                                </span>
                                <input
                                    aria-label={ `${ item.label } count` }
                                    type='number'
                                    min={ 0 }
                                    max={ 400 }
                                    step={ 1 }
                                    inputMode='numeric'
                                    value={ values[ item.countKey ] ?? '' }
                                    onChange={ event => setValue( item.countKey, event.target.value ) }
                                    className={ numberStyles }
                                />
                                <input
                                    aria-label={ `${ item.label } strength` }
                                    type='number'
                                    min={ 0 }
                                    max={ 10 }
                                    step={ 1 }
                                    inputMode='numeric'
                                    value={ values[ item.ratingKey ] ?? '' }
                                    onChange={ event => setValue( item.ratingKey, event.target.value ) }
                                    className={ numberStyles }
                                />
                            </div>
                        ) )
                    }
                </div>
                <p
                    className={
                        css( {
                            marginTop: 'sm'
                            , fontSize: 'sm'
                            , fontWeight: 'black'
                            , letterSpacing: '0.1em'
                            , textTransform: 'uppercase'
                            , color: 'text.primary'
                        } )
                    }
                >
                    Total winds:
                    { ' ' }
                    { total }
                </p>
            </section>
            <section>
                <h2 className={ sectionHeadingStyles }>
                    Your program
                </h2>
                <div
                    className={
                        css( {
                            display: 'flex'
                            , flexDirection: 'column'
                            , gap: 'sm'
                        } )
                    }
                >
                    {
                        questionnaire.prompts.map( item => (
                            <label
                                key={ item.key }
                                className={ fieldLabelStyles }
                            >
                                { item.prompt }
                                {
                                    item.hint && (
                                        <small
                                            className={
                                                css( {
                                                    fontSize: '12px'
                                                    , fontWeight: 'normal'
                                                    , letterSpacing: 'normal'
                                                    , textTransform: 'none'
                                                    , color: 'text.secondary'
                                                } )
                                            }
                                        >
                                            { item.hint }
                                        </small>
                                    )
                                }
                                <textarea
                                    rows={ 3 }
                                    maxLength={ 2000 }
                                    value={ values[ item.key ] ?? '' }
                                    onChange={ event => setValue( item.key, event.target.value ) }
                                    className={ fieldInputStyles }
                                />
                            </label>
                        ) )
                    }
                </div>
            </section>
            <section>
                <h2 className={ sectionHeadingStyles }>
                    Send it to me
                </h2>
                <label className={ fieldLabelStyles }>
                    Your name
                    <input
                        name='name'
                        value={ name }
                        onChange={ event => setName( event.target.value ) }
                        autoComplete='name'
                        required
                        minLength={ 2 }
                        maxLength={ 80 }
                        placeholder='First and last name'
                        aria-invalid={ invalid?.field === 'name' }
                        className={ fieldInputStyles }
                    />
                </label>
                <p
                    role='alert'
                    className={
                        cx( css( {
                            marginTop: 'xs'
                            , minHeight: '24px'
                        } ), errorTextStyles )
                    }
                >
                    { message }
                </p>
                <Button
                    type='submit'
                    variant='primary'
                    size='lg'
                    rounded='sm'
                    fullWidth
                    disabled={ busy || name.trim().length < 2 }
                >
                    { busy ? 'Sending' : questionnaire.answered ? 'Save changes' : 'Send to Scott' }
                </Button>
                {
                    saved && (
                        <p
                            role='status'
                            className={
                                css( {
                                    marginTop: 'sm'
                                    , fontSize: 'base'
                                    , fontWeight: 'bold'
                                    , color: 'text.primary'
                                } )
                            }
                        >
                            Saved. Thank you. I have your answers, and you can come back to this page to change them.
                        </p>
                    )
                }
                {
                    questionnaire.lastUpdated && (
                        <p
                            className={
                                css( {
                                    marginTop: 'xs'
                                    , fontSize: 'sm'
                                    , color: 'text.secondary'
                                } )
                            }
                        >
                            Last saved
                            { ' ' }
                            { formatSavedDate( questionnaire.lastUpdated ) }
                            { questionnaire.updatedBy ? ` by ${ questionnaire.updatedBy }` : '' }
                            .
                        </p>
                    )
                }
            </section>
        </form>
    );
};
