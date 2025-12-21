import {
    StrapiImage
    , SEO
    , SingleTypeResponse
} from './shared';

export type Global = {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    siteName: string;
    siteDescription: string;
    favicon: StrapiImage | null;
    defaultSeo: SEO | null;
}

export type GlobalResponse = SingleTypeResponse<Global>;
