import {
    Testimonial
    , CollectionTypeResponse
    , SingleTypeResponse
} from './shared';

export type Service = {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    title: string;
    iconName: string | null;
    description: string;
    testamonials: Testimonial[];
}

export type ServicesResponse = CollectionTypeResponse<Service>;

export type SingleServiceResponse = SingleTypeResponse<Service>;
