import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

export interface CartAction {
  type: string;
  payload?: any;
}

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);
};

export const cartReducer = (
  state = initialState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      const newItems = existingItem
        ? state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, cartQuantity: item.cartQuantity + 1 }
              : item
          )
        : [...state.items, { ...action.payload, cartQuantity: 1 }];
      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    }
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    }
    case 'UPDATE_CART_QUANTITY': {
      const newItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, cartQuantity: action.payload.quantity }
          : item
      );
      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    }
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    case 'LOAD_CART':
      return {
        items: action.payload,
        total: calculateTotal(action.payload),
      };
    default:
      return state;
  }
};
