import { Product, CartItem } from '../types';

interface ProductState {
  items: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

export interface ProductAction {
  type: string;
  payload?: any;
}

export const productReducer = (
  state = initialState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return { ...state, loading: true, error: null };
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case 'FETCH_PRODUCTS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'GET_PRODUCT_DETAILS_SUCCESS':
      return {
        ...state,
        selectedProduct: action.payload,
      };
    default:
      return state;
  }
};
