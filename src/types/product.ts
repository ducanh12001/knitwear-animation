export interface ProductColor {
  id: number;
  hex: string;
  url: string;
  name?: string;
  active?: boolean;
}

export interface Product {
  id: number;
  url: string;
  title: string;
  image: string;
  description: string;
  price: {
    regular: string;
    sale?: string;
  };
  colors: ProductColor[];
}

export interface ProductSectionProps {
  product: Product;
  themeColor?: string;
  hoverColor?: string;
  sectionClass?: string;
}

export interface ProductDetailsProps {
  isMobile: boolean;
}

export interface HeatIndicatorProps {
  isMobile: boolean;
}

export interface ProductDetail {
  title: string;
  items: string[];
}
