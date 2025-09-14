import ReactMarkdown from 'react-markdown';
import { css } from '../../../styled-system/css';

interface MarkdownProps {
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
                                    fontSize: '2rem'
                                    , fontWeight: 'bold'
                                    , marginTop: '2.5rem'
                                    , marginBottom: '1.25rem'
                                    , color: '#1a202c'
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
                                    fontSize: '1.5rem'
                                    , fontWeight: 'bold'
                                    , marginTop: '2rem'
                                    , marginBottom: '1rem'
                                    , color: '#1a202c'
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
                                    fontSize: '1.25rem'
                                    , fontWeight: 'semibold'
                                    , marginTop: '1.5rem'
                                    , marginBottom: '0.75rem'
                                    , color: '#2d3748'
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
                                    marginBottom: '1rem'
                                    , lineHeight: '1.6'
                                    , color: '#4a5568'
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
                                    , paddingLeft: '1.5rem'
                                    , marginBottom: '1rem'
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
                                    marginBottom: '0.5rem'
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
                                    borderLeft: '4px solid #e2e8f0'
                                    , paddingLeft: '1rem'
                                    , marginLeft: '0'
                                    , marginRight: '0'
                                    , marginBottom: '1rem'
                                    , fontStyle: 'italic'
                                    , color: '#718096'
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
                                    backgroundColor: '#f7fafc'
                                    , padding: '0.125rem 0.25rem'
                                    , borderRadius: '0.25rem'
                                    , fontSize: '0.875rem'
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
                                    backgroundColor: '#1a202c'
                                    , color: '#e2e8f0'
                                    , padding: '1rem'
                                    , borderRadius: '0.5rem'
                                    , overflow: 'auto'
                                    , marginBottom: '1rem'
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
                                    color: '#3182ce'
                                    , textDecoration: 'underline'
                                    , _hover: {
                                        color: '#2c5282'
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
