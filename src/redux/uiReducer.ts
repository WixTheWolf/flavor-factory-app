interface UIState {
  isLoading: boolean;
  error: string | null;
}

const initialState: UIState = {
  isLoading: false,
  error: null,
};

export interface UIAction {
  type: string;
  payload?: any;
}

export const uiReducer = (
  state = initialState,
  action: UIAction
): UIState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};
