import { apiClient } from "./apiClient";

export interface ContactPayload {
  fullName: string;
  emailAddress?: string;
  mobileNumber: string;
  businessName?: string;
  address?: string;
  service?: string;
  description?: string;
  source?: string;
}

export const contactService = {
  createContact: async (payload: ContactPayload) => {
    return await apiClient.post<any>("/contact", payload);
  }
};
