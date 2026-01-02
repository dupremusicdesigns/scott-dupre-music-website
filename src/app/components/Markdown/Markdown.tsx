import ReactMarkdown from 'react-markdown';
import { css } from '../../../../styled-system/css';

type MarkdownProps = {
    content?: string;
}

export const Markdown = ( {
    content
}: MarkdownProps ) => {
    return (
        <ReactMarkdown
            components={
                {
                    h1: ( { children } ) => (
                        <h1
                            className={
                                css( {
                                    fontSize: '2xl'
                                    , fontWeight: 'bold'
                                    , marginTop: 'lg'
                                    , marginBottom: 'sm'
                                    , color: 'text.primary'
                                } )
                            }
                        >
                            { children }
                        </h1>
                    )
                    , h2: ( { children } ) => (
                        <h2
                            className={
                                css( {
                                    fontSize: 'xl'
                                    , fontWeight: 'bold'
                                    , marginTop: 'lg'
                                    , marginBottom: 'sm'
                                    , color: 'text.primary'
                                } )
                            }
                        >
                            { children }
                        </h2>
                    )
                    , h3: ( { children } ) => (
                        <h3
                            className={
                                css( {
                                    fontSize: 'lg'
                                    , fontWeight: 'semibold'
                                    , marginTop: 'md'
                                    , marginBottom: 'xs'
                                    , color: 'text.primary'
                                } )
                            }
                        >
                            { children }
                        </h3>
                    )
                    , p: ( { children } ) => (
                        <p
                            className={
                                css( {
                                    marginBottom: 'sm'
                                    , lineHeight: 'relaxed'
                                    , color: 'text.secondary'
                                } )
                            }
                        >
                            { children }
                        </p>
                    )
                    , ul: ( { children } ) => (
                        <ul
                            className={
                                css( {
                                    listStyleType: 'disc'
                                    , paddingLeft: 'md'
                                    , marginBottom: 'sm'
                                } )
                            }
                        >
                            { children }
                        </ul>
                    )
                    , li: ( { children } ) => (
                        <li
                            className={
                                css( {
                                    marginBottom: 'xs'
                                } )
                            }
                        >
                            { children }
                        </li>
                    )
                    , blockquote: ( { children } ) => (
                        <blockquote
                            className={
                                css( {
                                    borderLeft: '4px solid'
                                    , borderColor: 'gray.200'
                                    , paddingLeft: 'sm'
                                    , marginLeft: '0'
                                    , marginRight: '0'
                                    , marginBottom: 'sm'
                                    , fontStyle: 'italic'
                                    , color: 'text.muted'
                                } )
                            }
                        >
                            { children }
                        </blockquote>
                    )
                    , code: ( { children } ) => (
                        <code
                            className={
                                css( {
                                    backgroundColor: 'gray.50'
                                    , padding: '0.125rem 0.25rem'
                                    , borderRadius: '0.25rem'
                                    , fontSize: 'sm'
                                    , fontFamily: 'monospace'
                                } )
                            }
                        >
                            { children }
                        </code>
                    )
                    , pre: ( { children } ) => (
                        <pre
                            className={
                                css( {
                                    backgroundColor: 'gray.900'
                                    , color: 'gray.200'
                                    , padding: 'sm'
                                    , borderRadius: 'sm'
                                    , overflow: 'auto'
                                    , marginBottom: 'sm'
                                } )
                            }
                        >
                            { children }
                        </pre>
                    )
                    , strong: ( { children } ) => (
                        <strong
                            className={
                                css( {
                                    fontWeight: 'bold'
                                } )
                            }
                        >
                            { children }
                        </strong>
                    )
                    , em: ( { children } ) => (
                        <em
                            className={
                                css( {
                                    fontStyle: 'italic'
                                } )
                            }
                        >
                            { children }
                        </em>
                    )
                    , a: ( {
                        children
                        , href
                    } ) => (
                        <a
                            href={ href }
                            className={
                                css( {
                                    color: 'text.link'
                                    , textDecoration: 'underline'
                                    , _hover: {
                                        color: 'text.linkHover'
                                    }
                                } )
                            }
                        >
                            { children }
                        </a>
                    )
                }
            }
        >
            { content }
        </ReactMarkdown>
    );
};
