export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  quantity?: number;
}

export interface CartItem extends Product {
  cartQuantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
  shippingAddress: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: boolean;
  newsletter: boolean;
  theme: 'light' | 'dark';
}

export interface CompanyInfo {
  name: string;
  description: string;
  founded: string;
  mission: string;
  values: string[];
  team: TeamMember[];
  contact: ContactInfo;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  website: string;
  socialMedia: SocialLinks;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}
