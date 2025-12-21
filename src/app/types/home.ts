import {
    StrapiImage
    , Testimonial
    , ActionButton
    , SingleTypeResponse
} from './shared';

export type Home = {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    heroImage: StrapiImage;
    primaryTestimonial: Testimonial | null;
    additionalTestimonials: Testimonial[];
    bio: string | null;
    bioImage: StrapiImage;
    actionButtonPrimary: ActionButton | null;
    actionButtonSecondary: ActionButton | null;
}

export type HomeResponse = SingleTypeResponse<Home>;
