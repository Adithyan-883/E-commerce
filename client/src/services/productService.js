import api from '../api/axios';
import { products as dummyProducts } from '../constants/dummyData';

const normalizeProduct = (product) => {
  if (!product) return null;
  return {
    ...product,
    id: product.id || product._id, // Support both id and _id
    image: product.image || (product.images && product.images[0]) || '', // Support image fallback
  };
};

class ProductService {
  /**
   * Fetch all products
   * @returns {Promise<Array>} Array of products
   */
  async getAllProducts() {
    try {
      const response = await api.get('/products');
      return response.data.map(normalizeProduct);
    } catch (error) {
      if (import.meta.env.MODE === 'development') {
        console.warn('Backend MongoDB is not running yet! Falling back to dummy data so the UI continues to work.');
        return dummyProducts.map(normalizeProduct);
      }
      throw error;
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
      return normalizeProduct(response.data);
    } catch (error) {
      if (import.meta.env.MODE === 'development') {
        console.warn(`Backend MongoDB is not running yet! Falling back to dummy product for ID: ${id}`);
        const product = dummyProducts.find(p => p.id === id);
        if (!product) throw new Error('Product not found');
        return normalizeProduct(product);
      }
      throw error;
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
      return response.data.map(normalizeProduct);
    } catch (error) {
      if (import.meta.env.MODE === 'development') {
        console.warn('Backend MongoDB is not running yet! Falling back to dummy related products.');
        return dummyProducts
          .filter(item => item.category === category && item.id !== excludeId)
          .slice(0, 4)
          .map(normalizeProduct);
      }
      throw error;
    }
  }
}


export const productService = new ProductService();

