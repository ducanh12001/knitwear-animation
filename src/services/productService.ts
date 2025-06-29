import type { Product } from '@/types';
import productsData from '@/constant/mock-datas/products.json';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class ProductService {
  private static products: Product[] = productsData.products as Product[];

  // Get all products
  static async getAllProducts(): Promise<Product[]> {
    await delay(100); // Simulate network delay
    return this.products;
  }

  // Get products by gender
  static async getProductsByGender(gender: 'male' | 'female'): Promise<Product[]> {
    await delay(100); // Simulate network delay
    return this.products.filter(product => product.gender === gender);
  }

  // Get men products
  static async getMenProducts(): Promise<Product[]> {
    return this.getProductsByGender('male');
  }

  // Get women products
  static async getWomenProducts(): Promise<Product[]> {
    return this.getProductsByGender('female');
  }

  // Get product by ID
  static async getProductById(id: number): Promise<Product | undefined> {
    await delay(50); // Simulate network delay
    return this.products.find(product => product.id === id);
  }

  // Get products by title (for search functionality)
  static async getProductsByTitle(title: string): Promise<Product[]> {
    await delay(100); // Simulate network delay
    const searchTerm = title.toLowerCase();
    return this.products.filter(product => 
      product.title.toLowerCase().includes(searchTerm)
    );
  }

  // Get featured products (first 4 of each gender)
  static async getFeaturedProducts(): Promise<{
    men: Product[];
    women: Product[];
  }> {
    await delay(150); // Simulate network delay
    const menProducts = this.products.filter(p => p.gender === 'male').slice(0, 4);
    const womenProducts = this.products.filter(p => p.gender === 'female').slice(0, 4);
    
    return {
      men: menProducts,
      women: womenProducts
    };
  }
} 