import { apiClient } from "./apiClient";

export interface CartPayload {
  userId?: number;
  skuId?: number;
  inventoryId?: number;
  source?: string;
  is_active?: boolean;
  remark?: string;
}

export const cartService = {
  getCartItems: async (userId: number) => {
    return await apiClient.get<any>(`/cart?userId=${userId}&is_active=true`);
  },
  
  addToCart: async (payload: CartPayload) => {
    return await apiClient.post<any>("/cart", payload);
  },

  removeFromCart: async (cartId: number) => {
    return await apiClient.delete<any>(`/cart/${cartId}`);
  },

  clearCart: async (cartIds: number[]) => {
    return await apiClient.post<any>("/cart/bulk-delete", { cartIds });
  }
};
