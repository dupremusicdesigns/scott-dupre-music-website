'use client';

import { useState } from 'react';

const ContactPage = () => {
    const [ status, setStatus ] = useState<'idle' | 'submitting' | 'success' | 'error'>( 'idle' );

    const handleSubmit = async ( e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        setStatus( 'submitting' );

        const form = e.currentTarget;
        const formData = new FormData( form );

        try {
            const response = await fetch( '/__forms.html', {
                method: 'POST'
                , headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                , body: new URLSearchParams( formData as unknown as Record<string, string> ).toString()
            } );

            if ( response.ok ) {
                setStatus( 'success' );
                form.reset();
            } else {
                setStatus( 'error' );
            }
        } catch {
            setStatus( 'error' );
        }
    };

    return (
        <div>
            <form
                name='contact'
                method='POST'
                onSubmit={ handleSubmit }
            >
                <input
                    type='hidden'
                    name='form-name'
                    value='contact'
                />
                <p>
                    <label>
                        Name
                        <input
                            type='text'
                            name='name'
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Email
                        <input
                            type='email'
                            name='email'
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Message
                        <textarea name='message' />
                    </label>
                </p>
                <p>
                    <button
                        type='submit'
                        disabled={ status === 'submitting' }
                    >
                        { status === 'submitting' ? 'Sending...' : 'Send' }
                    </button>
                </p>
                {
                    status === 'success' && (
                        <p>
                            Thanks for your message!
                        </p>
                    )
                }
                {
                    status === 'error' && (
                        <p>
                            Something went wrong. Please try again.
                        </p>
                    )
                }
            </form>
        </div>
    );
};

export default ContactPage;
