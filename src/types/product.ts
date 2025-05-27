export interface ProductColor {
  id: number;
  hex: string;
  url: string;
  name?: string;
  active?: boolean;
}

export interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  price: {
    regular: string;
    sale?: string;
  };
  colors: ProductColor[];
}
