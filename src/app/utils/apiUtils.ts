import { QueryParams } from '../types/queryParamsTypes';
import { isObject } from './generalUtils';

export type MakeApiCallParams<
    TData = unknown,
    TPayload extends Record<string, unknown> | BodyInit | unknown = unknown,
    TQueryParams extends string | Record<string, unknown> = string
> = {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: TPayload;
    schema?: TData;
    queryParams?: TQueryParams extends string
        ? string extends TQueryParams
            ? string
            : QueryParams<TQueryParams>
        : ConstructorParameters<typeof URLSearchParams>[number];
    responseType?: 'json' | 'text' | 'blob' | 'formData' | 'arrayBuffer';
    options?: Omit<RequestInit, 'body' | 'method'>;
};

/**
 * Main API call function with optional Zod validation and full TypeScript support.
 *
 * When a Zod schema is provided, the response will be validated at runtime and typed accordingly.
 * When no schema is provided, returns the response as the specified TypeScript type without validation.
 *
 * @param params - Configuration object for the API call
 * @param params.method - HTTP method (GET, POST, PUT, DELETE, PATCH)
 * @param params.url - The endpoint URL to call (path after the base URL)
 * @param params.body - Optional request body, can be any type (object, string, etc.)
 * @param params.queryParams - Optional query parameters to append to the URL. Can be a valid query string or an object.
 * @param params.schema - Optional Zod schema for response validation and typing
 * @param params.responseType - Type of response expected (default is 'json')
 * @param params.options - Additional fetch options (headers, body, etc.)
 * @returns Promise resolving to validated/typed response data
 * @throws Error on HTTP errors or Zod validation failures
 */
export const makeApiCall = async <
    TData = unknown,
    TPayload extends Record<string, unknown> | BodyInit | unknown = unknown,
    TQueryParams extends string | Record<string, unknown> = string
>(
    {
        method = 'GET'
        , url
        , body = undefined
        , queryParams
        , responseType = 'json'
        , options
    }: MakeApiCallParams<TData, TPayload, TQueryParams>
): Promise<TData> => {
    const fullUrl = formatUrlWithQueryParams( url, queryParams );

    const response = await fetch( fullUrl, {
        method
        , headers: {
            'Content-Type': 'application/json'
            , ...options?.headers
        }
        , ...options
        , body: isObject( body ) ? JSON.stringify( body ) : body as BodyInit
    } );

    if ( !response.ok ) {
        throw new Error( `API error: ${ response.status } ${ response.statusText }`, {
            cause: response
        } );
    }

    const data = await response[ responseType ]() as TData;

    return data as TData;
};

/**
 * Formats the URL with the provided query parameters.
 * Can take a string of pre-built query parameters or an object of keys/values.
 */
const formatUrlWithQueryParams = (
    url: string
    , queryParams?: Parameters<typeof makeApiCall>[number]['queryParams']
): string => {
    let queryString = '';

    if ( queryParams ) {
        if ( typeof queryParams === 'string' ) {
            queryString = queryParams;
        } else {
            queryString = new URLSearchParams( queryParams ).toString();
        }
    }

    return queryString ? `${ url }?${ queryString }` : url;
};
