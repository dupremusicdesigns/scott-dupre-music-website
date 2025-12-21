import {
    StrapiImage
    , SingleTypeResponse
} from './shared';

export type About = {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    bioTop: string | null;
    bioBottom: string | null;
    heroImage: StrapiImage | null;
    imageTop: StrapiImage | null;
    imageBottom: StrapiImage | null;
}

export type AboutResponse = SingleTypeResponse<About>;
