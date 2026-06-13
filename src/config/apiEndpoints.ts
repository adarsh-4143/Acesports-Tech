export const API_ENDPOINTS = {
  BLOG: {
    BASE: "/blog",
    GET_ALL: "/blog",
    GET_BY_ID: (id: string | number) => `/blog/${id}`,
    CREATE: "/blog",
    UPDATE: (id: string | number) => `/blog/${id}`,
    DELETE: (id: string | number) => `/blog/${id}`,
    BULK_DELETE: "/blog/bulk-delete",
  },
  SERVICE: {
    GET_ALL: "/service",
    GET_BY_ID: (id: string | number) => `/service/${id}`,
  },
  FEATURE: {
    GET_ALL: "/feature",
  },
  SERVICE_MEDIA: {
    GET_ALL: "/serviceMedia",
  },
  FEATURE_MEDIA: {
    GET_ALL: "/featureMedia",
  },
  IMAGE_GALLERY: {
    GET_ALL: "/imageGallery",
  },
  IMAGE_DETAIL: {
    GET_ALL: "/imageDetail",
  },
  VIDEO_GALLERY: {
    GET_ALL: "/videoGallery",
  },
  PRODUCT_INVENTORY: {
    GET_ALL: "/productInventory",
    GET_BY_ID: (id: string | number) => `/productInventory/${id}`,
  },
  INVENTORY_IMAGE: {
    GET_ALL: "/inventoryImage",
  },
  INVENTORY_SPECIFICATION: {
    GET_ALL: "/inventorySpecification",
  },
} as const;
