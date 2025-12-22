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
    defaultContactEmail: string | null;
    facebookLink: string | null;
    instagramLink: string | null;
}

export type GlobalResponse = SingleTypeResponse<Global>;
