import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../config/apiEndpoints";
import { Service, Feature, ServiceMedia, FeatureMedia } from "../types/service";
import { ApiResponse } from "../types/common";

export const servicesService = {
  getAllServices: async () => {
    return apiClient.get<ApiResponse<Service[]>>(API_ENDPOINTS.SERVICE.GET_ALL);
  },

  getServiceById: async (id: string | number) => {
    return apiClient.get<ApiResponse<Service>>(API_ENDPOINTS.SERVICE.GET_BY_ID(id));
  },

  getAllFeatures: async () => {
    return apiClient.get<ApiResponse<Feature[]>>(API_ENDPOINTS.FEATURE.GET_ALL);
  },

  getAllServiceMedia: async () => {
    return apiClient.get<ApiResponse<ServiceMedia[]>>(API_ENDPOINTS.SERVICE_MEDIA.GET_ALL);
  },

  getAllFeatureMedia: async () => {
    return apiClient.get<ApiResponse<FeatureMedia[]>>(API_ENDPOINTS.FEATURE_MEDIA.GET_ALL);
  },
};
