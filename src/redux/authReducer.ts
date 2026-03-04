import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export interface AuthAction {
  type: string;
  payload?: any;
}

export const authReducer = (
  state = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case 'UPDATE_USER':
      return {
        user: { ...state.user, ...action.payload } as User,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
