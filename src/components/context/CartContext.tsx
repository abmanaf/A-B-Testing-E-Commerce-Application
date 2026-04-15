'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { useUser } from '@clerk/nextjs';

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
}

interface CartContextType {
  items: CartItem[];
  total: number;
  itemCount: number;
  isLoading: boolean;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, isLoaded } = useUser();
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    setIsLoading(true);

    if (user) {
      syncAndFetchCart();
    } else {
      loadLocalCart();
    }
  }, [isLoaded, user?.id]);

  const syncAndFetchCart = async () => {
    try {
      // First, check if there's a local cart to sync
      const localCart = localStorage.getItem('guest_cart');
      if (localCart) {
        const parsed = JSON.parse(localCart);
        // Sync each item to DB
        for (const item of parsed.items || []) {
          await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              productId: item.productId,
              quantity: item.quantity,
            }),
          });
        }
        localStorage.removeItem('guest_cart');
      }

      const res = await fetch('/api/cart');
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
        setTotal(data.total || 0);
      }
    } catch (error) {
      console.error('Error syncing cart:', error);
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  };

  const loadLocalCart = () => {
    const stored = localStorage.getItem('guest_cart');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setItems(parsed.items || []);
        setTotal(parsed.total || 0);
      } catch {
        // Invalid data
      }
    }
    setIsLoading(false);
    setIsInitialized(true);
  };

  const saveLocalCart = (newItems: CartItem[], newTotal: number) => {
    localStorage.setItem(
      'guest_cart',
      JSON.stringify({ items: newItems, total: newTotal })
    );
    setItems(newItems);
    setTotal(newTotal);
  };

  const addItem = useCallback(
    async (productId: string, quantity = 1) => {
      // Optimistic UI update for guest users
      if (!user) {
        const existing = items.find((i) => i.productId === productId);
        let newItems: CartItem[];

        if (existing) {
          newItems = items.map((i) =>
            i.productId === productId
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        } else {
          const res = await fetch(`/api/products`);
          const products = await res.json();
          const product = products.find((p: any) => p.id === productId);

          if (product) {
            newItems = [
              ...items,
              {
                id: `guest-${Date.now()}`,
                productId,
                quantity,
                product: {
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  imageUrl: product.imageUrl,
                },
              },
            ];
          } else {
            return;
          }
        }

        const newTotal = newItems.reduce(
          (sum, i) => sum + i.product.price * i.quantity,
          0
        );
        saveLocalCart(newItems, newTotal);
        return;
      }

      // Logged in save to DB
      try {
        const res = await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, quantity }),
        });

        if (res.ok) {
          const data = await res.json();
          setItems(data.items || []);
          setTotal(data.total || 0);
        }
      } catch (error) {
        console.error('Error adding item:', error);
      }
    },
    [user, items]
  );

  const removeItem = useCallback(
    async (itemId: string) => {
      if (!user) {
        const newItems = items.filter((i) => i.id !== itemId);
        const newTotal = newItems.reduce(
          (sum, i) => sum + i.product.price * i.quantity,
          0
        );
        saveLocalCart(newItems, newTotal);
        return;
      }

      try {
        const res = await fetch(`/api/cart/${itemId}`, { method: 'DELETE' });
        if (res.ok) {
          const data = await res.json();
          setItems(data.items || []);
          setTotal(data.total || 0);
        }
      } catch (error) {
        console.error('Error removing item:', error);
      }
    },
    [user, items]
  );

  const updateQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      if (!user) {
        const newItems = items.map((i) =>
          i.id === itemId ? { ...i, quantity } : i
        );
        const newTotal = newItems.reduce(
          (sum, i) => sum + i.product.price * i.quantity,
          0
        );
        saveLocalCart(newItems, newTotal);
        return;
      }

      try {
        const res = await fetch(`/api/cart/${itemId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity }),
        });

        if (res.ok) {
          const data = await res.json();
          setItems(data.items || []);
          setTotal(data.total || 0);
        }
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    },
    [user, items]
  );

  const clearCart = useCallback(async () => {
    if (!user) {
      saveLocalCart([], 0);
      return;
    }

    saveLocalCart([], 0);
  }, [user]);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        itemCount,
        isLoading: isLoading || !isInitialized,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
