import { apiClient } from "./apiClient";

export interface OrderItemPayload {
  statusId?: number;
  statusName?: string;
  productInventoryId?: number;
  productName?: string;
  quantity?: number;
  unitPrice?: number;
  payableAmount?: number;
  netpayableAmount?: number;
  discount?: number;
  discountPrice?: number;
}

export interface OrderPayload {
  userId?: number;
  customerType?: string;
  payableAmount?: number;
  netpayableAmount?: number;
  dueAmount?: number;
  addressId?: number;
  address?: string;
  paymentModeId?: number;
  items: OrderItemPayload[];
}

export const orderService = {
  createOrder: async (payload: OrderPayload) => {
    return await apiClient.post<any>("/order", payload);
  },

  getOrders: async (userId: number) => {
    return await apiClient.get<any>(`/order?userId=${userId}`);
  },

  getOrderDetails: async (orderId: number) => {
    return await apiClient.get<any>(`/order/${orderId}`);
  }
};
