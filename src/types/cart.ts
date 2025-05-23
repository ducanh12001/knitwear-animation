import type { Product } from './product';

export interface CartItem {
  id: number;
  title: string;
  price: string;
  image: string;
  size: string;
  color: number;
  colorHex: string;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  cartTotal: number;
  addToCart: (
    product: Product,
    size: string,
    color: number,
    quantity?: number,
  ) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
}
