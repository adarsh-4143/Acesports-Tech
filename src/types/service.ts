export interface Service {
  serviceId?: number;
  serviceTypeId?: number | null;
  serviceTypeName?: string | null;
  title: string;
  shortDescription?: string | null;
  description?: string | null;
  slug?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  is_active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Feature {
  featureId?: number;
  serviceId?: number | null;
  serviceName?: string | null;
  featureName?: string | null;
  description?: string | null;
  slug?: string | null;
  is_active?: boolean;
}

export interface ServiceMedia {
  mediaId?: number;
  serviceId?: number | null;
  mediaType?: string | null;
  mediaUrl?: string | null;
  sortOrder?: number | null;
  is_active?: boolean;
}

export interface FeatureMedia {
  mediaId?: number;
  featureId?: number | null;
  mediaType?: string | null;
  mediaUrl?: string | null;
  sortOrder?: number | null;
  is_active?: boolean;
}
