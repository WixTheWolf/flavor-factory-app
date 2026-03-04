import axios, { AxiosInstance } from 'axios';

/**
 * Payment & Billing Integration Service
 * Supports multiple payment processors:
 * - Stripe (credit cards, ACH)
 * - PayPal (business accounts)
 * - Square (point of sale)
 * - Bill.com (B2B invoicing)
 */

const PAYMENT_API_URL = process.env.PAYMENT_API_URL || 'https://api.payments.local/api';

class PaymentService {
  private api: AxiosInstance;
  private stripeKey = process.env.STRIPE_API_KEY || '';
  private paypalKey = process.env.PAYPAL_API_KEY || '';

  constructor() {
    this.api = axios.create({
      baseURL: PAYMENT_API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Create payment intent for order
   */
  async createPaymentIntent(orderId: string, amount: number, currency: string = 'USD'): Promise<any> {
    try {
      const response = await this.api.post('/payment-intents', {
        orderId,
        amount,
        currency,
        metadata: { orderId },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  /**
   * Process credit card payment (via Stripe)
   */
  async processCardPayment(
    paymentIntentId: string,
    cardToken: string,
    billingDetails: any
  ): Promise<any> {
    try {
      const response = await this.api.post('/payments/card', {
        paymentIntentId,
        cardToken,
        billingDetails,
      });
      return response.data;
    } catch (error) {
      console.error('Error processing card payment:', error);
      throw error;
    }
  }

  /**
   * Process ACH/Bank transfer payment
   */
  async processACHPayment(
    paymentIntentId: string,
    bankAccount: any,
    businessDetails: any
  ): Promise<any> {
    try {
      const response = await this.api.post('/payments/ach', {
        paymentIntentId,
        bankAccount,
        businessDetails,
      });
      return response.data;
    } catch (error) {
      console.error('Error processing ACH payment:', error);
      throw error;
    }
  }

  /**
   * Create invoice for order (Bill.com integration)
   */
  async createInvoice(orderData: any): Promise<any> {
    try {
      const response = await this.api.post('/invoices', {
        ...orderData,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      });
      return response.data;
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  }

  /**
   * Get payment methods on file for customer
   */
  async getPaymentMethods(customerId: string): Promise<any[]> {
    try {
      const response = await this.api.get(`/customers/${customerId}/payment-methods`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      throw error;
    }
  }

  /**
   * Save customer payment method
   */
  async savePaymentMethod(customerId: string, paymentMethod: any): Promise<any> {
    try {
      const response = await this.api.post(
        `/customers/${customerId}/payment-methods`,
        paymentMethod
      );
      return response.data;
    } catch (error) {
      console.error('Error saving payment method:', error);
      throw error;
    }
  }

  /**
   * Get transaction history for customer
   */
  async getTransactionHistory(customerId: string, limit: number = 50): Promise<any[]> {
    try {
      const response = await this.api.get(`/customers/${customerId}/transactions`, {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      throw error;
    }
  }

  /**
   * Get invoice status and payment tracking
   */
  async getInvoiceStatus(invoiceId: string): Promise<any> {
    try {
      const response = await this.api.get(`/invoices/${invoiceId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching invoice status:', error);
      throw error;
    }
  }

  /**
   * Set up recurring payments / subscriptions
   */
  async setupRecurringPayment(customerId: string, subscriptionData: any): Promise<any> {
    try {
      const response = await this.api.post(
        `/customers/${customerId}/subscriptions`,
        subscriptionData
      );
      return response.data;
    } catch (error) {
      console.error('Error setting up recurring payment:', error);
      throw error;
    }
  }

  /**
   * Calculate taxes for order
   */
  async calculateTax(orderDetails: any): Promise<number> {
    try {
      const response = await this.api.post('/tax/calculate', orderDetails);
      return response.data.taxAmount;
    } catch (error) {
      console.error('Error calculating tax:', error);
      throw error;
    }
  }
}

export default new PaymentService();
