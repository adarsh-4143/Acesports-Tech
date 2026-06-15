import { apiClient } from "./apiClient";

export interface AddressPayload {
  addressId?: number;
  userId: number;
  type?: string;
  fullName: string;
  phone: string;
  alternatePhone?: string;
  address: string;
  landMark?: string;
  locality?: string;
  state: string;
  city: string;
  pincode: string;
  isDefault?: boolean;
}

export const addressService = {
  getAddresses: async (userId: number) => {
    return await apiClient.get<any>(`/address?userId=${userId}`);
  },
  
  getAddress: async (addressId: number) => {
    return await apiClient.get<any>(`/address/${addressId}`);
  },

  createAddress: async (payload: AddressPayload) => {
    return await apiClient.post<any>("/address", payload);
  },

  updateAddress: async (addressId: number, payload: Partial<AddressPayload>) => {
    return await apiClient.put<any>(`/address/${addressId}`, payload);
  },

  deleteAddress: async (addressId: number) => {
    return await apiClient.delete<any>(`/address/${addressId}`);
  }
};
