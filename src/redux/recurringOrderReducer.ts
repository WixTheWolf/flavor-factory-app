import { AnyAction } from 'redux';

/**
 * Recurring Orders & Quotes Reducer
 * Manages recurring order templates and custom quote requests
 */

export interface RecurringOrder {
  id: string;
  name: string;
  frequency: 'weekly' | 'biweekly' | 'monthly' | 'quarterly';
  nextDelivery: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    moq: number;
  }>;
  totalValue: number;
  automateReordering: boolean;
  notes: string;
  createdAt: string;
  lastOrdered?: string;
}

export interface CustomQuote {
  id: string;
  status: 'pending' | 'reviewed' | 'quoted' | 'accepted' | 'rejected';
  requestDate: string;
  applicationType: string;
  flavorProfile: string;
  targetMarket: string;
  estimatedVolume: number;
  specialRequirements: string;
  quotedPrice?: number;
  quotedDate?: string;
  expiryDate?: string;
  notes: string;
}

interface RecurringOrderState {
  recurringOrders: RecurringOrder[];
  customQuotes: CustomQuote[];
  loading: boolean;
  error: string | null;
}

const initialState: RecurringOrderState = {
  recurringOrders: [],
  customQuotes: [],
  loading: false,
  error: null,
};

export const recurringOrderReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'SET_RECURRING_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_RECURRING_ERROR':
      return { ...state, error: action.payload };

    case 'ADD_RECURRING_ORDER':
      return {
        ...state,
        recurringOrders: [...state.recurringOrders, action.payload],
      };

    case 'UPDATE_RECURRING_ORDER':
      return {
        ...state,
        recurringOrders: state.recurringOrders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        ),
      };

    case 'DELETE_RECURRING_ORDER':
      return {
        ...state,
        recurringOrders: state.recurringOrders.filter(
          (order) => order.id !== action.payload
        ),
      };

    case 'FETCH_RECURRING_ORDERS':
      return {
        ...state,
        recurringOrders: action.payload,
        loading: false,
      };

    case 'ADD_CUSTOM_QUOTE':
      return {
        ...state,
        customQuotes: [...state.customQuotes, action.payload],
      };

    case 'UPDATE_CUSTOM_QUOTE':
      return {
        ...state,
        customQuotes: state.customQuotes.map((quote) =>
          quote.id === action.payload.id ? action.payload : quote
        ),
      };

    case 'FETCH_CUSTOM_QUOTES':
      return {
        ...state,
        customQuotes: action.payload,
        loading: false,
      };

    case 'DELETE_CUSTOM_QUOTE':
      return {
        ...state,
        customQuotes: state.customQuotes.filter((quote) => quote.id !== action.payload),
      };

    default:
      return state;
  }
};

// Action creators
export const addRecurringOrder = (order: RecurringOrder) => ({
  type: 'ADD_RECURRING_ORDER',
  payload: order,
});

export const updateRecurringOrder = (order: RecurringOrder) => ({
  type: 'UPDATE_RECURRING_ORDER',
  payload: order,
});

export const deleteRecurringOrder = (orderId: string) => ({
  type: 'DELETE_RECURRING_ORDER',
  payload: orderId,
});

export const fetchRecurringOrders = (orders: RecurringOrder[]) => ({
  type: 'FETCH_RECURRING_ORDERS',
  payload: orders,
});

export const addCustomQuote = (quote: CustomQuote) => ({
  type: 'ADD_CUSTOM_QUOTE',
  payload: quote,
});

export const updateCustomQuote = (quote: CustomQuote) => ({
  type: 'UPDATE_CUSTOM_QUOTE',
  payload: quote,
});

export const fetchCustomQuotes = (quotes: CustomQuote[]) => ({
  type: 'FETCH_CUSTOM_QUOTES',
  payload: quotes,
});

export const deleteCustomQuote = (quoteId: string) => ({
  type: 'DELETE_CUSTOM_QUOTE',
  payload: quoteId,
});

export const setRecurringLoading = (loading: boolean) => ({
  type: 'SET_RECURRING_LOADING',
  payload: loading,
});

export const setRecurringError = (error: string | null) => ({
  type: 'SET_RECURRING_ERROR',
  payload: error,
});
