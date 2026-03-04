import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  private readonly CART_KEY = '@flavor_factory_cart';
  private readonly USER_KEY = '@flavor_factory_user';
  private readonly FAVORITES_KEY = '@flavor_factory_favorites';

  async saveCart(cartItems: any[]): Promise<void> {
    try {
      await AsyncStorage.setItem(this.CART_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  async getCart(): Promise<any[]> {
    try {
      const cart = await AsyncStorage.getItem(this.CART_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  }

  async clearCart(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.CART_KEY);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }

  async saveUser(user: any): Promise<void> {
    try {
      await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  }

  async getUser(): Promise<any> {
    try {
      const user = await AsyncStorage.getItem(this.USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error loading user:', error);
      return null;
    }
  }

  async saveFavorites(favorites: string[]): Promise<void> {
    try {
      await AsyncStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }

  async getFavorites(): Promise<string[]> {
    try {
      const favorites = await AsyncStorage.getItem(this.FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  }

  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([this.CART_KEY, this.USER_KEY, this.FAVORITES_KEY]);
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  }
}

export default new StorageService();
