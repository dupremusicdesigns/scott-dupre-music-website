import { css } from '../../../../styled-system/css';

const ContactPage = () => {

    return (
        <div
            className={
                css( {
                    display: 'flex'
                    , flexDirection: 'column'
                    , alignItems: 'center'
                    , justifyContent: 'center'
                    , minHeight: '60vh'
                    , textAlign: 'center'
                    , paddingX: '2xl'
                } )
            }
        >
            <h1
                className={
                    css( {
                        fontSize: '4xl'
                        , fontWeight: 'black'
                        , color: 'text.primary'
                        , marginBottom: 'md'
                    } )
                }
            >
                COMING SOON
            </h1>
            <p
                className={
                    css( {
                        fontSize: 'lg'
                        , color: 'text.secondary'
                        , maxWidth: '500px'
                    } )
                }
            >
                Our contact page is currently under construction. Check back soon!
            </p>
        </div>
    );
};

export default ContactPage;
