import { CMS_URL } from '@/app/constants/apiContants';
import { makeApiCall } from '@/app/utils/apiUtils';
import { css } from '../../../../styled-system/css';
import Image from 'next/image';
import {
    ArticlesResponse
    , Article
    , ContentBlock
} from '@/app/types/articles';
import { Markdown } from '@/app/components/Markdown';

const AboutPage = async () => {
    const data = await makeApiCall( {
        url: `${ CMS_URL }/articles`
        , schema: {} as ArticlesResponse
        , queryParams: { populate: '*' }
    } );

    console.log( data );

    return (
        <div
            className={
                css( {
                    maxWidth: '800px'
                    , margin: '0 auto'
                    , padding: '2rem'
                    , fontFamily: 'system-ui, sans-serif'
                } )
            }
        >
            <h1
                className={
                    css( {
                        fontSize: '2.5rem'
                        , fontWeight: 'bold'
                        , marginBottom: '2rem'
                        , color: '#333'
                    } )
                }
            >
                Blog Articles
            </h1>

            {
                data?.data?.map( ( article: Article ) => (
                    <article
                        key={ article.id }
                        className={
                            css( {
                                marginBottom: '3rem'
                                , padding: '1.5rem'
                                , border: '1px solid #e2e8f0'
                                , borderRadius: '8px'
                                , backgroundColor: '#fff'
                                , boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            } )
                        }
                    >
                        {
                            article.cover?.formats?.medium && (
                                <Image
                                    src={ article.cover.formats.medium.url }
                                    alt={ article.cover.alternativeText || article.title }
                                    width={ article.cover.formats.medium.width }
                                    height={ article.cover.formats.medium.height }
                                    className={
                                        css( {
                                            width: '100%'
                                            , height: '300px'
                                            , objectFit: 'cover'
                                            , borderRadius: '6px'
                                            , marginBottom: '1rem'
                                        } )
                                    }
                                />
                            )
                        }

                        <h2
                            className={
                                css( {
                                    fontSize: '1.75rem'
                                    , fontWeight: 'semibold'
                                    , marginBottom: '0.5rem'
                                    , color: '#1a202c'
                                } )
                            }
                        >
                            { article.title }
                        </h2>

                        <p
                            className={
                                css( {
                                    color: '#718096'
                                    , marginBottom: '1rem'
                                    , fontSize: '1rem'
                                    , lineHeight: '1.6'
                                } )
                            }
                        >
                            { article.description }
                        </p>

                        <div
                            className={
                                css( {
                                    display: 'flex'
                                    , justifyContent: 'space-between'
                                    , alignItems: 'center'
                                    , marginBottom: '1rem'
                                    , flexWrap: 'wrap'
                                    , gap: '1rem'
                                } )
                            }
                        >
                            <div
                                className={
                                    css( {
                                        display: 'flex'
                                        , alignItems: 'center'
                                        , gap: '0.5rem'
                                    } )
                                }
                            >
                                <span
                                    className={
                                        css( {
                                            fontSize: '0.875rem'
                                            , color: '#4a5568'
                                            , fontWeight: 'medium'
                                        } )
                                    }
                                >
                                    By
                                    { ' ' }
                                    { article.author?.name }
                                </span>
                            </div>

                            {
                                article.category && (
                                    <span
                                        className={
                                            css( {
                                                backgroundColor: '#e2e8f0'
                                                , color: '#2d3748'
                                                , padding: '0.25rem 0.75rem'
                                                , borderRadius: '9999px'
                                                , fontSize: '0.75rem'
                                                , fontWeight: 'medium'
                                                , textTransform: 'uppercase'
                                            } )
                                        }
                                    >
                                        { article.category.name }
                                    </span>
                                )
                            }
                        </div>

                        <p
                            className={
                                css( {
                                    fontSize: '0.75rem'
                                    , color: '#a0aec0'
                                } )
                            }
                        >
                            Published:
                            { ' ' }
                            { new Date( article.publishedAt ).toLocaleDateString() }
                        </p>

                        {
                            article.blocks && (
                                <div
                                    className={
                                        css( {
                                            marginTop: '1.5rem'
                                            , paddingTop: '1.5rem'
                                            , borderTop: '1px solid #e2e8f0'
                                        } )
                                    }
                                >
                                    <h3
                                        className={
                                            css( {
                                                fontSize: '1.125rem'
                                                , fontWeight: 'semibold'
                                                , marginBottom: '0.75rem'
                                                , color: '#2d3748'
                                            } )
                                        }
                                    >
                                        Content Blocks (
                                        { article.blocks.length }
                                        )
                                    </h3>
                                    {
                                        article.blocks.map( ( block: ContentBlock, index: number ) => {
                                            if ( block.__component === 'shared.rich-text' || block.__component === 'shared.quote' && block.body ) {
                                                return (
                                                    <div
                                                        key={ index }
                                                        className={
                                                            css( {
                                                                marginBottom: '2rem'
                                                                , padding: '1.5rem'
                                                                , backgroundColor: '#fff'
                                                                , border: '1px solid #e2e8f0'
                                                                , borderRadius: '8px'
                                                            } )
                                                        }
                                                    >
                                                        <Markdown content={ block.body } />
                                                    </div>
                                                );
                                            }

                                            return (
                                                <div
                                                    key={ index }
                                                    className={
                                                        css( {
                                                            padding: '1rem'
                                                            , marginBottom: '1rem'
                                                            , backgroundColor: '#f7fafc'
                                                            , borderRadius: '6px'
                                                            , border: '1px solid #e2e8f0'
                                                        } )
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            css( {
                                                                display: 'flex'
                                                                , alignItems: 'center'
                                                                , gap: '0.5rem'
                                                                , marginBottom: block.title || block.body ? '0.5rem' : '0'
                                                            } )
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                css( {
                                                                    fontSize: '0.75rem'
                                                                    , backgroundColor: '#e2e8f0'
                                                                    , color: '#4a5568'
                                                                    , padding: '0.25rem 0.5rem'
                                                                    , borderRadius: '4px'
                                                                    , fontWeight: 'medium'
                                                                    , textTransform: 'uppercase'
                                                                } )
                                                            }
                                                        >
                                                            { block.__component.replace( 'shared.', '' ) }
                                                        </span>
                                                    </div>
                                                    {
                                                        block.title && (
                                                            <h4
                                                                className={
                                                                    css( {
                                                                        fontWeight: 'semibold'
                                                                        , color: '#2d3748'
                                                                        , marginBottom: '0.25rem'
                                                                    } )
                                                                }
                                                            >
                                                                { block.title }
                                                            </h4>
                                                        )
                                                    }
                                                    {
                                                        block.body && (
                                                            <p
                                                                className={
                                                                    css( {
                                                                        color: '#718096'
                                                                        , fontSize: '0.875rem'
                                                                        , lineHeight: '1.5'
                                                                    } )
                                                                }
                                                            >
                                                                { block.body }
                                                            </p>
                                                        )
                                                    }
                                                </div>
                                            );
                                        } )
                                    }
                                </div>
                            )
                        }
                    </article>
                ) )
            }

            {
                !data?.data?.length && (
                    <p
                        className={
                            css( {
                                textAlign: 'center'
                                , color: '#718096'
                                , fontSize: '1.125rem'
                                , marginTop: '2rem'
                            } )
                        }
                    >
                        No articles found.
                    </p>
                )
            }
        </div>
    );
};

export default AboutPage;
