import {
    StrapiImage
    , SingleTypeResponse
} from './shared';

export type BuildYourOwnShow = {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    asideImage: StrapiImage | null;
}

export type BuildYourOwnShowResponse = SingleTypeResponse<BuildYourOwnShow>;
