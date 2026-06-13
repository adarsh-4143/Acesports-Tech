import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../config/apiEndpoints";
import { ImageGallery, ImageDetail, VideoGallery } from "../types/media";
import { ApiResponse } from "../types/common";

export const mediaService = {
  getAllImageGalleries: async () => {
    return apiClient.get<ApiResponse<ImageGallery[]>>(API_ENDPOINTS.IMAGE_GALLERY.GET_ALL);
  },

  getAllImageDetails: async () => {
    return apiClient.get<ApiResponse<ImageDetail[]>>(API_ENDPOINTS.IMAGE_DETAIL.GET_ALL);
  },

  getAllVideoGalleries: async () => {
    return apiClient.get<ApiResponse<VideoGallery[]>>(API_ENDPOINTS.VIDEO_GALLERY.GET_ALL);
  },
};
