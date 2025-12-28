export type ImageFormat = {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
}

export type ShowArtwork = {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
        large?: ImageFormat;
        small?: ImageFormat;
        medium?: ImageFormat;
        thumbnail?: ImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null;
    provider: string;
    provider_metadata: null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export type ShowSectionType = 'intro' | 'opener' | 'ballad' | 'closer';

export type ShowSection = {
    id: number;
    sectionName: string;
    type?: ShowSectionType;
}

export type OtherCollaborator = {
    id: number;
    collaboratorName: string;
    websiteUrl?: string;
    role?: string;
}

export type AudioFile = {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: null;
    height: null;
    formats: null;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null;
    provider: string;
    provider_metadata: null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export type AudioPreview = {
    id: number;
    trackName: string;
    audioFile: AudioFile;
}

export type MarchingShow = {
    id: number;
    documentId: string;
    showTitle: string;
    commissionedBy: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    showSections: ShowSection[];
    otherCollaborators: OtherCollaborator[];
    audioPreviews: AudioPreview[];
    showArtwork: ShowArtwork | null;
    priorityWeight?: number;
    isNew?: boolean;
    year?: number;
    comingSoon?: boolean;
}

export type PaginationMeta = {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export type MarchingShowsResponse = {
    data: MarchingShow[];
    meta: {
        pagination: PaginationMeta;
    };
}

export type SingleMarchingShowResponse = {
    data: MarchingShow;
    meta: Record<string, unknown>;
}
