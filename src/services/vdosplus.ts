import axios, { AxiosInstance } from 'axios';

/**
 * vDosPlus Integration Service
 * Connects to vDosPlus inventory management system
 * 
 * Features:
 * - Real-time inventory sync
 * - Product catalog management
 * - Stock level monitoring
 * - Order fulfillment integration
 */

const VDOSPLUS_API_URL = process.env.VDOSPLUS_API_URL || 'https://api.vdosplus.com/api';
const VDOSPLUS_API_KEY = process.env.VDOSPLUS_API_KEY || 'your-api-key-here';

class VDosPlusService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: VDOSPLUS_API_URL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': VDOSPLUS_API_KEY,
      },
    });
  }

  /**
   * Fetch real-time inventory levels from vDosPlus
   */
  async getInventoryLevels(productIds?: string[]): Promise<any> {
    try {
      const params = productIds ? { ids: productIds.join(',') } : {};
      const response = await this.api.get('/inventory', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching inventory:', error);
      throw error;
    }
  }

  /**
   * Get product with real-time stock status
   */
  async getProductWithStock(productId: string): Promise<any> {
    try {
      const response = await this.api.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product stock:', error);
      throw error;
    }
  }

  /**
   * Get all products from vDosPlus catalog
   */
  async getAllProducts(filters?: any): Promise<any[]> {
    try {
      const response = await this.api.get('/products', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  /**
   * Search products in vDosPlus
   */
  async searchProducts(query: string, category?: string): Promise<any[]> {
    try {
      const response = await this.api.get('/products/search', {
        params: { q: query, category },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  /**
   * Submit purchase order to vDosPlus
   */
  async submitPurchaseOrder(orderData: any): Promise<any> {
    try {
      const response = await this.api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error submitting order to vDosPlus:', error);
      throw error;
    }
  }

  /**
   * Get order status from vDosPlus
   */
  async getOrderStatus(orderId: string): Promise<any> {
    try {
      const response = await this.api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order status:', error);
      throw error;
    }
  }

  /**
   * Sync inventory batch to vDosPlus
   */
  async bulkUpdateInventory(updates: any[]): Promise<any> {
    try {
      const response = await this.api.post('/inventory/bulk-update', { updates });
      return response.data;
    } catch (error) {
      console.error('Error bulk updating inventory:', error);
      throw error;
    }
  }

  /**
   * Get stock alerts and low inventory warnings
   */
  async getStockAlerts(): Promise<any[]> {
    try {
      const response = await this.api.get('/inventory/alerts');
      return response.data;
    } catch (error) {
      console.error('Error fetching stock alerts:', error);
      throw error;
    }
  }
}

export default new VDosPlusService();
