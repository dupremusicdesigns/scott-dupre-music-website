import { css } from '../../../../../styled-system/css';

type QuoteMessageProps = {
    title: string;
    children: React.ReactNode;
}

export const QuoteMessage = ( {
    title
    , children
}: QuoteMessageProps ) => (
    <section
        role='status'
        className={
            css( {
                maxWidth: '640px'
                , marginX: 'auto'
                , paddingX: 'md'
                , paddingY: '2xl'
                , textAlign: 'center'
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
                    , color: 'text.primary'
                    , md: { fontSize: '4xl' }
                } )
            }
        >
            { title }
        </h1>
        <p
            className={
                css( {
                    marginTop: 'sm'
                    , fontSize: 'md'
                    , fontWeight: 'medium'
                    , color: 'text.secondary'
                } )
            }
        >
            { children }
        </p>
    </section>
);
