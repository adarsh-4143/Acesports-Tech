import { apiClient } from "./apiClient";

export interface UserUpdatePayload {
  full_name?: string;
  email?: string;
  mobile?: string;
  business_name?: string;
  gst_number?: string;
  gender?: string;
  profile_image?: string;
}

export const userService = {
  updateUser: async (userId: number, payload: UserUpdatePayload) => {
    return await apiClient.put<any>(`/user/${userId}`, payload);
  },
  getUser: async (userId: number) => {
    return await apiClient.get<any>(`/user/${userId}`);
  }
};
