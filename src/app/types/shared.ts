export type ImageFormat = {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
}

export type StrapiImage = {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
        large?: ImageFormat;
        small?: ImageFormat;
        medium?: ImageFormat;
        thumbnail?: ImageFormat;
    } | null;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: unknown;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export type Testimonial = {
    id: number;
    content: string;
    personName: string;
    personPositionTitle: string | null;
}

export type ActionButton = {
    id: number;
    text: string | null;
    slug: string | null;
}

export type SEO = {
    id: number;
    metaTitle: string;
    metaDescription: string;
}

export type PaginationMeta = {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export type SingleTypeResponse<T> = {
    data: T;
    meta: Record<string, unknown>;
}

export type CollectionTypeResponse<T> = {
    data: T[];
    meta: {
        pagination: PaginationMeta;
    };
}
