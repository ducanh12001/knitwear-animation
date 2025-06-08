export interface ProductColor {
  id: string;
  image: string;
  hex?: string;
  name?: string;
}

export interface Product {
  id: number;
  title: string;
  gender: 'male' | 'female';
  image: string;
  description: string;
  price: {
    regular: string;
    sale?: string;
  };
  colors: ProductColor[];
  slides?: { img: string; alt: string }[];
}
