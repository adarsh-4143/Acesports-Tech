import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../config/apiEndpoints";
import { Blog } from "../types/blog";
import { ApiResponse } from "../types/common";

export const blogService = {
  getAllBlogs: async () => {
    return apiClient.get<ApiResponse<Blog[]>>(API_ENDPOINTS.BLOG.GET_ALL);
  },

  getBlogById: async (id: string | number) => {
    return apiClient.get<ApiResponse<Blog>>(API_ENDPOINTS.BLOG.GET_BY_ID(id));
  },

  createBlog: async (data: Partial<Blog>) => {
    return apiClient.post<ApiResponse<Blog>>(API_ENDPOINTS.BLOG.CREATE, data);
  },

  updateBlog: async (id: string | number, data: Partial<Blog>) => {
    return apiClient.put<ApiResponse<Blog>>(API_ENDPOINTS.BLOG.UPDATE(id), data);
  },

  deleteBlog: async (id: string | number) => {
    return apiClient.delete<ApiResponse<null>>(API_ENDPOINTS.BLOG.DELETE(id));
  },

  bulkDeleteBlogs: async (ids: (string | number)[]) => {
    return apiClient.post<ApiResponse<null>>(API_ENDPOINTS.BLOG.BULK_DELETE, { ids });
  },
};
