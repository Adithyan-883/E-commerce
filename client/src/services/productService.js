import api from '../api/axios';
import { products as dummyProducts } from '../constants/dummyData';

// Simulated delay for dummy data fallback
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ProductService {
  /**
   * Fetch all products
   * @returns {Promise<Array>} Array of products
   */
  async getAllProducts() {
    try {
      // Attempt API call (will fail if backend is down)
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using dummy data for products.');
      await delay(800); // Simulate network request
      return dummyProducts;
    }
  }

  /**
   * Fetch product by ID
   * @param {string} id Product ID
   * @returns {Promise<Object>} Product details
   */
  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`Backend not available, fetching dummy product for ID: ${id}`);
      await delay(500);
      const product = dummyProducts.find(p => p.id === id);
      if (!product) throw new Error('Product not found');
      return product;
    }
  }

  /**
   * Fetch related products by category
   * @param {string} category 
   * @param {string} excludeId 
   * @returns {Promise<Array>}
   */
  async getRelatedProducts(category, excludeId) {
    try {
      const response = await api.get(`/products/related?category=${category}&exclude=${excludeId}`);
      return response.data;
    } catch (error) {
      await delay(500);
      return dummyProducts
        .filter(item => item.category === category && item.id !== excludeId)
        .slice(0, 4);
    }
  }
}

export const productService = new ProductService();
