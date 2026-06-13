import { apiClient } from "./apiClient";

export interface LoginPayload {
  email?: string;
  mobile?: string;
  password?: string;
}

export interface SignupPayload {
  full_name: string;
  email: string;
  mobile: string;
  password?: string;
  user_type_id: number;
  business_name?: string;
  gst_number?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      user_id: number;
      full_name: string;
      email: string;
      mobile: string;
      role_id?: number;
      company_name?: string;
      profile_image?: string;
      is_active: number;
    };
  };
}

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    return await apiClient.post<AuthResponse>("/auth/login", payload);
  },

  signup: async (payload: SignupPayload): Promise<{ success: boolean; message: string; data: any }> => {
    return await apiClient.post<{ success: boolean; message: string; data: any }>("/auth/signup", payload);
  },
};
