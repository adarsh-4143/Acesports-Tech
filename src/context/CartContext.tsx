"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { cartService } from "@/services/cartService";

export interface CartItem {
  id: string;
  name: string;
  category: string;
  price: string;
  image?: string;
  quantity: number;
  backendCartIds?: number[];
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  syncCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { isLoggedIn, user } = useAuth();

  const router = useRouter();

  const syncCart = async () => {
    if (!isLoggedIn || !user) return;
    try {
      const response = await cartService.getCartItems(user.login_id);
      if (response.success && Array.isArray(response.data)) {
        const backendItems = response.data;
        
        const groupedMap = new Map<string, CartItem>();
        
        for (const bItem of backendItems) {
           const id = bItem.inventoryId ? String(bItem.inventoryId) : (bItem.skuId ? String(bItem.skuId) : bItem.productName);
           let extraData: any = {};
           try { 
             extraData = JSON.parse(bItem.remark || "{}"); 
           } catch(e) {}
           
           if (groupedMap.has(id)) {
             const existing = groupedMap.get(id)!;
             existing.quantity += 1;
             existing.backendCartIds!.push(bItem.cartId);
           } else {
             groupedMap.set(id, {
               id: id,
               name: extraData.name || bItem.productName || "Unknown Product",
               category: extraData.category || "General",
               price: extraData.price || "0.00",
               image: extraData.image || "/images/products/placeholder.jpg",
               quantity: 1,
               backendCartIds: [bItem.cartId]
             });
           }
        }
        setCart(Array.from(groupedMap.values()));
      }
    } catch (err) {
      console.error("Failed to sync cart", err);
    }
  };

  // Sync cart on login/mount
  useEffect(() => {
    if (isLoggedIn && user) {
      syncCart();
    } else {
      // Clear cart on logout
      setCart([]);
    }
  }, [isLoggedIn, user]);

  const addToCart = async (newItem: Omit<CartItem, "quantity">) => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    // Optimistic Update
    setCart((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...newItem, quantity: 1, backendCartIds: [] }];
    });

    // Backend sync
    if (isLoggedIn && user) {
      try {
        await cartService.addToCart({
          userId: user.login_id,
          inventoryId: !isNaN(Number(newItem.id)) ? Number(newItem.id) : undefined,
          source: 'web',
          remark: JSON.stringify({ name: newItem.name, price: newItem.price, category: newItem.category, image: newItem.image }),
          is_active: true
        });
        // Re-sync to get the actual cartId
        syncCart();
      } catch (err) {
        console.error("Failed to add to backend cart", err);
      }
    }
  };

  const removeFromCart = async (id: string) => {
    const itemToRemove = cart.find(item => item.id === id);
    
    // Optimistic Update
    setCart((prev) => prev.filter((item) => item.id !== id));

    // Backend sync
    if (isLoggedIn && itemToRemove && itemToRemove.backendCartIds && itemToRemove.backendCartIds.length > 0) {
      try {
        await cartService.clearCart(itemToRemove.backendCartIds);
      } catch (err) {
        console.error("Failed to remove from backend cart", err);
        syncCart(); // Revert on failure
      }
    }
  };

  const clearCart = async () => {
    const allBackendIds = cart.reduce((acc, item) => {
      if (item.backendCartIds) return [...acc, ...item.backendCartIds];
      return acc;
    }, [] as number[]);

    // Optimistic Update
    setCart([]);

    // Backend sync
    if (isLoggedIn && allBackendIds.length > 0) {
      try {
        await cartService.clearCart(allBackendIds);
      } catch (err) {
        console.error("Failed to clear backend cart", err);
        syncCart();
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, syncCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
