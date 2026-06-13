export interface ImageGallery {
  imageId?: number;
  title?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  is_active?: boolean;
}

export interface ImageDetail {
  detailId?: number;
  galleryId?: number | null;
  imageUrl?: string | null;
  sortOrder?: number | null;
  is_active?: boolean;
}

export interface VideoGallery {
  videoId?: number;
  title?: string | null;
  description?: string | null;
  urlVideo?: string | null;
  is_active?: boolean;
}
