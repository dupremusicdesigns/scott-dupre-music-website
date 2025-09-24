export interface ImageFormat {
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

export interface ShowArtwork {
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

export interface ShowSection {
    id: number;
    sectionName: string;
}

export interface OtherCollaborator {
    id: number;
    collaboratorName: string;
}

export interface AudioPreview {
    id: number;
    trackName: string;
}

export interface MarchingShow {
    id: number;
    documentId: string;
    showTitle: string;
    commisionedBy: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    showSections: ShowSection[];
    otherCollaborators: OtherCollaborator[];
    audioPreviews: AudioPreview[];
    showArtwork: ShowArtwork;
}

export interface PaginationMeta {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface MarchingShowsResponse {
    data: MarchingShow[];
    meta: {
        pagination: PaginationMeta;
    };
}

export interface SingleMarchingShowResponse {
    data: MarchingShow;
    meta: Record<string, unknown>;
}
