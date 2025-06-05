import { useState, useEffect } from 'react';
import type {
  CartContextType,
  CartItem,
  Product,
  ProviderProps,
} from '@/types';
import CartContext from '@/contexts/cart/CartContext';

const CART_STORAGE_KEY = 'okke_cart_items';

const CartProvider = ({ children }: ProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const storedItems = localStorage.getItem(CART_STORAGE_KEY);
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0,
    );
    setCartTotal(Number(total.toFixed(2)));

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (
    product: Product,
    size: string,
    color: number,
    quantity = 1,
  ) => {
    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item.id === product.id && item.size === size && item.color === color,
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedItems);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          title: product.title,
          price: product.price?.sale || product.price?.regular,
          image: product.image || '',
          size,
          color: color,
          colorHex: product.colors?.[color]?.hex || '',
          quantity,
        },
      ]);
    }
  };

  const removeFromCart = (index: number) => {
    const updatedItems = [...cartItems];
    updatedItems.splice(index, 1);
    setCartItems(updatedItems);
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }

    const updatedItems = [...cartItems];
    updatedItems[index].quantity = quantity;
    setCartItems(updatedItems);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const cartContextValue: CartContextType = {
    cartItems,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
