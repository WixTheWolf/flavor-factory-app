import axios, { AxiosInstance } from 'axios';
import { Product, Order, CompanyInfo } from '../types';

const API_BASE_URL = 'https://api.flavor-factory.local/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Product endpoints
  async getProducts(category?: string): Promise<Product[]> {
    try {
      const params = category ? { category } : {};
      const response = await this.api.get<Product[]>('/products', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const response = await this.api.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const response = await this.api.get<Product[]>('/products/search', {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  // Order endpoints
  async createOrder(items: any[], shippingAddress: string): Promise<Order> {
    try {
      const response = await this.api.post<Order>('/orders', {
        items,
        shippingAddress,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async getOrders(userId: string): Promise<Order[]> {
    try {
      const response = await this.api.get<Order[]>(`/orders?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  async getOrderById(orderId: string): Promise<Order> {
    try {
      const response = await this.api.get<Order>(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      throw error;
    }
  }

  // Company info endpoints
  async getCompanyInfo(): Promise<CompanyInfo> {
    try {
      const response = await this.api.get<CompanyInfo>('/company/info');
      return response.data;
    } catch (error) {
      console.error('Error fetching company info:', error);
      throw error;
    }
  }

  async getTeamMembers() {
    try {
      const response = await this.api.get('/company/team');
      return response.data;
    } catch (error) {
      console.error('Error fetching team members:', error);
      throw error;
    }
  }
}

export default new ApiService();
