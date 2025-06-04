export interface ProductColor {
  id: string | number;
  image: string;
  hex?: string;
  name?: string;
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
  slides?: { img: string; alt: string }[];
}
