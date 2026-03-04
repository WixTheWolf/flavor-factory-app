import { Order } from '../types';

interface OrderState {
  items: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  items: [],
  loading: false,
  error: null,
};

export interface OrderAction {
  type: string;
  payload?: any;
}

export const orderReducer = (
  state = initialState,
  action: OrderAction
): OrderState => {
  switch (action.type) {
    case 'FETCH_ORDERS':
      return { ...state, loading: true, error: null };
    case 'FETCH_ORDERS_SUCCESS':
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case 'FETCH_ORDERS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'CREATE_ORDER_SUCCESS': {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    default:
      return state;
  }
};
