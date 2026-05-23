import api from '../api/axios';

const normalizeProduct = (product) => {
  if (!product) return null;
  return {
    ...product,
    id: product.id || product._id,
    image: product.image || (product.images && product.images[0]) || '',
  };
};

class ProductService {
  /**
   * Fetch all products
   * @returns {Promise<Array>} Array of products
   */
  async getAllProducts() {
    const response = await api.get('/products');
    return response.data.map(normalizeProduct);
  }

  /**
   * Fetch product by ID
   * @param {string} id Product ID
   * @returns {Promise<Object>} Product details
   */
  async getProductById(id) {
    const response = await api.get(`/products/${id}`);
    return normalizeProduct(response.data);
  }

  /**
   * Fetch related products by category, excluding a specific product
   * @param {string} category
   * @param {string} excludeId
   * @returns {Promise<Array>}
   */
  async getRelatedProducts(category, excludeId) {
    const params = new URLSearchParams({ category });
    if (excludeId) params.append('exclude', excludeId);
    const response = await api.get(`/products/related?${params.toString()}`);
    return response.data.map(normalizeProduct);
  }
}

export const productService = new ProductService();
