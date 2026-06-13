import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../config/apiEndpoints";
import { ProductInventory, InventoryImage, InventorySpecification } from "../types/product";
import { ApiResponse } from "../types/common";

export const productService = {
  getAllProducts: async () => {
    return apiClient.get<ApiResponse<ProductInventory[]>>(API_ENDPOINTS.PRODUCT_INVENTORY.GET_ALL);
  },

  getProductById: async (id: string | number) => {
    return apiClient.get<ApiResponse<ProductInventory>>(API_ENDPOINTS.PRODUCT_INVENTORY.GET_BY_ID(id));
  },

  getAllProductImages: async () => {
    return apiClient.get<ApiResponse<InventoryImage[]>>(API_ENDPOINTS.INVENTORY_IMAGE.GET_ALL);
  },

  getAllProductSpecifications: async () => {
    return apiClient.get<ApiResponse<InventorySpecification[]>>(API_ENDPOINTS.INVENTORY_SPECIFICATION.GET_ALL);
  },
};
