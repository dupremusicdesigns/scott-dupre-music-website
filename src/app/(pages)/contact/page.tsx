const ContactPage = () => {
    return (
        <div>
            <form
                name='contact'
                // @ts-expect-error -> netlify requires this
                netlify
            >
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
                    <button type='submit'>
                        Send
                    </button>
                </p>
            </form>
        </div>
    );
};

export default ContactPage;
